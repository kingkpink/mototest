import Link from "next/link";
import { QUESTIONS } from "@/data/questions";
import { TEST_FACTS, PERMIT_RULES } from "@/data/facts";

export const metadata = {
  alternates: { canonical: "/" },
};

const websiteStructuredData = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "PA Motorcycle Test",
  url: "https://www.pamotorcycletest.com",
  description:
    "Free Pennsylvania motorcycle permit practice test based on the PennDOT Motorcycle Operator Manual (PUB 147).",
};

export default function Home() {
  return (
    <div className="space-y-12 sm:space-y-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(websiteStructuredData),
        }}
      />
      {/* Hero */}
      <section className="text-center pt-4 sm:pt-8">
        <p className="text-xs font-semibold uppercase tracking-widest text-blue-800">
          Pennsylvania Class M &amp; Learner&apos;s Permit
        </p>
        <h1 className="mt-3 text-3xl sm:text-5xl font-bold text-slate-900 tracking-tight">
          Pass your PA motorcycle
          <br className="hidden sm:block" /> permit test the first time
        </h1>
        <p className="mt-4 text-base sm:text-lg text-slate-600 max-w-2xl mx-auto">
          {QUESTIONS.length} realistic questions pulled straight from the official PennDOT
          Motorcycle Operator Manual — the same source the real knowledge test uses.
          Free, no signup, unlimited attempts.
        </p>
        <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center px-2 sm:px-0">
          <Link
            href="/exam"
            className="px-7 py-3 rounded-lg bg-blue-800 text-white font-semibold hover:bg-blue-900 transition text-center"
          >
            Take the mock exam
          </Link>
          <Link
            href="/practice"
            className="px-7 py-3 rounded-lg bg-white border border-slate-300 text-slate-700 font-semibold hover:bg-slate-50 hover:border-slate-400 transition text-center"
          >
            Practice by topic
          </Link>
        </div>
        <p className="mt-6 text-sm text-slate-500 max-w-xl mx-auto">
          Riders who took the real PA permit test report these practice questions
          are nearly identical to the ones on the actual exam.
        </p>
      </section>

      {/* Mode cards */}
      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card
          href="/about"
          title="The Test"
          desc="Format, number of questions, passing score, and what to expect at the DMV counter."
        />
        <Card
          href="/exam"
          title="Mock Exam"
          desc="20 random questions, just like the DMV. Score 16+ (80%) to pass. No hints until the end."
        />
        <Card
          href="/practice"
          title="Practice Mode"
          desc="Pick a topic and learn as you go — instant feedback and an explanation after every answer."
        />
        <Card
          href="/guide"
          title="Study Guide"
          desc="The key facts, numbers, and permit rules condensed from the whole manual."
        />
      </section>

      {/* Test facts */}
      <section className="grid gap-4 sm:gap-6 md:grid-cols-2">
        <div className="rounded-lg border border-slate-200 bg-white p-5 sm:p-6">
          <h2 className="text-base font-semibold text-slate-900 mb-4">
            About the knowledge test
          </h2>
          <dl className="space-y-3">
            {TEST_FACTS.map((f) => (
              <div key={f.label} className="flex justify-between gap-4 text-sm">
                <dt className="text-slate-500">{f.label}</dt>
                <dd className="font-medium text-slate-900 text-right">{f.value}</dd>
              </div>
            ))}
          </dl>
        </div>
        <div className="rounded-lg border border-slate-200 bg-white p-5 sm:p-6">
          <h2 className="text-base font-semibold text-slate-900 mb-4">
            Learner&apos;s permit rules
          </h2>
          <ul className="space-y-2.5">
            {PERMIT_RULES.map((r) => (
              <li key={r} className="flex gap-2.5 text-sm text-slate-700">
                <span className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-blue-800" />
                {r}
              </li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  );
}

function Card({
  href,
  title,
  desc,
}: {
  href: string;
  title: string;
  desc: string;
}) {
  return (
    <Link
      href={href}
      className="flex h-full flex-col rounded-lg border border-slate-200 bg-white p-5 hover:border-blue-700 hover:shadow-sm transition group"
    >
      <h3 className="font-semibold text-slate-900 group-hover:text-blue-800">
        {title}
      </h3>
      <p className="mt-1.5 flex-1 text-sm text-slate-600">{desc}</p>
      <span className="mt-3 text-sm font-medium text-blue-800">View</span>
    </Link>
  );
}
