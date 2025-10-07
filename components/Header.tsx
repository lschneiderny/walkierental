"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import CartButton from "./CartButton";

export default function Header() {
    const [opacity, setOpacity] = useState(1);
    const [lastScrollY, setLastScrollY] = useState(0);
    const [isAtTop, setIsAtTop] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const viewportHeight = window.innerHeight;
      const scrollDistance = viewportHeight / 8; // Distance for full opacity change
      const scrollDelta = currentScrollY - lastScrollY;
      
      // Check if at top of page
      setIsAtTop(currentScrollY <= 10);
      
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
      className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-300 ${
        isAtTop 
          ? 'bg-transparent border-b border-transparent' 
          : 'bg-[color:var(--background)]/95 backdrop-blur-md border-b border-black/10 dark:border-white/10'
      }`}
      style={{ opacity }}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between py-2">
          {/* Left Section - Logo and Branding */}
          <div className="flex items-center gap-4">
            <Link href="/" className="flex items-center hover:opacity-80 transition-opacity relative z-10">
              <img 
                src="https://7eeuu4wend.ufs.sh/f/hytIev0arWPe7HYbKt58nlvh0qWXKtCLQzmT6w239gbfxkoF" 
                alt="WalkieRentals" 
                className="h-20 w-auto -my-2"
              />
            </Link>
            
            <div className="hidden lg:flex flex-col">
              <h1 className="text-xl font-bold text-[color:var(--primary)]">
                WalkieRental
              </h1>
              <div className="text-xs text-black/60 dark:text-white/60">
                Call: <span className="font-semibold">212-555-5555</span>
              </div>
            </div>
          </div>

          {/* Right Section - Navigation */}
          <nav className="hidden md:flex items-center gap-2">
            <Link 
              href="/packages" 
              className="px-4 py-2 rounded-lg text-sm font-semibold hover:bg-black/5 dark:hover:bg-white/10 hover:text-[color:var(--primary)] transition-all duration-200"
            >
              Packages
            </Link>
            <a 
              href="https://www.gothamsound.com/walkies" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="px-4 py-2 rounded-lg text-sm font-semibold hover:bg-black/5 dark:hover:bg-white/10 hover:text-[color:var(--primary)] transition-all duration-200 flex items-center gap-1"
            >
              Accessories
              <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>
            <Link 
              href="/about" 
              className="px-4 py-2 rounded-lg text-sm font-semibold hover:bg-black/5 dark:hover:bg-white/10 hover:text-[color:var(--primary)] transition-all duration-200"
            >
              About
            </Link>
            <Link 
              href="/contact" 
              className="px-4 py-2 rounded-lg text-sm font-semibold hover:bg-black/5 dark:hover:bg-white/10 hover:text-[color:var(--primary)] transition-all duration-200"
            >
              Contact
            </Link>
            
            {/* Divider */}
            <div className="h-6 w-px bg-black/10 dark:bg-white/10 mx-1"></div>
            
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