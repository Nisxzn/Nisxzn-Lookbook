import type { Metadata, Viewport } from "next";
import { Sofia_Sans_Condensed, Playfair_Display, Pacifico, Spline_Sans_Mono, Bebas_Neue } from "next/font/google";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";
import { SmoothScroll } from "@/lib/components/SmoothScroll";
import { CustomScrollbar } from "@/lib/components/CustomScrollbar";
import { CustomCursor } from "@/lib/components/CustomCursor";

const sofiaSans = Sofia_Sans_Condensed({
  variable: "--font-sofia",
  subsets: ["latin"],
});

const splineSansMono = Spline_Sans_Mono({
  variable: "--font-spline-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "600", "700", "900"],
});

const pacifico = Pacifico({
  variable: "--font-pacifico",
  subsets: ["latin"],
  weight: ["400"],
});

const bebasNeue = Bebas_Neue({
  variable: "--font-bebas-neue",
  subsets: ["latin"],
  weight: ["400"],
});

// Resolve the canonical site URL. Vercel injects VERCEL_PROJECT_PRODUCTION_URL
// (and VERCEL_URL for previews); fall back to the custom domain placeholder
// for local builds. Update the fallback once a custom domain is attached.
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL
  ? process.env.NEXT_PUBLIC_SITE_URL
  : process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : "https://nisxzn.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Nithish Parameswaran — AI/ML Engineer & Creative Developer",
  description: "Building intelligent systems — RAG pipelines, AI agents, deep learning, and interactive digital experiences.",
  openGraph: {
    type: "website",
    title: "Nithish Parameswaran — AI/ML Engineer & Creative Developer",
    description: "Building intelligent systems — RAG pipelines, AI agents, deep learning, and interactive digital experiences.",
    url: siteUrl,
    siteName: "Nithish Parameswaran",
    images: [{ url: "/images/hero_portrait3.png", width: 1200, height: 630, alt: "Nithish Parameswaran" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Nithish Parameswaran — AI/ML Engineer & Creative Developer",
    description: "Building intelligent systems — RAG pipelines, AI agents, deep learning, and interactive digital experiences.",
    images: ["/images/hero_portrait3.png"],
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#F7F7F7",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${sofiaSans.variable} ${playfair.variable} ${pacifico.variable} ${splineSansMono.variable} ${bebasNeue.variable} h-full antialiased`}
    >
      <head>
        {/* Preload the hero portrait (LCP candidate, served via CSS bg so it
            isn't auto-discovered early) to cut Largest Contentful Paint. */}
        <link rel="preload" as="image" href="images/hero_portrait3.png" />
      </head>
      <body className="min-h-full flex flex-col">
        <CustomCursor />
        <CustomScrollbar />
        <SmoothScroll>{children}</SmoothScroll>
        <SpeedInsights />
      </body>
    </html>
  );
}
