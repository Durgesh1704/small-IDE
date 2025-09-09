import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "EARTH Platform - Revolutionizing Sustainability with Blockchain",
  description: "Join the movement to combat climate change through transparent carbon credits and eco-actions. Plant trees, recycle plastic, and trade carbon credits on our blockchain-powered platform.",
  keywords: ["EARTH", "carbon credits", "sustainability", "blockchain", "climate change", "tree planting", "recycling", "environment", "eco"],
  authors: [{ name: "EARTH Team" }],
  openGraph: {
    title: "EARTH Platform - Blockchain for Sustainability",
    description: "Revolutionizing sustainability with blockchain transparency. Track eco-actions and trade carbon credits.",
    url: "https://earth-platform.com",
    siteName: "EARTH",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "EARTH Platform - Blockchain for Sustainability",
    description: "Revolutionizing sustainability with blockchain transparency",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
