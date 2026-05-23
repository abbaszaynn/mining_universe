import type { Metadata } from "next";
import { Inter, Syne } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const syne = Syne({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Mining Universe | Mineral Intelligence Platform",
  description:
    "Scroll-native 3D experience for mining companies, regional intelligence, and mineral exploration in Gilgit Baltistan.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${syne.variable} min-h-[100dvh] bg-[#030712] font-sans antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
