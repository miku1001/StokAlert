import { Plus } from "lucide-react";
import { useState, useEffect } from "react";

const products = [
  {
    id: 1,
    name: "Pancit Canton",
    inStock: 8,
    sellsPerDay: "~11/day",
    status: "Reorder now",
    statusType: "critical",
  },
  {
    id: 2,
    name: "Sardinas 155g",
    inStock: 22,
    sellsPerDay: "~6/day",
    status: "Watch",
    statusType: "warning",
  },
  {
    id: 3,
    name: "Kape 3-in-1",
    inStock: 140,
    sellsPerDay: "~18/day",
    status: "Healthy",
    statusType: "healthy",
  },
  {
    id: 4,
    name: "Cooking Oil 1L",
    inStock: 12,
    sellsPerDay: "~9/day",
    status: "Watch",
    statusType: "warning",
  },
];

export default function Products() {

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState([]);

  useEffect( () => {
    fetch('http//localhost:3000/products', {
      credentials: 'include'
    });

  }

  
  )
  return (
    <div className="h-full p-8 bg-zinc-100">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-4xl font-bold text-black">Products</h1>
        <button className="flex items-center gap-2 bg-pink-400 hover:bg-pink-500 text-pink-100 font-semibold px-6 py-2 rounded-full transition">
          <Plus className="h-5 w-5" />
          Add product
        </button>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="w-full">
          <thead className="border-b border-zinc-500">
            <tr>
              <th className="text-left px-6 py-4 text-sm font-semibold text-zinc-600 uppercase tracking-wider">
                Product
              </th>
              <th className="text-left px-6 py-4 text-sm font-semibold text-zinc-600 uppercase tracking-wider">
                In Stock
              </th>
              <th className="text-left px-6 py-4 text-sm font-semibold text-zinc-600 uppercase tracking-wider">
                Sells / Day
              </th>
              <th className="text-left px-6 py-4 text-sm font-semibold text-zinc-600 uppercase tracking-wider">
                Status
              </th>
            </tr>
          </thead>
          <tbody>
            {products.map((product, index) => (
              <tr
                key={product.id}
                className={`border-b border-zinc-500 hover:bg-zinc-50 transition ${
                  index === products.length - 1 ? "border-b-0" : ""
                }`}
              >
                <td className="px-6 py-4 text-base font-medium text-black bg-zinc-50">
                  {product.name}
                </td>
                <td className="px-6 py-4 text-base text-black bg-zinc-50">
                  {product.inStock}
                </td>
                <td className="px-6 py-4 text-base text-black bg-zinc-50">
                  {product.sellsPerDay}
                </td>
                <td className="px-6 py-4 bg-zinc-50">
                  {product.statusType === "critical" && (
                    <button className="px-4 py-2 bg-red-500 text-wite font-semibold rounded hover:bg-red-600 transition text-sm">
                      {product.status}
                    </button>
                  )}
                  {product.statusType === "warning" && (
                    <button className="px-4 py-2 border-2 border-amber-500 text-amber-500 bg-amber-500/30 font-semibold rounded hover:bg-amber-500/50 transition text-sm">
                      {product.status}
                    </button>
                  )}
                  {product.statusType === "healthy" && (
                    <span className="px-4 py-2 text-green-800 border border-green-800 rounded-sm  bg-green-500/50  font-medium text-sm ">
                      {product.status}
                    </span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}