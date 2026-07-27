"use client";

import Image from "next/image";
import { useState } from "react";
import type { ProductImage } from "@/types/product";

export default function ProductGallery({ images }: { images: ProductImage[] }) {
  const [active, setActive] = useState(0);
  const image = images[active];

  return (
    <div>
      <div className="relative aspect-[4/5] overflow-hidden bg-sand/30">
        <Image
          src={image.url}
          alt={image.alt}
          fill
          priority
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover"
        />
      </div>
      {images.length > 1 && (
        <div className="mt-4 flex gap-3">
          {images.map((img, i) => (
            <button
              key={img.url}
              onClick={() => setActive(i)}
              className={`relative h-20 w-16 overflow-hidden border ${
                i === active ? "border-charcoal" : "border-transparent"
              }`}
            >
              <Image src={img.url} alt={img.alt} fill sizes="64px" className="object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
