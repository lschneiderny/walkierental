import prisma from "@/lib/prisma";

export async function getAvailableQuantity(
  productId: string,
  startDate: Date,
  endDate: Date
): Promise<number> {
  if (endDate < startDate) throw new Error("endDate must be after startDate");
  const product = await prisma.product.findUnique({ where: { id: productId } });
  if (!product) throw new Error("Product not found");

  const overlap = await prisma.reservation.aggregate({
    where: {
      productId,
      AND: [{ startDate: { lte: endDate } }, { endDate: { gte: startDate } }],
    },
    _sum: { quantity: true },
  });
  const reserved = overlap._sum.quantity ?? 0;
  const available = Math.max(0, (product.stock ?? 0) - reserved);
  return available;
}
