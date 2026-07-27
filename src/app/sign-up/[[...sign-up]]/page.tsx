import { SignUp } from "@clerk/nextjs";
import { isClerkConfigured } from "@/lib/auth-config";
import ClerkNotConfiguredNotice from "@/components/ClerkNotConfiguredNotice";

export default function SignUpPage() {
  if (!isClerkConfigured) return <ClerkNotConfiguredNotice />;

  return (
    <div className="container-edit section-pad flex justify-center">
      <SignUp
        appearance={{
          elements: {
            card: "shadow-none border border-charcoal/10",
            formButtonPrimary: "bg-charcoal hover:bg-olive text-sm normal-case",
          },
        }}
      />
    </div>
  );
}
