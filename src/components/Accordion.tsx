"use client";

import { useState } from "react";

export interface AccordionItem {
  question: string;
  answer: string;
}

export default function Accordion({ items }: { items: AccordionItem[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="divide-y divide-charcoal/10 border-y border-charcoal/10">
      {items.map((item, i) => {
        const isOpen = openIndex === i;
        return (
          <div key={item.question}>
            <button
              className="flex w-full items-center justify-between py-5 text-left"
              onClick={() => setOpenIndex(isOpen ? null : i)}
              aria-expanded={isOpen}
            >
              <span className="font-serif text-lg">{item.question}</span>
              <span className="ml-4 shrink-0 text-xl text-olive">{isOpen ? "−" : "+"}</span>
            </button>
            {isOpen && (
              <p className="pb-6 pr-8 text-sm leading-relaxed text-charcoal/70">{item.answer}</p>
            )}
          </div>
        );
      })}
    </div>
  );
}
