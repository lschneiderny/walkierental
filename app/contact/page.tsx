import { Mail, Phone, MapPin, Clock, MessageSquare } from "lucide-react";
import Link from "next/link";

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Hero */}
      <section className="bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-800 dark:to-gray-900 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Get in <span className="text-[color:var(--primary)]">Touch</span>
            </h1>
            <p className="text-lg text-black/70 dark:text-white/70">
              Have questions? Our team of communication engineers is here to help you find the perfect solution.
            </p>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div>
            <h2 className="text-2xl font-bold mb-6">Contact Information</h2>
            
            <div className="space-y-6 mb-8">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center">
                  <Phone className="w-6 h-6 text-[color:var(--primary)]" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Phone</h3>
                  <p className="text-black/60 dark:text-white/60">(555) 123-4567</p>
                  <p className="text-sm text-black/50 dark:text-white/50">Mon-Fri 8am-6pm PST</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                  <Mail className="w-6 h-6 text-green-600 dark:text-green-400" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Email</h3>
                  <p className="text-black/60 dark:text-white/60">info@walkierentals.com</p>
                  <p className="text-sm text-black/50 dark:text-white/50">We respond within hours</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-orange-100 dark:bg-orange-900/30 rounded-full flex items-center justify-center">
                  <MapPin className="w-6 h-6 text-orange-600 dark:text-orange-400" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Location</h3>
                  <p className="text-black/60 dark:text-white/60">123 Radio Way</p>
                  <p className="text-black/60 dark:text-white/60">Los Angeles, CA 90028</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center">
                  <Clock className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Business Hours</h3>
                  <p className="text-black/60 dark:text-white/60">Monday - Friday: 8am - 6pm</p>
                  <p className="text-black/60 dark:text-white/60">Saturday: 9am - 3pm</p>
                  <p className="text-black/60 dark:text-white/60">Sunday: Closed</p>
                </div>
              </div>
            </div>

            {/* Quick Links */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-black/10 dark:border-white/10">
              <h3 className="font-semibold mb-4 flex items-center gap-2">
                <MessageSquare className="w-5 h-5 text-[color:var(--primary)]" />
                Need Immediate Help?
              </h3>
              <div className="space-y-3">
                <Link 
                  href="/quote"
                  className="block w-full text-center bg-[color:var(--primary)] hover:bg-[color:var(--primary-hover)] text-white px-4 py-3 rounded-lg font-semibold transition-colors"
                >
                  Request a Quote
                </Link>
                <Link 
                  href="/packages"
                  className="block w-full text-center border-2 border-[color:var(--primary)] text-[color:var(--primary)] hover:bg-[color:var(--primary)] hover:text-white px-4 py-3 rounded-lg font-semibold transition-colors"
                >
                  View Packages
                </Link>
              </div>
            </div>
          </div>

          {/* FAQ Section */}
          <div>
            <h2 className="text-2xl font-bold mb-6">Frequently Asked Questions</h2>
            
            <div className="space-y-4">
              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-black/10 dark:border-white/10">
                <h3 className="font-semibold mb-2">How quickly can I get equipment?</h3>
                <p className="text-sm text-black/60 dark:text-white/60">
                  Our logistics team can typically deliver equipment within 24-48 hours. Express delivery options are available for urgent needs.
                </p>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-black/10 dark:border-white/10">
                <h3 className="font-semibold mb-2">Do you pre-program the equipment?</h3>
                <p className="text-sm text-black/60 dark:text-white/60">
                  Yes! Our engineering team can pre-program all equipment to your specifications, providing a true turnkey solution. Just let us know your requirements when requesting a quote.
                </p>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-black/10 dark:border-white/10">
                <h3 className="font-semibold mb-2">What if I need more units than listed?</h3>
                <p className="text-sm text-black/60 dark:text-white/60">
                  We maintain extensive inventory and can accommodate large orders. Contact our team to discuss your specific requirements and we'll create a custom solution.
                </p>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-black/10 dark:border-white/10">
                <h3 className="font-semibold mb-2">What's your coverage area?</h3>
                <p className="text-sm text-black/60 dark:text-white/60">
                  We ship nationwide and can accommodate international orders. Delivery times vary by location.
                </p>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-black/10 dark:border-white/10">
                <h3 className="font-semibold mb-2">Do you provide technical support?</h3>
                <p className="text-sm text-black/60 dark:text-white/60">
                  Absolutely. Our communication engineers are available to answer questions and provide technical consultation throughout your rental period.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
