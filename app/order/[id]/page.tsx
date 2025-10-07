import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";

interface Props { params: Promise<{ id: string }> }

export default async function OrderConfirmationPage({ params }: Props) {
  const { id } = await params;
  const order = await prisma.order.findUnique({
    where: { id },
    include: { items: { include: { product: true, package: true } }, reservations: true, user: true },
  });
  if (!order) return notFound();

  const subtotal = order.items.reduce((acc, it) => acc + Number(it.unitPrice) * it.quantity, 0);

  return (
    <div className="pt-16">
      <div className="mx-auto max-w-4xl px-1 py-16">
        <h1 className="text-4xl font-bold mb-4">Order Received</h1>
      <p className="text-base text-black/70 dark:text-white/70 mb-10">Order ID: {order.id}</p>
      <div className="space-y-4">
        {order.items.map((it) => (
          <div key={it.id} className="border border-black/10 dark:border-white/10 rounded-xl p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-semibold text-lg mb-1">{it.product?.name || it.package?.name || "Item"}</p>
                <p className="text-sm text-black/60 dark:text-white/60">
                  {it.rentalStartDate && it.rentalEndDate ? `Rental | ${it.rentalStartDate.toISOString().slice(0,10)} → ${it.rentalEndDate.toISOString().slice(0,10)}` : "Accessory"}
                </p>
              </div>
              <div className="text-right">
                <p className="text-sm text-black/60 dark:text-white/60 mb-1">Qty: {it.quantity}</p>
                <p className="text-lg font-semibold">${String(it.unitPrice)}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="flex items-center justify-between border-t border-black/10 dark:border-white/10 pt-6 mt-6">
        <p className="text-xl font-semibold">Subtotal</p>
        <p className="text-2xl font-bold">${String(subtotal.toFixed(2))}</p>
      </div>
        <p className="text-base text-black/60 dark:text-white/60 mt-8 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">We&apos;ll reach out to confirm details and delivery.</p>
      </div>
    </div>
  );
}
