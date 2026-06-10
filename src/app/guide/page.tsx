import BreadcrumbJsonLd from "@/components/BreadcrumbJsonLd";
import {
  TEST_FACTS,
  PERMIT_RULES,
  LICENSE_STEPS,
  SKILLS_TEST,
  UNDER_18,
  RESTRICTIONS,
} from "@/data/facts";

export const metadata = {
  title: "Study Guide",
  description:
    "Key numbers, permit rules, and licensing steps for the PA motorcycle knowledge test, condensed from the PennDOT Motorcycle Operator Manual (PUB 147).",
  alternates: { canonical: "/guide" },
};

const KEY_NUMBERS: { fact: string; value: string }[] = [
  { fact: "Minimum following distance", value: "4 seconds" },
  { fact: "Search your path ahead", value: "12 seconds" },
  { fact: "Front brake stopping power", value: "At least 3/4 (≈70%)" },
  { fact: "PA legal BAC limit", value: "0.08%" },
  { fact: "Alcohol leaves the body at", value: "~1 drink / hour" },
  { fact: "Refusing a chemical test", value: "1-yr suspension (up to 2 w/ DUI)" },
  { fact: "Helmet survival benefit", value: "3× more likely to survive head injury" },
  { fact: "Max group size before splitting", value: "4–5 riders" },
  { fact: "Drinks to start impairing you", value: "As little as 1" },
];

const RIDING: { h: string; pts: string[] }[] = [
  {
    h: "Gear",
    pts: [
      "Helmet must fit snugly all around, no defects, fastened every ride.",
      "Faceshield gives the most eye/face protection — a windshield is not a substitute.",
      "Bright + reflective clothing; you are half the visible surface.",
    ],
  },
  {
    h: "Controls & turning",
    pts: [
      "SLOW – LOOK – PRESS – ROLL.",
      "Countersteer: press left → lean left → go left.",
      "Normal turn: rider + bike lean together. Slow tight turn: lean the bike only, body straight.",
      "Use BOTH brakes every time; front brake = at least 3/4 of stopping power.",
    ],
  },
  {
    h: "Space & being seen",
    pts: [
      "Keep a 4-second cushion; ride the center portion to block lane sharing.",
      "Headlight on always — 2× more likely to be noticed.",
      "Mirrors miss blind spots — always do a head check before lane changes.",
    ],
  },
  {
    h: "Intersections",
    pts: [
      "Greatest crash danger. Biggest threat: a car turning left in front of you.",
      "Never rely on eye contact — assume the driver will pull out.",
    ],
  },
  {
    h: "Crash avoidance",
    pts: [
      "Quick stop: both brakes, squeeze front firmly. Front locks → release & reapply.",
      "Swerve = two quick presses. Separate braking from swerving — never both at once.",
      "Stop in a curve: straighten the bike first, then brake.",
    ],
  },
  {
    h: "Surfaces & mechanical",
    pts: [
      "Cross tracks/gratings straight; parallel seams at 45°+.",
      "Rise off the seat for obstacles; slow before slippery surfaces.",
      "Front flat = heavy steering. Rear flat = back jerks. Brake the good tire.",
      "Stuck throttle: clutch in + engine cut-off switch.",
    ],
  },
  {
    h: "Passengers, cargo & groups",
    pts: [
      "PA law: passenger needs footrests and handholds. They keep both feet on pegs.",
      "Loads low and forward. With a passenger it takes longer to speed up and slow down.",
      "Ride in a staggered formation; single file for curves/turns. Never pair up.",
    ],
  },
  {
    h: "Alcohol & fatigue",
    pts: [
      "Judgment is impaired first — as little as one drink affects riding.",
      "PA legal limit 0.08%; refusing a test = automatic 1-yr suspension.",
      "Limit riding to ~6 hrs/day, rest every 2 hrs. Coffee does not sober you up.",
    ],
  },
];

export default function GuidePage() {
  return (
    <div className="max-w-3xl mx-auto space-y-10">
      <BreadcrumbJsonLd name="Study Guide" path="/guide" />
      <header>
        <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Study Guide</h1>
        <p className="mt-2 text-slate-600">
          Everything condensed from the PennDOT Motorcycle Operator Manual (PUB 147).
          Master these and the {TEST_FACTS[0].value.toLowerCase()} on the real test
          will feel easy.
        </p>
        <a
          href="/pub-147-motorcycle-manual.pdf"
          download
          className="mt-4 inline-flex items-center gap-2 rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 hover:border-blue-700 hover:text-blue-800 transition"
        >
          <svg
            className="h-4 w-4"
            viewBox="0 0 16 16"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M8 2v8m0 0L5 7m3 3 3-3M3 13h10" />
          </svg>
          Download the full manual (PUB 147, PDF · 5.6 MB)
        </a>
        <p className="mt-2 text-xs text-slate-500">
          Scanned clean —{" "}
          <a
            href="https://www.virustotal.com/gui/file/6516663100314cf5bb2b5b5270c210eb1b80048c7b36fc91b691bf88ccfb1d24/detection"
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:text-slate-700"
          >
            view the VirusTotal report
          </a>{" "}
          for this exact file.
        </p>
      </header>

      <Section title="Key numbers to memorize">
        <div className="rounded-lg border border-slate-200 bg-white overflow-hidden">
          {KEY_NUMBERS.map((n, i) => (
            <div
              key={n.fact}
              className={`flex justify-between gap-4 px-5 py-3 text-sm ${
                i % 2 ? "bg-slate-50" : "bg-white"
              }`}
            >
              <span className="text-slate-600">{n.fact}</span>
              <span className="font-bold text-slate-900 text-right">{n.value}</span>
            </div>
          ))}
        </div>
      </Section>

      <Section title="Riding rules at a glance">
        <div className="space-y-5">
          {RIDING.map((b) => (
            <div key={b.h} className="rounded-lg border border-slate-200 bg-white p-5">
              <h3 className="font-semibold text-slate-900">{b.h}</h3>
              <ul className="mt-2 space-y-1.5">
                {b.pts.map((p) => (
                  <li key={p} className="flex gap-2.5 text-sm text-slate-700">
                    <span className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-blue-800" />
                    {p}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Section>

      <Section title="Getting your Class M license — the steps">
        <ol className="space-y-3">
          {LICENSE_STEPS.map((s, i) => (
            <li key={s} className="flex gap-3 text-sm text-slate-700">
              <span className="shrink-0 w-6 h-6 rounded-full bg-blue-800 text-white text-xs font-semibold grid place-items-center">
                {i + 1}
              </span>
              <span className="pt-0.5">{s}</span>
            </li>
          ))}
        </ol>
      </Section>

      <div className="grid gap-6 md:grid-cols-2">
        <Section title="Permit rules">
          <ListCard items={PERMIT_RULES} />
        </Section>
        <Section title="Skills test">
          <ListCard items={SKILLS_TEST} />
        </Section>
        <Section title="If you're under 18">
          <ListCard items={UNDER_18} />
        </Section>
        <Section title="License restrictions">
          <div className="rounded-lg border border-slate-200 bg-white p-5 space-y-3">
            {RESTRICTIONS.map((r) => (
              <div key={r.code} className="text-sm">
                <span className="font-bold text-slate-800">{r.code}</span>
                <p className="text-slate-600">{r.meaning}</p>
              </div>
            ))}
          </div>
        </Section>
      </div>
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
      <h2 className="text-lg font-semibold text-slate-900 tracking-tight mb-3">{title}</h2>
      {children}
    </section>
  );
}

function ListCard({ items }: { items: string[] }) {
  return (
    <ul className="rounded-lg border border-slate-200 bg-white p-5 space-y-2">
      {items.map((it) => (
        <li key={it} className="flex gap-2.5 text-sm text-slate-700">
          <span className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-blue-800" />
          {it}
        </li>
      ))}
    </ul>
  );
}
