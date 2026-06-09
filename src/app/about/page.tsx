import Link from "next/link";
import {
  TEST_FACTS,
  PERMIT_RULES,
  LICENSE_STEPS,
  SKILLS_TEST,
  UNDER_18,
  RESTRICTIONS,
} from "@/data/facts";

export const metadata = {
  title: "What the Test Is Like",
  description:
    "How the Pennsylvania motorcycle learner's permit knowledge test is structured: format, number of questions, passing score, what's covered, and what to expect at the Driver License Center.",
  alternates: { canonical: "/about" },
};

const FORMAT: { q: string; a: string }[] = [
  {
    q: "What kind of test is it?",
    a: "A written knowledge test — multiple choice. Each question has one correct answer out of four choices (A–D).",
  },
  {
    q: "How many questions?",
    a: "20 questions. They are drawn from the PennDOT Motorcycle Operator Manual (PUB 147).",
  },
  {
    q: "What score do I need to pass?",
    a: "16 of 20 correct — 80%. Miss 5 or more and you do not pass that attempt.",
  },
  {
    q: "Is it timed?",
    a: "It is taken at a Driver License Center, often on a touch-screen computer. There is no tight time pressure — work at your own pace.",
  },
  {
    q: "Are there pictures?",
    a: "Some questions show a photo or diagram of a traffic situation (lane position, group formation, an intersection) and ask what the rider should do.",
  },
  {
    q: "What if I fail?",
    a: "You can retake it. You may hold up to 3 learner's permits within a 5-year period (4 permits max), and you must pass the knowledge test for each.",
  },
];

const COVERED: string[] = [
  "Protective gear — helmets and eye/face protection",
  "Knowing your motorcycle and pre-ride checks",
  "Basic control — braking, turning, shifting",
  "Lane position and keeping a space cushion",
  "The SEE strategy (Search, Evaluate, Execute)",
  "Intersections and being seen by other drivers",
  "Crash avoidance — quick stops and swerving",
  "Dangerous surfaces, tracks, and obstacles",
  "Mechanical problems — flats, stuck throttle, wobble",
  "Carrying passengers and cargo, and group riding",
  "Alcohol, drugs, fatigue, and PA law",
];

const BRING: string[] = [
  "Completed Motorcycle Learner's Permit Application (Form DL-5).",
  "Proof of identity / existing PA driver's license, as required.",
  "Permit fee — $12.",
  "Be ready for a vision screening the same visit.",
];

// FAQPage rich-snippet markup, built from the SAME array that renders the
// visible Q&A section below — Google requires the two to match.
const faqStructuredData = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FORMAT.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

export default function AboutPage() {
  return (
    <div className="max-w-3xl mx-auto space-y-10">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqStructuredData) }}
      />
      <header>
        <div className="inline-flex items-center gap-2 rounded-full bg-indigo-100 text-indigo-700 px-3 py-1 text-xs font-semibold mb-3">
          Learner&apos;s Permit Knowledge Test
        </div>
        <h1 className="text-3xl font-bold text-slate-900">
          What the test is like
        </h1>
        <p className="mt-2 text-slate-600">
          The Pennsylvania motorcycle learner&apos;s permit knowledge test is the first
          step toward a Class M license. Here is how it&apos;s structured and what to
          expect so there are no surprises at the counter.
        </p>
      </header>

      {/* Quick facts strip */}
      <section className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {TEST_FACTS.slice(0, 6).map((f) => (
          <div
            key={f.label}
            className="rounded-xl border border-slate-300 bg-white p-4 text-center"
          >
            <div className="text-base font-bold text-indigo-700">{f.value}</div>
            <div className="text-xs text-slate-500 mt-1">{f.label}</div>
          </div>
        ))}
      </section>

      {/* Format FAQ */}
      <Section title="Format & structure">
        <div className="space-y-3">
          {FORMAT.map((f) => (
            <div key={f.q} className="rounded-xl border border-slate-300 bg-white p-5">
              <h3 className="font-semibold text-slate-800">{f.q}</h3>
              <p className="mt-1 text-sm text-slate-600">{f.a}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* Sample question */}
      <Section title="What a question looks like">
        <div className="rounded-2xl border border-slate-300 bg-white p-6">
          <p className="font-semibold text-slate-800">
            Your motorcycle has two brakes. Use both brakes:
          </p>
          <ul className="mt-3 space-y-2 text-sm">
            {[
              "A. Only for emergency stops",
              "B. While swerving",
              "C. Every time you slow or stop",
              "D. Only for normal stops",
            ].map((o, i) => (
              <li
                key={o}
                className={`px-3 py-2 rounded-lg ${
                  i === 2
                    ? "bg-emerald-50 text-emerald-800 font-medium"
                    : "text-slate-600"
                }`}
              >
                {o}
                {i === 2 && " ✓"}
              </li>
            ))}
          </ul>
          <p className="mt-3 text-xs text-slate-500">
            Four choices, one correct answer. This is the actual style used on the test.
          </p>
        </div>
      </Section>

      {/* Topics covered */}
      <Section title="Topics the questions cover">
        <ul className="rounded-2xl border border-slate-300 bg-white p-5 grid sm:grid-cols-2 gap-2">
          {COVERED.map((c) => (
            <li key={c} className="flex gap-2 text-sm text-slate-700">
              <span className="text-black mt-0.5">●</span>
              {c}
            </li>
          ))}
        </ul>
      </Section>

      {/* Two-up: bring / permit rules */}
      <div className="grid gap-6 md:grid-cols-2">
        <Section title="What to bring to the test">
          <ListCard items={BRING} />
        </Section>
        <Section title="Once you pass — permit rules">
          <ListCard items={PERMIT_RULES} />
        </Section>
      </div>

      {/* Steps */}
      <Section title="The full path to a Class M license">
        <ol className="space-y-3">
          {LICENSE_STEPS.map((s, i) => (
            <li key={s} className="flex gap-3 text-sm text-slate-700">
              <span className="shrink-0 w-6 h-6 rounded-full bg-indigo-600 text-white font-bold grid place-items-center">
                {i + 1}
              </span>
              <span className="pt-0.5">{s}</span>
            </li>
          ))}
        </ol>
      </Section>

      <div className="grid gap-6 md:grid-cols-2">
        <Section title="The on-cycle skills test">
          <ListCard items={SKILLS_TEST} />
        </Section>
        <Section title="If you're under 18">
          <ListCard items={UNDER_18} />
        </Section>
      </div>

      <Section title="License restrictions to know">
        <div className="rounded-2xl border border-slate-300 bg-white p-5 space-y-3">
          {RESTRICTIONS.map((r) => (
            <div key={r.code} className="text-sm">
              <span className="font-bold text-slate-800">{r.code}</span>
              <p className="text-slate-600">{r.meaning}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* CTA */}
      <section className="rounded-2xl bg-slate-100 border border-slate-300 text-slate-900 p-8 text-center">
        <h2 className="text-xl font-bold">Know what to expect? Try it.</h2>
        <p className="mt-1 text-slate-600 text-sm">
          Take a 20-question mock exam under the same 80%-to-pass rules.
        </p>
        <Link
          href="/exam"
          className="inline-block mt-4 px-6 py-2.5 rounded-lg bg-black text-white font-semibold hover:bg-slate-800 transition"
        >
          Start mock exam →
        </Link>
      </section>

      <p className="text-xs text-slate-500 text-center">
        Structure reflects PennDOT&apos;s published process for the Class M /
        learner&apos;s permit knowledge test. Always confirm current requirements at{" "}
        <a
          href="https://www.pa.gov/agencies/dmv"
          className="underline hover:text-slate-600"
        >
          pa.gov/dmv
        </a>
        .
      </p>
    </div>
  );
}

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section>
      <h2 className="text-lg font-bold text-slate-800 mb-3">{title}</h2>
      {children}
    </section>
  );
}

function ListCard({ items }: { items: string[] }) {
  return (
    <ul className="rounded-2xl border border-slate-300 bg-white p-5 space-y-2 h-full">
      {items.map((it) => (
        <li key={it} className="flex gap-2 text-sm text-slate-700">
          <span className="text-black mt-0.5">●</span>
          {it}
        </li>
      ))}
    </ul>
  );
}
