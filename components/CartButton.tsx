"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function CartButton() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const fetchCount = async () => {
      try {
        const res = await fetch("/api/cart/summary", { cache: "no-store" });
        const data = await res.json();
        setCount(Number(data?.count || 0));
      } catch {}
    };
    fetchCount();
    const id = setInterval(fetchCount, 5000);
    return () => clearInterval(id);
  }, []);

  return (
    <Link 
      href="/cart" 
      className="relative px-4 py-2 rounded-lg text-sm font-semibold bg-[color:var(--primary)] hover:bg-[color:var(--primary-hover)] text-white transition-all duration-200 shadow-sm hover:shadow-md flex items-center gap-2"
    >
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
      Quote
      {count > 0 && (
        <span className="absolute -top-1 -right-1 bg-[color:var(--accent)] text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
          {count}
        </span>
      )}
    </Link>
  );
}
