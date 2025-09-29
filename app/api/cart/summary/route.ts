import { NextResponse } from "next/server";
import { getCart } from "@/lib/cart";

export async function GET() {
  const cart = await getCart();
  return NextResponse.json({ count: cart.items.reduce((acc, it) => acc + (it.quantity || 0), 0) });
}
