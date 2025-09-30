import prisma from "@/lib/prisma";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function PackagesPage() {
  const packages = await prisma.package.findMany({ orderBy: { name: "asc" } });
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
      <h1 className="text-2xl font-semibold mb-6">Rental Packages</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {packages.map((pkg) => (
          <Link key={pkg.id} href={`/packages/${pkg.slug}`} className="border border-black/10 dark:border-white/10 rounded-xl p-4 hover:shadow-sm transition-shadow">
            <div className="aspect-[4/3] bg-black/5 dark:bg-white/10 rounded mb-3 overflow-hidden" />
            <h2 className="font-medium">{pkg.name}</h2>
            <p className="text-sm text-black/60 dark:text-white/60">${String(pkg.dailyRate)} / day</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
