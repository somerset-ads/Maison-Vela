import { createStorefrontApiClient } from "@shopify/storefront-api-client";
import type { Product, ProductImage, ProductVariant } from "@/types/product";
import {
  getAllProducts as getMockAll,
  getFeaturedProducts as getMockFeatured,
  getProductByHandle as getMockByHandle,
  getProductsByCollection as getMockByCollection,
} from "@/data/products";

const storeDomain = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN;
const storefrontToken = process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_TOKEN;

/**
 * Live Storefront API client — only created when credentials are present.
 * Every fetcher below falls back to the local catalog (src/data/products.ts)
 * so the site is fully functional in local dev before a Shopify store exists.
 */
const client =
  storeDomain && storefrontToken
    ? createStorefrontApiClient({
        storeDomain,
        apiVersion: "2024-10",
        publicAccessToken: storefrontToken,
      })
    : null;

const PRODUCT_FIELDS = /* GraphQL */ `
  id
  handle
  title
  description
  descriptionHtml
  tags
  productType
  images(first: 10) {
    nodes {
      url
      altText
      width
      height
    }
  }
  variants(first: 10) {
    nodes {
      id
      title
      sku
      availableForSale
      selectedOptions {
        name
        value
      }
      price {
        amount
      }
      compareAtPrice {
        amount
      }
    }
  }
`;

const COLOR_HEX: Record<string, string> = {
  Sand: "#DCCDB8",
  Charcoal: "#232323",
  Olive: "#69715E",
};

function mapShopifyProduct(node: any, collection: Product["collection"]): Product {
  const images: ProductImage[] = node.images.nodes.map((img: any) => ({
    url: img.url,
    alt: img.altText ?? node.title,
    width: img.width,
    height: img.height,
  }));

  const variants: ProductVariant[] = node.variants.nodes.map((v: any) => {
    const color =
      v.selectedOptions.find((o: any) => o.name === "Color")?.value ?? v.title;
    return {
      id: v.id,
      title: v.title,
      color,
      colorHex: COLOR_HEX[color] ?? "#69715E",
      price: Number(v.price.amount),
      compareAtPrice: v.compareAtPrice ? Number(v.compareAtPrice.amount) : undefined,
      available: v.availableForSale,
      sku: v.sku ?? "",
    };
  });

  return {
    id: node.id,
    handle: node.handle,
    title: node.title,
    subtitle: node.description?.split(".")[0] ?? "",
    description: node.description ?? "",
    descriptionHtml: node.descriptionHtml ?? "",
    collection,
    images,
    variants,
    materials: [],
    dimensions: "",
    featured: node.tags?.includes("featured") ?? false,
    tags: node.tags ?? [],
  };
}

export async function getAllProducts(): Promise<Product[]> {
  if (!client) return getMockAll();

  const query = /* GraphQL */ `
    query AllProducts {
      products(first: 50) {
        nodes {
          ${PRODUCT_FIELDS}
        }
      }
    }
  `;

  const { data } = await client.request(query);
  return data.products.nodes.map((n: any) => mapShopifyProduct(n, "card-holders"));
}

export async function getFeaturedProducts(): Promise<Product[]> {
  if (!client) return getMockFeatured();

  const query = /* GraphQL */ `
    query FeaturedProducts {
      products(first: 6, query: "tag:featured") {
        nodes {
          ${PRODUCT_FIELDS}
        }
      }
    }
  `;

  const { data } = await client.request(query);
  return data.products.nodes.map((n: any) => mapShopifyProduct(n, "card-holders"));
}

export async function getProductByHandle(handle: string): Promise<Product | undefined> {
  if (!client) return getMockByHandle(handle);

  const query = /* GraphQL */ `
    query ProductByHandle($handle: String!) {
      product(handle: $handle) {
        ${PRODUCT_FIELDS}
      }
    }
  `;

  const { data } = await client.request(query, { variables: { handle } });
  if (!data.product) return undefined;
  return mapShopifyProduct(data.product, "card-holders");
}

export async function getProductsByCollection(
  collection: Product["collection"]
): Promise<Product[]> {
  if (!client) return getMockByCollection(collection);

  const query = /* GraphQL */ `
    query ProductsByCollection($handle: String!) {
      collection(handle: $handle) {
        products(first: 50) {
          nodes {
            ${PRODUCT_FIELDS}
          }
        }
      }
    }
  `;

  const { data } = await client.request(query, { variables: { handle: collection } });
  if (!data.collection) return [];
  return data.collection.products.nodes.map((n: any) => mapShopifyProduct(n, collection));
}

export const isShopifyConfigured = Boolean(client);
