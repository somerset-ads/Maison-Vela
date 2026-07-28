export interface ProductVariant {
  id: string;
  title: string;
  color: string;
  colorHex: string;
  price: number;
  compareAtPrice?: number;
  available: boolean;
  sku: string;
  inventory?: number;
}

export interface ProductImage {
  url: string;
  alt: string;
  width: number;
  height: number;
}

export interface Product {
  id: string;
  handle: string;
  title: string;
  subtitle: string;
  description: string;
  descriptionHtml: string;
  collection: "card-holders" | "wallets" | "travel";
  images: ProductImage[];
  variants: ProductVariant[];
  materials: string[];
  dimensions: string;
  featured: boolean;
  tags: string[];
}

export interface CartLine {
  id: string;
  variantId: string;
  productHandle: string;
  title: string;
  variantTitle: string;
  price: number;
  quantity: number;
  image: ProductImage;
}
