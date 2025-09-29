import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";

dotenv.config({ path: ".env.local" });
dotenv.config();

const prisma = new PrismaClient();

async function main() {
  const adminEmail = process.env.ADMIN_EMAIL;
  const adminPassword = process.env.ADMIN_PASSWORD;
  const adminName = process.env.ADMIN_NAME || "Admin";

  if (!adminEmail || !adminPassword) {
    console.warn("[seed] ADMIN_EMAIL and/or ADMIN_PASSWORD not provided. Skipping admin user creation.");
  } else {
    const existing = await prisma.user.findUnique({ where: { email: adminEmail } });
    if (!existing) {
      const passwordHash = await bcrypt.hash(adminPassword, 10);
      await prisma.user.create({
        data: {
          email: adminEmail,
          name: adminName,
          passwordHash,
          role: "ADMIN",
        },
      });
      console.log(`[seed] Created admin user: ${adminEmail}`);
    } else {
      console.log(`[seed] Admin user already exists: ${adminEmail}`);
    }
  }

  // Seed some rental products
  const rentalProducts = [
    {
      slug: "motorola-cp200d",
      name: "Motorola CP200d UHF Radio",
      description: "Durable UHF radio ideal for events and production crews.",
      imageUrl: "/radio-motorola.jpg",
      type: "RENTAL",
      sku: "RAD-CP200D-UHF",
      dailyRate: 19.0,
      stock: 40,
    },
    {
      slug: "kenwood-tk-3402u",
      name: "Kenwood TK-3402U UHF Radio",
      description: "Compact UHF two-way radio with long battery life.",
      imageUrl: "/radio-kenwood.jpg",
      type: "RENTAL",
      sku: "RAD-TK3402U",
      dailyRate: 17.0,
      stock: 30,
    },
  ];

  for (const p of rentalProducts) {
    await prisma.product.upsert({
      where: { slug: p.slug },
      update: {},
      create: {
        slug: p.slug,
        name: p.name,
        description: p.description,
        imageUrl: p.imageUrl,
        type: "RENTAL",
        sku: p.sku,
        dailyRate: p.dailyRate,
        stock: p.stock,
      },
    });
  }

  // Seed some accessories
  const accessories = [
    {
      slug: "earpiece-acoustic-tube",
      name: "Acoustic Tube Earpiece",
      description: "Clear acoustic tube earpiece for discrete monitoring.",
      imageUrl: "/earpiece.jpg",
      type: "ACCESSORY",
      sku: "ACC-EAR-TUBE",
      price: 24.0,
      stock: 200,
    },
    {
      slug: "radio-belt-clip",
      name: "Radio Belt Clip",
      description: "Replacement belt clip for compatible radios.",
      imageUrl: "/belt-clip.jpg",
      type: "ACCESSORY",
      sku: "ACC-BELT-CLIP",
      price: 9.0,
      stock: 150,
    },
  ];

  for (const a of accessories) {
    await prisma.product.upsert({
      where: { slug: a.slug },
      update: {},
      create: {
        slug: a.slug,
        name: a.name,
        description: a.description,
        imageUrl: a.imageUrl,
        type: "ACCESSORY",
        sku: a.sku,
        price: a.price,
        stock: a.stock,
      },
    });
  }

  // Create a package (10 radios + earpieces)
  const radio = await prisma.product.findUnique({ where: { slug: "motorola-cp200d" } });
  if (radio) {
    const pkg = await prisma.package.upsert({
      where: { slug: "event-10-pack" },
      update: {},
      create: {
        slug: "event-10-pack",
        name: "Event 10-Pack",
        description: "Bundle of 10 radios, ideal for small events.",
        dailyRate: 10 * 19.0 - 10, // small discount
      },
    });

    // Ensure package includes 10 radios
    await prisma.packageItem.upsert({
      where: { packageId_productId: { packageId: pkg.id, productId: radio.id } },
      update: { quantity: 10 },
      create: { packageId: pkg.id, productId: radio.id, quantity: 10 },
    });
  }

  console.log("[seed] Completed.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
