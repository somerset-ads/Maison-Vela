# Maison Vela — E-commerce Storefront

A Next.js 14 (App Router) + TypeScript + Tailwind CSS storefront for Maison Vela, a
minimalist leather card-holder brand (quiet luxury / European coastal aesthetic).

This covers the web storefront (Phase 1) and the admin dashboard (Phase 2). Mobile
app and marketing asset generation are separate follow-on phases — see
[What's not built yet](#whats-not-built-yet).

## Stack

- **Next.js 14** (App Router), **TypeScript**, **Tailwind CSS**
- **Framer Motion** — cart drawer transitions
- **Recharts** — admin analytics charts
- **Shopify Storefront API** (`@shopify/storefront-api-client`) — product/collection data
- **Shopify Admin API** (GraphQL, hand-rolled client) — admin product/inventory/discount mutations
- **Clerk** — authentication for `/account` and role-gated `/admin`
- **Stripe Checkout** — payment (Apple Pay / Google Pay enabled automatically for eligible browsers when enabled in the Stripe Dashboard)
- **Resend** / **Klaviyo** — contact form and newsletter, optional

## Local setup

This environment doesn't have Node installed, so the project was hand-written
rather than scaffolded with `create-next-app` — the structure is standard, so it
should install and run normally wherever Node 18+ is available.

```bash
cd maison-vela
npm install
cp .env.example .env.local   # fill in real values — see below
npm run dev
```

Visit http://localhost:3000. **The site is fully functional without any
credentials** — product data falls back to `src/data/products.ts`, and forms log
to the server console instead of sending. Checkout requires a Stripe key (see
below) since there's no local-only fallback for payments.

## Environment variables

| Variable | Purpose | Required for |
|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | Production URL, used in metadata/sitemap | SEO |
| `NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN` / `NEXT_PUBLIC_SHOPIFY_STOREFRONT_TOKEN` | Shopify Storefront API | Real product catalog (falls back to `src/data/products.ts` if unset) |
| `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` / `CLERK_SECRET_KEY` | Clerk auth | `/account`, `/admin`, `/sign-in`, `/sign-up` — without these, those routes render a "connect Clerk" notice instead of the real UI (see `src/lib/auth-config.ts`) |
| `SHOPIFY_ADMIN_API_TOKEN` | Shopify Admin API | `/admin` product/discount/inventory mutations — without it, admin CRUD runs against a browser-local store (see [Admin dashboard](#admin-dashboard) below) |
| `STRIPE_SECRET_KEY` | Stripe Checkout session creation | `/checkout` — without it, checkout returns a friendly "not configured" error rather than crashing |
| `RESEND_API_KEY` / `CONTACT_TO_EMAIL` | Contact form email | Optional — logs to console if unset |
| `KLAVIYO_PRIVATE_KEY` / `KLAVIYO_LIST_ID` | Newsletter signup | Optional — logs to console if unset |

## Project structure

```
src/
  app/                    Route segments (App Router)
    page.tsx              Landing page
    shop/page.tsx          Shop (collection grid, ?collection= filter)
    shop/[handle]/page.tsx PDP (gallery, variant picker, related products)
    about/page.tsx          Brand story
    journal/                Blog listing + [slug] article template
    contact/page.tsx        Contact form
    faq/page.tsx             FAQ accordion
    cart/page.tsx            Full cart page
    checkout/page.tsx        Order summary + Stripe redirect
    account/                 Clerk-protected: dashboard, orders, wishlist, rewards
    admin/                   Clerk role-gated: overview, analytics, products, orders,
                              customers, inventory, discounts (see below)
    sign-in/, sign-up/       Clerk auth pages
    api/                     newsletter, contact, checkout, admin/discounts route handlers
    sitemap.ts, robots.ts    Auto-generated SEO files
  components/
    SiteChrome.tsx           Renders storefront Nav/Footer everywhere except /admin
    Nav.tsx, Footer.tsx      Site chrome
    cart/                    CartContext (localStorage) + CartDrawer
    wishlist/                WishlistContext (localStorage)
    product/                 ProductCard, ProductGallery, AddToCartForm
    home/                    Hero, FeaturedCollection, Benefits, Reviews, etc.
    admin/                   AdminSidebar, AdminProductsContext, ProductForm, charts
  lib/
    shopify.ts               Storefront API client + local-catalog fallback
    shopify-admin.ts         Admin API client (product/inventory/discount mutations)
    cart.ts                  Shopify Cart API mutations (used once Shopify is live)
    auth-config.ts           isClerkConfigured flag used for graceful fallbacks
    format.ts                Currency formatting
  data/
    products.ts               Local product catalog (fallback + seed data)
    journal.ts, orders.ts      Blog posts, demo order history (storefront)
    admin.ts                   Demo orders/customers/discounts/revenue (admin dashboard)
  middleware.ts               Clerk route protection for /account and /admin
```

## Mobile app

The `maison-vela-app` Expo project (sibling directory) is a companion mobile app
sharing this same Shopify/Stripe backend. `/api/mobile-checkout` in this project
creates a Stripe PaymentIntent for the app's native PaymentSheet (Apple Pay /
Google Pay) — separate from `/api/checkout`, which creates a hosted Checkout
Session for the web storefront. Both read the same `STRIPE_SECRET_KEY`.

## Admin dashboard

`/admin` is a role-gated back office: overview stats, revenue/top-product analytics
(Recharts), product CRUD, inventory editing, order + customer lists, and a discount
code generator.

- **Access control**: requires Clerk auth *and* `publicMetadata.role === "admin"`
  on the signed-in user. There's no self-service way to grant this — set it via
  Clerk Dashboard → Users → select user → Public metadata → `{ "role": "admin" }`.
  Anyone signed in without that role sees "Access Denied", not the dashboard.
- **Products/inventory** run against a browser-local store (`AdminProductsContext`,
  `localStorage`) seeded from `src/data/products.ts`, so Add/Edit/Delete/inventory
  actually work today without a real Shopify store. This is intentionally separate
  from the storefront's product data — the storefront reads from Shopify/static data
  via server components, which can't share client `localStorage` state. Once
  `SHOPIFY_ADMIN_API_TOKEN` is set, wire the mutation functions in
  `AdminProductsContext.tsx` to the real ones in `src/lib/shopify-admin.ts`.
- **Discount codes** call `/api/admin/discounts`, which creates a real Shopify
  discount (`discountCodeBasicCreate`) when the Admin API is configured, and
  otherwise just validates input while the page keeps its own local list.
- **Orders/customers/analytics** currently read demo data from `src/data/admin.ts`.
  Replace with real Shopify Admin API order/customer queries once the store has
  order history.

## Architecture notes

- **Cart** currently runs client-side against `localStorage` (`CartContext`) so
  Add to Bag works immediately with the local catalog. `src/lib/cart.ts` has the
  real Shopify Cart API mutations ready — swap `CartContext` to call those once
  the Shopify store is live, so checkout can hand off a real Shopify cart instead
  of (or alongside) the current Stripe Checkout flow.
- **Checkout** uses Stripe Checkout Sessions (`/api/checkout`), which
  automatically surfaces Apple Pay / Google Pay on eligible devices once enabled
  in the Stripe Dashboard — no extra code needed. If you'd rather use Shopify's
  own hosted checkout (simpler if you're fully on Shopify), redirect to the
  Shopify `checkoutUrl` from `createCart`/`addCartLine` in `src/lib/cart.ts`
  instead, and drop the Stripe route.
- **Auth** uses Clerk for `/account`, `/sign-in`, `/sign-up`. Without Clerk keys
  set, `ClerkProvider` and the Clerk middleware are skipped entirely and those
  routes show a "connect Clerk" notice instead of crashing — same pattern as
  the Shopify/Stripe/Klaviyo fallbacks. Set the keys to get real auth.

## Before going live

1. Set up the real Shopify store, add products, and set the Storefront API env vars.
2. Set up Clerk, Stripe (enable Apple Pay/Google Pay in the dashboard), and Klaviyo.
3. Replace Unsplash placeholder imagery throughout `src/data/`, `src/components/home/`,
   and `src/app/about` with real product/lifestyle photography.
4. Add `/favicon.ico`, `/logo.png`, and `/og/og-default.jpg` to `public/` (referenced
   in `layout.tsx` but not yet generated).
5. Replace the placeholder Privacy Policy and Terms pages with reviewed copy.
6. Fill in the studio address / contact details on the Contact page with real ones.

## What's not built yet

Per the original brief, these are separate phases not covered by this build:

- **Native mobile app** (Apple/Google Pay, wishlist, push notifications, dark mode)
- **Marketing content** (Instagram/TikTok post copy, email flows, launch campaign)
- **Brand assets** (logo design, packaging, business cards)

## Deployment (Vercel)

```bash
git add .
git commit -m "Initial Maison Vela storefront"
gh repo create maison-vela --private --source=. --push
```

Import the repo at [vercel.com](https://vercel.com), add the environment variables
from `.env.example` with real values, and deploy. Every push to `main` auto-deploys.
