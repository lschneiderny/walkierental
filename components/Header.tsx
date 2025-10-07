"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import CartButton from "./CartButton";
import Image from 'next/image'

export default function Header() {
  const [opacity, setOpacity] = useState(1);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isAtTop, setIsAtTop] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const viewportHeight = window.innerHeight;
      const scrollDistance = viewportHeight / 8;
      const scrollDelta = currentScrollY - lastScrollY;
      
      setIsAtTop(currentScrollY <= 10);
      
      setOpacity((prev) => {
        if (scrollDelta > 0) {
          const change = Math.abs(scrollDelta) / scrollDistance;
          return Math.max(0, prev - change);
        } else if (scrollDelta < 0) {
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
      className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-300 overflow-visible ${
        isAtTop 
          ? 'bg-transparent border-transparent' 
          : 'bg-[color:var(--background)]/95 backdrop-blur-md'
      }`}
      style={{ opacity }}
    >
      <div className="mx-auto max-w-7xl mt-0 px-1">
        <div className="flex items-center justify-between h-16 relative">
          {/* Left Section - Logo and Branding */}
          <div className="flex items-center gap-5">
            <Link href="/" className="flex items-center hover:opacity-80 transition-opacity mt-3">
              <Image 
                src="https://7eeuu4wend.ufs.sh/f/hytIev0arWPe7HYbKt58nlvh0qWXKtCLQzmT6w239gbfxkoF" 
                width={80}
                height={80}
                alt="WalkieRentals logo"
                className="h-20 w-auto relative z-10"
              />
            </Link>
            
            <div className="hidden lg:flex flex-col gap-1 mt-0">
              <h1 className="text-xl font-bold leading-none text-[color:var(--primary)]">
                WalkieRental
              </h1>
              <div className="text-xs leading-none text-black/60 dark:text-white/60">
                Call: <span className="font-semibold">212-555-5555</span>
              </div>
            </div>
          </div>

          {/* Right Section - Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            <Link 
              href="/" 
              className="px-5 py-2.5 rounded-lg text-base font-semibold hover:bg-black/5 dark:hover:bg-white/10 hover:text-[color:var(--primary)] transition-all duration-200"
            >
              Home
            </Link>
            <Link 
              href="/packages" 
              className="px-5 py-2.5 rounded-lg text-base font-semibold hover:bg-black/5 dark:hover:bg-white/10 hover:text-[color:var(--primary)] transition-all duration-200"
            >
              Packages
            </Link>
            <a 
              href="https://www.gothamsound.com/walkies" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="px-5 py-2.5 rounded-lg text-base font-semibold hover:bg-black/5 dark:hover:bg-white/10 hover:text-[color:var(--primary)] transition-all duration-200 flex items-center gap-2"
            >
              Accessories
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>
            <Link 
              href="/about" 
              className="px-5 py-2.5 rounded-lg text-base font-semibold hover:bg-black/5 dark:hover:bg-white/10 hover:text-[color:var(--primary)] transition-all duration-200"
            >
              About
            </Link>
            <Link 
              href="/contact" 
              className="px-5 py-2.5 rounded-lg text-base font-semibold hover:bg-black/5 dark:hover:bg-white/10 hover:text-[color:var(--primary)] transition-all duration-200"
            >
              Contact
            </Link>
            
            {/* Divider */}
            <div className="h-6 w-px bg-black/10 dark:bg-white/10 mx-2"></div>
            
            <CartButton />
          </nav>

          {/* Mobile menu button */}
          <button className="md:hidden p-2 rounded-lg hover:bg-black/5 dark:hover:bg-white/10 transition-colors">
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
}