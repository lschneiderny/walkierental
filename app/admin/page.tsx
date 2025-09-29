import Link from "next/link";

export default function AdminHome() {
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 space-y-6">
      <h1 className="text-2xl font-semibold">Admin Dashboard</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <Link href="/admin/products" className="border rounded p-4 hover:shadow-sm">Manage Products</Link>
        <Link href="/admin/packages" className="border rounded p-4 hover:shadow-sm">Manage Packages</Link>
      </div>
    </div>
  );
}
