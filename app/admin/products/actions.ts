"use server";

import { z } from "zod";
import prisma from "@/lib/prisma";

const CreateProductSchema = z.object({
  name: z.string().min(2),
  slug: z.string().min(2),
  description: z.string().optional().nullable(),
  type: z.enum(["RENTAL", "ACCESSORY"]),
  sku: z.string().optional().nullable(),
  stock: z.coerce.number().int().min(0).default(0),
  dailyRate: z.coerce.number().optional(),
  price: z.coerce.number().optional(),
  imageUrl: z.string().optional().nullable(),
});

export async function createProduct(formData: FormData) {
  const raw = Object.fromEntries(formData.entries());
  const parsed = CreateProductSchema.safeParse(raw);
  if (!parsed.success) {
    throw new Error("Invalid input");
  }
  const data = parsed.data;

  const isRental = data.type === "RENTAL";

  await prisma.product.create({
    data: {
      name: data.name,
      slug: data.slug,
      description: data.description || undefined,
      type: data.type,
      sku: data.sku || undefined,
      stock: data.stock,
      dailyRate: isRental ? (data.dailyRate ?? 0) : undefined,
      price: !isRental ? (data.price ?? 0) : undefined,
      imageUrl: data.imageUrl || undefined,
    },
  });
}
