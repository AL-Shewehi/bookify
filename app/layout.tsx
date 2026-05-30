import type { Metadata } from "next";
import { IBM_Plex_Serif, Inter, Mona_Sans } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { RootLayoutClient } from "./root-layout-client";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

const ibmPlexSerif = IBM_Plex_Serif({
  variable: "--font-ibm-plex-serif",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const monaSans = Mona_Sans({
  variable: "--font-mona-sans",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Bookify",
  description: "Transform your books into interactive AI conversations.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={cn(
        "h-full relative font-sans",
        "antialiased",
        ibmPlexSerif.variable,
        monaSans.variable,
        "font-sans",
        inter.variable,
      )}
    >
      <body className="min-h-full flex flex-col">
        <RootLayoutClient>{children}</RootLayoutClient>
      </body>
    </html>
  );
}
