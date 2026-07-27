import NewsletterForm from "@/components/NewsletterForm";

export default function NewsletterSection() {
  return (
    <section className="bg-olive/10">
      <div className="container-edit flex flex-col items-center gap-6 py-20 text-center">
        <p className="eyebrow">The List</p>
        <h2 className="max-w-lg font-serif text-3xl md:text-4xl">
          Early access, considered notes, and nothing you didn&rsquo;t ask for.
        </h2>
        <NewsletterForm />
      </div>
    </section>
  );
}
