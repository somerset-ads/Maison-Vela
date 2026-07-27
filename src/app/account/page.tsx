import { currentUser } from "@clerk/nextjs/server";
import { UserButton } from "@clerk/nextjs";
import Link from "next/link";
import { isClerkConfigured } from "@/lib/auth-config";
import ClerkNotConfiguredNotice from "@/components/ClerkNotConfiguredNotice";

export default async function AccountPage() {
  if (!isClerkConfigured) return <ClerkNotConfiguredNotice />;

  const user = await currentUser();

  const links = [
    { href: "/account/orders", label: "Order History", desc: "Track and manage your orders" },
    { href: "/account/wishlist", label: "Wishlist", desc: "Items you've saved for later" },
    { href: "/account/rewards", label: "Rewards", desc: "Points, tier, and referral programme" },
  ];

  return (
    <div className="container-edit section-pad">
      <div className="mb-14 flex items-center justify-between">
        <div>
          <p className="eyebrow mb-2">Account</p>
          <h1 className="font-serif text-4xl">
            Welcome back{user?.firstName ? `, ${user.firstName}` : ""}
          </h1>
        </div>
        <UserButton afterSignOutUrl="/" />
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
        {links.map((l) => (
          <Link
            key={l.href}
            href={l.href}
            className="border border-charcoal/10 p-8 transition-colors hover:border-charcoal"
          >
            <h2 className="font-serif text-xl">{l.label}</h2>
            <p className="mt-2 text-sm text-charcoal/60">{l.desc}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
