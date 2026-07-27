import { NextResponse } from "next/server";
import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { isClerkConfigured } from "@/lib/auth-config";

const isProtectedRoute = createRouteMatcher(["/account(.*)"]);

// Falls back to a no-op middleware when Clerk keys aren't set, so the site
// still runs locally before auth is configured (see src/lib/auth-config.ts).
// Account pages themselves render a "connect Clerk" notice in that case.
export default isClerkConfigured
  ? clerkMiddleware((auth, req) => {
      if (isProtectedRoute(req)) {
        auth().protect();
      }
    })
  : () => NextResponse.next();

export const config = {
  matcher: ["/((?!_next|.*\\..*).*)", "/(api|trpc)(.*)"],
};
