import { adminCustomers } from "@/data/admin";
import { formatPrice } from "@/lib/format";

export default function AdminCustomersPage() {
  return (
    <div>
      <p className="eyebrow mb-2">Sales</p>
      <h1 className="mb-10 font-serif text-3xl">Customers</h1>

      <div className="border border-charcoal/10 bg-warm-white">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-charcoal/10 text-left text-xs uppercase tracking-widest2 text-charcoal/50">
              <th className="px-6 py-3 font-normal">Name</th>
              <th className="px-6 py-3 font-normal">Email</th>
              <th className="px-6 py-3 font-normal">Location</th>
              <th className="px-6 py-3 font-normal">Joined</th>
              <th className="px-6 py-3 font-normal">Orders</th>
              <th className="px-6 py-3 text-right font-normal">Lifetime Spend</th>
            </tr>
          </thead>
          <tbody>
            {adminCustomers
              .slice()
              .sort((a, b) => b.totalSpent - a.totalSpent)
              .map((c) => (
                <tr key={c.id} className="border-b border-charcoal/5 last:border-0">
                  <td className="px-6 py-4">{c.name}</td>
                  <td className="px-6 py-4 text-charcoal/60">{c.email}</td>
                  <td className="px-6 py-4 text-charcoal/60">{c.location}</td>
                  <td className="px-6 py-4 text-charcoal/60">
                    {new Date(c.joinedDate).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })}
                  </td>
                  <td className="px-6 py-4">{c.ordersCount}</td>
                  <td className="px-6 py-4 text-right">{formatPrice(c.totalSpent)}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
      <p className="mt-4 text-xs text-charcoal/40">
        Demo data (src/data/admin.ts). In production, source this from Shopify
        customers + Clerk user records.
      </p>
    </div>
  );
}
