const reviews = [
  {
    quote:
      "The thinnest wallet I've owned that still feels substantial. It's the first thing people notice — quietly.",
    name: "Alexandre M.",
    location: "Geneva",
  },
  {
    quote:
      "Bought The Amalfi for my husband's birthday. Three years on, it looks better than the day it arrived.",
    name: "Claudia R.",
    location: "Milan",
  },
  {
    quote:
      "Exactly what I wanted — no logo, no fuss, just leather that does its job beautifully.",
    name: "James H.",
    location: "London",
  },
];

export default function Reviews() {
  return (
    <section className="section-pad container-edit">
      <div className="mb-14 text-center">
        <p className="eyebrow mb-3">In Their Words</p>
        <h2 className="font-serif text-4xl md:text-5xl">Considered By Design</h2>
      </div>

      <div className="grid grid-cols-1 gap-10 md:grid-cols-3">
        {reviews.map((r) => (
          <figure key={r.name} className="flex flex-col items-center text-center">
            <div className="mb-4 flex gap-1 text-gold" aria-hidden>
              {"★★★★★"}
            </div>
            <blockquote className="font-serif text-lg leading-relaxed text-charcoal/80">
              &ldquo;{r.quote}&rdquo;
            </blockquote>
            <figcaption className="mt-4 text-xs uppercase tracking-widest2 text-charcoal/50">
              {r.name} — {r.location}
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}
