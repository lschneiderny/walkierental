import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";
import AddToCartButton from "@/components/AddToCartButton";

interface Props {
  params: Promise<{ slug: string }>;
}

export default async function AccessoryDetailPage({ params }: Props) {
  const { slug } = await params;
  const product = await prisma.product.findUnique({ where: { slug } });
  if (!product || product.type !== "ACCESSORY") return notFound();

  return (
    <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-10">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
          <div className="aspect-[4/3] bg-black/5 dark:bg-white/10 rounded mb-4 overflow-hidden" />
          <h1 className="text-2xl font-semibold mb-2">{product.name}</h1>
          <p className="text-sm text-black/70 dark:text-white/70">{product.description}</p>
        </div>
        <div className="md:col-span-1">
          <div className="border border-black/10 dark:border-white/10 rounded-xl p-4">
            {product.price && (
              <p className="text-lg font-medium mb-3">${String(product.price)}</p>
            )}
            <p className="text-sm text-black/60 dark:text-white/60 mb-4">
              In stock: {product.stock}
            </p>
            <AddToCartButton productId={product.id} kind="ACCESSORY" />
          </div>
        </div>
      </div>
    </div>
  );
}
