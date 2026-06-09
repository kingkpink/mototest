import type { Metadata } from "next";
import { Geist } from "next/font/google";
import Link from "next/link";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "PA Motorcycle Practice Test — Class M Permit Prep",
  description:
    "Free Pennsylvania motorcycle permit practice test. Realistic Class M knowledge-test questions straight from the PennDOT Motorcycle Operator Manual (PUB 147). 20 questions, 80% to pass.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-slate-50 text-slate-900">
        <header className="border-b border-slate-300 bg-white">
          <nav className="max-w-5xl mx-auto px-4 h-14 flex items-center justify-between">
            <Link href="/" className="font-bold text-slate-800 flex items-center gap-2">
              <span className="text-xl">🏍️</span>
              <span>PA Moto Test</span>
            </Link>
            <div className="flex items-center gap-1 text-sm font-medium">
              <Link href="/about" className="px-3 py-1.5 rounded-lg text-slate-600 hover:bg-slate-100">
                The Test
              </Link>
              <Link href="/exam" className="px-3 py-1.5 rounded-lg text-slate-600 hover:bg-slate-100">
                Mock Exam
              </Link>
              <Link href="/practice" className="px-3 py-1.5 rounded-lg text-slate-600 hover:bg-slate-100">
                Practice
              </Link>
              <Link href="/guide" className="px-3 py-1.5 rounded-lg text-slate-600 hover:bg-slate-100">
                Study Guide
              </Link>
            </div>
          </nav>
        </header>
        <main className="flex-1 w-full max-w-5xl mx-auto px-4 py-8">{children}</main>
        <footer className="border-t border-slate-300 bg-white py-6 text-center text-xs text-slate-500">
          Practice questions based on the PennDOT Motorcycle Operator Manual (PUB 147).
          Unofficial study aid — always confirm requirements at{" "}
          <a href="https://www.pa.gov/agencies/dmv" className="underline hover:text-slate-600">
            pa.gov/dmv
          </a>
          .
        </footer>
      </body>
    </html>
  );
}
