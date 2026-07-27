import type { Metadata } from "next";

export const metadata: Metadata = { title: "Privacy Policy" };

export default function PrivacyPage() {
  return (
    <div className="container-edit section-pad max-w-2xl">
      <h1 className="font-serif text-4xl md:text-5xl">Privacy Policy</h1>
      <p className="mt-6 text-sm text-charcoal/50">
        Placeholder — replace with a compliant policy (e.g. via Termly or a solicitor)
        covering GDPR/UK GDPR before launch. Must accurately describe data collected via
        Shopify, Clerk, Stripe, Klaviyo, and any analytics/pixels in use.
      </p>
      <div className="mt-10 space-y-6 text-charcoal/80 leading-relaxed">
        <p>
          Maison Vela (&ldquo;we&rdquo;, &ldquo;us&rdquo;) collects the personal data you
          provide when placing an order, creating an account, or subscribing to our
          newsletter — including your name, email, shipping address, and payment
          details (processed securely by Stripe; we never store card numbers).
        </p>
        <p>
          We use this data to fulfil orders, provide customer support, and, with your
          consent, send marketing communications you can unsubscribe from at any time.
        </p>
        <p>
          Contact hello@maisonvela.com to access, correct, or delete your data.
        </p>
      </div>
    </div>
  );
}
