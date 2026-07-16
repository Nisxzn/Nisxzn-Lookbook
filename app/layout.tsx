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
    : "https://nithish.is-a.dev";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Nithish Parameswaran — AI/ML Engineer & Creative Developer",
  description: "Portfolio of Nithish Parameswaran, a Full Stack AI/ML Engineer specialized in building intelligent systems, RAG pipelines, AI agents, deep learning, and interactive digital experiences.",
  keywords: [
    "Nithish Parameswaran",
    "Nithish",
    "Parameswaran",
    "AI Engineer",
    "ML Engineer",
    "Full Stack Developer",
    "Creative Developer",
    "RAG Developer",
    "Deep Learning",
    "nithish.is-a.dev",
    "Software Engineer Portfolio"
  ],
  authors: [{ name: "Nithish Parameswaran", url: siteUrl }],
  creator: "Nithish Parameswaran",
  publisher: "Nithish Parameswaran",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: siteUrl,
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION || "google-site-verification-placeholder",
  },
  openGraph: {
    type: "website",
    title: "Nithish Parameswaran — AI/ML Engineer & Creative Developer",
    description: "Portfolio of Nithish Parameswaran, a Full Stack AI/ML Engineer specialized in building intelligent systems, RAG pipelines, AI agents, deep learning, and interactive digital experiences.",
    url: siteUrl,
    siteName: "Nithish Parameswaran Portfolio",
    locale: "en_US",
    images: [{ url: "/images/hero_portrait3.png", width: 1200, height: 630, alt: "Nithish Parameswaran - Full Stack AI/ML Engineer" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Nithish Parameswaran — AI/ML Engineer & Creative Developer",
    description: "Portfolio of Nithish Parameswaran, a Full Stack AI/ML Engineer specialized in building intelligent systems, RAG pipelines, AI agents, deep learning, and interactive digital experiences.",
    creator: "@nisxzn",
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
  const personJsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Nithish Parameswaran",
    "url": "https://nithish.is-a.dev",
    "jobTitle": "Full Stack AI/ML Engineer",
    "email": "nithishparameswaran2005@gmail.com",
    "telephone": "+919843043429",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Coimbatore",
      "addressRegion": "Tamil Nadu",
      "addressCountry": "India"
    },
    "sameAs": [
      "https://www.linkedin.com/in/nithishparameswaran/",
      "https://github.com/nisxzn",
      "https://leetcode.com/u/nithishparameswaran",
      "https://www.instagram.com/nisxzn/"
    ],
    "knowsAbout": [
      "Artificial Intelligence",
      "Machine Learning",
      "Deep Learning",
      "Natural Language Processing",
      "Retrieval-Augmented Generation (RAG)",
      "Full Stack Development",
      "React",
      "Next.js",
      "TypeScript",
      "Python"
    ]
  };

  const websiteJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Nithish Parameswaran Portfolio",
    "url": "https://nithish.is-a.dev",
    "author": "Nithish Parameswaran"
  };

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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
        <CustomCursor />
        <CustomScrollbar />
        <SmoothScroll>{children}</SmoothScroll>
        <SpeedInsights />
      </body>
    </html>
  );
}
