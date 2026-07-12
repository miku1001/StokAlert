import { Plus } from "lucide-react";
import { useState, useEffect } from "react";
import AddProductModal, { DeleteConfirmModal, EditProductModal, SaleModal } from "@/components/productmodal";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [editTarget, setEditTarget] = useState(null);
  const [showSaleModal, setShowSaleModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [editFormData, setEditFormData] = useState({
  sku: '',
  name: '',
  current_stock: 0,
  reorder_point: 0,
  unit_cost: 0
  });
  const [formData, setFormData] = useState({
  sku: '',
  name: '',
  current_stock: 0,
  reorder_point: 0,
  unit_cost: 0
  });

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch('http://localhost:3000/products', {
          credentials: 'include'
        });
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        const data = await res.json();
        setProducts(data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching data:', err);
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  useEffect(() => {
    if (editTarget) {
      setEditFormData({
        sku: editTarget.sku || '',
        name: editTarget.name || '',
        current_stock: editTarget.current_stock || 0,
        reorder_point: editTarget.reorder_point || 0,
        unit_cost: editTarget.unit_cost || 0
      });
    }
  }, [editTarget]);

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name.includes('stock') || name.includes('point') || name.includes('cost')
        ? parseFloat(value) || 0
        : value
    }));
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditFormData(prev => ({
      ...prev,
      [name]: name.includes('stock') || name.includes('point') || name.includes('cost')
        ? parseFloat(value) || 0
        : value
    }));
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`http://localhost:3000/products/${editTarget.id}`, {
        method: 'PUT',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editFormData)
      });
      if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
      const result = await res.json();
      setProducts(products.map(p => p.id === editTarget.id ? result.product : p));
      setEditTarget(null);
    } catch (err) {
      console.error('Failed to update product:', err);
    }
  };

  //fetch post method
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('http://localhost:3000/products', {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const newProduct = await res.json();
      setProducts([newProduct, ...products]);
      setShowModal(false);
      setFormData({ sku: '', name: '', current_stock: 0, reorder_point: 0, unit_cost: 0 });
    } catch (err) {
      console.error('Failed to add product:', err);
    }
  };

  const getStatus = (product) => {
  if (product.current_stock <= product.reorder_point) {
    return 'critical'; // Reorder now
  } else if (product.current_stock <= product.reorder_point * 1.5) {
    return 'watch';
  }
  return 'ok'; // Healthy
  };

  const deleteProduct = async(id) => {
    try{ 
      const res = await fetch(`http://localhost:3000/products/${id}`,
      { method: 'DELETE',
        credentials: 'include'
      });
      if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
      const updated = products.filter(p => p.id !==id);
      setProducts(updated);
    }
    catch(err){
      console.error('Error Deleting data:', err);
    }
  };

  const handleSaleSubmit = async (e) => {
    e.preventDefault();
    const form = new FormData(e.target);

    const res = await fetch('http://localhost:3000/sales', {
      method: 'POST',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        product_id: selectedProduct.id,
        quantity: Number(form.get('quantity')),
        sale_date: form.get('sale_date'),
      }),
    });

    if (res.ok) {
      setShowSaleModal(false);
      window.location.reload();
    } else {
      const err = await res.json();
      alert(err.message);
    }
  };

  return (
    <div className="h-full p-8 bg-zinc-100">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-4xl font-bold text-black">Products</h1>
        <button onClick = {() => setShowModal(true)}className="flex items-center gap-2 bg-pink-400 hover:bg-pink-500 text-white font-semibold px-6 py-2 rounded-full transition">
          <Plus className="h-5 w-5" />
          Add product
        </button>
      </div>

      {loading && <div className="text-zinc-600 p-8 text-center">Loading products...</div>}

      {!loading && (
        <div className="bg-white rounded-lg shadow overflow-hidden">
          {products.length === 0 ? (
            <div className="p-12 text-center">
              <p className="text-zinc-500 text-lg font-medium">No products found</p>
              <p className="text-zinc-400 text-sm mt-2">Add your first product to get started</p>
            </div>
          ) : (
            <table className="w-full">
              <thead className="border-b border-zinc-500">
                <tr className="">
                  <th className="text-left px-6 py-4 text-sm font-semibold text-zinc-600 uppercase tracking-wider">
                    Stock Keeping Unit
                  </th>
                  <th className="text-left px-6 py-4 text-sm font-semibold text-zinc-600 uppercase tracking-wider">
                    Product
                  </th>
                  <th className="text-left px-6 py-4 text-sm font-semibold text-zinc-600 uppercase tracking-wider">
                    In Stock
                  </th>
                  <th className="text-left px-6 py-4 text-sm font-semibold text-zinc-600 uppercase tracking-wider">
                    Unit Cost
                  </th>
                  <th className="text-left px-6 py-4 text-sm font-semibold text-zinc-600 uppercase tracking-wider">
                    Sales/day
                  </th>
                  <th className="px-6 py-4 text-sm font-semibold text-zinc-600 uppercase tracking-wider text-center">
                    Status
                  </th>
                  <th className="px-6 py-4 text-sm font-semibold text-zinc-600 uppercase tracking-wider text-center">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {products.map((product, index) => {
                  const statusType = getStatus(product);

                  return (
                    <tr
                      key={product.id}
                      className={`border-b border-zinc-500 hover:bg-zinc-50 transition ${
                        index === products.length - 1 ? "border-b-0" : ""
                      }`}
                    >
                      <td className="px-6 py-4 text-base font-medium text-black bg-zinc-50">
                        {product.sku}
                      </td>
                      <td className="px-6 py-4 text-base font-medium text-black bg-zinc-50">
                        {product.name}
                      </td>
                      <td className="px-6 py-4 text-base text-black bg-zinc-50">
                        {product.current_stock}
                      </td>
                      <td className="px-6 py-4 text-base text-black bg-zinc-50">
                        {product.unit_cost}
                      </td>
                      <td className="px-6 py-4 text-base text-black bg-zinc-50">
                        ~{Number(product.avg_daily_sales).toFixed(1)}/day
                      </td>
                      <td className="px-6 py-4 bg-zinc-50 text-center">
                        <div className="flex justify-center items-center gap-2">
                          {statusType === "critical" && (
                            <span className="px-4 py-2 border-2 border-red-900 bg-red-500 text-white font-semibold rounded text-sm">
                              Reorder now
                            </span>
                          )}
                          {statusType === "watch" && (
                            <span className="px-4 py-2 border-2 border-amber-500 text-amber-500 bg-amber-500/30 font-semibold rounded text-sm">
                              Watch
                            </span>
                          )}
                          {statusType === "ok" && (
                            <span className="px-4 py-2 text-green-800 border border-green-800 rounded-sm bg-green-500/50 font-medium text-sm">
                              Healthy
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4 bg-zinc-50 text-center">
                        <div className="flex gap-2 justify-center">
                          <button
                            onClick={() => {
                              setSelectedProduct(product);
                              setShowSaleModal(true);
                            }}
                            className="px-3 py-1 bg-amber-500 hover:bg-amber-600 text-white text-sm font-semibold rounded transition"
                          >
                            Log Sale
                          </button>
                          <button
                            onClick={() => setEditTarget(product)}
                            className="px-3 py-1 bg-blue-500 hover:bg-blue-600 text-white text-sm font-semibold rounded transition"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => setDeleteTarget(product)}
                            className="px-3 py-1 bg-red-500 hover:bg-red-600 text-white text-sm font-semibold rounded transition"
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      )}

      {showModal && (
        <AddProductModal
          formData={formData}
          onChange={handleChange}
          onSubmit={handleSubmit}
          onClose={() => setShowModal(false)}
        />
      )}

      {editTarget && (
        <EditProductModal
          formData={editFormData}
          onChange={handleEditChange}
          onSubmit={handleEditSubmit}
          onClose={() => setEditTarget(null)}
        />
      )}

      {deleteTarget && (
        <DeleteConfirmModal
          product={deleteTarget}
          onConfirm={() => {
            deleteProduct(deleteTarget.id);
            setDeleteTarget(null);
          }}
          onCancel={() => setDeleteTarget(null)}
        />
      )}

      {showSaleModal && (
        <SaleModal
          product={selectedProduct}
          onSubmit={handleSaleSubmit}
          onClose={() => setShowSaleModal(false)}
        />
      )}
    </div>
  );
}