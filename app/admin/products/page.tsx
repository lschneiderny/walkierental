import prisma from "@/lib/prisma";
import Link from "next/link";

export default async function AdminProducts() {
  const products = await prisma.product.findMany({ orderBy: { createdAt: "desc" } });
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold">Products</h1>
        <Link href="/admin/products/new" className="rounded bg-black text-white dark:bg-white dark:text-black px-3 py-2 text-sm">New Product</Link>
      </div>
      <table className="w-full text-sm border border-black/10 dark:border-white/10 rounded">
        <thead className="bg-black/5 dark:bg-white/10">
          <tr>
            <th className="text-left p-2">Name</th>
            <th className="text-left p-2">Type</th>
            <th className="text-left p-2">SKU</th>
            <th className="text-left p-2">Stock</th>
          </tr>
        </thead>
        <tbody>
          {products.map((p) => (
            <tr key={p.id} className="border-t border-black/10 dark:border-white/10">
              <td className="p-2">{p.name}</td>
              <td className="p-2">{p.type}</td>
              <td className="p-2">{p.sku}</td>
              <td className="p-2">{p.stock}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
