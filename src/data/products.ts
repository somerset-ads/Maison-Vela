import type { Product } from "@/types/product";

/**
 * Local catalog used when Shopify Storefront credentials are not configured
 * (e.g. local development, or before the store is live). src/lib/shopify.ts
 * reads from this file as a fallback so every page works out of the box.
 * Replace with real Shopify products once NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN
 * and NEXT_PUBLIC_SHOPIFY_STOREFRONT_TOKEN are set.
 */
export const products: Product[] = [
  {
    id: "gid://shopify/Product/1",
    handle: "the-riviera",
    title: "The Riviera",
    subtitle: "Slim card holder, full-grain leather",
    description:
      "Cut from a single piece of vegetable-tanned full-grain leather and finished by hand, The Riviera holds up to six cards in a profile thinner than your phone. No branding, no hardware — just leather that gets better with age.",
    descriptionHtml:
      "<p>Cut from a single piece of vegetable-tanned full-grain leather and finished by hand, The Riviera holds up to six cards in a profile thinner than your phone.</p><p>No branding, no hardware — just leather that gets better with age.</p>",
    collection: "card-holders",
    featured: true,
    tags: ["bestseller", "new"],
    materials: ["Full-grain Italian leather", "Waxed cotton thread", "Hand-burnished edges"],
    dimensions: "9.6 × 6.8 cm, 4mm thick (empty)",
    images: [
      { url: "/brand/product-riviera-1.svg", alt: "The Riviera card holder in sand leather, illustrated against a European-summer sunset", width: 960, height: 1200 },
      { url: "/brand/product-riviera-2.svg", alt: "The Riviera card holder detail, hand-stitched edge", width: 960, height: 1200 },
    ],
    variants: [
      { id: "gid://shopify/ProductVariant/1", title: "Sand", color: "Sand", colorHex: "#DCCDB8", price: 145, available: true, sku: "MV-RIV-SAND", inventory: 42 },
      { id: "gid://shopify/ProductVariant/2", title: "Charcoal", color: "Charcoal", colorHex: "#232323", price: 145, available: true, sku: "MV-RIV-CHAR", inventory: 31 },
      { id: "gid://shopify/ProductVariant/3", title: "Olive", color: "Olive", colorHex: "#69715E", price: 145, available: true, sku: "MV-RIV-OLIVE", inventory: 18 },
    ],
  },
  {
    id: "gid://shopify/Product/2",
    handle: "the-amalfi",
    title: "The Amalfi",
    subtitle: "Bifold card & note holder",
    description:
      "A bifold for those who still carry cash. The Amalfi pairs two card slots per side with a central note pocket, in leather sourced from a single tannery in Tuscany.",
    descriptionHtml:
      "<p>A bifold for those who still carry cash. The Amalfi pairs two card slots per side with a central note pocket, in leather sourced from a single tannery in Tuscany.</p>",
    collection: "wallets",
    featured: true,
    tags: ["bestseller"],
    materials: ["Full-grain Italian leather", "Waxed cotton thread"],
    dimensions: "11 × 9 cm folded",
    images: [
      { url: "/brand/product-amalfi-1.svg", alt: "The Amalfi bifold wallet in charcoal leather, illustrated open with note pocket", width: 960, height: 1200 },
      { url: "/brand/product-amalfi-2.svg", alt: "The Amalfi wallet stitching detail", width: 960, height: 1200 },
    ],
    variants: [
      { id: "gid://shopify/ProductVariant/4", title: "Charcoal", color: "Charcoal", colorHex: "#232323", price: 185, available: true, sku: "MV-AMA-CHAR", inventory: 24 },
      { id: "gid://shopify/ProductVariant/5", title: "Sand", color: "Sand", colorHex: "#DCCDB8", price: 185, available: true, sku: "MV-AMA-SAND", inventory: 16 },
    ],
  },
  {
    id: "gid://shopify/Product/3",
    handle: "the-cassis",
    title: "The Cassis",
    subtitle: "Card holder with note clip",
    description:
      "Card holder and money clip in one. A flat spring-steel clip, sleeved in leather, keeps folded notes flush against your cards without adding bulk.",
    descriptionHtml:
      "<p>Card holder and money clip in one. A flat spring-steel clip, sleeved in leather, keeps folded notes flush against your cards without adding bulk.</p>",
    collection: "card-holders",
    featured: true,
    tags: ["new"],
    materials: ["Full-grain Italian leather", "Sleeved spring-steel clip"],
    dimensions: "9.8 × 7 cm, 6mm thick (empty)",
    images: [
      { url: "/brand/product-cassis-1.svg", alt: "The Cassis money clip card holder in olive leather, illustrated", width: 960, height: 1200 },
      { url: "/brand/product-cassis-2.svg", alt: "The Cassis detail, steel clip", width: 960, height: 1200 },
    ],
    variants: [
      { id: "gid://shopify/ProductVariant/6", title: "Olive", color: "Olive", colorHex: "#69715E", price: 155, available: true, sku: "MV-CAS-OLIVE", inventory: 12 },
      { id: "gid://shopify/ProductVariant/7", title: "Charcoal", color: "Charcoal", colorHex: "#232323", price: 155, available: false, sku: "MV-CAS-CHAR", inventory: 0 },
    ],
  },
  {
    id: "gid://shopify/Product/4",
    handle: "the-porto",
    title: "The Porto",
    subtitle: "Travel document holder",
    description:
      "Passport, boarding pass, cards — one slim sleeve. Built for the overhead-bin traveller who doesn't want a bag inside their bag.",
    descriptionHtml:
      "<p>Passport, boarding pass, cards — one slim sleeve. Built for the overhead-bin traveller who doesn't want a bag inside their bag.</p>",
    collection: "travel",
    featured: false,
    tags: [],
    materials: ["Full-grain Italian leather", "Elastic document strap"],
    dimensions: "14.5 × 10 cm",
    images: [
      { url: "/brand/product-porto-1.svg", alt: "The Porto travel document holder in sand leather, illustrated", width: 960, height: 1200 },
    ],
    variants: [
      { id: "gid://shopify/ProductVariant/8", title: "Sand", color: "Sand", colorHex: "#DCCDB8", price: 210, available: true, sku: "MV-POR-SAND", inventory: 27 },
    ],
  },
];

export function getAllProducts(): Product[] {
  return products;
}

export function getFeaturedProducts(): Product[] {
  return products.filter((p) => p.featured);
}

export function getProductByHandle(handle: string): Product | undefined {
  return products.find((p) => p.handle === handle);
}

export function getProductsByCollection(collection: Product["collection"]): Product[] {
  return products.filter((p) => p.collection === collection);
}
