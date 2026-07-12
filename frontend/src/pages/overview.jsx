import { useState, useEffect } from "react";

export default function Overview() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch('http://localhost:3000/products',
        {credentials: 'include'});
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        const data = await res.json();
        setProducts(data);
        setLoading(false);
      } catch (err){
        console.error('Erro fetching data:', err)
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const getStatus = (product) => {
    if (product.current_stock <= product.reorder_point) {
      return 'critical';
    } else if (product.current_stock <= product.reorder_point * 1.5) {
      return 'watch';
    }
    return 'ok';
  };

  const itemsTracked = products.length;
  const needReorder = products.filter(p => getStatus(p) === 'critical').length;
  const healthyStock = products.filter(p => getStatus(p) !== 'critical').length;

  return (
    <div className="h-full">
      <div className=" px-11 pt-8 pb-3">
        <h2 className="text-4xl font-bold text-black ml-50">
          Good Morning! User
        </h2>
        <p className="text-lg text-black ml-51 ">Here's what's moving in you store this week.</p>
      </div>
      <div className="grid grid-cols-3 pl-70 pr-10 gap-5 items-center h-40 bg-linear-to-t from-pink-400/50 via-pink-300/50 to-zinc-100 relative overflow-visible">
        <img
          src="src/assets/welcome.png"
          alt="pig"
          className="w-70 h-auto absolute left-3 bottom-0 drop-shadow-xl z-10"
        />
          <div className="text-xl text-black border p-5 rounded-xl bg-zinc-50">
            <h2 className='font-medium text-3xl'>{itemsTracked}</h2>
            <p className='text-lg'>ITEMS TRACKED</p>
          </div>
          <div className="text-xl text-black border p-5 rounded-xl bg-zinc-50">
            <h2 className='font-medium text-3xl'>{needReorder}</h2>
            <p className='text-lg'>NEED REORDER</p>
          </div>
          <div className="text-xl text-black border p-5 rounded-xl bg-zinc-50">
            <h2 className='font-medium text-3xl'>{healthyStock}</h2>
            <p className='text-lg'>HEALTHY STOCK</p>
          </div>
      </div>
      
      <div>
        <h1 className="">asass</h1>

      </div>
    </div>
  );
}