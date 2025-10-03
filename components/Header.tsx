"use client";

import Link from "next/link";
import { motion, useScroll, useTransform } from "motion/react";

// A modern fixed header whose opacity decreases when scrolling down
// and increases when scrolling up. Starts fully visible.
export default function Header() {
  const { scrollY } = useScroll();
  
  // Transform scrollY to opacity: starts at 1, fades to 0.25 over 320px
  const opacity = useTransform(
    scrollY,
    [0, 320],
    [1, 0.25]
  );

  return (
    <motion.header
      className="fixed top-0 inset-x-0 z-50 h-16 border-b border-black/5 dark:border-white/10 bg-white/80 dark:bg-neutral-900/80 backdrop-blur-md"
      style={{ opacity }}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-full">
        <div className="flex h-full items-center justify-between">
          <Link href="/" className="font-semibold tracking-tight text-neutral-900 dark:text-neutral-100">
            WalkieRentals
          </Link>

          <nav className="hidden md:flex items-center gap-6 text-sm">
            <Link href="/rentals" className="text-neutral-700 hover:text-neutral-900 dark:text-neutral-300 dark:hover:text-white transition-colors">
              Rentals
            </Link>
            <Link href="/packages" className="text-neutral-700 hover:text-neutral-900 dark:text-neutral-300 dark:hover:text-white transition-colors">
              Packages
            </Link>
            <Link href="/cart" className="text-neutral-700 hover:text-neutral-900 dark:text-neutral-300 dark:hover:text-white transition-colors">
              Cart
            </Link>
          </nav>
        </div>
      </div>
    </motion.header>
  );
}


