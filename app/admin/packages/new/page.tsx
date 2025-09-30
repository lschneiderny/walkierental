import prisma from "@/lib/prisma";
import PackageForm from "./package-form";

export default async function NewPackagePage() {
  const rentals = await prisma.product.findMany({ 
    where: { type: "RENTAL" }, 
    orderBy: { name: "asc" } 
  });
  
  return (
    <PackageForm 
      rentals={rentals.map(r => ({ id: r.id, name: r.name }))} 
    />
  );
}
