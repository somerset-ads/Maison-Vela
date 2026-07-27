const benefits = [
  {
    title: "Full-Grain Leather",
    body: "Sourced from a single Tuscan tannery, vegetable-tanned and left to age honestly.",
  },
  {
    title: "Hand-Finished",
    body: "Cut, stitched and burnished by hand in small runs — never mass-produced.",
  },
  {
    title: "Lifetime Repair",
    body: "Every piece is repaired free of charge for as long as you own it.",
  },
  {
    title: "Carbon-Neutral Shipping",
    body: "Every order ships offset, in packaging designed to be kept, not binned.",
  },
];

export default function Benefits() {
  return (
    <section className="border-y border-charcoal/10 bg-sand/20">
      <div className="container-edit grid grid-cols-1 gap-10 py-16 sm:grid-cols-2 md:grid-cols-4 md:py-20">
        {benefits.map((b) => (
          <div key={b.title}>
            <h3 className="font-serif text-xl">{b.title}</h3>
            <p className="mt-3 text-sm leading-relaxed text-charcoal/60">{b.body}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
