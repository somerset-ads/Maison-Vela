import { NextRequest, NextResponse } from "next/server";
import { adminCreateDiscountCode, isShopifyAdminConfigured } from "@/lib/shopify-admin";

export async function POST(req: NextRequest) {
  const { code, percentage } = await req.json();

  if (!code || typeof percentage !== "number" || percentage <= 0 || percentage > 100) {
    return NextResponse.json({ error: "Invalid code or percentage" }, { status: 400 });
  }

  if (!isShopifyAdminConfigured) {
    // No Shopify Admin credentials yet — the discounts page keeps its own
    // localStorage list for demo purposes; this just validates the input.
    return NextResponse.json({ ok: true, shopifyId: null });
  }

  try {
    const startsAt = new Date().toISOString();
    const shopifyId = await adminCreateDiscountCode({ code, percentage, startsAt });
    return NextResponse.json({ ok: true, shopifyId });
  } catch (e) {
    console.error("Discount code creation failed", e);
    return NextResponse.json({ error: "Failed to create discount code in Shopify" }, { status: 502 });
  }
}
