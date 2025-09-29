import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";
import AvailabilityWidget from "./availability-widget";

interface Props {
  params: { slug: string };
}

export default async function RentalDetailPage({ params }: Props) {
  const product = await prisma.product.findUnique({ where: { slug: params.slug } });
  if (!product || product.type !== "RENTAL") return notFound();

  return (
    <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-10">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
          <div className="aspect-[4/3] bg-black/5 dark:bg-white/10 rounded mb-4 overflow-hidden" />
          <h1 className="text-2xl font-semibold mb-2">{product.name}</h1>
          <p className="text-sm text-black/70 dark:text-white/70">{product.description}</p>
        </div>
        <div className="md:col-span-1">
          <div className="border border-black/10 dark:border-white/10 rounded-lg p-4">
            {product.dailyRate && (
              <p className="text-lg font-medium mb-3">${String(product.dailyRate)} / day</p>
            )}
            <AvailabilityWidget productId={product.id} />
          </div>
        </div>
      </div>
    </div>
  );
}
