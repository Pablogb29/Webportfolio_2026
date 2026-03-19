import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "CTF Machines",
  description:
    "Hack The Box machines solved by Pablo Gutiérrez. 33+ machines with OSCP-oriented writeups covering Windows, Linux, Active Directory, and web exploitation.",
  openGraph: {
    title: "CTF Machines – Pablo Gutiérrez",
    description:
      "Hack The Box machines solved with OSCP-oriented writeups.",
  },
};

export default function CTFLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
