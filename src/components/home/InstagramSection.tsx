import Image from "next/image";

const posts = [
  "/brand/ig-cardholder.svg",
  "/brand/ig-linen.svg",
  "/brand/ig-arch.svg",
  "/brand/ig-olive.svg",
  "/brand/ig-sun.svg",
  "/brand/ig-wave.svg",
];

export default function InstagramSection() {
  return (
    <section className="section-pad container-edit">
      <div className="mb-10 text-center">
        <p className="eyebrow mb-3">@maisonvela</p>
        <h2 className="font-serif text-3xl md:text-4xl">Follow Along</h2>
      </div>
      <div className="grid grid-cols-3 gap-2 md:grid-cols-6">
        {posts.map((src, i) => (
          <a
            key={src}
            href="https://instagram.com"
            target="_blank"
            rel="noreferrer"
            className="group relative aspect-square overflow-hidden"
          >
            <Image
              src={src}
              alt={`Maison Vela on Instagram, post ${i + 1}`}
              fill
              sizes="16vw"
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
          </a>
        ))}
      </div>
    </section>
  );
}
