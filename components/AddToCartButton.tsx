"use client";

export default function AddToCartButton({ productId, kind, quantity = 1 }: { productId: string; kind: "RENTAL" | "ACCESSORY"; quantity?: number }) {
  const add = async () => {
    await fetch("/api/cart", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ productId, kind, quantity }),
    });
  };
  return (
    <button onClick={add} className="w-full bg-[color:var(--success)] hover:bg-[color:var(--success-hover)] text-white px-4 py-2 rounded text-xs font-semibold uppercase tracking-wide transition-colors">
      Add to Cart
    </button>
  );
}
