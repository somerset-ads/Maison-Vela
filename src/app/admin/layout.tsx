import { currentUser } from "@clerk/nextjs/server";
import { isClerkConfigured } from "@/lib/auth-config";
import ClerkNotConfiguredNotice from "@/components/ClerkNotConfiguredNotice";
import AdminSidebar from "@/components/admin/AdminSidebar";
import { AdminProductsProvider } from "@/components/admin/AdminProductsContext";

/**
 * Access to /admin requires the signed-in Clerk user's publicMetadata.role
 * to equal "admin". Set this on a user via the Clerk Dashboard
 * (Users -> select user -> Metadata -> Public metadata: { "role": "admin" })
 * or the Backend API — there's no self-service way to grant it, by design.
 */
export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  if (!isClerkConfigured) return <ClerkNotConfiguredNotice />;

  const user = await currentUser();
  const role = user?.publicMetadata?.role;

  if (role !== "admin") {
    return (
      <div className="container-edit section-pad flex flex-col items-center gap-3 text-center">
        <p className="eyebrow">Restricted</p>
        <h1 className="font-serif text-3xl">Access Denied</h1>
        <p className="max-w-md text-sm text-charcoal/60">
          This account doesn&rsquo;t have admin access. Ask an existing admin to set{" "}
          <code>publicMetadata.role = &quot;admin&quot;</code> for your user in the Clerk Dashboard.
        </p>
      </div>
    );
  }

  return (
    <AdminProductsProvider>
      <div className="flex min-h-[calc(100vh-80px)]">
        <AdminSidebar />
        <div className="flex-1 bg-sand/10 p-8 md:p-12">{children}</div>
      </div>
    </AdminProductsProvider>
  );
}
