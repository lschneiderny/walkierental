import prisma from "@/lib/prisma";
import { getCart } from "@/lib/cart";
import { checkout } from "./actions";

export const dynamic = "force-dynamic";

export default async function CartPage() {
  const cart = await getCart();
  const productIds = [...new Set(cart.items.map((i) => i.productId))];
  const products = await prisma.product.findMany({ where: { id: { in: productIds } } });
  const byId = Object.fromEntries(products.map((p) => [p.id, p]));

  const rows = cart.items.map((i) => {
    const p = byId[i.productId];
    const isRental = i.kind === "RENTAL";
    const unit = isRental ? Number(p?.dailyRate ?? 0) : Number(p?.price ?? 0);
    let days = 1;
    if (isRental && i.startDate && i.endDate) {
      const s = new Date(i.startDate);
      const e = new Date(i.endDate);
      const diff = Math.ceil((e.getTime() - s.getTime()) / (1000 * 60 * 60 * 24));
      days = Math.max(1, diff);
    }
    const line = isRental ? unit * days * i.quantity : unit * i.quantity;
    return { item: i, product: p, unit, days, line };
  });

  const subtotal = rows.reduce((acc, r) => acc + r.line, 0);

  return (
    <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-10">
      <h1 className="text-2xl font-semibold mb-6">Your cart</h1>
      {rows.length === 0 ? (
        <p className="text-sm text-black/60 dark:text-white/60">Your cart is empty.</p>
      ) : (
        <div className="space-y-4">
          {rows.map((r) => (
            <div key={r.item.id} className="border border-black/10 dark:border-white/10 rounded p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">{r.product?.name || "Unknown"}</p>
                  <p className="text-xs text-black/60 dark:text-white/60">
                    {r.item.kind === "RENTAL" ? (
                      <>Rental{r.item.startDate && r.item.endDate ? ` | ${r.item.startDate} → ${r.item.endDate} (${r.days} days)` : ""}</>
                    ) : (
                      <>Accessory</>
                    )}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-sm">Qty: {r.item.quantity}</p>
                  <p className="text-sm">${String(r.line.toFixed(2))}</p>
                </div>
              </div>
            </div>
          ))}
          <div className="flex items-center justify-between border-t pt-4">
            <p className="font-medium">Subtotal</p>
            <p className="font-medium">${String(subtotal.toFixed(2))}</p>
          </div>
          <form action={checkout}>
            <button className="rounded bg-black text-white dark:bg-white dark:text-black px-4 py-2 text-sm">
              Checkout
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
