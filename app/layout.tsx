import "./globals.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { Inter } from "next/font/google";
import type { Metadata } from "next";

export const metadata: Metadata = {
  metadataBase: new URL("https://myadbreak.com"),

  verification: {
    google: "PhCX4IMy-QOBg9m6YC1m4XdWDH9IZTdx-CxSOYPiPa4",
  },

  title: {
    default: "Myadbreak, insights on live ad formats",
    template: "%s | MyAdBreak",
  },

  description:
    "MyAdBreak tracks patterns from live advertising campaigns and turns them into usable signals. See what’s actually working across Meta, YouTube, and more.",

  keywords: [
    "myadbreak",
    "ad signals",
    "meta ad library alternative",
    "ad intelligence",
    "ad patterns",
    "d2c ads",
  ],

  alternates: {
    canonical: "https://myadbreak.com",
  },

  openGraph: {
    title: "MyAdBreak — Signals from live advertising",
    description:
      "See what’s actually working in ads. Patterns, hooks, and structures from live campaigns.",
    url: "https://myadbreak.com",
    siteName: "MyAdBreak",
    images: [
      {
        url: "/og.png", // make sure this exists in /public
        width: 1200,
        height: 630,
      },
    ],
    locale: "en_US",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "MyAdBreak",
    description:
      "Signals from live advertising. See what’s working across campaigns.",
    images: ["/og.png"],
  },
};

const inter = Inter({subsets:['latin'],variable:'--font-sans'});


export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="font-sans">
      <body className="antialiased">
          <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              name: "MyAdBreak",
              url: "https://myadbreak.com",
              description:
                "Track what’s actually working in ads. MyAdBreak surfaces patterns from live campaigns.",
              potentialAction: {
                "@type": "SearchAction",
                target:
                  "https://myadbreak.com/signals?q={search_term_string}",
                "query-input": "required name=search_term_string",
              },
            }),
          }}
        />

        <Navbar />

        <main>{children}</main>
        
        <Footer />
      </body>
    </html>
  );
}