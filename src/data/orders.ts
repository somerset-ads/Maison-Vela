export interface Order {
  id: string;
  date: string;
  status: "Processing" | "Shipped" | "Delivered";
  total: number;
  items: { title: string; variant: string; quantity: number; image: string }[];
}

/**
 * Demo order history. In production, replace with a fetch to the Shopify
 * Admin API (customer orders) keyed by the signed-in Clerk user's email —
 * see src/app/account/orders/page.tsx for the integration point.
 */
export const demoOrders: Order[] = [
  {
    id: "MV-10482",
    date: "2026-06-14",
    status: "Delivered",
    total: 145,
    items: [
      {
        title: "The Riviera",
        variant: "Sand",
        quantity: 1,
        image: "https://images.unsplash.com/photo-1627123424574-724758594e93?q=80&w=400",
      },
    ],
  },
  {
    id: "MV-10221",
    date: "2026-04-02",
    status: "Delivered",
    total: 185,
    items: [
      {
        title: "The Amalfi",
        variant: "Charcoal",
        quantity: 1,
        image: "https://images.unsplash.com/photo-1591561954557-26941169b49e?q=80&w=400",
      },
    ],
  },
];
