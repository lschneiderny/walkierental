import prisma from "@/lib/prisma";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function RentalsPage() {
  const products = await prisma.product.findMany({
    where: { type: "RENTAL" },
    orderBy: { name: "asc" },
  });

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
      <h1 className="text-2xl font-semibold mb-6">Rentals</h1>
      <p className="text-sm text-black/60 dark:text-white/60 mb-6">
        High-priority rental flow. Browse radios and packages first; accessories are available separately.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((p) => (
          <Link key={p.id} href={`/rentals/${p.slug}`} className="border border-black/10 dark:border-white/10 rounded-lg p-4 hover:shadow-sm">
            <div className="aspect-[4/3] bg-black/5 dark:bg-white/10 rounded mb-3 overflow-hidden" />
            <h2 className="font-medium">{p.name}</h2>
            {p.dailyRate && (
              <p className="text-sm text-black/60 dark:text-white/60">${String(p.dailyRate)} / day</p>
            )}
            <p className="text-xs text-black/60 dark:text-white/60 mt-1">In stock: {p.stock}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
