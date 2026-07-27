export default function ClerkNotConfiguredNotice() {
  return (
    <div className="container-edit section-pad flex flex-col items-center gap-3 text-center">
      <p className="eyebrow">Setup Required</p>
      <h1 className="font-serif text-3xl">Authentication Not Configured</h1>
      <p className="max-w-md text-sm text-charcoal/60">
        This page needs Clerk credentials. Set <code>NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY</code>{" "}
        and <code>CLERK_SECRET_KEY</code> in <code>.env.local</code>, then restart the dev server.
      </p>
    </div>
  );
}
