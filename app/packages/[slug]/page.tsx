import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";

interface Props { params: { slug: string } }

export default async function PackageDetailPage({ params }: Props) {
  const pkg = await prisma.package.findUnique({
    where: { slug: params.slug },
    include: { items: { include: { product: true } } },
  });
  if (!pkg) return notFound();
  return (
    <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-10">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
          <div className="aspect-[4/3] bg-black/5 dark:bg-white/10 rounded mb-4 overflow-hidden" />
          <h1 className="text-2xl font-semibold mb-2">{pkg.name}</h1>
          <p className="text-sm text-black/70 dark:text-white/70">{pkg.description}</p>
          <h2 className="mt-6 font-medium">Included items</h2>
          <ul className="mt-2 space-y-1 list-disc list-inside">
            {pkg.items.map((it) => (
              <li key={it.id}>
                {it.quantity} × {it.product.name}
              </li>
            ))}
          </ul>
        </div>
        <div className="md:col-span-1">
          <div className="border border-black/10 dark:border-white/10 rounded-lg p-4">
            <p className="text-lg font-medium mb-3">${String(pkg.dailyRate)} / day</p>
            <p className="text-sm text-black/70 dark:text-white/70">
              Availability is based on the included items. Contact us or request a quote to confirm your dates.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
