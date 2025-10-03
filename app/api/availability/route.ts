import { NextRequest, NextResponse } from "next/server";
import { getAvailableQuantityForProduct, getAvailableQuantityForPackage } from "@/lib/availability";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { productId, packageId, startDate, endDate } = body || {};
    if ((!productId && !packageId) || !startDate || !endDate) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }
    const available = productId
      ? await getAvailableQuantityForProduct(String(productId), new Date(startDate), new Date(endDate))
      : await getAvailableQuantityForPackage(String(packageId), new Date(startDate), new Date(endDate));
    return NextResponse.json({ available });
  } catch {
    return NextResponse.json({ error: "Failed" }, { status: 500 });
  }
}
