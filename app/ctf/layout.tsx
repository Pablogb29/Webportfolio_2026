import type { Metadata } from "next";
import { htbCopy } from "@/lib/htb-stats";

export const metadata: Metadata = {
  title: "CTF Machines",
  description: htbCopy.ctfDescription,
  openGraph: {
    title: "CTF Machines – Pablo Gutiérrez",
    description: htbCopy.ctfDescription,
  },
};

export default function CTFLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
