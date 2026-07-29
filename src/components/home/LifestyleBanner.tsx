import Link from "next/link";
import Image from "next/image";

export default function LifestyleBanner() {
  return (
    <section className="grid grid-cols-1 md:grid-cols-2">
      <div className="relative h-[70vh] min-h-[420px]">
        <Image
          src="/brand/lifestyle.svg"
          alt="Illustrated Mediterranean coastal terrace at dusk, with an espresso cup and olive branch"
          fill
          sizes="50vw"
          className="object-cover"
        />
      </div>
      <div className="flex flex-col items-start justify-center gap-6 bg-charcoal px-10 py-16 text-warm-white md:px-16">
        <p className="eyebrow text-sand">Made For The Journey</p>
        <h2 className="max-w-md font-serif text-3xl leading-tight md:text-4xl">
          Between the espresso bar and the departure gate.
        </h2>
        <p className="max-w-sm text-sm leading-relaxed text-warm-white/70">
          We design for the version of you that travels light — one card holder,
          a linen shirt, and nowhere you need to be in a hurry.
        </p>
        <Link href="/shop" className="btn-gold">
          Explore The Collection
        </Link>
      </div>
    </section>
  );
}
