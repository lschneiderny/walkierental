"use server";
import prisma from "@/lib/prisma";
import { getCart, clearCart } from "@/lib/cart";
import { authOptions } from "@/lib/auth-options";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export async function checkout() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    redirect("/signin");
  }

  const cart = await getCart();
  if (!cart.items.length) {
    throw new Error("Cart is empty");
  }

  // Fetch products for pricing
  const productIds = Array.from(new Set(cart.items.map((i) => i.productId).filter(Boolean))) as string[];
  const packageIds = Array.from(new Set(cart.items.map((i) => i.packageId).filter(Boolean))) as string[];
  const [products, packages] = await Promise.all([
    prisma.product.findMany({ where: { id: { in: productIds } } }),
    prisma.package.findMany({ where: { id: { in: packageIds } } }),
  ]);
  const productById = Object.fromEntries(products.map((p) => [p.id, p]));
  const packageById = Object.fromEntries(packages.map((p) => [p.id, p]));

  const hasRental = cart.items.some((i) => i.kind === "RENTAL");

  const order = await prisma.$transaction(async (tx) => {
    const created = await tx.order.create({
      data: {
        userId: session.user.id,
        status: "PENDING",
        type: hasRental ? "RENTAL" : "SALE",
      },
    });

    for (const it of cart.items) {
      const isRental = it.kind === "RENTAL";
      if (isRental) {
        const pkg = packageById[it.packageId || ""];
        if (!pkg) continue;
        await tx.orderItem.create({
          data: {
            orderId: created.id,
            packageId: pkg.id,
            quantity: it.quantity,
            unitPrice: pkg.dailyRate,
            rentalStartDate: new Date(String(it.startDate)),
            rentalEndDate: new Date(String(it.endDate)),
          },
        });
        // Create reservations for each product in the package
        const items = await tx.packageItem.findMany({ where: { packageId: pkg.id } });
        for (const pi of items) {
          await tx.reservation.create({
            data: {
              productId: pi.productId,
              startDate: new Date(String(it.startDate)),
              endDate: new Date(String(it.endDate)),
              quantity: it.quantity * pi.quantity,
              orderId: created.id,
            },
          });
        }
      } else {
        const p = productById[it.productId || ""];
        if (!p) continue;
        await tx.orderItem.create({
          data: {
            orderId: created.id,
            productId: p.id,
            quantity: it.quantity,
            unitPrice: p.price ?? 0,
          },
        });
      }
    }

    return created;
  });

  await clearCart();
  redirect(`/order/${order.id}`);
}
