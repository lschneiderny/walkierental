"use client";

import { useState } from "react";

export default function AvailabilityWidget({ productId }: { productId: string }) {
  const [start, setStart] = useState<string>("");
  const [end, setEnd] = useState<string>("");
  const [qty, setQty] = useState<number>(1);
  const [result, setResult] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [canAdd, setCanAdd] = useState(false);

  const check = async () => {
    setLoading(true);
    setResult("");
    try {
      const res = await fetch("/api/availability", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productId, startDate: start, endDate: end }),
      });
      const data = await res.json();
      const available: number = data.available ?? 0;
      if (available >= qty) {
        setResult(`Available: ${available} units. You can add to cart.`);
        setCanAdd(true);
      } else {
        setResult(`Only ${available} units available for these dates.`);
        setCanAdd(false);
      }
    } catch {
      setResult("Failed to check availability.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium mb-2">Start date</label>
        <input
          type="date"
          className="w-full border border-black/10 dark:border-white/10 rounded-lg px-4 py-3 bg-transparent focus:border-[color:var(--primary)] focus:outline-none focus:ring-1 focus:ring-[color:var(--primary)]"
          value={start}
          onChange={(e) => setStart(e.target.value)}
        />
      </div>
      <div>
        <label className="block text-sm font-medium mb-2">End date</label>
        <input
          type="date"
          className="w-full border border-black/10 dark:border-white/10 rounded-lg px-4 py-3 bg-transparent focus:border-[color:var(--primary)] focus:outline-none focus:ring-1 focus:ring-[color:var(--primary)]"
          value={end}
          onChange={(e) => setEnd(e.target.value)}
        />
      </div>
      <div>
        <label className="block text-sm font-medium mb-2">Quantity</label>
        <input
          type="number"
          min={1}
          className="w-full border border-black/10 dark:border-white/10 rounded-lg px-4 py-3 bg-transparent focus:border-[color:var(--primary)] focus:outline-none focus:ring-1 focus:ring-[color:var(--primary)]"
          value={qty}
          onChange={(e) => setQty(parseInt(e.target.value || "1", 10))}
        />
      </div>
      <button
        onClick={check}
        className="w-full rounded-lg bg-[color:var(--primary)] hover:bg-[color:var(--primary-hover)] text-white py-3 text-base font-semibold transition-colors disabled:opacity-50"
        disabled={loading || !start || !end}
      >
        {loading ? "Checking..." : "Check availability"}
      </button>
      {result && <p className="text-sm text-black/70 dark:text-white/70 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">{result}</p>}
      <button
        onClick={async () => {
          await fetch("/api/cart", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ productId, kind: "RENTAL", quantity: qty, startDate: start, endDate: end }),
          });
        }}
        className="w-full rounded-lg border border-[color:var(--primary)] text-[color:var(--primary)] hover:bg-[color:var(--primary)] hover:text-white py-3 text-base font-semibold transition-colors disabled:opacity-50"
        disabled={!canAdd}
      >
        Add to cart
      </button>
    </div>
  );
}
