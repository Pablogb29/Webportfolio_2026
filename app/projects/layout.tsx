import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Professional and personal projects by Pablo Gutiérrez: security automation, IAM tooling, HTB writeups, and full-stack applications.",
  openGraph: {
    title: "Projects – Pablo Gutiérrez",
    description:
      "Security automation, IAM tooling, HTB writeups, and full-stack projects.",
  },
};

export default function ProjectsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
