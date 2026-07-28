export interface AdminOrderItem {
  title: string;
  variant: string;
  quantity: number;
  price: number;
}

export interface AdminOrder {
  id: string;
  customerName: string;
  customerEmail: string;
  date: string;
  status: "Processing" | "Shipped" | "Delivered" | "Refunded";
  total: number;
  items: AdminOrderItem[];
}

export interface AdminCustomer {
  id: string;
  name: string;
  email: string;
  joinedDate: string;
  ordersCount: number;
  totalSpent: number;
  location: string;
}

export interface DiscountCode {
  code: string;
  percentage: number;
  createdAt: string;
  expiresAt: string | null;
  usageCount: number;
  active: boolean;
}

/**
 * Mock admin data — powers the dashboard, orders, customers, and analytics
 * pages before real Shopify Admin API + order history exists. Replace with
 * live queries once SHOPIFY_ADMIN_API_TOKEN is set (see src/lib/shopify-admin.ts).
 */
export const adminOrders: AdminOrder[] = [
  { id: "MV-10482", customerName: "Alexandre Moreau", customerEmail: "alexandre@example.com", date: "2026-07-24", status: "Shipped", total: 145, items: [{ title: "The Riviera", variant: "Sand", quantity: 1, price: 145 }] },
  { id: "MV-10481", customerName: "Claudia Rinaldi", customerEmail: "claudia@example.com", date: "2026-07-23", status: "Delivered", total: 340, items: [{ title: "The Amalfi", variant: "Charcoal", quantity: 1, price: 185 }, { title: "The Cassis", variant: "Olive", quantity: 1, price: 155 }] },
  { id: "MV-10480", customerName: "James Harrington", customerEmail: "james@example.com", date: "2026-07-22", status: "Processing", total: 210, items: [{ title: "The Porto", variant: "Sand", quantity: 1, price: 210 }] },
  { id: "MV-10479", customerName: "Sophie Laurent", customerEmail: "sophie@example.com", date: "2026-07-20", status: "Delivered", total: 290, items: [{ title: "The Riviera", variant: "Charcoal", quantity: 2, price: 145 }] },
  { id: "MV-10478", customerName: "Marco Bianchi", customerEmail: "marco@example.com", date: "2026-07-18", status: "Delivered", total: 155, items: [{ title: "The Cassis", variant: "Olive", quantity: 1, price: 155 }] },
  { id: "MV-10477", customerName: "Isabelle Dubois", customerEmail: "isabelle@example.com", date: "2026-07-15", status: "Refunded", total: 185, items: [{ title: "The Amalfi", variant: "Sand", quantity: 1, price: 185 }] },
  { id: "MV-10476", customerName: "Alexandre Moreau", customerEmail: "alexandre@example.com", date: "2026-07-10", status: "Delivered", total: 145, items: [{ title: "The Riviera", variant: "Olive", quantity: 1, price: 145 }] },
  { id: "MV-10475", customerName: "Henry Whitfield", customerEmail: "henry@example.com", date: "2026-07-05", status: "Delivered", total: 355, items: [{ title: "The Porto", variant: "Sand", quantity: 1, price: 210 }, { title: "The Cassis", variant: "Olive", quantity: 1, price: 155 }] },
];

export const adminCustomers: AdminCustomer[] = [
  { id: "cust-1", name: "Alexandre Moreau", email: "alexandre@example.com", joinedDate: "2025-11-02", ordersCount: 2, totalSpent: 290, location: "Geneva, CH" },
  { id: "cust-2", name: "Claudia Rinaldi", email: "claudia@example.com", joinedDate: "2025-09-14", ordersCount: 1, totalSpent: 340, location: "Milan, IT" },
  { id: "cust-3", name: "James Harrington", email: "james@example.com", joinedDate: "2026-07-22", ordersCount: 1, totalSpent: 210, location: "London, UK" },
  { id: "cust-4", name: "Sophie Laurent", email: "sophie@example.com", joinedDate: "2026-01-08", ordersCount: 1, totalSpent: 290, location: "Paris, FR" },
  { id: "cust-5", name: "Marco Bianchi", email: "marco@example.com", joinedDate: "2026-03-19", ordersCount: 1, totalSpent: 155, location: "Florence, IT" },
  { id: "cust-6", name: "Isabelle Dubois", email: "isabelle@example.com", joinedDate: "2025-12-05", ordersCount: 1, totalSpent: 185, location: "Lyon, FR" },
  { id: "cust-7", name: "Henry Whitfield", email: "henry@example.com", joinedDate: "2025-08-30", ordersCount: 1, totalSpent: 355, location: "Edinburgh, UK" },
];

export const discountCodes: DiscountCode[] = [
  { code: "SUMMER15", percentage: 15, createdAt: "2026-06-01", expiresAt: "2026-08-31", usageCount: 42, active: true },
  { code: "WELCOME10", percentage: 10, createdAt: "2026-01-01", expiresAt: null, usageCount: 118, active: true },
];

export const revenueByMonth = [
  { month: "Feb", revenue: 3820 },
  { month: "Mar", revenue: 4210 },
  { month: "Apr", revenue: 3960 },
  { month: "May", revenue: 5140 },
  { month: "Jun", revenue: 5870 },
  { month: "Jul", revenue: 6430 },
];

export function getRevenueTotal(): number {
  return adminOrders.filter((o) => o.status !== "Refunded").reduce((sum, o) => sum + o.total, 0);
}

export function getAverageOrderValue(): number {
  const valid = adminOrders.filter((o) => o.status !== "Refunded");
  return valid.length ? Math.round(getRevenueTotal() / valid.length) : 0;
}
