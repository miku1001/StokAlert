import { useState, useEffect } from "react";
import { Receipt, PackagePlus } from "lucide-react";

export default function SalesPage() {
  const [sales, setSales] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("http://localhost:3000/sales", {
      credentials: "include",
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to load sales");
        return res.json();
      })
      .then((data) => {
        setSales(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  return (
    <div className="h-full p-8 bg-zinc-100">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-4xl font-bold text-black">Sales</h1>
          <p className="text-sm text-zinc-500 mt-1">
            Every logged sale across your store.
          </p>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="px-6 py-4 border-b border-zinc-300 flex items-center gap-2">
          <Receipt size={16} className="text-zinc-500" />
          <span className="text-sm font-semibold text-black">Sales history</span>
        </div>

        {loading && (
          <div className="px-6 py-8 text-sm text-zinc-500">
            Loading sales...
          </div>
        )}

        {error && (
          <div className="px-6 py-8 text-sm text-red-500">{error}</div>
        )}

        {!loading && !error && sales.length === 0 && (
          <div className="px-6 py-12 flex flex-col items-center gap-2 text-center">
            <PackagePlus size={22} className="text-zinc-400" />
            <p className="text-sm text-zinc-500">
              No sales logged yet. Use "Log Sale" on the Products page to get started.
            </p>
          </div>
        )}

        {!loading && !error && sales.length > 0 && (
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-zinc-300 text-left text-zinc-600 text-xs uppercase tracking-wider">
                <th className="px-6 py-4 font-semibold">Product</th>
                <th className="px-6 py-4 font-semibold">Quantity</th>
                <th className="px-6 py-4 font-semibold">Date</th>
              </tr>
            </thead>
            <tbody>
              {sales.map((s, i) => (
                <tr
                  key={s.id}
                  className={`border-b border-zinc-200 hover:bg-zinc-50 transition ${
                    i === sales.length - 1 ? "border-b-0" : ""
                  }`}
                >
                  <td className="px-6 py-4 font-medium text-black">{s.product_name}</td>
                  <td className="px-6 py-4 text-zinc-600">{s.quantity}</td>
                  <td className="px-6 py-4 text-zinc-600">
                    {new Date(s.sale_date).toLocaleDateString("en-PH", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}