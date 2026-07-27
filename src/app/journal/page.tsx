import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { getAllPosts } from "@/data/journal";

export const metadata: Metadata = {
  title: "Journal",
  description:
    "Notes on craft, travel, and quiet luxury from Maison Vela — the tannery, the workshop, and the philosophy behind owning less, better.",
};

export default function JournalPage() {
  const posts = getAllPosts();

  return (
    <div className="container-edit section-pad">
      <div className="mb-14 text-center">
        <p className="eyebrow mb-3">The Journal</p>
        <h1 className="font-serif text-4xl md:text-5xl">Notes &amp; Craft</h1>
      </div>

      <div className="grid grid-cols-1 gap-16 md:grid-cols-3">
        {posts.map((post) => (
          <Link key={post.slug} href={`/journal/${post.slug}`} className="group block">
            <div className="relative aspect-[4/3] overflow-hidden bg-sand/30">
              <Image
                src={post.coverImage}
                alt={post.title}
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>
            <p className="mt-5 text-xs uppercase tracking-widest2 text-olive">
              {post.category} — {post.readingTime}
            </p>
            <h2 className="mt-2 font-serif text-2xl">{post.title}</h2>
            <p className="mt-2 text-sm text-charcoal/60">{post.excerpt}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
