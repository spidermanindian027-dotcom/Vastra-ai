import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "VESTRA AI — See it. Style it. Own it.",
    template: "%s | VESTRA AI",
  },
  description:
    "AI-powered personal fashion stylist. Scan your outfit, understand your style, and build better looks from what you already own.",
  keywords: [
    "AI stylist",
    "fashion AI",
    "outfit scanner",
    "personal stylist",
    "wardrobe manager",
    "style score",
    "virtual try-on",
  ],
  openGraph: {
    title: "VESTRA AI — See it. Style it. Own it.",
    description:
      "AI styling built around your wardrobe, proportions, colours and real life.",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-[#0d0d0d] text-[#f5f0e8] font-sans">
        {children}
      </body>
    </html>
  );
}
