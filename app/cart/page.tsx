import prisma from "@/lib/prisma";
import { getCart } from "@/lib/cart";
import { checkout } from "./actions";

export const dynamic = "force-dynamic";

export default async function CartPage() {
  const cart = await getCart();
  const productIds = [...new Set(cart.items.map((i) => i.productId).filter(Boolean))] as string[];
  const packageIds = [...new Set(cart.items.map((i) => i.packageId).filter(Boolean))] as string[];
  const [products, packages] = await Promise.all([
    prisma.product.findMany({ where: { id: { in: productIds } } }),
    prisma.package.findMany({ where: { id: { in: packageIds } } }),
  ]);
  const productById = Object.fromEntries(products.map((p) => [p.id, p]));
  const packageById = Object.fromEntries(packages.map((p) => [p.id, p]));

  const rows = cart.items.map((i) => {
    const isRental = i.kind === "RENTAL";
    let unit = 0;
    if (isRental) {
      const pkg = packageById[i.packageId || ""];
      unit = Number(pkg?.dailyRate ?? 0);
    } else {
      const prod = productById[i.productId || ""];
      unit = Number(prod?.price ?? 0);
    }
    let days = 1;
    if (isRental && i.startDate && i.endDate) {
      const s = new Date(i.startDate);
      const e = new Date(i.endDate);
      const diff = Math.ceil((e.getTime() - s.getTime()) / (1000 * 60 * 60 * 24));
      days = Math.max(1, diff);
    }
    const line = isRental ? unit * days * i.quantity : unit * i.quantity;
    const product = isRental ? packageById[i.packageId || ""] : productById[i.productId || ""];
    return { item: i, product, unit, days, line };
  });

  const subtotal = rows.reduce((acc, r) => acc + r.line, 0);

  return (
    <div className="pt-16">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-16">
        <h1 className="text-4xl font-bold mb-10">Your Cart</h1>
      {rows.length === 0 ? (
        <div className="text-center py-16">
          <p className="text-lg text-black/60 dark:text-white/60">Your cart is empty.</p>
        </div>
      ) : (
        <div className="space-y-6">
          <div className="space-y-4">
            {rows.map((r) => (
              <div key={r.item.id} className="border border-black/10 dark:border-white/10 rounded-xl p-5">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-semibold text-lg mb-1">{r.product?.name || "Unknown"}</p>
                    <p className="text-sm text-black/60 dark:text-white/60">
                      {r.item.kind === "RENTAL" ? (
                        <>Rental{r.item.startDate && r.item.endDate ? ` | ${r.item.startDate} → ${r.item.endDate} (${r.days} days)` : ""}</>
                      ) : (
                        <>Accessory</>
                      )}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-black/60 dark:text-white/60 mb-1">Qty: {r.item.quantity}</p>
                    <p className="text-lg font-semibold">${String(r.line.toFixed(2))}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="flex items-center justify-between border-t border-black/10 dark:border-white/10 pt-6">
            <p className="text-xl font-semibold">Subtotal</p>
            <p className="text-2xl font-bold">${String(subtotal.toFixed(2))}</p>
          </div>
          <form action={checkout}>
            <button className="w-full bg-[color:var(--primary)] hover:bg-[color:var(--primary-hover)] text-white px-6 py-4 rounded-lg text-base font-semibold uppercase tracking-wide transition-colors">
              Checkout
            </button>
          </form>
        </div>
      )}
      </div>
    </div>
  );
}
