import prisma from "@/lib/prisma";
import { createPackage } from "../actions";
import ItemsPicker from "./items-picker";

export default async function NewPackagePage() {
  const rentals = await prisma.product.findMany({ where: { type: "RENTAL" }, orderBy: { name: "asc" } });
  return (
    <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-10">
      <h1 className="text-2xl font-semibold mb-6">New Package</h1>
      <form action={createPackage} className="space-y-4">
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
        <div>
          <label className="block text-sm mb-1">Daily Rate</label>
          <input type="number" step="0.01" name="dailyRate" required className="w-full border rounded px-3 py-2 bg-transparent" />
        </div>
        <ItemsPicker rentals={rentals.map(r => ({ id: r.id, name: r.name }))} />
        <button className="rounded-lg bg-black text-white dark:bg-white dark:text-black px-4 py-2 text-sm">Create</button>
      </form>
    </div>
  );
}
