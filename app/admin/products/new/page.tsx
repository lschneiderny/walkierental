import { createProduct } from "../actions";

export default function NewProductPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-10">
      <h1 className="text-2xl font-semibold mb-6">New Product</h1>
      <form action={createProduct} className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm mb-1">Name</label>
            <input name="name" required className="w-full border rounded px-3 py-2 bg-transparent" />
          </div>
          <div>
            <label className="block text-sm mb-1">Slug</label>
            <input name="slug" required className="w-full border rounded px-3 py-2 bg-transparent" />
          </div>
        </div>
        <div>
          <label className="block text-sm mb-1">Description</label>
          <textarea name="description" className="w-full border rounded px-3 py-2 bg-transparent" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm mb-1">Type</label>
            <select name="type" className="w-full border rounded px-3 py-2 bg-transparent">
              <option value="RENTAL">RENTAL</option>
              <option value="ACCESSORY">ACCESSORY</option>
            </select>
          </div>
          <div>
            <label className="block text-sm mb-1">SKU</label>
            <input name="sku" className="w-full border rounded px-3 py-2 bg-transparent" />
          </div>
          <div>
            <label className="block text-sm mb-1">Stock</label>
            <input type="number" name="stock" defaultValue={0} className="w-full border rounded px-3 py-2 bg-transparent" />
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm mb-1">Daily Rate (for RENTAL)</label>
            <input type="number" step="0.01" name="dailyRate" className="w-full border rounded px-3 py-2 bg-transparent" />
          </div>
          <div>
            <label className="block text-sm mb-1">Price (for ACCESSORY)</label>
            <input type="number" step="0.01" name="price" className="w-full border rounded px-3 py-2 bg-transparent" />
          </div>
        </div>
        <div>
          <label className="block text-sm mb-1">Image URL</label>
          <input name="imageUrl" className="w-full border rounded px-3 py-2 bg-transparent" />
        </div>
        <button className="rounded bg-black text-white dark:bg-white dark:text-black px-4 py-2 text-sm">Create</button>
      </form>
    </div>
  );
}
