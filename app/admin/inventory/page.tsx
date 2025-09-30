import prisma from "@/lib/prisma";
import Link from "next/link";
import { Calendar, Package, AlertCircle, CheckCircle, Clock } from "lucide-react";

export default async function InventoryPage() {
  const products = await prisma.product.findMany({
    where: { type: "RENTAL" },
    include: {
      reservations: {
        where: {
          OR: [
            { startDate: { lte: new Date() }, endDate: { gte: new Date() } }, // Current
            { startDate: { gte: new Date() } }, // Future
          ],
        },
        orderBy: { startDate: "asc" },
      },
    },
  });

  const today = new Date();
  const nextWeek = new Date(today);
  nextWeek.setDate(today.getDate() + 7);

  // Calculate inventory metrics
  const totalInventory = products.reduce((sum, p) => sum + p.stock, 0);
  const availableNow = products.reduce((sum, p) => {
    const reserved = p.reservations.filter(
      r => r.startDate <= today && r.endDate >= today
    ).reduce((acc, r) => acc + r.quantity, 0);
    return sum + (p.stock - reserved);
  }, 0);

  const lowStockItems = products.filter(p => p.stock < 5).length;
  const outOfStock = products.filter(p => p.stock === 0).length;

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-semibold mb-2">Inventory Management</h1>
        <p className="text-sm text-black/60 dark:text-white/60">Track equipment availability and upcoming reservations</p>
      </div>

      {/* Inventory Overview */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="border border-black/10 dark:border-white/10 rounded-xl p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-black/60 dark:text-white/60">Total Units</span>
            <Package className="h-4 w-4 text-[#00b5b8]" />
          </div>
          <div className="text-2xl font-semibold">{totalInventory}</div>
          <p className="text-xs text-black/60 dark:text-white/60 mt-1">Across all products</p>
        </div>

        <div className="border border-black/10 dark:border-white/10 rounded-xl p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-black/60 dark:text-white/60">Available Now</span>
            <CheckCircle className="h-4 w-4 text-green-500" />
          </div>
          <div className="text-2xl font-semibold">{availableNow}</div>
          <p className="text-xs text-black/60 dark:text-white/60 mt-1">Ready to rent</p>
        </div>

        <div className="border border-black/10 dark:border-white/10 rounded-xl p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-black/60 dark:text-white/60">Low Stock</span>
            <AlertCircle className="h-4 w-4 text-orange-500" />
          </div>
          <div className="text-2xl font-semibold">{lowStockItems}</div>
          <p className="text-xs text-black/60 dark:text-white/60 mt-1">Items below 5 units</p>
        </div>

        <div className="border border-black/10 dark:border-white/10 rounded-xl p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-black/60 dark:text-white/60">Out of Stock</span>
            <AlertCircle className="h-4 w-4 text-red-500" />
          </div>
          <div className="text-2xl font-semibold">{outOfStock}</div>
          <p className="text-xs text-black/60 dark:text-white/60 mt-1">Need immediate restock</p>
        </div>
      </div>

      {/* Inventory Table */}
      <div className="border border-black/10 dark:border-white/10 rounded-xl overflow-hidden">
        <div className="p-4 border-b border-black/10 dark:border-white/10">
          <h2 className="text-lg font-semibold">Rental Equipment Status</h2>
        </div>
        <table className="w-full">
          <thead className="border-b border-black/10 dark:border-white/10">
            <tr>
              <th className="text-left p-4 text-sm font-medium text-black/60 dark:text-white/60">Product</th>
              <th className="text-left p-4 text-sm font-medium text-black/60 dark:text-white/60">Total Stock</th>
              <th className="text-left p-4 text-sm font-medium text-black/60 dark:text-white/60">Available</th>
              <th className="text-left p-4 text-sm font-medium text-black/60 dark:text-white/60">Reserved</th>
              <th className="text-left p-4 text-sm font-medium text-black/60 dark:text-white/60">Next Return</th>
              <th className="text-left p-4 text-sm font-medium text-black/60 dark:text-white/60">Status</th>
              <th className="text-right p-4 text-sm font-medium text-black/60 dark:text-white/60">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => {
              const currentReservations = product.reservations.filter(
                r => r.startDate <= today && r.endDate >= today
              );
              const reservedNow = currentReservations.reduce((acc, r) => acc + r.quantity, 0);
              const available = product.stock - reservedNow;
              
              const nextReturn = currentReservations
                .sort((a, b) => a.endDate.getTime() - b.endDate.getTime())[0]?.endDate;

              const futureReservations = product.reservations.filter(
                r => r.startDate > today
              );

              return (
                <tr key={product.id} className="border-b border-black/5 dark:border-white/5 hover:bg-black/5 dark:hover:bg-white/5 transition-colors">
                  <td className="p-4">
                    <div>
                      <p className="font-medium">{product.name}</p>
                      <p className="text-sm text-black/60 dark:text-white/60">SKU: {product.sku || "N/A"}</p>
                    </div>
                  </td>
                  <td className="p-4">
                    <span className="font-medium">{product.stock}</span>
                  </td>
                  <td className="p-4">
                    <span className={`font-medium ${available === 0 ? 'text-red-500' : available < 3 ? 'text-orange-500' : 'text-green-500'}`}>
                      {available}
                    </span>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      <span>{reservedNow}</span>
                      {futureReservations.length > 0 && (
                        <span className="text-xs text-black/40 dark:text-white/40">
                          (+{futureReservations.length} upcoming)
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="p-4">
                    {nextReturn ? (
                      <span className="text-sm">
                        {nextReturn.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                      </span>
                    ) : (
                      <span className="text-sm text-black/40 dark:text-white/40">-</span>
                    )}
                  </td>
                  <td className="p-4">
                    <span className={`inline-flex px-2 py-0.5 rounded text-xs font-medium ${
                      product.stock === 0 
                        ? "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"
                        : available === 0 
                        ? "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400"
                        : product.stock < 5 
                        ? "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400"
                        : "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                    }`}>
                      {product.stock === 0 ? "Out of Stock" : available === 0 ? "All Reserved" : product.stock < 5 ? "Low Stock" : "In Stock"}
                    </span>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center justify-end gap-2">
                      <button className="text-sm text-[#00b5b8] hover:text-[#009a9d]">
                        View Details
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        {products.length === 0 && (
          <div className="p-8 text-center">
            <Package className="h-12 w-12 text-black/20 dark:text-white/20 mx-auto mb-3" />
            <p className="text-sm text-black/60 dark:text-white/60">No rental products in inventory</p>
            <Link href="/admin/products/new" className="text-sm text-[#00b5b8] hover:text-[#009a9d] mt-2 inline-block">
              Add your first product →
            </Link>
          </div>
        )}
      </div>

      {/* Upcoming Reservations */}
      <div className="mt-8">
        <h2 className="text-lg font-semibold mb-4">Upcoming Reservations</h2>
        <div className="border border-black/10 dark:border-white/10 rounded-xl overflow-hidden">
          <div className="divide-y divide-black/10 dark:divide-white/10">
            {products.flatMap(product => 
              product.reservations
                .filter(r => r.startDate > today && r.startDate <= nextWeek)
                .map(reservation => ({
                  ...reservation,
                  productName: product.name,
                }))
            )
            .sort((a, b) => a.startDate.getTime() - b.startDate.getTime())
            .slice(0, 5)
            .map((reservation) => (
              <div key={reservation.id} className="p-4 hover:bg-black/5 dark:hover:bg-white/5 transition-colors">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">{reservation.productName}</p>
                    <p className="text-sm text-black/60 dark:text-white/60">
                      {reservation.quantity} units • {new Date(reservation.startDate).toLocaleDateString('en-US', { 
                        month: 'short', 
                        day: 'numeric' 
                      })} - {new Date(reservation.endDate).toLocaleDateString('en-US', { 
                        month: 'short', 
                        day: 'numeric' 
                      })}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-black/40 dark:text-white/40" />
                    <span className="text-sm text-black/60 dark:text-white/60">
                      {Math.ceil((reservation.startDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24))} days
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          {products.every(p => p.reservations.filter(r => r.startDate > today && r.startDate <= nextWeek).length === 0) && (
            <div className="p-8 text-center">
              <Calendar className="h-12 w-12 text-black/20 dark:text-white/20 mx-auto mb-3" />
              <p className="text-sm text-black/60 dark:text-white/60">No upcoming reservations this week</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}