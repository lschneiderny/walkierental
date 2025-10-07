"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import CartButton from "./CartButton";

export default function Header() {
    const [opacity, setOpacity] = useState(1);
    const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const viewportHeight = window.innerHeight;
      const scrollDistance = viewportHeight / 8; // Distance for full opacity change
      const scrollDelta = currentScrollY - lastScrollY;
      
      setOpacity((prev) => {
        if (scrollDelta > 0) {
          // Scrolling down - decrease opacity
          const change = Math.abs(scrollDelta) / scrollDistance;
          return Math.max(0, prev - change);
        } else if (scrollDelta < 0) {
          // Scrolling up - increase opacity
          const change = Math.abs(scrollDelta) / scrollDistance;
          return Math.min(1, prev + change);
        }
        return prev;
      });

      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 bg-[color:var(--background)]/95 backdrop-blur-md border-b border-black/10 dark:border-white/10"
      style={{ opacity }}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center hover:opacity-80 transition-opacity">
            <img 
              src="https://7eeuu4wend.ufs.sh/f/hytIev0arWPe7HYbKt58nlvh0qWXKtCLQzmT6w239gbfxkoF" 
              alt="WalkieRentals" 
              className="h-10 w-auto"
            />
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            <Link href="/rentals" className="px-3 py-2 rounded-md text-sm font-medium hover:bg-black/5 dark:hover:bg-white/10 transition-colors">
              Rentals
            </Link>
            <Link href="/packages" className="px-3 py-2 rounded-md text-sm font-medium hover:bg-black/5 dark:hover:bg-white/10 transition-colors">
              Packages
            </Link>
            <Link href="/accessories" className="px-3 py-2 rounded-md text-sm font-medium hover:bg-black/5 dark:hover:bg-white/10 transition-colors">
              Accessories
            </Link>
            <Link href="/about" className="px-3 py-2 rounded-md text-sm font-medium hover:bg-black/5 dark:hover:bg-white/10 transition-colors">
              About
            </Link>
            <Link href="/contact" className="px-3 py-2 rounded-md text-sm font-medium hover:bg-black/5 dark:hover:bg-white/10 transition-colors">
              Contact
            </Link>
            <CartButton />
          </nav>

          {/* Mobile menu button */}
          <button className="md:hidden p-2 rounded-md hover:bg-black/5 dark:hover:bg-white/10 transition-colors">
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
}