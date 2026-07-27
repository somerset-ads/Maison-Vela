import { currentUser } from "@clerk/nextjs/server";
import { isClerkConfigured } from "@/lib/auth-config";
import ClerkNotConfiguredNotice from "@/components/ClerkNotConfiguredNotice";

export default async function RewardsPage() {
  if (!isClerkConfigured) return <ClerkNotConfiguredNotice />;

  const user = await currentUser();
  const referralCode = user ? `VELA-${user.id.slice(-6).toUpperCase()}` : "VELA-XXXXXX";

  return (
    <div className="container-edit section-pad">
      <p className="eyebrow mb-2">Account</p>
      <h1 className="mb-14 font-serif text-4xl">Rewards &amp; Referrals</h1>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        <div className="border border-charcoal/10 p-8">
          <p className="eyebrow mb-2">Vela Circle</p>
          <p className="font-serif text-2xl">Silver Tier</p>
          <p className="mt-2 text-sm text-charcoal/60">240 points · 260 to Gold</p>
          <div className="mt-4 h-1 w-full bg-charcoal/10">
            <div className="h-1 bg-gold" style={{ width: "48%" }} />
          </div>
          <ul className="mt-6 space-y-2 text-sm text-charcoal/70">
            <li>1 point per £1 spent</li>
            <li>Gold Tier — early access to new releases</li>
            <li>Platinum Tier — complimentary engraving &amp; free express shipping</li>
          </ul>
        </div>

        <div className="border border-charcoal/10 p-8">
          <p className="eyebrow mb-2">Refer a Friend</p>
          <p className="font-serif text-2xl">Give 15%, Get 15%</p>
          <p className="mt-2 text-sm text-charcoal/60">
            Share your code — they get 15% off their first order, you get 15% off your next.
          </p>
          <div className="mt-6 flex items-center justify-between border border-charcoal/20 px-4 py-3">
            <span className="font-serif tracking-widest2">{referralCode}</span>
            <span className="text-xs uppercase tracking-widest2 text-olive">Copy</span>
          </div>
        </div>
      </div>
    </div>
  );
}
