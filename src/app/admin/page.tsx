import Link from "next/link";
import { adminOrders, adminCustomers, getRevenueTotal, getAverageOrderValue } from "@/data/admin";
import { formatPrice } from "@/lib/format";

const statusColor: Record<string, string> = {
  Processing: "text-gold",
  Shipped: "text-olive",
  Delivered: "text-charcoal",
  Refunded: "text-red-700/70",
};

export default function AdminOverviewPage() {
  const revenue = getRevenueTotal();
  const aov = getAverageOrderValue();
  const recentOrders = adminOrders.slice(0, 5);

  const stats = [
    { label: "Revenue (30 days)", value: formatPrice(revenue) },
    { label: "Orders", value: adminOrders.length.toString() },
    { label: "Avg. Order Value", value: formatPrice(aov) },
    { label: "Customers", value: adminCustomers.length.toString() },
  ];

  return (
    <div>
      <p className="eyebrow mb-2">Dashboard</p>
      <h1 className="mb-10 font-serif text-3xl">Overview</h1>

      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        {stats.map((s) => (
          <div key={s.label} className="border border-charcoal/10 bg-warm-white p-6">
            <p className="text-xs uppercase tracking-widest2 text-charcoal/50">{s.label}</p>
            <p className="mt-2 font-serif text-2xl">{s.value}</p>
          </div>
        ))}
      </div>

      <div className="mt-10 border border-charcoal/10 bg-warm-white">
        <div className="flex items-center justify-between border-b border-charcoal/10 px-6 py-4">
          <h2 className="font-serif text-lg">Recent Orders</h2>
          <Link href="/admin/orders" className="text-xs uppercase tracking-widest2 text-olive hover:text-charcoal">
            View All
          </Link>
        </div>
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-charcoal/10 text-left text-xs uppercase tracking-widest2 text-charcoal/50">
              <th className="px-6 py-3 font-normal">Order</th>
              <th className="px-6 py-3 font-normal">Customer</th>
              <th className="px-6 py-3 font-normal">Date</th>
              <th className="px-6 py-3 font-normal">Status</th>
              <th className="px-6 py-3 text-right font-normal">Total</th>
            </tr>
          </thead>
          <tbody>
            {recentOrders.map((order) => (
              <tr key={order.id} className="border-b border-charcoal/5 last:border-0">
                <td className="px-6 py-4">
                  <Link href={`/admin/orders/${order.id}`} className="hover:text-olive">
                    {order.id}
                  </Link>
                </td>
                <td className="px-6 py-4">{order.customerName}</td>
                <td className="px-6 py-4 text-charcoal/60">
                  {new Date(order.date).toLocaleDateString("en-GB", { day: "numeric", month: "short" })}
                </td>
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
