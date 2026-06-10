import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Link from "next/link";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

const inter = Inter({ variable: "--font-inter", subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL("https://www.pamotorcycletest.com"),
  title: {
    default: "PA Motorcycle Practice Test — Class M Permit Prep",
    template: "%s — PA Motorcycle Practice Test",
  },
  description:
    "Free Pennsylvania motorcycle permit practice test. Realistic Class M knowledge-test questions straight from the PennDOT Motorcycle Operator Manual (PUB 147). 20 questions, 80% to pass.",
  keywords: [
    "PA motorcycle permit test",
    "Pennsylvania motorcycle practice test",
    "Class M permit",
    "PennDOT motorcycle test",
    "motorcycle knowledge test",
  ],
  openGraph: {
    title: "PA Motorcycle Practice Test — Class M Permit Prep",
    description:
      "Free PA motorcycle permit practice test. Questions nearly identical to the real DMV exam. 20 questions, 80% to pass.",
    url: "https://www.pamotorcycletest.com",
    siteName: "PA Motorcycle Test",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "PA Motorcycle Practice Test — Class M Permit Prep",
    description:
      "Free PA motorcycle permit practice test. Questions nearly identical to the real DMV exam.",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${inter.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-slate-50 text-slate-900">
        <header className="border-b border-slate-200 bg-white">
          <nav className="max-w-5xl mx-auto px-4 flex flex-wrap items-center justify-between gap-x-4 py-2.5 sm:h-14 sm:py-0">
            <Link href="/" className="flex items-center gap-2.5">
              <svg
                className="h-7 w-auto text-blue-800"
                viewBox="0 0 100 66"
                aria-hidden="true"
              >
                {/* Simplified Pennsylvania silhouette: Erie notch top-left,
                    Delaware River jags on the east edge */}
                <path
                  fill="currentColor"
                  d="M4 62 L4 17 L7 14 L13 7 L17 11 L92 11 L94 17 L90 22 L95 28 L89 36 L94 44 L89 50 L93 56 L88 62 Z"
                />
                <text
                  x="47"
                  y="45.3"
                  textAnchor="middle"
                  fill="#ffffff"
                  fontSize="30"
                  fontWeight="700"
                  fontFamily="inherit"
                  letterSpacing="1"
                >
                  PA
                </text>
              </svg>
              <span className="font-semibold tracking-tight text-slate-900">
                Motorcycle Test
              </span>
            </Link>
            <div className="-mx-1 flex w-full items-center gap-0.5 overflow-x-auto whitespace-nowrap pt-1.5 text-sm font-medium sm:w-auto sm:pt-0">
              <Link href="/about" className="px-3 py-1.5 rounded-md text-slate-600 hover:bg-slate-100 hover:text-slate-900">
                The Test
              </Link>
              <Link href="/exam" className="px-3 py-1.5 rounded-md text-slate-600 hover:bg-slate-100 hover:text-slate-900">
                Mock Exam
              </Link>
              <Link href="/practice" className="px-3 py-1.5 rounded-md text-slate-600 hover:bg-slate-100 hover:text-slate-900">
                Practice
              </Link>
              <Link href="/guide" className="px-3 py-1.5 rounded-md text-slate-600 hover:bg-slate-100 hover:text-slate-900">
                Study Guide
              </Link>
            </div>
          </nav>
        </header>
        <main className="flex-1 w-full max-w-5xl mx-auto px-4 py-8 sm:py-10">{children}</main>
        <footer className="border-t border-slate-200 bg-white py-6 px-4 text-center text-xs leading-relaxed text-slate-500">
          Practice questions based on the PennDOT Motorcycle Operator Manual (
          <a
            href="/pub-147-motorcycle-manual.pdf"
            download
            className="underline hover:text-slate-600"
          >
            PUB 147 — download PDF
          </a>
          {" · "}
          <a
            href="https://www.virustotal.com/gui/file/6516663100314cf5bb2b5b5270c210eb1b80048c7b36fc91b691bf88ccfb1d24/detection"
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:text-slate-600"
          >
            VirusTotal scan
          </a>
          ). Unofficial study aid — always confirm requirements at{" "}
          <a href="https://www.pa.gov/agencies/dmv" className="underline hover:text-slate-600">
            pa.gov/dmv
          </a>
          .
        </footer>
        <Analytics />
      </body>
    </html>
  );
}
