import Link from "next/link";

export default function Home() {
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight">Professional walkie talkie rentals for events and crews</h1>
          <p className="mt-4 text-black/70 dark:text-white/70">
            Rent reliable two-way radios and curated packages. Accessories are available for purchase. Fast turnaround, clean UX.
          </p>
          <div className="mt-6 flex gap-3">
            <Link href="/rentals" className="rounded bg-black text-white dark:bg-white dark:text-black px-4 py-2 text-sm">Browse rentals</Link>
            <Link href="/packages" className="rounded border border-black/10 dark:border-white/20 px-4 py-2 text-sm">View packages</Link>
          </div>
        </div>
        <div className="aspect-[4/3] bg-black/5 dark:bg-white/10 rounded" />
      </div>
      <section className="mt-16">
        <h2 className="text-xl font-medium mb-4">How it works</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {[{n:1,t:"Shop",d:"Browse our inventory to find the perfect radios."},{n:2,t:"Ship",d:"We deliver to arrive on your chosen date."},{n:3,t:"Use",d:"Shoot or run your event during the rental period."},{n:4,t:"Return",d:"Send equipment back on the final day."}].map(step => (
            <div key={step.n} className="rounded border border-black/10 dark:border-white/10 p-4">
              <div className="text-xs uppercase tracking-wide text-black/60 dark:text-white/60">{step.n}</div>
              <div className="font-medium">{step.t}</div>
              <div className="text-sm text-black/60 dark:text-white/60">{step.d}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-16">
        <h2 className="text-xl font-medium mb-4">Featured products</h2>
        {/* Simple static showcase; swap to dynamic if you flag products as featured */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="border rounded p-4">
            <div className="aspect-[4/3] bg-black/5 dark:bg-white/10 rounded mb-3" />
            <p className="font-medium">Event 10-Pack</p>
            <p className="text-sm text-black/60 dark:text-white/60">Bundle of 10 radios with a discount</p>
          </div>
          <div className="border rounded p-4">
            <div className="aspect-[4/3] bg-black/5 dark:bg-white/10 rounded mb-3" />
            <p className="font-medium">Kenwood Radio</p>
            <p className="text-sm text-black/60 dark:text-white/60">Reliable comms for crews</p>
          </div>
          <div className="border rounded p-4">
            <div className="aspect-[4/3] bg-black/5 dark:bg-white/10 rounded mb-3" />
            <p className="font-medium">Acoustic Tube Earpiece</p>
            <p className="text-sm text-black/60 dark:text-white/60">Comfortable clear audio</p>
          </div>
        </div>
      </section>
    </div>
  );
}
