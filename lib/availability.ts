import prisma from "@/lib/prisma";

export async function getAvailableQuantityForProduct(
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

export async function getAvailableQuantityForPackage(
  packageId: string,
  startDate: Date,
  endDate: Date
): Promise<number> {
  if (endDate < startDate) throw new Error("endDate must be after startDate");
  const pkg = await prisma.package.findUnique({
    where: { id: packageId },
    include: { items: { include: { product: true } } },
  });
  if (!pkg) throw new Error("Package not found");

  // Availability is limited by the scarcest product, considering required quantity
  const perItemAvailability = await Promise.all(
    pkg.items.map(async (it) => {
      const overlap = await prisma.reservation.aggregate({
        where: {
          productId: it.productId,
          AND: [{ startDate: { lte: endDate } }, { endDate: { gte: startDate } }],
        },
        _sum: { quantity: true },
      });
      const reserved = overlap._sum.quantity ?? 0;
      const availableUnits = Math.max(0, (it.product.stock ?? 0) - reserved);
      return Math.floor(availableUnits / it.quantity);
    })
  );

  return perItemAvailability.length ? Math.min(...perItemAvailability) : 0;
}
