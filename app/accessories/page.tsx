import prisma from "@/lib/prisma";
import { Product } from "@prisma/client";
import AddToCartButton from "@/components/AddToCartButton";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function AccessoriesPage() {
  const products = await prisma.product.findMany({
    where: { type: "ACCESSORY" },
    orderBy: { name: "asc" },
  });

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
      <h1 className="text-2xl font-semibold mb-6">Accessories</h1>
      <p className="text-sm text-black/60 dark:text-white/60 mb-6">
        Accessories are available for sale. Rental equipment and packages take priority.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((p: Product) => (
          <div key={p.id} className="border border-black/10 dark:border-white/10 rounded-xl p-4">
            <Link href={`/accessories/${p.slug}`}>
              <div className="aspect-[4/3] bg-black/5 dark:bg-white/10 rounded mb-3 overflow-hidden" />
              <h2 className="font-medium hover:text-blue-600 dark:hover:text-blue-400 transition-colors">{p.name}</h2>
            </Link>
            {p.price && (
              <p className="text-sm text-black/60 dark:text-white/60">${String(p.price)}</p>
            )}
            <p className="text-xs text-black/60 dark:text-white/60 mt-1">In stock: {p.stock}</p>
            {/* Add to cart for accessories */}
            <div className="mt-2">
              <AddToCartButton productId={p.id} kind="ACCESSORY" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
