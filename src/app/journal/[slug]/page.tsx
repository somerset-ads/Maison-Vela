import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getAllPosts, getPostBySlug } from "@/data/journal";

export async function generateStaticParams() {
  return getAllPosts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const post = getPostBySlug(params.slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.excerpt,
    openGraph: { title: post.title, description: post.excerpt, images: [{ url: post.coverImage }] },
  };
}

export default function JournalArticlePage({ params }: { params: { slug: string } }) {
  const post = getPostBySlug(params.slug);
  if (!post) notFound();

  return (
    <article className="container-edit section-pad max-w-3xl">
      <p className="eyebrow mb-3 text-center">
        {post.category} — {post.readingTime}
      </p>
      <h1 className="text-center font-serif text-4xl md:text-5xl">{post.title}</h1>
      <p className="mt-4 text-center text-sm text-charcoal/50">
        {new Date(post.date).toLocaleDateString("en-GB", {
          day: "numeric",
          month: "long",
          year: "numeric",
        })}
      </p>

      <div className="relative mt-12 aspect-[16/9] overflow-hidden">
        <Image src={post.coverImage} alt={post.title} fill className="object-cover" priority />
      </div>

      <div className="mx-auto mt-12 max-w-xl space-y-6">
        {post.content.map((paragraph, i) => (
          <p key={i} className="text-lg leading-relaxed text-charcoal/80">
            {paragraph}
          </p>
        ))}
      </div>
    </article>
  );
}
