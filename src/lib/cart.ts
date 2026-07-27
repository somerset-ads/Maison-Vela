import { createStorefrontApiClient } from "@shopify/storefront-api-client";

const storeDomain = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN;
const storefrontToken = process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_TOKEN;

const client =
  storeDomain && storefrontToken
    ? createStorefrontApiClient({
        storeDomain,
        apiVersion: "2024-10",
        publicAccessToken: storefrontToken,
      })
    : null;

export interface ShopifyCartLine {
  id: string;
  quantity: number;
  merchandise: {
    id: string;
    title: string;
    product: { handle: string; title: string };
    image: { url: string; altText: string | null } | null;
    price: { amount: string };
  };
}

export interface ShopifyCart {
  id: string;
  checkoutUrl: string;
  totalQuantity: number;
  cost: { subtotalAmount: { amount: string; currencyCode: string } };
  lines: { nodes: ShopifyCartLine[] };
}

const CART_FIELDS = /* GraphQL */ `
  id
  checkoutUrl
  totalQuantity
  cost {
    subtotalAmount {
      amount
      currencyCode
    }
  }
  lines(first: 50) {
    nodes {
      id
      quantity
      merchandise {
        ... on ProductVariant {
          id
          title
          product {
            handle
            title
          }
          image {
            url
            altText
          }
          price {
            amount
          }
        }
      }
    }
  }
`;

export async function createCart(): Promise<ShopifyCart | null> {
  if (!client) return null;
  const mutation = /* GraphQL */ `
    mutation CartCreate {
      cartCreate {
        cart {
          ${CART_FIELDS}
        }
      }
    }
  `;
  const { data } = await client.request(mutation);
  return data.cartCreate.cart;
}

export async function addCartLine(
  cartId: string,
  variantId: string,
  quantity = 1
): Promise<ShopifyCart | null> {
  if (!client) return null;
  const mutation = /* GraphQL */ `
    mutation CartLinesAdd($cartId: ID!, $lines: [CartLineInput!]!) {
      cartLinesAdd(cartId: $cartId, lines: $lines) {
        cart {
          ${CART_FIELDS}
        }
      }
    }
  `;
  const { data } = await client.request(mutation, {
    variables: { cartId, lines: [{ merchandiseId: variantId, quantity }] },
  });
  return data.cartLinesAdd.cart;
}

export async function updateCartLine(
  cartId: string,
  lineId: string,
  quantity: number
): Promise<ShopifyCart | null> {
  if (!client) return null;
  const mutation = /* GraphQL */ `
    mutation CartLinesUpdate($cartId: ID!, $lines: [CartLineUpdateInput!]!) {
      cartLinesUpdate(cartId: $cartId, lines: $lines) {
        cart {
          ${CART_FIELDS}
        }
      }
    }
  `;
  const { data } = await client.request(mutation, {
    variables: { cartId, lines: [{ id: lineId, quantity }] },
  });
  return data.cartLinesUpdate.cart;
}

export async function removeCartLine(cartId: string, lineId: string): Promise<ShopifyCart | null> {
  if (!client) return null;
  const mutation = /* GraphQL */ `
    mutation CartLinesRemove($cartId: ID!, $lineIds: [ID!]!) {
      cartLinesRemove(cartId: $cartId, lineIds: $lineIds) {
        cart {
          ${CART_FIELDS}
        }
      }
    }
  `;
  const { data } = await client.request(mutation, { variables: { cartId, lineIds: [lineId] } });
  return data.cartLinesRemove.cart;
}

export async function fetchCart(cartId: string): Promise<ShopifyCart | null> {
  if (!client) return null;
  const query = /* GraphQL */ `
    query FetchCart($cartId: ID!) {
      cart(id: $cartId) {
        ${CART_FIELDS}
      }
    }
  `;
  const { data } = await client.request(query, { variables: { cartId } });
  return data.cart;
}

export const isShopifyCartConfigured = Boolean(client);
