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
    } catch (e: any) {
      setResult("Failed to check availability.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-3">
      <div>
        <label className="block text-sm mb-1">Start date</label>
        <input
          type="date"
          className="w-full border rounded px-3 py-2 bg-transparent"
          value={start}
          onChange={(e) => setStart(e.target.value)}
        />
      </div>
      <div>
        <label className="block text-sm mb-1">End date</label>
        <input
          type="date"
          className="w-full border rounded px-3 py-2 bg-transparent"
          value={end}
          onChange={(e) => setEnd(e.target.value)}
        />
      </div>
      <div>
        <label className="block text-sm mb-1">Quantity</label>
        <input
          type="number"
          min={1}
          className="w-full border rounded px-3 py-2 bg-transparent"
          value={qty}
          onChange={(e) => setQty(parseInt(e.target.value || "1", 10))}
        />
      </div>
      <button
        onClick={check}
        className="w-full rounded bg-black text-white dark:bg-white dark:text-black py-2 text-sm"
        disabled={loading || !start || !end}
      >
        {loading ? "Checking..." : "Check availability"}
      </button>
      {result && <p className="text-sm text-black/70 dark:text-white/70">{result}</p>}
      <button
        onClick={async () => {
          await fetch("/api/cart", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ productId, kind: "RENTAL", quantity: qty, startDate: start, endDate: end }),
          });
        }}
        className="w-full rounded border mt-2 border-black/10 dark:border-white/20 py-2 text-sm"
        disabled={!canAdd}
      >
        Add to cart
      </button>
    </div>
  );
}
