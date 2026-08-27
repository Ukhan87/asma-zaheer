import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import { resolveSiteUrl } from "@/lib/site-url";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

const siteUrl = resolveSiteUrl();

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Asma Zaheer — Luxury Beauty UGC",
  description:
    "Elevated skincare rituals and high-conversion beauty storytelling. Media kit and collaboration briefs for @itsasmazaheer.",
  openGraph: {
    title: "Asma Zaheer — Luxury Beauty UGC",
    description:
      "Elevated skincare rituals and high-conversion beauty storytelling.",
    type: "website",
    images: ["/images/hero-portrait.jpg"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Asma Zaheer — Luxury Beauty UGC",
    description:
      "Elevated skincare rituals and high-conversion beauty storytelling.",
    images: ["/images/hero-portrait.jpg"],
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${playfair.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-porcelain font-sans text-onyx">
        {children}
      </body>
    </html>
  );
}
