export default function AddProductModal({ formData, onChange, onSubmit, onClose }) {
  return (
    <div onClick={onClose} className="fixed inset-0 bg-pink-200/30 flex items-center justify-center z-50">
      <div onClick={(e) => e.stopPropagation()} className="bg-white border shadow-2xl rounded-xl p-6 w-150">
        <h2 className="text-lg font-semibold mb-4 text-black">Add product</h2>
        <form onSubmit={onSubmit} className="flex flex-col gap-3">
          <div className="flex flex-col">
            <label htmlFor="sku" className="text-black">SKU</label>
            <input
              id="sku"
              name="sku"
              placeholder="e.g. Coke-1L"
              value={formData.sku}
              onChange={onChange}
              className="bg-zinc-100 border rounded-lg px-3 py-2 text-sm text-zinc-900 placeholder-gray-500"
              required
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="name" className="text-black">Product Name</label>
            <input
              id="name"
              name="name"
              placeholder="Coke 1 Liter"
              value={formData.name}
              onChange={onChange}
              className="bg-zinc-100 border rounded-lg px-3 py-2 text-sm text-black placeholder-gray-500"
              required
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="current_stock" className="text-black">Current Stock</label>
            <input
              id="current_stock"
              name="current_stock"
              type="number"
              placeholder="Current stock"
              value={formData.current_stock}
              onChange={onChange}
              className="bg-zinc-100 border rounded-lg px-3 py-2 text-sm text-black placeholder-gray-500"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="reorder_point" className="text-black">Reorder Point (Minimum stock level before you need to reorder)</label>
            <input
              id="reorder_point"
              name="reorder_point"
              type="number"
              value={formData.reorder_point}
              onChange={onChange}
              className="bg-zinc-100 border rounded-lg px-3 py-2 text-sm text-black placeholder-gray-500"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="unit_cost" className="text-black">Unit Cost</label>
            <input
              id="unit_cost"
              name="unit_cost"
              type="number"
              step="0.01"
              placeholder="Unit cost"
              value={formData.unit_cost}
              onChange={onChange}
              className="bg-zinc-100 border rounded-lg px-3 py-2 text-sm text-black placeholder-gray-500"
            />
          </div>

          <div className="flex justify-end gap-2 mt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-lg text-sm text-[#8f8d86] hover:bg-[#151517]"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded-lg text-sm font-semibold bg-pink-400 text-white"
            >
              Save product
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}