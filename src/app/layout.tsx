import type { Metadata } from "next";
import { Cinzel_Decorative, Inter, Syne } from "next/font/google";
import { LoadingProvider } from "@/components/loading/LoadingProvider";
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

const cinzelDecorative = Cinzel_Decorative({
  subsets: ["latin"],
  variable: "--font-got",
  weight: ["400", "700", "900"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "GOS | Game of Stones, Mining in Gilgit Baltistan",
  description:
    "Game of Stones connects global investors with licensed mining operators across Gilgit Baltistan, from copper and marble to gold and polymetallic assets under full regulatory compliance.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        style={{ backgroundColor: "#030712" }}
        className={`${inter.variable} ${syne.variable} ${cinzelDecorative.variable} min-h-[100dvh] bg-[#030712] font-sans antialiased`}
      >
        <LoadingProvider>{children}</LoadingProvider>
      </body>
    </html>
  );
}
