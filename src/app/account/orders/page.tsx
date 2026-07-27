import Image from "next/image";
import { formatPrice } from "@/lib/format";
import { demoOrders } from "@/data/orders";

export default function OrdersPage() {
  return (
    <div className="container-edit section-pad">
      <p className="eyebrow mb-2">Account</p>
      <h1 className="mb-14 font-serif text-4xl">Order History</h1>

      <div className="space-y-8">
        {demoOrders.map((order) => (
          <div key={order.id} className="border border-charcoal/10 p-8">
            <div className="mb-6 flex flex-wrap items-center justify-between gap-4 border-b border-charcoal/10 pb-6">
              <div>
                <p className="text-xs uppercase tracking-widest2 text-charcoal/50">Order</p>
                <p className="font-serif text-lg">{order.id}</p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-widest2 text-charcoal/50">Placed</p>
                <p>{new Date(order.date).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })}</p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-widest2 text-charcoal/50">Status</p>
                <p>{order.status}</p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-widest2 text-charcoal/50">Total</p>
                <p>{formatPrice(order.total)}</p>
              </div>
            </div>
            {order.items.map((item) => (
              <div key={item.title} className="flex items-center gap-4">
                <div className="relative h-16 w-14 overflow-hidden bg-sand/30">
                  <Image src={item.image} alt={item.title} fill sizes="56px" className="object-cover" />
                </div>
                <div>
                  <p>{item.title}</p>
                  <p className="text-sm text-charcoal/50">
                    {item.variant} × {item.quantity}
                  </p>
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
