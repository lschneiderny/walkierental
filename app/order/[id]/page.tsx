import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";

interface Props { params: { id: string } }

export default async function OrderConfirmationPage({ params }: Props) {
  const order = await prisma.order.findUnique({
    where: { id: params.id },
    include: { items: { include: { product: true } }, reservations: true, user: true },
  });
  if (!order) return notFound();

  const subtotal = order.items.reduce((acc, it) => acc + Number(it.unitPrice) * it.quantity, 0);

  return (
    <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-10">
      <h1 className="text-2xl font-semibold mb-6">Order received</h1>
      <p className="text-sm text-black/70 dark:text-white/70 mb-6">Order ID: {order.id}</p>
      <div className="space-y-3">
        {order.items.map((it) => (
          <div key={it.id} className="border border-black/10 dark:border-white/10 rounded p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">{it.product.name}</p>
                <p className="text-xs text-black/60 dark:text-white/60">
                  {it.rentalStartDate && it.rentalEndDate ? `Rental | ${it.rentalStartDate.toISOString().slice(0,10)} → ${it.rentalEndDate.toISOString().slice(0,10)}` : "Accessory"}
                </p>
              </div>
              <div className="text-right">
                <p className="text-sm">Qty: {it.quantity}</p>
                <p className="text-sm">${String(it.unitPrice)}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="flex items-center justify-between border-t pt-4 mt-4">
        <p className="font-medium">Subtotal</p>
        <p className="font-medium">${String(subtotal.toFixed(2))}</p>
      </div>
      <p className="text-sm text-black/60 dark:text-white/60 mt-6">We’ll reach out to confirm details and delivery.</p>
    </div>
  );
}
