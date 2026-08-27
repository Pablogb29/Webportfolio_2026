import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import ScrollMorphNav from "@/components/ScrollMorphNav";
import Footer from "@/components/Footer";
import { PopoverProvider } from "@/contexts/PopoverContext";
import { htbCopy } from "@/lib/htb-stats";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.pabloinfosec.com"),
  title: {
    default: "Pablo Gutiérrez – Cybersecurity Engineer",
    template: "%s | Pablo Gutiérrez",
  },
  description: htbCopy.siteDescription,
  keywords: [
    "Cybersecurity",
    "IAM",
    "Blue Team",
    "Red Team",
    "Pentester",
    "Offensive Security",
    "Active Directory",
    "Penetration Testing",
    "OSCP",
    "CPTS",
    "Security Automation",
    "Hack The Box",
  ],
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Pablo Gutiérrez – Cybersecurity Portfolio",
    title: "Pablo Gutiérrez – Cybersecurity Engineer",
    description: htbCopy.siteDescription,
  },
  twitter: {
    card: "summary",
    title: "Pablo Gutiérrez – Cybersecurity Engineer",
    description: htbCopy.siteDescription,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable}`}>
      <body className="bg-background text-gray-light font-sans">
        <PopoverProvider>
          <ScrollMorphNav />
          <main className="md:ml-14 transition-[margin] duration-300">
            {children}
          </main>
          <Footer />
        </PopoverProvider>
      </body>
    </html>
  );
}
