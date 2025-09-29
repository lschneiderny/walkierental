import prisma from "@/lib/prisma";

export default async function AdminPackages() {
  const pkgs = await prisma.package.findMany({ include: { items: true }, orderBy: { createdAt: "desc" } });
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold">Packages</h1>
        <a href="/admin/packages/new" className="rounded bg-black text-white dark:bg-white dark:text-black px-3 py-2 text-sm">New Package</a>
      </div>
      <table className="w-full text-sm border border-black/10 dark:border-white/10 rounded">
        <thead className="bg-black/5 dark:bg-white/10">
          <tr>
            <th className="text-left p-2">Name</th>
            <th className="text-left p-2">Items</th>
            <th className="text-left p-2">Daily Rate</th>
          </tr>
        </thead>
        <tbody>
          {pkgs.map((pkg) => (
            <tr key={pkg.id} className="border-t border-black/10 dark:border-white/10">
              <td className="p-2">{pkg.name}</td>
              <td className="p-2">{pkg.items.length}</td>
              <td className="p-2">${String(pkg.dailyRate)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
