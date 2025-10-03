import Link from "next/link";
import { Package, Settings, Zap, Headphones, CheckCircle, ArrowRight } from "lucide-react";

export default function Home() {
  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-800 dark:to-gray-900 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Professional Walkie-Talkie <span className="text-[color:var(--primary)]">Rental Packages</span>
            </h1>
            <p className="text-lg md:text-xl text-black/70 dark:text-white/70 mb-8">
              Turnkey communication solutions for events, productions, and corporate needs. Pre-programmed, delivered fast, and backed by expert support.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href="/packages" 
                className="inline-flex items-center justify-center gap-2 bg-[color:var(--primary)] hover:bg-[color:var(--primary-hover)] text-white px-8 py-4 rounded-lg text-lg font-semibold transition-colors"
              >
                View Packages
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link 
                href="/quote" 
                className="inline-flex items-center justify-center gap-2 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 border-2 border-[color:var(--primary)] text-[color:var(--primary)] px-8 py-4 rounded-lg text-lg font-semibold transition-colors"
              >
                Request Quote
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* How We Deliver Excellence */}
      <section className="py-16 bg-white dark:bg-gray-900">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">How We Deliver Excellence</h2>
            <p className="text-lg text-black/60 dark:text-white/60 max-w-2xl mx-auto">
              Our team of communication engineers ensures your rental experience is seamless from quote to return.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 dark:bg-blue-900/30 rounded-full mb-4">
                <Package className="w-8 h-8 text-[color:var(--primary)]" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Large Selection</h3>
              <p className="text-black/60 dark:text-white/60">
                Extensive inventory of professional-grade walkie-talkies and complete communication packages.
              </p>
            </div>
            
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full mb-4">
                <Settings className="w-8 h-8 text-green-600 dark:text-green-400" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Pre-Programming</h3>
              <p className="text-black/60 dark:text-white/60">
                Turnkey solutions ready to use on arrival. Our engineers pre-configure your equipment to your specifications.
              </p>
            </div>
            
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-orange-100 dark:bg-orange-900/30 rounded-full mb-4">
                <Zap className="w-8 h-8 text-orange-600 dark:text-orange-400" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Fast Delivery</h3>
              <p className="text-black/60 dark:text-white/60">
                Our logistics team ensures your equipment arrives when you need it, fully prepared and tested.
              </p>
            </div>
            
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-purple-100 dark:bg-purple-900/30 rounded-full mb-4">
                <Headphones className="w-8 h-8 text-purple-600 dark:text-purple-400" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Expert Support</h3>
              <p className="text-black/60 dark:text-white/60">
                Communication engineers available to answer questions and provide technical consultation.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Simple Process */}
      <section className="py-16 bg-gray-50 dark:bg-gray-800">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Simple Rental Process</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="relative">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-[color:var(--primary)] text-white font-bold text-xl flex items-center justify-center rounded-full">
                  1
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-lg mb-2">Review & Submit Quote</h3>
                  <p className="text-sm text-black/60 dark:text-white/60">
                    Browse packages or submit your specific communication needs. Get a firm quotation within hours.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="relative">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-[color:var(--primary)] text-white font-bold text-xl flex items-center justify-center rounded-full">
                  2
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-lg mb-2">We Prepare & Program</h3>
                  <p className="text-sm text-black/60 dark:text-white/60">
                    Our logistics and engineering team prepares your rental, pre-programmed and tested for immediate use.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="relative">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-[color:var(--primary)] text-white font-bold text-xl flex items-center justify-center rounded-full">
                  3
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-lg mb-2">Fast Delivery & Return</h3>
                  <p className="text-sm text-black/60 dark:text-white/60">
                    Receive your equipment on time. Use it for your event. Return it hassle-free when done.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Use Cases */}
      <section className="py-16 bg-white dark:bg-gray-900">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Trusted By</h2>
            <p className="text-lg text-black/60 dark:text-white/60">
              Professional communication solutions for diverse industries
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: "Sports Events", desc: "Coordinate teams and staff seamlessly" },
              { title: "Film & TV Production", desc: "Crystal-clear communication on set" },
              { title: "Corporate Events", desc: "Professional coordination for meetings" },
              { title: "Entertainment", desc: "Reliable comms for concerts and festivals" }
            ].map((useCase, i) => (
              <div key={i} className="border border-black/10 dark:border-white/10 rounded-xl p-6 hover:shadow-lg transition-shadow">
                <CheckCircle className="w-8 h-8 text-[color:var(--primary)] mb-3" />
                <h3 className="font-semibold text-lg mb-2">{useCase.title}</h3>
                <p className="text-sm text-black/60 dark:text-white/60">{useCase.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-[color:var(--primary)] to-blue-600">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Need Help Choosing the Right Package?
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Our team of communication engineers is ready to help you find the perfect solution for your needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/quote" 
              className="inline-flex items-center justify-center gap-2 bg-white hover:bg-gray-100 text-[color:var(--primary)] px-8 py-4 rounded-lg text-lg font-semibold transition-colors"
            >
              Request a Quote
            </Link>
            <Link 
              href="/contact" 
              className="inline-flex items-center justify-center gap-2 bg-transparent hover:bg-white/10 border-2 border-white text-white px-8 py-4 rounded-lg text-lg font-semibold transition-colors"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
