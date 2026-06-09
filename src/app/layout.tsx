import type { Metadata } from "next";
import {
  Geist,
  Inter,
  Open_Sans,
  Nunito,
  Lora,
  Atkinson_Hyperlegible,
} from "next/font/google";
import Link from "next/link";
import FontPicker from "@/components/FontPicker";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});
const inter = Inter({ variable: "--font-inter", subsets: ["latin"] });
const openSans = Open_Sans({ variable: "--font-open-sans", subsets: ["latin"] });
const nunito = Nunito({ variable: "--font-nunito", subsets: ["latin"] });
const lora = Lora({ variable: "--font-lora", subsets: ["latin"] });
const atkinson = Atkinson_Hyperlegible({
  variable: "--font-atkinson",
  subsets: ["latin"],
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://pamotorcycletest.com"),
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
    url: "https://pamotorcycletest.com",
    siteName: "PA Moto Test",
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
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${inter.variable} ${openSans.variable} ${nunito.variable} ${lora.variable} ${atkinson.variable} h-full antialiased`}
    >
      <head>
        {/* Apply the saved font before first paint to avoid a font flash. */}
        <script
          dangerouslySetInnerHTML={{
            __html: `try{document.documentElement.dataset.font=localStorage.getItem("pa-moto-font")||"geist"}catch(e){}`,
          }}
        />
      </head>
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
              <FontPicker />
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
