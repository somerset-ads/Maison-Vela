"use client";

import { usePathname } from "next/navigation";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import CartDrawer from "@/components/cart/CartDrawer";

// /admin has its own sidebar shell (see src/app/admin/layout.tsx) and
// shouldn't be wrapped in the storefront nav/footer/cart drawer.
export default function SiteChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith("/admin");

  if (isAdmin) return <main className="flex-1">{children}</main>;

  return (
    <>
      <Nav />
      <main className="flex-1">{children}</main>
      <Footer />
      <CartDrawer />
    </>
  );
}
