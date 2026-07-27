import Image from "next/image";

const posts = [
  "https://images.unsplash.com/photo-1554342872-034a06541bad?q=80&w=800",
  "https://images.unsplash.com/photo-1611010344444-5f9e4d86a6e0?q=80&w=800",
  "https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?q=80&w=800",
  "https://images.unsplash.com/photo-1627123424574-724758594e93?q=80&w=800",
  "https://images.unsplash.com/photo-1531925964353-1a239f8e6a1f?q=80&w=800",
  "https://images.unsplash.com/photo-1553531384-cc64ac80f931?q=80&w=800",
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
