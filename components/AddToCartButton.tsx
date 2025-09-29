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
    <button onClick={add} className="mt-2 rounded bg-black text-white dark:bg-white dark:text-black px-3 py-2 text-sm">
      Add to cart
    </button>
  );
}
