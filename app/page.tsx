import Link from "next/link";
import HeroCarousel from "@/components/HeroCarousel";

export default function Home() {
  return (
    <div>
      {/* Hero Carousel */}
      <HeroCarousel />
      
      {/* Main content */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* How it works section */}
        <section className="py-16">
          <h2 className="text-xl font-medium mb-4">How it works</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {[{n:1,t:"SHOP",d:"Browse our exhaustive inventory until you find the perfect gear."},{n:2,t:"SHIP YOUR ITEMS",d:"We'll ship your order to arrive on the day you ask to receive it."},{n:3,t:"SHOOT",d:"Go out and get some great shots during your rental period."},{n:4,t:"RETURN",d:"Return the equipment in the same box on the day your rental ends."}].map(step => (
            <div key={step.n} className="relative">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-[#00b5b8] dark:bg-[#00c9cc] text-white font-bold text-xl flex items-center justify-center" style={{clipPath: 'polygon(0 0, 85% 0, 100% 50%, 85% 100%, 0 100%)'}}>
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

        {/* Featured products section */}
        <section className="py-16 border-t border-black/10 dark:border-white/10">
          <h2 className="text-xl font-medium mb-4">Featured products</h2>
        {/* Simple static showcase; swap to dynamic if you flag products as featured */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
            <div className="aspect-[4/3] bg-gray-100 dark:bg-gray-700" />
            <div className="p-4">
              <button className="w-full bg-[#5cb85c] hover:bg-[#4cae4c] text-white px-4 py-2 rounded text-xs font-semibold uppercase tracking-wide transition-colors mb-3">Add to Cart</button>
              <p className="font-medium text-sm">Event 10-Pack</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">$180.00 for 7 days</p>
            </div>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
            <div className="aspect-[4/3] bg-gray-100 dark:bg-gray-700" />
            <div className="p-4">
              <button className="w-full bg-[#5cb85c] hover:bg-[#4cae4c] text-white px-4 py-2 rounded text-xs font-semibold uppercase tracking-wide transition-colors mb-3">Add to Cart</button>
              <p className="font-medium text-sm">Kenwood TK-3402U</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">$17.00 for 7 days</p>
            </div>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
            <div className="aspect-[4/3] bg-gray-100 dark:bg-gray-700" />
            <div className="p-4">
              <button className="w-full bg-[#5cb85c] hover:bg-[#4cae4c] text-white px-4 py-2 rounded text-xs font-semibold uppercase tracking-wide transition-colors mb-3">Add to Cart</button>
              <p className="font-medium text-sm">Motorola CP200d</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">$19.00 for 7 days</p>
            </div>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
            <div className="aspect-[4/3] bg-gray-100 dark:bg-gray-700" />
            <div className="p-4">
              <button className="w-full bg-[#5cb85c] hover:bg-[#4cae4c] text-white px-4 py-2 rounded text-xs font-semibold uppercase tracking-wide transition-colors mb-3">Add to Cart</button>
              <p className="font-medium text-sm">Acoustic Earpiece</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">$24.00 each</p>
            </div>
          </div>
        </div>
        </section>
      </div>
    </div>
  );
}
