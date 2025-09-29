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
    <Link href="/cart" className="px-3 py-2 rounded-md text-sm font-medium hover:bg-black/5 dark:hover:bg-white/10">
      Cart{count > 0 ? ` (${count})` : ""}
    </Link>
  );
}
