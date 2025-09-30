import Link from "next/link";
import prisma from "@/lib/prisma";
import { Package, ShoppingBag, Users, Box, Calendar } from "lucide-react";

export default async function AdminHome() {
  // Fetch statistics
  const [, packageCount, orderCount, userCount, rentalProducts, accessoryProducts] = await Promise.all([
    prisma.product.count(),
    prisma.package.count(),
    prisma.order.count(),
    prisma.user.count(),
    prisma.product.count({ where: { type: "RENTAL" } }),
    prisma.product.count({ where: { type: "ACCESSORY" } }),
  ]);

  const recentOrders = await prisma.order.findMany({
    take: 5,
    orderBy: { createdAt: "desc" },
    include: { user: true },
  });

  const activeRentals = await prisma.reservation.count({
    where: {
      startDate: { lte: new Date() },
      endDate: { gte: new Date() },
    },
  });

  const lowStockProducts = await prisma.product.count({
    where: { stock: { lt: 5 } },
  });

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-semibold mb-2">Dashboard</h1>
        <p className="text-sm text-black/60 dark:text-white/60">Overview of your walkie rental business</p>
      </div>

      {/* Key Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="border border-black/10 dark:border-white/10 rounded-xl p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-black/60 dark:text-white/60">Active Rentals</span>
            <Calendar className="h-4 w-4 text-[#00b5b8]" />
          </div>
          <div className="text-2xl font-semibold">{activeRentals}</div>
          <p className="text-xs text-black/60 dark:text-white/60 mt-1">Currently out</p>
        </div>

        <div className="border border-black/10 dark:border-white/10 rounded-xl p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-black/60 dark:text-white/60">Total Orders</span>
            <ShoppingBag className="h-4 w-4 text-[#00b5b8]" />
          </div>
          <div className="text-2xl font-semibold">{orderCount}</div>
          <p className="text-xs text-black/60 dark:text-white/60 mt-1">All time</p>
        </div>

        <div className="border border-black/10 dark:border-white/10 rounded-xl p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-black/60 dark:text-white/60">Low Stock Items</span>
            <Box className="h-4 w-4 text-orange-500" />
          </div>
          <div className="text-2xl font-semibold">{lowStockProducts}</div>
          <p className="text-xs text-black/60 dark:text-white/60 mt-1">Need restock</p>
        </div>

        <div className="border border-black/10 dark:border-white/10 rounded-xl p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-black/60 dark:text-white/60">Customers</span>
            <Users className="h-4 w-4 text-[#00b5b8]" />
          </div>
          <div className="text-2xl font-semibold">{userCount}</div>
          <p className="text-xs text-black/60 dark:text-white/60 mt-1">Registered</p>
        </div>
      </div>

      {/* Product Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <div className="border border-black/10 dark:border-white/10 rounded-xl p-6">
          <h2 className="text-lg font-semibold mb-4">Product Inventory</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-[#00b5b8] rounded-full" />
                <span className="text-sm">Rental Equipment</span>
              </div>
              <span className="font-semibold">{rentalProducts}</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-green-500 rounded-full" />
                <span className="text-sm">Accessories</span>
              </div>
              <span className="font-semibold">{accessoryProducts}</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-purple-500 rounded-full" />
                <span className="text-sm">Packages</span>
              </div>
              <span className="font-semibold">{packageCount}</span>
            </div>
          </div>
        </div>

        <div className="border border-black/10 dark:border-white/10 rounded-xl p-6">
          <h2 className="text-lg font-semibold mb-4">Quick Stats</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-black/60 dark:text-white/60">Avg Order Value</span>
              <span className="font-semibold">$125.00</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-black/60 dark:text-white/60">Rental Duration</span>
              <span className="font-semibold">3.5 days</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-black/60 dark:text-white/60">Return Rate</span>
              <span className="font-semibold">98%</span>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="mb-8">
        <h2 className="text-lg font-semibold mb-4">Quick Actions</h2>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <Link
            href="/admin/products/new"
            className="border border-black/10 dark:border-white/10 rounded-xl p-4 hover:shadow-sm transition-shadow text-center"
          >
            <Box className="h-6 w-6 mx-auto mb-2 text-[#00b5b8]" />
            <p className="text-sm font-medium">Add Product</p>
          </Link>
          <Link
            href="/admin/packages/new"
            className="border border-black/10 dark:border-white/10 rounded-xl p-4 hover:shadow-sm transition-shadow text-center"
          >
            <Package className="h-6 w-6 mx-auto mb-2 text-[#00b5b8]" />
            <p className="text-sm font-medium">Create Package</p>
          </Link>
          <Link
            href="/admin/inventory"
            className="border border-black/10 dark:border-white/10 rounded-xl p-4 hover:shadow-sm transition-shadow text-center"
          >
            <Calendar className="h-6 w-6 mx-auto mb-2 text-[#00b5b8]" />
            <p className="text-sm font-medium">Check Inventory</p>
          </Link>
          <Link
            href="/admin/orders"
            className="border border-black/10 dark:border-white/10 rounded-xl p-4 hover:shadow-sm transition-shadow text-center"
          >
            <ShoppingBag className="h-6 w-6 mx-auto mb-2 text-[#00b5b8]" />
            <p className="text-sm font-medium">View Orders</p>
          </Link>
        </div>
      </div>

      {/* Recent Orders */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold">Recent Orders</h2>
          <Link href="/admin/orders" className="text-sm text-[#00b5b8] hover:text-[#009a9d]">
            View all →
          </Link>
        </div>
        <div className="border border-black/10 dark:border-white/10 rounded-xl overflow-hidden">
          {recentOrders.length > 0 ? (
            <table className="w-full">
              <thead className="border-b border-black/10 dark:border-white/10">
                <tr>
                  <th className="text-left p-4 text-sm font-medium text-black/60 dark:text-white/60">Order</th>
                  <th className="text-left p-4 text-sm font-medium text-black/60 dark:text-white/60">Customer</th>
                  <th className="text-left p-4 text-sm font-medium text-black/60 dark:text-white/60">Status</th>
                  <th className="text-left p-4 text-sm font-medium text-black/60 dark:text-white/60">Type</th>
                  <th className="text-left p-4 text-sm font-medium text-black/60 dark:text-white/60">Date</th>
                </tr>
              </thead>
              <tbody>
                {recentOrders.map((order, index) => (
                  <tr 
                    key={order.id} 
                    className={`${
                      index < recentOrders.length - 1 ? 'border-b border-black/5 dark:border-white/5' : ''
                    } hover:bg-black/5 dark:hover:bg-white/5 transition-colors`}
                  >
                    <td className="p-4">
                      <span className="text-sm font-mono">#{order.id.slice(0, 8)}</span>
                    </td>
                    <td className="p-4">
                      <span className="text-sm">{order.user?.name || order.user?.email || "Guest"}</span>
                    </td>
                    <td className="p-4">
                      <span className={`inline-flex px-2 py-0.5 rounded text-xs font-medium ${
                        order.status === "COMPLETED" 
                          ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400" 
                          : order.status === "PENDING" 
                          ? "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400"
                          : "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-400"
                      }`}>
                        {order.status.toLowerCase()}
                      </span>
                    </td>
                    <td className="p-4">
                      <span className="text-sm capitalize">{order.type.toLowerCase()}</span>
                    </td>
                    <td className="p-4">
                      <span className="text-sm text-black/60 dark:text-white/60">
                        {new Date(order.createdAt).toLocaleDateString('en-US', { 
                          month: 'short', 
                          day: 'numeric',
                          year: 'numeric'
                        })}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className="p-8 text-center">
              <ShoppingBag className="h-12 w-12 text-black/20 dark:text-white/20 mx-auto mb-3" />
              <p className="text-sm text-black/60 dark:text-white/60">No orders yet</p>
              <p className="text-xs text-black/40 dark:text-white/40 mt-1">Orders will appear here once customers start renting</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
