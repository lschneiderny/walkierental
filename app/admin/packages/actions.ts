"use server";

import prisma from "@/lib/prisma";
import { z } from "zod";

const CreatePackageSchema = z.object({
  name: z.string().min(2),
  slug: z.string().min(2),
  description: z.string().optional().nullable(),
  dailyRate: z.coerce.number().min(0),
  // items is a JSON string: [{ productId: string, quantity: number }]
  items: z.string().optional(),
});

export async function createPackage(formData: FormData) {
  const raw = Object.fromEntries(formData.entries());
  const parsed = CreatePackageSchema.safeParse(raw);
  if (!parsed.success) throw new Error("Invalid input");
  const data = parsed.data;

  const items = data.items ? (JSON.parse(String(data.items)) as Array<{ productId: string; quantity: number }>) : [];

  const pkg = await prisma.package.create({
    data: {
      name: data.name,
      slug: data.slug,
      description: data.description || undefined,
      dailyRate: data.dailyRate,
    },
  });

  if (items.length) {
    await prisma.$transaction(
      items.map((it) =>
        prisma.packageItem.create({ data: { packageId: pkg.id, productId: it.productId, quantity: it.quantity } })
      )
    );
  }
}
