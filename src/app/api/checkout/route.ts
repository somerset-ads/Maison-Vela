import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import type { CartLine } from "@/types/product";

export async function POST(req: NextRequest) {
  const secretKey = process.env.STRIPE_SECRET_KEY;
  if (!secretKey) {
    return NextResponse.json(
      { error: "Stripe is not configured yet. Set STRIPE_SECRET_KEY to enable checkout." },
      { status: 501 }
    );
  }

  const stripe = new Stripe(secretKey, { apiVersion: "2024-06-20" });
  const { lines }: { lines: CartLine[] } = await req.json();

  if (!lines?.length) {
    return NextResponse.json({ error: "Cart is empty" }, { status: 400 });
  }

  const origin = req.headers.get("origin") ?? process.env.NEXT_PUBLIC_SITE_URL;

  const session = await stripe.checkout.sessions.create({
    mode: "payment",
    payment_method_types: ["card"],
    line_items: lines.map((line) => ({
      quantity: line.quantity,
      price_data: {
        currency: "gbp",
        unit_amount: Math.round(line.price * 100),
        product_data: {
          name: `${line.title} — ${line.variantTitle}`,
          images: [line.image.url],
        },
      },
    })),
    shipping_address_collection: { allowed_countries: ["GB", "US", "FR", "IT", "DE", "ES", "NL", "IE"] },
    success_url: `${origin}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${origin}/cart`,
  });

  return NextResponse.json({ url: session.url });
}
