import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Shipping & Returns",
  description: "Maison Vela shipping times, costs, and our 30-day returns policy.",
};

export default function ShippingReturnsPage() {
  return (
    <div className="container-edit section-pad max-w-2xl">
      <h1 className="font-serif text-4xl md:text-5xl">Shipping &amp; Returns</h1>

      <div className="mt-10 space-y-10 text-charcoal/80">
        <section>
          <h2 className="font-serif text-2xl">Shipping</h2>
          <p className="mt-3 leading-relaxed">
            All orders ship free, worldwide, and carbon-neutral. UK and EU orders
            typically arrive within 2–4 business days; international orders within
            5–9 business days. You&rsquo;ll receive tracking by email as soon as
            your order leaves our studio in Florence.
          </p>
        </section>
        <section>
          <h2 className="font-serif text-2xl">Returns</h2>
          <p className="mt-3 leading-relaxed">
            Unused items in their original packaging may be returned within 30
            days of delivery for a full refund. To start a return, sign in to
            your <a href="/account/orders" className="underline">Account</a> and
            select the order, or email hello@maisonvela.com with your order number.
          </p>
        </section>
        <section>
          <h2 className="font-serif text-2xl">Repairs</h2>
          <p className="mt-3 leading-relaxed">
            Every piece is covered by our lifetime repair promise. Restitching,
            edge reconditioning, and panel replacement are free of charge — you
            only cover return shipping to our studio.
          </p>
        </section>
      </div>
    </div>
  );
}
