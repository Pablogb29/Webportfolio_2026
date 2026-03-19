import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Booking Rental Scam: Phishing & OSINT Takedown",
  description:
    "Real-world case study: investigation of a sophisticated rental phishing scam targeting expatriates in Luxembourg. OSINT, domain analysis, and threat actor mapping.",
  openGraph: {
    title: "Booking Rental Scam: Phishing & OSINT Takedown – Pablo Gutiérrez",
    description:
      "Real-world phishing investigation using OSINT, domain analysis, and threat intelligence.",
  },
};

export default function CaseStudyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
