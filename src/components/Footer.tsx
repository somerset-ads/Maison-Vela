import Link from "next/link";
import NewsletterForm from "./NewsletterForm";

const shopLinks = [
  { href: "/shop", label: "All Card Holders" },
  { href: "/shop?collection=wallets", label: "Wallets" },
  { href: "/shop?collection=travel", label: "Travel" },
];

const companyLinks = [
  { href: "/about", label: "About" },
  { href: "/journal", label: "Journal" },
  { href: "/contact", label: "Contact" },
  { href: "/faq", label: "FAQ" },
];

const legalLinks = [
  { href: "/privacy", label: "Privacy Policy" },
  { href: "/terms", label: "Terms of Service" },
  { href: "/shipping-returns", label: "Shipping & Returns" },
];

export default function Footer() {
  return (
    <footer className="border-t border-charcoal/10 bg-warm-white">
      <div className="container-edit py-16">
        <div className="grid grid-cols-2 gap-10 md:grid-cols-5">
          <div className="col-span-2">
            <p className="font-serif text-2xl">Maison Vela</p>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-charcoal/60">
              Considered leather goods for the way you actually travel. Cut from
              full-grain leather, finished by hand, made to be carried for years.
            </p>
          </div>

          <div>
            <p className="eyebrow mb-4">Shop</p>
            <ul className="space-y-3">
              {shopLinks.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-sm text-charcoal/70 hover:text-charcoal">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="eyebrow mb-4">Company</p>
            <ul className="space-y-3">
              {companyLinks.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-sm text-charcoal/70 hover:text-charcoal">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="eyebrow mb-4">Stay in Touch</p>
            <NewsletterForm compact />
          </div>
        </div>

        <div className="mt-16 flex flex-col items-start justify-between gap-4 border-t border-charcoal/10 pt-8 text-xs text-charcoal/50 md:flex-row md:items-center">
          <p>&copy; {new Date().getFullYear()} Maison Vela. All rights reserved.</p>
          <ul className="flex gap-6">
            {legalLinks.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="hover:text-charcoal">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
