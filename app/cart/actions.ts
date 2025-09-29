"use server";

import { cookies } from "next/headers";
import prisma from "@/lib/prisma";
import { getCart, setCart, clearCart } from "@/lib/cart";
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
  const productIds = Array.from(new Set(cart.items.map((i) => i.productId)));
  const products = await prisma.product.findMany({ where: { id: { in: productIds } } });
  const byId = Object.fromEntries(products.map((p) => [p.id, p]));

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
      const p = byId[it.productId];
      if (!p) continue;
      const isRental = it.kind === "RENTAL";
      const unit = isRental ? (p.dailyRate ?? 0) : (p.price ?? 0);
      const item = await tx.orderItem.create({
        data: {
          orderId: created.id,
          productId: p.id,
          quantity: it.quantity,
          unitPrice: unit,
          rentalStartDate: isRental ? new Date(String(it.startDate)) : undefined,
          rentalEndDate: isRental ? new Date(String(it.endDate)) : undefined,
        },
      });

      if (isRental) {
        await tx.reservation.create({
          data: {
            productId: p.id,
            startDate: new Date(String(it.startDate)),
            endDate: new Date(String(it.endDate)),
            quantity: it.quantity,
            orderId: created.id,
          },
        });
      }
    }

    return created;
  });

  await clearCart();
  redirect(`/order/${order.id}`);
}
