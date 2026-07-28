import { notFound } from "next/navigation";
import Link from "next/link";
import { adminOrders } from "@/data/admin";
import { formatPrice } from "@/lib/format";

export default function AdminOrderDetailPage({ params }: { params: { id: string } }) {
  const order = adminOrders.find((o) => o.id === params.id);
  if (!order) notFound();

  return (
    <div>
      <Link href="/admin/orders" className="text-xs uppercase tracking-widest2 text-olive hover:text-charcoal">
        &larr; Back to Orders
      </Link>

      <div className="mt-4 mb-10 flex items-center justify-between">
        <h1 className="font-serif text-3xl">{order.id}</h1>
        <span className="text-sm uppercase tracking-widest2">{order.status}</span>
      </div>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
        <div className="border border-charcoal/10 bg-warm-white p-6 md:col-span-2">
          <h2 className="mb-4 font-serif text-lg">Items</h2>
          <table className="w-full text-sm">
            <tbody>
              {order.items.map((item, i) => (
                <tr key={i} className="border-b border-charcoal/5 last:border-0">
                  <td className="py-3">{item.title}</td>
                  <td className="py-3 text-charcoal/60">{item.variant}</td>
                  <td className="py-3 text-charcoal/60">× {item.quantity}</td>
                  <td className="py-3 text-right">{formatPrice(item.price * item.quantity)}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="mt-4 flex justify-between border-t border-charcoal/10 pt-4 font-serif text-lg">
            <span>Total</span>
            <span>{formatPrice(order.total)}</span>
          </div>
        </div>

        <div className="border border-charcoal/10 bg-warm-white p-6">
          <h2 className="mb-4 font-serif text-lg">Customer</h2>
          <p>{order.customerName}</p>
          <p className="text-sm text-charcoal/60">{order.customerEmail}</p>
          <h2 className="mb-2 mt-6 font-serif text-lg">Order Date</h2>
          <p className="text-sm text-charcoal/60">
            {new Date(order.date).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })}
          </p>
        </div>
      </div>
    </div>
  );
}
