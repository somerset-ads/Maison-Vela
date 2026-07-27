import type { Metadata } from "next";
import Accordion from "@/components/Accordion";

export const metadata: Metadata = {
  title: "FAQ",
  description: "Answers to common questions about Maison Vela's leather, sizing, shipping, returns, and repairs.",
};

const faqs = [
  {
    question: "What leather do you use?",
    answer:
      "Full-grain, vegetable-tanned leather from a single family tannery outside Florence, Italy. It's tanned using tree bark extracts rather than chrome, which is slower but ages far more gracefully.",
  },
  {
    question: "How many cards does The Riviera hold?",
    answer:
      "Comfortably six cards, with a slim outer pocket that fits folded notes or a spare key. It's designed to stay under 6mm thick even fully loaded.",
  },
  {
    question: "Where do you ship?",
    answer:
      "We ship worldwide. UK and EU orders arrive in 2–4 business days; international orders typically take 5–9 business days. All shipping is carbon-neutral at no extra cost.",
  },
  {
    question: "What is your returns policy?",
    answer:
      "Unused items in original packaging can be returned within 30 days for a full refund. Start a return from your Account page or by emailing hello@maisonvela.com.",
  },
  {
    question: "Do you offer repairs?",
    answer:
      "Yes — every Maison Vela piece is covered by our lifetime repair promise. Restitching, edge reconditioning, and panel replacement are free; you only cover return shipping.",
  },
  {
    question: "Will the leather change colour over time?",
    answer:
      "Yes, and that's intentional. Vegetable-tanned leather darkens and develops a patina with handling and sun exposure — most customers find it looks better after a year of daily use.",
  },
];

export default function FAQPage() {
  return (
    <div className="container-edit section-pad max-w-3xl">
      <div className="mb-14 text-center">
        <p className="eyebrow mb-3">Questions</p>
        <h1 className="font-serif text-4xl md:text-5xl">Frequently Asked</h1>
      </div>
      <Accordion items={faqs} />
    </div>
  );
}
