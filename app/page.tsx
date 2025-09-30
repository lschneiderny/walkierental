import Link from "next/link";
import HeroCarousel from "@/components/HeroCarousel";

export default function Home() {
  return (
    <div>
      {/* Hero Carousel */}
      <HeroCarousel />
      
      {/* Main content */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
      <section className="mt-16">
        <h2 className="text-xl font-medium mb-4">How it works</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {[{n:1,t:"Shop",d:"Browse our inventory to find the perfect radios."},{n:2,t:"Ship",d:"We deliver to arrive on your chosen date."},{n:3,t:"Use",d:"Shoot or run your event during the rental period."},{n:4,t:"Return",d:"Send equipment back on the final day."}].map(step => (
            <div key={step.n} className="rounded-lg border border-black/10 dark:border-white/10 p-4">
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
          <div className="border border-black/10 dark:border-white/10 rounded-lg p-4">
            <div className="aspect-[4/3] bg-black/5 dark:bg-white/10 rounded mb-3" />
            <p className="font-medium">Event 10-Pack</p>
            <p className="text-sm text-black/60 dark:text-white/60">Bundle of 10 radios with a discount</p>
          </div>
          <div className="border border-black/10 dark:border-white/10 rounded-lg p-4">
            <div className="aspect-[4/3] bg-black/5 dark:bg-white/10 rounded mb-3" />
            <p className="font-medium">Kenwood Radio</p>
            <p className="text-sm text-black/60 dark:text-white/60">Reliable comms for crews</p>
          </div>
          <div className="border border-black/10 dark:border-white/10 rounded-lg p-4">
            <div className="aspect-[4/3] bg-black/5 dark:bg-white/10 rounded mb-3" />
            <p className="font-medium">Acoustic Tube Earpiece</p>
            <p className="text-sm text-black/60 dark:text-white/60">Comfortable clear audio</p>
          </div>
        </div>
      </section>
      </div>
    </div>
  );
}
