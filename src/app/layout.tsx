import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "PayoffPath - See Your Debt Disappear",
  description:
    "Financial command center for people who respect data over debt. Track expenses, forecast payoff timelines, and execute your plan.",
  keywords: [
    "personal finance",
    "debt payoff",
    "budget tracker",
    "expense tracking",
    "financial planning",
  ],
  openGraph: {
    title: "PayoffPath - See Your Debt Disappear",
    description:
      "Financial command center for people who respect data over debt.",
    type: "website",
    locale: "en_US",
    siteName: "PayoffPath",
  },
  twitter: {
    card: "summary_large_image",
    title: "PayoffPath - See Your Debt Disappear",
    description:
      "Financial command center for people who respect data over debt.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${inter.variable} ${jetbrainsMono.variable} font-sans antialiased`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
