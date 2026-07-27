import type { Metadata } from "next";
import ContactForm from "@/components/ContactForm";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with Maison Vela for order enquiries, repairs, or press and partnership requests.",
};

export default function ContactPage() {
  return (
    <div className="container-edit section-pad grid grid-cols-1 gap-16 md:grid-cols-2">
      <div>
        <p className="eyebrow mb-3">Get In Touch</p>
        <h1 className="font-serif text-4xl md:text-5xl">Contact Us</h1>
        <p className="mt-6 max-w-md text-charcoal/70 leading-relaxed">
          Whether it&rsquo;s a question about an order, a repair, or a partnership
          enquiry, we read every message ourselves and reply within one business day.
        </p>

        <dl className="mt-12 space-y-6 text-sm">
          <div>
            <dt className="text-xs uppercase tracking-widest2 text-charcoal/50">Email</dt>
            <dd className="mt-1">hello@maisonvela.com</dd>
          </div>
          <div>
            <dt className="text-xs uppercase tracking-widest2 text-charcoal/50">Studio</dt>
            <dd className="mt-1">Via dei Conciatori 14, 50122 Firenze, Italy</dd>
          </div>
          <div>
            <dt className="text-xs uppercase tracking-widest2 text-charcoal/50">Hours</dt>
            <dd className="mt-1">Monday – Friday, 9:00 – 17:00 CET</dd>
          </div>
        </dl>
      </div>

      <ContactForm />
    </div>
  );
}
