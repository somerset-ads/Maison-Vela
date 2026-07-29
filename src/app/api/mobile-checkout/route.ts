import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import type { CartLine } from "@/types/product";

/**
 * PaymentIntent endpoint for the Maison Vela mobile app (Stripe
 * PaymentSheet), as opposed to /api/checkout which creates a hosted
 * Checkout Session for the web storefront. Same Stripe account, different
 * integration shape — PaymentSheet needs a raw client secret, not a
 * redirect URL.
 */
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

  const amount = Math.round(lines.reduce((sum, l) => sum + l.price * l.quantity, 0) * 100);

  const paymentIntent = await stripe.paymentIntents.create({
    amount,
    currency: "gbp",
    automatic_payment_methods: { enabled: true },
    metadata: {
      lineItems: JSON.stringify(
        lines.map((l) => ({ title: l.title, variant: l.variantTitle, qty: l.quantity }))
      ),
    },
  });

  return NextResponse.json({ clientSecret: paymentIntent.client_secret });
}
