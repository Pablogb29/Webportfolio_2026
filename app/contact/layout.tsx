import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with Pablo Gutiérrez for cybersecurity, penetration testing, or IAM engineering opportunities.",
  openGraph: {
    title: "Contact – Pablo Gutiérrez",
    description:
      "Reach out for cybersecurity opportunities and collaboration.",
  },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
