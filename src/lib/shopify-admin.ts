import type { Product, ProductVariant } from "@/types/product";

const storeDomain = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN;
const adminToken = process.env.SHOPIFY_ADMIN_API_TOKEN;

export const isShopifyAdminConfigured = Boolean(storeDomain && adminToken);

const ADMIN_API_VERSION = "2024-10";

async function adminRequest<T = any>(query: string, variables?: Record<string, unknown>): Promise<T> {
  if (!storeDomain || !adminToken) {
    throw new Error("Shopify Admin API is not configured");
  }

  const res = await fetch(`https://${storeDomain}/admin/api/${ADMIN_API_VERSION}/graphql.json`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Shopify-Access-Token": adminToken,
    },
    body: JSON.stringify({ query, variables }),
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error(`Shopify Admin API request failed: ${res.status}`);
  }

  const json = await res.json();
  if (json.errors) {
    throw new Error(`Shopify Admin API error: ${JSON.stringify(json.errors)}`);
  }
  return json.data as T;
}

/**
 * Creates a product in the real Shopify store via the Admin API. Only usable
 * once SHOPIFY_ADMIN_API_TOKEN and NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN are set —
 * until then, admin product CRUD runs against the browser-local store in
 * src/components/admin/AdminProductsContext.tsx instead.
 */
export async function adminCreateProduct(product: Omit<Product, "id">): Promise<string> {
  const mutation = /* GraphQL */ `
    mutation ProductCreate($input: ProductInput!) {
      productCreate(input: $input) {
        product { id }
        userErrors { field message }
      }
    }
  `;

  const data = await adminRequest<{
    productCreate: { product: { id: string } | null; userErrors: { field: string[]; message: string }[] };
  }>(mutation, {
    input: {
      title: product.title,
      descriptionHtml: product.descriptionHtml,
      tags: product.tags,
      productType: product.collection,
    },
  });

  if (data.productCreate.userErrors.length) {
    throw new Error(data.productCreate.userErrors.map((e) => e.message).join(", "));
  }
  return data.productCreate.product!.id;
}

export async function adminUpdateProduct(id: string, product: Partial<Product>): Promise<void> {
  const mutation = /* GraphQL */ `
    mutation ProductUpdate($input: ProductInput!) {
      productUpdate(input: $input) {
        userErrors { field message }
      }
    }
  `;

  await adminRequest(mutation, {
    input: {
      id,
      title: product.title,
      descriptionHtml: product.descriptionHtml,
      tags: product.tags,
    },
  });
}

export async function adminDeleteProduct(id: string): Promise<void> {
  const mutation = /* GraphQL */ `
    mutation ProductDelete($input: ProductDeleteInput!) {
      productDelete(input: $input) {
        userErrors { field message }
      }
    }
  `;
  await adminRequest(mutation, { input: { id } });
}

export async function adminSetInventory(variant: ProductVariant, quantity: number): Promise<void> {
  const mutation = /* GraphQL */ `
    mutation InventorySet($input: InventorySetQuantitiesInput!) {
      inventorySetQuantities(input: $input) {
        userErrors { field message }
      }
    }
  `;
  await adminRequest(mutation, {
    input: {
      name: "available",
      reason: "correction",
      quantities: [{ inventoryItemId: variant.id, quantity }],
    },
  });
}

export interface DiscountCodeInput {
  code: string;
  percentage: number;
  startsAt: string;
  endsAt?: string;
}

export async function adminCreateDiscountCode(input: DiscountCodeInput): Promise<string> {
  const mutation = /* GraphQL */ `
    mutation DiscountCodeBasicCreate($basicCodeDiscount: DiscountCodeBasicInput!) {
      discountCodeBasicCreate(basicCodeDiscount: $basicCodeDiscount) {
        codeDiscountNode { id }
        userErrors { field message }
      }
    }
  `;

  const data = await adminRequest<{
    discountCodeBasicCreate: {
      codeDiscountNode: { id: string } | null;
      userErrors: { field: string[]; message: string }[];
    };
  }>(mutation, {
    basicCodeDiscount: {
      title: input.code,
      code: input.code,
      startsAt: input.startsAt,
      endsAt: input.endsAt,
      customerSelection: { all: true },
      customerGets: {
        value: { percentage: input.percentage / 100 },
        items: { all: true },
      },
      appliesOncePerCustomer: false,
    },
  });

  if (data.discountCodeBasicCreate.userErrors.length) {
    throw new Error(data.discountCodeBasicCreate.userErrors.map((e) => e.message).join(", "));
  }
  return data.discountCodeBasicCreate.codeDiscountNode!.id;
}
