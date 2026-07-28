"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { UserButton } from "@clerk/nextjs";

const links = [
  { href: "/admin", label: "Overview", exact: true },
  { href: "/admin/analytics", label: "Analytics" },
  { href: "/admin/orders", label: "Orders" },
  { href: "/admin/customers", label: "Customers" },
  { href: "/admin/products", label: "Products" },
  { href: "/admin/inventory", label: "Inventory" },
  { href: "/admin/discounts", label: "Discounts" },
];

export default function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="flex w-64 shrink-0 flex-col border-r border-charcoal/10 bg-warm-white">
      <div className="border-b border-charcoal/10 px-6 py-6">
        <p className="font-serif text-xl">Maison Vela</p>
        <p className="text-xs uppercase tracking-widest2 text-charcoal/50">Admin</p>
      </div>

      <nav className="flex-1 space-y-1 px-3 py-6">
        {links.map((l) => {
          const active = l.exact ? pathname === l.href : pathname.startsWith(l.href);
          return (
            <Link
              key={l.href}
              href={l.href}
              className={`block px-3 py-2 text-sm transition-colors ${
                active ? "bg-charcoal text-warm-white" : "text-charcoal/70 hover:bg-sand/30"
              }`}
            >
              {l.label}
            </Link>
          );
        })}
      </nav>

      <div className="flex items-center justify-between border-t border-charcoal/10 px-6 py-4">
        <Link href="/" className="text-xs uppercase tracking-widest2 text-olive hover:text-charcoal">
          &larr; View Store
        </Link>
        <UserButton afterSignOutUrl="/" />
      </div>
    </aside>
  );
}
