import type { Metadata } from "next";

export const metadata: Metadata = { title: "Terms of Service" };

export default function TermsPage() {
  return (
    <div className="container-edit section-pad max-w-2xl">
      <h1 className="font-serif text-4xl md:text-5xl">Terms of Service</h1>
      <p className="mt-6 text-sm text-charcoal/50">
        Placeholder — have this reviewed by a solicitor before launch. Should cover
        order acceptance, pricing/currency, returns (see Shipping &amp; Returns),
        limitation of liability, and governing law.
      </p>
      <div className="mt-10 space-y-6 text-charcoal/80 leading-relaxed">
        <p>
          By placing an order with Maison Vela you agree to these terms. All prices
          are shown in GBP unless otherwise stated and are subject to change without
          notice; the price at checkout is the price charged.
        </p>
        <p>
          Contracts for the sale of goods are between you and Maison Vela Ltd, formed
          when we send an order confirmation email.
        </p>
      </div>
    </div>
  );
}
