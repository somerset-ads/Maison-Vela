import Link from "next/link";
import { adminOrders } from "@/data/admin";
import { formatPrice } from "@/lib/format";

const statusColor: Record<string, string> = {
  Processing: "text-gold",
  Shipped: "text-olive",
  Delivered: "text-charcoal",
  Refunded: "text-red-700/70",
};

export default function AdminOrdersPage() {
  return (
    <div>
      <p className="eyebrow mb-2">Sales</p>
      <h1 className="mb-10 font-serif text-3xl">Orders</h1>

      <div className="border border-charcoal/10 bg-warm-white">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-charcoal/10 text-left text-xs uppercase tracking-widest2 text-charcoal/50">
              <th className="px-6 py-3 font-normal">Order</th>
              <th className="px-6 py-3 font-normal">Customer</th>
              <th className="px-6 py-3 font-normal">Date</th>
              <th className="px-6 py-3 font-normal">Items</th>
              <th className="px-6 py-3 font-normal">Status</th>
              <th className="px-6 py-3 text-right font-normal">Total</th>
            </tr>
          </thead>
          <tbody>
            {adminOrders.map((order) => (
              <tr key={order.id} className="border-b border-charcoal/5 last:border-0">
                <td className="px-6 py-4">
                  <Link href={`/admin/orders/${order.id}`} className="hover:text-olive">
                    {order.id}
                  </Link>
                </td>
                <td className="px-6 py-4">{order.customerName}</td>
                <td className="px-6 py-4 text-charcoal/60">
                  {new Date(order.date).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })}
                </td>
                <td className="px-6 py-4">{order.items.reduce((sum, i) => sum + i.quantity, 0)}</td>
                <td className={`px-6 py-4 ${statusColor[order.status]}`}>{order.status}</td>
                <td className="px-6 py-4 text-right">{formatPrice(order.total)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
