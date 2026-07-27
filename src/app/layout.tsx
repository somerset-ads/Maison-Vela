import type { Metadata } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import "./globals.css";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { CartProvider } from "@/components/cart/CartContext";
import CartDrawer from "@/components/cart/CartDrawer";
import { WishlistProvider } from "@/components/wishlist/WishlistContext";
import { isClerkConfigured } from "@/lib/auth-config";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-cormorant",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-inter",
  display: "swap",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://maisonvela.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Maison Vela — Minimalist Leather Card Holders",
    template: "%s — Maison Vela",
  },
  description:
    "Considered leather goods for the way you actually travel. Maison Vela makes minimalist card holders, cut from full-grain leather and finished by hand in small runs — designed for a lifetime of quiet use.",
  keywords: [
    "minimalist card holder",
    "leather card holder",
    "luxury card holder",
    "slim wallet",
    "quiet luxury accessories",
  ],
  openGraph: {
    title: "Maison Vela — Minimalist Leather Card Holders",
    description:
      "Considered leather goods for the way you actually travel. Cut from full-grain leather, finished by hand.",
    url: siteUrl,
    siteName: "Maison Vela",
    locale: "en_GB",
    type: "website",
    images: [
      {
        url: "/og/og-default.jpg",
        width: 1200,
        height: 630,
        alt: "Maison Vela leather card holders on linen",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Maison Vela — Minimalist Leather Card Holders",
    description: "Considered leather goods for the way you actually travel.",
    images: ["/og/og-default.jpg"],
  },
  icons: {
    icon: "/favicon.ico",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const body = (
    <html lang="en" className={`${cormorant.variable} ${inter.variable}`}>
      <body className="flex min-h-screen flex-col font-sans">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "Maison Vela",
              url: siteUrl,
              logo: `${siteUrl}/logo.png`,
              sameAs: [
                "https://instagram.com/maisonvela",
                "https://www.tiktok.com/@maisonvela",
              ],
            }),
          }}
        />
        <WishlistProvider>
          <CartProvider>
            <Nav />
            <main className="flex-1">{children}</main>
            <Footer />
            <CartDrawer />
          </CartProvider>
        </WishlistProvider>
      </body>
    </html>
  );

  // ClerkProvider throws if publishable/secret keys are missing, so it's only
  // mounted once Clerk is actually configured (see src/lib/auth-config.ts).
  if (!isClerkConfigured) return body;

  return (
    <ClerkProvider
      appearance={{
        variables: {
          colorPrimary: "#232323",
          colorBackground: "#F8F6F2",
          colorText: "#232323",
          fontFamily: "var(--font-inter)",
        },
      }}
    >
      {body}
    </ClerkProvider>
  );
}
