import { cookies } from "next/headers";

export type CartItem = {
  id: string;
  productId: string;
  kind: "RENTAL" | "ACCESSORY";
  quantity: number;
  startDate?: string; // ISO (for RENTAL)
  endDate?: string;   // ISO (for RENTAL)
};

export type Cart = { items: CartItem[] };

const COOKIE_NAME = "cart";

export async function getCart(): Promise<Cart> {
  const c = await cookies();
  const raw = c.get(COOKIE_NAME)?.value;
  if (!raw) return { items: [] };
  try {
    const parsed = JSON.parse(raw);
    if (parsed && Array.isArray(parsed.items)) return parsed as Cart;
    return { items: [] };
  } catch {
    return { items: [] };
  }
}

export async function setCart(cart: Cart) {
  const c = await cookies();
  c.set(COOKIE_NAME, JSON.stringify(cart), {
    httpOnly: false,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 30, // 30 days
  });
}

export async function clearCart() {
  const c = await cookies();
  c.delete(COOKIE_NAME);
}
