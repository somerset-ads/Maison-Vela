import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative flex h-[92vh] min-h-[600px] items-end overflow-hidden bg-charcoal">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1596704017254-9b121068fb31?q=80&w=2400')",
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-charcoal/10 to-charcoal/30" />

      <div className="container-edit relative z-10 pb-20 text-warm-white md:pb-28">
        <p className="eyebrow mb-6 text-sand">The Riviera Edit — Now Available</p>
        <h1 className="max-w-2xl font-serif text-5xl leading-[1.05] md:text-7xl">
          Carried quietly. <br /> Made to last.
        </h1>
        <p className="mt-6 max-w-md text-base leading-relaxed text-warm-white/80">
          Full-grain leather card holders, cut and finished by hand in small runs —
          for those who prefer their luxury unannounced.
        </p>
        <div className="mt-10 flex flex-wrap gap-4">
          <Link href="/shop" className="btn-gold">
            Shop the Collection
          </Link>
          <Link
            href="/about"
            className="inline-flex items-center justify-center gap-2 border border-warm-white/40 px-8 py-3.5 text-sm uppercase tracking-wide text-warm-white transition-colors duration-300 hover:border-warm-white"
          >
            Our Story
          </Link>
        </div>
      </div>
    </section>
  );
}
