import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import ScrollMorphNav from "@/components/ScrollMorphNav";
import Footer from "@/components/Footer";
import { PopoverProvider } from "@/contexts/PopoverContext";

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
  title: "Pablo Gutiérrez – Cybersecurity & IAM Engineer | Transitioning to Pentester",
  description: "Cybersecurity & IAM Engineer (Blue Team) actively transitioning to Pentester/Red Team. Preparing for OSCP and eJPTv2. Active HTB practice (33 machines). AD security, IAM automation, offensive security preparation.",
  keywords: ["Cybersecurity", "IAM", "Blue Team", "Red Team", "Pentester", "Offensive Security", "Active Directory", "Penetration Testing", "OSCP", "eJPTv2", "Security Automation", "Hack The Box", "Career Transition"],
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
          <main className="transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)]" data-sidebar-content>
            {children}
          </main>
          <Footer />
        </PopoverProvider>
      </body>
    </html>
  );
}
