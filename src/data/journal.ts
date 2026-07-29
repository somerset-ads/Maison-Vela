export interface JournalPost {
  slug: string;
  title: string;
  excerpt: string;
  content: string[];
  coverImage: string;
  date: string;
  readingTime: string;
  category: string;
}

export const journalPosts: JournalPost[] = [
  {
    slug: "the-case-for-owning-less",
    title: "The Case for Owning Less, Better",
    excerpt:
      "Why the quietest luxury is often the most expensive, and why that's the point.",
    coverImage: "/brand/journal-owning-less.svg",
    date: "2026-05-12",
    readingTime: "4 min read",
    category: "Philosophy",
    content: [
      "There is a particular kind of quality that doesn't announce itself. It doesn't need to.",
      "The people we design for aren't buying a card holder to be noticed — they're buying one because carrying six loose cards in a phone case stopped feeling right. That is the entire brief.",
      "Old money, as an aesthetic, is really just a preference for objects that were made to last decades rather than seasons. We think that's worth designing around.",
    ],
  },
  {
    slug: "inside-the-tannery",
    title: "Inside the Tannery: A Morning in Tuscany",
    excerpt: "A visit to the family tannery that has supplied our leather since 2019.",
    coverImage: "/brand/journal-tannery.svg",
    date: "2026-03-02",
    readingTime: "6 min read",
    category: "Craft",
    content: [
      "The tannery smells like oak bark and rain before you even see the hides. It has for four generations.",
      "Vegetable tanning takes weeks, not days — the hides rest in pits of increasingly concentrated tannin extracted from tree bark. It's slower, and it's the only way we'll do it.",
      "What you get at the end is leather that ages instead of wearing out: it darkens, softens, and takes on the shape of whatever it's carried.",
    ],
  },
  {
    slug: "how-to-travel-with-less",
    title: "How to Travel With Less",
    excerpt: "A packing philosophy for the overhead-bin-only traveller.",
    coverImage: "/brand/journal-travel.svg",
    date: "2026-01-18",
    readingTime: "5 min read",
    category: "Travel",
    content: [
      "Every item you carry should do at least two jobs, or it stays home.",
      "A card holder that also holds cash removes a wallet from your pocket. A document sleeve that fits a passport and a boarding pass removes a folder from your bag.",
      "None of this is about minimalism as an aesthetic — it's about friction. Fewer things to check for, fewer pockets to pat down at the gate.",
    ],
  },
];

export function getAllPosts(): JournalPost[] {
  return journalPosts;
}

export function getPostBySlug(slug: string): JournalPost | undefined {
  return journalPosts.find((p) => p.slug === slug);
}
