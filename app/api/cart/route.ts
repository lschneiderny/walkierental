import { NextRequest, NextResponse } from "next/server";
import { getCart, setCart, CartItem } from "@/lib/cart";

export async function GET() {
  const cart = await getCart();
  return NextResponse.json(cart);
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { productId, packageId, kind, quantity = 1, startDate, endDate } = body || {};
    if (!kind) return NextResponse.json({ error: "Missing kind" }, { status: 400 });
    if (kind === "RENTAL" && !packageId) return NextResponse.json({ error: "Missing packageId for rental" }, { status: 400 });
    if (kind === "ACCESSORY" && !productId) return NextResponse.json({ error: "Missing productId for accessory" }, { status: 400 });

    const cart = await getCart();
    const item: CartItem = {
      id: crypto.randomUUID(),
      productId: productId ? String(productId) : undefined,
      packageId: packageId ? String(packageId) : undefined,
      kind: kind === "RENTAL" ? "RENTAL" : "ACCESSORY",
      quantity: Number(quantity) || 1,
      startDate,
      endDate,
    };
    cart.items.push(item);
    await setCart(cart);
    return NextResponse.json({ ok: true, count: cart.items.length });
  } catch {
    return NextResponse.json({ error: "Failed" }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const body = await req.json();
    const { id, quantity, startDate, endDate } = body || {};
    const cart = await getCart();
    const idx = cart.items.findIndex((i) => i.id === id);
    if (idx === -1) return NextResponse.json({ error: "Not found" }, { status: 404 });
    if (quantity != null) cart.items[idx].quantity = Number(quantity);
    if (startDate != null) cart.items[idx].startDate = startDate;
    if (endDate != null) cart.items[idx].endDate = endDate;
    await setCart(cart);
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Failed" }, { status: 500 });
  }
}

export async function DELETE() {
  await setCart({ items: [] });
  return NextResponse.json({ ok: true });
}
