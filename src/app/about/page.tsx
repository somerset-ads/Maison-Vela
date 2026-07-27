import type { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "About",
  description:
    "Maison Vela began on the Amalfi coast with a simple idea: a card holder thin enough to forget, and honest enough to last a lifetime.",
};

export default function AboutPage() {
  return (
    <div>
      <section className="relative flex h-[60vh] min-h-[420px] items-end bg-charcoal">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-80"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1523301343968-6a6ebf63c672?q=80&w=2400')",
          }}
        />
        <div className="container-edit relative z-10 pb-16 text-warm-white">
          <p className="eyebrow mb-4 text-sand">Our Story</p>
          <h1 className="max-w-xl font-serif text-5xl md:text-6xl">
            Made slowly, on purpose.
          </h1>
        </div>
      </section>

      <section className="container-edit section-pad grid grid-cols-1 gap-16 md:grid-cols-2">
        <div className="flex flex-col justify-center gap-6">
          <p className="eyebrow">2019 — Positano, Italy</p>
          <h2 className="font-serif text-3xl md:text-4xl">
            A wallet too thick to fit in your pocket started this.
          </h2>
          <p className="text-charcoal/70 leading-relaxed">
            Maison Vela began with a frustration, not a business plan. Our founder,
            tired of wallets that bulged with cards she never used, asked a
            fourth-generation leather workshop outside Florence to make something
            simpler: one piece of leather, six card slots, no branding.
          </p>
          <p className="text-charcoal/70 leading-relaxed">
            That first Riviera card holder is still in production today, largely
            unchanged. We&rsquo;ve resisted the urge to add logos, hardware, or
            seasonal drops. What we make instead is fewer things, made properly,
            by the same hands, from the same tannery, every time.
          </p>
        </div>
        <div className="relative aspect-[4/5]">
          <Image
            src="https://images.unsplash.com/photo-1509281373149-e957c6296406?q=80&w=1600"
            alt="Leather craftsman hand-stitching a card holder in an Italian workshop"
            fill
            className="object-cover"
          />
        </div>
      </section>

      <section className="bg-olive/10">
        <div className="container-edit section-pad grid grid-cols-1 gap-16 md:grid-cols-3">
          <div>
            <h3 className="font-serif text-2xl">Provenance</h3>
            <p className="mt-3 text-sm leading-relaxed text-charcoal/70">
              Every hide is vegetable-tanned in Tuscany using methods largely
              unchanged in a century — no chrome, no shortcuts.
            </p>
          </div>
          <div>
            <h3 className="font-serif text-2xl">Small Runs</h3>
            <p className="mt-3 text-sm leading-relaxed text-charcoal/70">
              We produce in batches of under 200 pieces, cut and finished by a
              workshop of six craftspeople outside Florence.
            </p>
          </div>
          <div>
            <h3 className="font-serif text-2xl">Repair, Not Replace</h3>
            <p className="mt-3 text-sm leading-relaxed text-charcoal/70">
              Send it back and we&rsquo;ll restitch, recondition, or replace a
              worn panel — free, for as long as you own it.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
