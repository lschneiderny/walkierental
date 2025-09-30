import prisma from "@/lib/prisma";
import Link from "next/link";
import Image from "next/image";
import { Plus, Edit, Trash2, Package as PackageIcon, DollarSign, Box } from "lucide-react";

export default async function AdminPackages() {
  const packages = await prisma.package.findMany({ 
    include: { 
      items: {
        include: {
          product: true
        }
      }
    }, 
    orderBy: { createdAt: "desc" } 
  });

  const totalPackages = packages.length;
  const averageItems = packages.length > 0 
    ? Math.round(packages.reduce((sum, pkg) => sum + pkg.items.length, 0) / packages.length)
    : 0;
  const totalValue = packages.reduce((sum, pkg) => sum + Number(pkg.dailyRate), 0);

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Packages</h1>
          <p className="text-foreground/60 mt-1">Create and manage rental packages</p>
        </div>
        <Link 
          href="/admin/packages/new" 
          className="flex items-center gap-2 rounded-lg bg-primary hover:bg-primary-dark text-white px-4 py-2.5 text-sm font-medium transition-colors"
        >
          <Plus className="h-4 w-4" />
          New Package
        </Link>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-gradient-to-br from-primary/10 to-primary/5 rounded-lg p-4 border border-primary/20">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-foreground/60">Total Packages</p>
              <p className="text-2xl font-bold">{totalPackages}</p>
            </div>
            <PackageIcon className="h-8 w-8 text-primary" />
          </div>
        </div>
        <div className="bg-gradient-to-br from-blue-500/10 to-blue-500/5 rounded-lg p-4 border border-blue-500/20">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-foreground/60">Avg Items/Package</p>
              <p className="text-2xl font-bold">{averageItems}</p>
            </div>
            <Box className="h-8 w-8 text-blue-500" />
          </div>
        </div>
        <div className="bg-gradient-to-br from-green-500/10 to-green-500/5 rounded-lg p-4 border border-green-500/20">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-foreground/60">Total Daily Value</p>
              <p className="text-2xl font-bold">${totalValue.toFixed(2)}</p>
            </div>
            <DollarSign className="h-8 w-8 text-green-500" />
          </div>
        </div>
      </div>

      {/* Packages Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {packages.map((pkg) => (
          <div key={pkg.id} className="group relative rounded-xl border border-black/10 dark:border-white/10 overflow-hidden hover:border-primary/50 transition-all hover:shadow-lg">
            {/* Package Header */}
            <div className="relative h-48 bg-gradient-to-br from-primary/10 to-accent/10">
              {pkg.imageUrl ? (
                <Image
                  src={pkg.imageUrl}
                  alt={pkg.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center">
                  <PackageIcon className="h-20 w-20 text-primary/20" />
                </div>
              )}
              {/* Price Badge */}
              <div className="absolute top-4 right-4 bg-background/90 backdrop-blur-sm rounded-lg px-3 py-1.5">
                <p className="text-sm font-bold">${String(pkg.dailyRate)}/day</p>
              </div>
            </div>

            {/* Package Content */}
            <div className="p-6 space-y-4">
              <div>
                <h3 className="font-semibold text-lg">{pkg.name}</h3>
                {pkg.description && (
                  <p className="text-sm text-foreground/60 mt-1 line-clamp-2">{pkg.description}</p>
                )}
              </div>

              {/* Items List */}
              <div className="space-y-2">
                <p className="text-sm font-medium text-foreground/80">Package Items:</p>
                <div className="space-y-1 max-h-32 overflow-auto">
                  {pkg.items.map((item) => (
                    <div key={item.id} className="flex items-center justify-between text-sm bg-black/5 dark:bg-white/5 rounded px-2 py-1">
                      <span className="text-foreground/70">{item.product.name}</span>
                      <span className="text-foreground/50 text-xs">×{item.quantity}</span>
                    </div>
                  ))}
                  {pkg.items.length === 0 && (
                    <p className="text-sm text-foreground/40 italic">No items added</p>
                  )}
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-2 pt-2">
                <Link
                  href={`/admin/packages/${pkg.id}/edit`}
                  className="flex-1 flex items-center justify-center gap-2 px-3 py-2 border border-black/10 dark:border-white/10 rounded-lg hover:bg-primary/10 hover:border-primary/50 transition-colors"
                >
                  <Edit className="h-4 w-4" />
                  <span className="text-sm">Edit</span>
                </Link>
                <button
                  className="p-2 text-red-500 hover:bg-red-500/10 rounded-lg transition-colors"
                  aria-label="Delete package"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        ))}

        {/* Empty State */}
        {packages.length === 0 && (
          <div className="col-span-full">
            <div className="rounded-xl border-2 border-dashed border-black/10 dark:border-white/10 p-12 text-center">
              <PackageIcon className="h-12 w-12 text-foreground/20 mx-auto mb-4" />
              <p className="text-foreground/60">No packages yet</p>
              <p className="text-sm text-foreground/40 mt-1">Create your first package to bundle products together</p>
              <Link
                href="/admin/packages/new"
                className="inline-flex items-center gap-2 mt-4 px-4 py-2 bg-primary hover:bg-primary-dark text-white rounded-lg transition-colors"
              >
                <Plus className="h-4 w-4" />
                Create Package
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
