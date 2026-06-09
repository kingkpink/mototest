import Link from "next/link";
import { QUESTIONS } from "@/data/questions";
import { TEST_FACTS, PERMIT_RULES } from "@/data/facts";

export default function Home() {
  return (
    <div className="space-y-12">
      {/* Hero */}
      <section className="text-center pt-6">
        <div className="inline-flex items-center gap-2 rounded-full bg-indigo-100 text-indigo-700 px-3 py-1 text-xs font-semibold mb-4">
          Pennsylvania • Class M & Learner&apos;s Permit
        </div>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
          Pass your PA motorcycle
          <br />
          permit test the first time
        </h1>
        <p className="mt-4 text-lg text-slate-600 max-w-2xl mx-auto">
          {QUESTIONS.length} realistic questions pulled straight from the official PennDOT
          Motorcycle Operator Manual — the same source the real knowledge test uses.
          Free, no signup, unlimited attempts.
        </p>
        <div className="mt-8 flex flex-wrap gap-3 justify-center">
          <Link
            href="/exam"
            className="px-7 py-3 rounded-xl bg-black text-white font-semibold text-lg hover:bg-slate-800 shadow-sm transition"
          >
            Take the mock exam →
          </Link>
          <Link
            href="/practice"
            className="px-7 py-3 rounded-xl bg-white border border-slate-300 text-slate-700 font-semibold text-lg hover:bg-slate-50 transition"
          >
            Practice by topic
          </Link>
        </div>
      </section>

      {/* Mode cards */}
      <section className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <Card
          href="/about"
          emoji="ℹ️"
          title="The Test"
          desc="Format, number of questions, passing score, and what to expect at the DMV counter."
        />
        <Card
          href="/exam"
          emoji="📝"
          title="Mock Exam"
          desc="20 random questions, just like the DMV. Score 16+ (80%) to pass. No hints until the end."
        />
        <Card
          href="/practice"
          emoji="🎯"
          title="Practice Mode"
          desc="Pick a topic and learn as you go — instant feedback and an explanation after every answer."
        />
        <Card
          href="/guide"
          emoji="📖"
          title="Study Guide"
          desc="The key facts, numbers, and permit rules condensed from the whole manual."
        />
      </section>

      {/* Test facts */}
      <section className="grid gap-6 md:grid-cols-2">
        <div className="rounded-2xl border border-slate-300 bg-white p-6">
          <h2 className="text-lg font-bold text-slate-800 mb-4">
            About the knowledge test
          </h2>
          <dl className="space-y-3">
            {TEST_FACTS.map((f) => (
              <div key={f.label} className="flex justify-between gap-4 text-sm">
                <dt className="text-slate-500">{f.label}</dt>
                <dd className="font-semibold text-slate-800 text-right">{f.value}</dd>
              </div>
            ))}
          </dl>
        </div>
        <div className="rounded-2xl border border-slate-300 bg-white p-6">
          <h2 className="text-lg font-bold text-slate-800 mb-4">
            Learner&apos;s permit rules
          </h2>
          <ul className="space-y-2.5">
            {PERMIT_RULES.map((r) => (
              <li key={r} className="flex gap-2 text-sm text-slate-700">
                <span className="text-indigo-500 mt-0.5">●</span>
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
  emoji,
  title,
  desc,
}: {
  href: string;
  emoji: string;
  title: string;
  desc: string;
}) {
  return (
    <Link
      href={href}
      className="rounded-2xl border border-slate-300 bg-white p-6 hover:border-indigo-400 hover:shadow-md transition group"
    >
      <div className="text-3xl mb-3">{emoji}</div>
      <h3 className="font-bold text-slate-800 group-hover:text-indigo-600">
        {title}
      </h3>
      <p className="mt-1 text-sm text-slate-600">{desc}</p>
    </Link>
  );
}
