"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { ChevronDown } from "lucide-react";

// A modern low-profile sleek header with scroll-based opacity
// Opacity decreases when scrolling down, increases when scrolling up
export default function Header() {
  const [mounted, setMounted] = useState(false);
  const [isRentalsOpen, setIsRentalsOpen] = useState(false);
  const [opacity, setOpacity] = useState(1);
  const [lastScrollY, setLastScrollY] = useState(0);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();
  
  // Track scroll direction and adjust opacity
  useMotionValueEvent(scrollY, "change", (latest) => {
    if (!mounted) return;
    
    const scrollDelta = latest - lastScrollY;
    const scrollDirection = scrollDelta > 0 ? "down" : "up";
    
    // Calculate opacity based on scroll direction
    if (scrollDirection === "down") {
      // Scrolling down: decrease opacity (min 0.3)
      const newOpacity = Math.max(0.3, opacity - Math.abs(scrollDelta) * 0.002);
      setOpacity(newOpacity);
    } else {
      // Scrolling up: increase opacity (max 1)
      const newOpacity = Math.min(1, opacity + Math.abs(scrollDelta) * 0.003);
      setOpacity(newOpacity);
    }
    
    setLastScrollY(latest);
  });
  
  useEffect(() => {
    setMounted(true);
  }, []);
  
  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsRentalsOpen(false);
      }
    }
    
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <motion.header
      className="fixed top-0 inset-x-0 z-50 h-14 border-b border-white/10 bg-gradient-to-r from-blue-600/95 via-indigo-600/95 to-purple-600/95 backdrop-blur-xl shadow-2xl"
      style={{ opacity: mounted ? opacity : 1 }}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-full">
        <div className="flex h-full items-center justify-between">
          {/* Logo */}
          <Link 
            href="/" 
            className="font-bold tracking-tight text-white text-base sm:text-lg hover:scale-105 transition-transform"
          >
            WalkieRentals
          </Link>

          {/* Navigation */}
          <nav className="flex items-center gap-1 sm:gap-2">
            <Link 
              href="/" 
              className="px-3 py-1.5 text-white/90 hover:text-white hover:bg-white/10 rounded-lg transition-all text-sm font-medium"
            >
              Home
            </Link>
            
            {/* Rentals Dropdown */}
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setIsRentalsOpen(!isRentalsOpen)}
                className="flex items-center gap-1 px-3 py-1.5 text-white/90 hover:text-white hover:bg-white/10 rounded-lg transition-all text-sm font-medium"
              >
                Rentals
                <ChevronDown 
                  className={`w-4 h-4 transition-transform duration-200 ${isRentalsOpen ? 'rotate-180' : ''}`} 
                />
              </button>
              
              {/* Dropdown Menu */}
              <motion.div
                initial={false}
                animate={{
                  opacity: isRentalsOpen ? 1 : 0,
                  y: isRentalsOpen ? 0 : -10,
                  pointerEvents: isRentalsOpen ? "auto" : "none"
                }}
                transition={{ duration: 0.2 }}
                className="absolute top-full right-0 mt-2 w-48 bg-white dark:bg-slate-800 rounded-xl shadow-2xl border border-slate-200 dark:border-slate-700 overflow-hidden"
              >
                <Link
                  href="/packages"
                  onClick={() => setIsRentalsOpen(false)}
                  className="block px-4 py-3 text-sm text-slate-700 dark:text-slate-200 hover:bg-blue-50 dark:hover:bg-slate-700 transition-colors font-medium"
                >
                  All Packages
                </Link>
                <Link
                  href="/placeholder"
                  onClick={() => setIsRentalsOpen(false)}
                  className="block px-4 py-3 text-sm text-slate-700 dark:text-slate-200 hover:bg-blue-50 dark:hover:bg-slate-700 transition-colors font-medium border-t border-slate-200 dark:border-slate-700"
                >
                  Placeholder
                </Link>
              </motion.div>
            </div>
            
            <Link 
              href="/quote" 
              className="px-4 py-1.5 bg-white text-blue-600 hover:bg-blue-50 rounded-lg transition-all text-sm font-semibold shadow-lg hover:shadow-xl ml-2"
            >
              View Quote
            </Link>
          </nav>
        </div>
      </div>
    </motion.header>
  );
}
