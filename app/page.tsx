import Link from "next/link";
import prisma from "@/lib/prisma";
import HeroCarousel from "@/components/HeroCarousel";
import Accordian from "@/components/Accordian";

export default async function Home() {
  const packages = await prisma.package.findMany({
    orderBy: { createdAt: "desc" },
    take: 6,
  });

  return (
    <div className="pt-16">
      {/* Hero Carousel */}
      <HeroCarousel />

      {/* Main content */}
      <div className="mx-auto max-w-7xl px-1">

        {/* How it works */}
        <section className="py-16 border-t border-black/10 dark:border-white/10">
          <h2 className="text-3xl font-bold mb-8">How it works</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[{n:1,t:"SHOP",d:"Browse our exhaustive inventory until you find the perfect gear."},{n:2,t:"SHIP YOUR ITEMS",d:"We'll ship your order to arrive on the day you ask to receive it."},{n:3,t:"SHOOT",d:"Get great shots during your rental period."},{n:4,t:"RETURN",d:"Return gear in the same box on the rental end date."}].map(step => (
              <div key={step.n} className="relative">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-[color:var(--primary)] text-white font-bold text-xl flex items-center justify-center" style={{clipPath: 'polygon(0 0, 85% 0, 100% 50%, 85% 100%, 0 100%)'}}>
                    {step.n}
                  </div>
                  <div className="flex-1">
                    <div className="font-semibold text-sm uppercase tracking-wide mb-1">{step.t}</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">{step.d}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Popular Packages */}
        <section className="py-16">
          <div className="flex items-end justify-between mb-8">
            <h2 className="text-3xl font-bold">Popular packages</h2>
            <Link href="/packages" className="text-sm text-[color:var(--primary)] hover:text-[color:var(--primary-hover)]">View all →</Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {packages.map((pkg) => (
              <Link key={pkg.id} href={`/packages/${pkg.slug}`} className="group rounded-xl border border-black/10 dark:border-white/10 overflow-hidden hover:shadow-md transition-shadow">
                <div className="aspect-[4/3] bg-black/5 dark:bg-white/10" />
                <div className="p-5">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold group-hover:text-[color:var(--primary)] transition-colors">{pkg.name}</h3>
                    <span className="text-sm text-black/60 dark:text-white/60">${String(pkg.dailyRate)} / day</span>
                  </div>
                  {pkg.description && (
                    <p className="mt-2 text-sm text-black/60 dark:text-white/60 line-clamp-2">{pkg.description}</p>
                  )}
                </div>
              </Link>
            ))}
            {packages.length === 0 && (
              <div className="col-span-full rounded-xl border border-dashed border-black/10 dark:border-white/10 p-12 text-center text-black/60 dark:text-white/60">
                No packages yet. Check back soon!
              </div>
            )}
          </div>
        </section>

        {/* FAQ */}
        <section className="py-16 border-t border-black/10 dark:border-white/10">
          <h2 className="text-3xl font-bold mb-8">FAQ</h2>
          <Accordian
            items={[
              {
                q: "How far in advance should I book?",
                a: "We recommend at least 1–2 weeks in advance to guarantee availability."
              },
              {
                q: "Do you ship nationwide?",
                a: "Yes, we ship across the continental U.S. with reliable return labels included."
              },
              {
                q: "What happens if gear is damaged?",
                a: "Contact us immediately; we'll assess and advise next steps based on the situation."
              },
              {
                q: "Can I change my dates after booking?",
                a: "Date changes are possible depending on availability—reach out and we'll help."
              }
            ]}
          />
        </section>

        {/* CTA */}
        <section className="py-16 border-t border-black/10 dark:border-white/10">
          <div className="rounded-2xl bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-800 dark:to-gray-900 p-8 flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="text-2xl font-bold mb-1">Ready to plan your rental?</h3>
              <p className="text-sm text-black/70 dark:text-white/70">Browse curated packages or talk to our team for a fast quote.</p>
            </div>
            <div className="flex items-center gap-3">
              <Link href="/packages" className="px-5 py-3 rounded-lg bg-[color:var(--primary)] hover:bg-[color:var(--primary-hover)] text-white text-sm font-semibold transition-colors">View packages</Link>
              <Link href="/contact" className="px-5 py-3 rounded-lg border border-black/10 dark:border-white/10 text-sm font-semibold hover:bg-black/5 dark:hover:bg-white/5 transition-colors">Contact us</Link>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
