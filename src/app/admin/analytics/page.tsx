import { adminOrders, revenueByMonth, getRevenueTotal, getAverageOrderValue } from "@/data/admin";
import RevenueChart from "@/components/admin/RevenueChart";
import TopProductsChart from "@/components/admin/TopProductsChart";
import { formatPrice } from "@/lib/format";

function getTopProducts() {
  const totals = new Map<string, number>();
  adminOrders
    .filter((o) => o.status !== "Refunded")
    .forEach((order) => {
      order.items.forEach((item) => {
        totals.set(item.title, (totals.get(item.title) ?? 0) + item.price * item.quantity);
      });
    });
  return Array.from(totals, ([title, revenue]) => ({ title, revenue })).sort((a, b) => b.revenue - a.revenue);
}

function getStatusBreakdown() {
  const counts = new Map<string, number>();
  adminOrders.forEach((o) => counts.set(o.status, (counts.get(o.status) ?? 0) + 1));
  return Array.from(counts, ([status, count]) => ({ status, count }));
}

export default function AnalyticsPage() {
  const topProducts = getTopProducts();
  const statusBreakdown = getStatusBreakdown();
  const conversionEstimate = 2.4; // placeholder until real site analytics (GA4/Plausible) are wired in

  return (
    <div>
      <p className="eyebrow mb-2">Dashboard</p>
      <h1 className="mb-10 font-serif text-3xl">Analytics</h1>

      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        <div className="border border-charcoal/10 bg-warm-white p-6">
          <p className="text-xs uppercase tracking-widest2 text-charcoal/50">Total Revenue</p>
          <p className="mt-2 font-serif text-2xl">{formatPrice(getRevenueTotal())}</p>
        </div>
        <div className="border border-charcoal/10 bg-warm-white p-6">
          <p className="text-xs uppercase tracking-widest2 text-charcoal/50">Avg. Order Value</p>
          <p className="mt-2 font-serif text-2xl">{formatPrice(getAverageOrderValue())}</p>
        </div>
        <div className="border border-charcoal/10 bg-warm-white p-6">
          <p className="text-xs uppercase tracking-widest2 text-charcoal/50">Orders</p>
          <p className="mt-2 font-serif text-2xl">{adminOrders.length}</p>
        </div>
        <div className="border border-charcoal/10 bg-warm-white p-6">
          <p className="text-xs uppercase tracking-widest2 text-charcoal/50">Est. Conversion Rate</p>
          <p className="mt-2 font-serif text-2xl">{conversionEstimate}%</p>
        </div>
      </div>

      <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="border border-charcoal/10 bg-warm-white p-6">
          <h2 className="mb-4 font-serif text-lg">Revenue, Last 6 Months</h2>
          <RevenueChart data={revenueByMonth} />
        </div>
        <div className="border border-charcoal/10 bg-warm-white p-6">
          <h2 className="mb-4 font-serif text-lg">Top Products by Revenue</h2>
          <TopProductsChart data={topProducts} />
        </div>
      </div>

      <div className="mt-8 border border-charcoal/10 bg-warm-white p-6">
        <h2 className="mb-4 font-serif text-lg">Order Status Breakdown</h2>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          {statusBreakdown.map((s) => (
            <div key={s.status}>
              <p className="text-xs uppercase tracking-widest2 text-charcoal/50">{s.status}</p>
              <p className="mt-1 font-serif text-xl">{s.count}</p>
            </div>
          ))}
        </div>
      </div>

      <p className="mt-6 text-xs text-charcoal/40">
        Revenue and order figures are from demo data (src/data/admin.ts). Wire these to real Shopify
        Admin API order queries once the store is live — see src/lib/shopify-admin.ts.
      </p>
    </div>
  );
}
