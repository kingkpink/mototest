import type { Metadata } from "next";

// practice/page.tsx is a client component and can't export metadata,
// so the route's SEO tags live here.
export const metadata: Metadata = {
  title: "Practice by Topic",
  description:
    "Drill PA motorcycle permit questions by topic — helmets, intersections, braking, alcohol laws, and more. Instant feedback and explanations after every answer.",
  alternates: { canonical: "/practice" },
};

export default function PracticeLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return children;
}
