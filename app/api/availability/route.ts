import { NextRequest, NextResponse } from "next/server";
import { getAvailableQuantity } from "@/lib/availability";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { productId, startDate, endDate } = body || {};
    if (!productId || !startDate || !endDate) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }
    const available = await getAvailableQuantity(
      String(productId),
      new Date(startDate),
      new Date(endDate)
    );
    return NextResponse.json({ available });
  } catch {
    return NextResponse.json({ error: "Failed" }, { status: 500 });
  }
}
