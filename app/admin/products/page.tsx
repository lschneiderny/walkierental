import prisma from "@/lib/prisma";
import Link from "next/link";
import Image from "next/image";
import { Plus, Edit, Trash2, Search, Filter, Package, ShoppingBag, Box } from "lucide-react";

export default async function AdminProducts() {
  const products = await prisma.product.findMany({ 
    orderBy: { createdAt: "desc" },
    include: { _count: { select: { orderItems: true, reservations: true } } }
  });

  const rentalCount = products.filter(p => p.type === "RENTAL").length;
  const accessoryCount = products.filter(p => p.type === "ACCESSORY").length;
  const lowStockProducts = products.filter(p => p.stock < 5).length;

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-semibold">Products</h1>
          <p className="text-sm text-black/60 dark:text-white/60 mt-1">Manage your rental equipment and accessories</p>
        </div>
        <Link 
          href="/admin/products/new" 
          className="flex items-center gap-2 rounded-lg bg-[color:var(--primary)] hover:bg-[#009a9d] text-white px-4 py-2.5 text-sm font-medium transition-colors"
        >
          <Plus className="h-4 w-4" />
          Add Product
        </Link>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <div className="border border-black/10 dark:border-white/10 rounded-xl p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-black/60 dark:text-white/60">Rental Equipment</span>
            <Box className="h-4 w-4 text-[color:var(--primary)]" />
          </div>
          <div className="text-2xl font-semibold">{rentalCount}</div>
          <p className="text-xs text-black/60 dark:text-white/60 mt-1">Products for rent</p>
        </div>
        <div className="border border-black/10 dark:border-white/10 rounded-xl p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-black/60 dark:text-white/60">Accessories</span>
            <ShoppingBag className="h-4 w-4 text-green-500" />
          </div>
          <div className="text-2xl font-semibold">{accessoryCount}</div>
          <p className="text-xs text-black/60 dark:text-white/60 mt-1">Products for sale</p>
        </div>
        <div className="border border-black/10 dark:border-white/10 rounded-xl p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-black/60 dark:text-white/60">Low Stock Alert</span>
            <Filter className="h-4 w-4 text-orange-500" />
          </div>
          <div className="text-2xl font-semibold">{lowStockProducts}</div>
          <p className="text-xs text-black/60 dark:text-white/60 mt-1">Need restock</p>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-black/40 dark:text-white/40" />
          <input
            type="search"
            placeholder="Search products..."
            className="w-full pl-10 pr-4 py-2 border border-black/10 dark:border-white/10 rounded-lg bg-white dark:bg-gray-900 focus:border-[#00b5b8] focus:outline-none focus:ring-1 focus:ring-[#00b5b8]"
          />
        </div>
        <select className="px-4 py-2 border border-black/10 dark:border-white/10 rounded-lg bg-white dark:bg-gray-900 focus:border-[#00b5b8] focus:outline-none focus:ring-1 focus:ring-[#00b5b8]">
          <option value="">All Types</option>
          <option value="RENTAL">Rentals</option>
          <option value="ACCESSORY">Accessories</option>
        </select>
        <select className="px-4 py-2 border border-black/10 dark:border-white/10 rounded-lg bg-white dark:bg-gray-900 focus:border-[#00b5b8] focus:outline-none focus:ring-1 focus:ring-[#00b5b8]">
          <option value="">Stock Status</option>
          <option value="low">Low Stock (&lt; 5)</option>
          <option value="out">Out of Stock</option>
        </select>
      </div>

      {/* Products Grid - similar to frontend */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <div key={product.id} className="border border-black/10 dark:border-white/10 rounded-xl p-4 hover:shadow-sm transition-shadow">
            <div className="aspect-[4/3] bg-black/5 dark:bg-white/10 rounded mb-3 overflow-hidden">
              {product.imageUrl ? (
                <Image
                  src={product.imageUrl}
                  alt={product.name}
                  width={300}
                  height={225}
                  className="object-cover w-full h-full"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <Package className="h-12 w-12 text-black/20 dark:text-white/20" />
                </div>
              )}
            </div>
            
            <div className="space-y-2">
              <div className="flex items-start justify-between">
                <h3 className="font-medium line-clamp-1">{product.name}</h3>
                <span className={`text-xs px-2 py-0.5 rounded ${
                  product.type === "RENTAL" 
                    ? "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400" 
                    : "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                }`}>
                  {product.type === "RENTAL" ? "Rental" : "Sale"}
                </span>
              </div>
              
              {product.description && (
                <p className="text-sm text-black/60 dark:text-white/60 line-clamp-2">
                  {product.description}
                </p>
              )}
              
              <div className="flex items-center justify-between text-sm">
                <span className="text-black/60 dark:text-white/60">
                  {product.type === "RENTAL" 
                    ? `$${product.dailyRate}/day` 
                    : `$${product.price}`
                  }
                </span>
                <span className={`font-medium ${
                  product.stock === 0 
                    ? "text-red-500"
                    : product.stock < 5
                    ? "text-orange-500"
                    : "text-green-500"
                }`}>
                  {product.stock} in stock
                </span>
              </div>
              
              <div className="flex items-center justify-between pt-2 border-t border-black/10 dark:border-white/10">
                <div className="text-xs text-black/60 dark:text-white/60">
                  {product._count.orderItems + product._count.reservations} orders
                  {product.sku && (
                    <span className="ml-2">• SKU: {product.sku}</span>
                  )}
                </div>
                
                <div className="flex items-center gap-2">
                  <Link
                    href={`/admin/products/${product.id}/edit`}
                    className="p-1.5 text-black/60 dark:text-white/60 hover:text-[color:var(--primary)] hover:bg-[color:var(--primary)]/10 rounded transition-colors"
                    title="Edit product"
                  >
                    <Edit className="h-4 w-4" />
                  </Link>
                  <button
                    className="p-1.5 text-black/60 dark:text-white/60 hover:text-red-500 hover:bg-red-500/10 rounded transition-colors"
                    title="Delete product"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {products.length === 0 && (
        <div className="border border-black/10 dark:border-white/10 rounded-xl p-12 text-center">
          <Package className="h-12 w-12 text-black/20 dark:text-white/20 mx-auto mb-4" />
          <p className="text-black/60 dark:text-white/60 mb-2">No products yet</p>
          <p className="text-sm text-black/40 dark:text-white/40 mb-4">Create your first product to get started</p>
          <Link
            href="/admin/products/new"
            className="inline-flex items-center gap-2 rounded-lg bg-[color:var(--primary)] hover:bg-[#009a9d] text-white px-4 py-2 text-sm font-medium transition-colors"
          >
            <Plus className="h-4 w-4" />
            Add Product
          </Link>
        </div>
      )}
    </div>
  );
}
