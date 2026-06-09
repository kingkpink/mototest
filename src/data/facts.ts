// Official PA Class M / motorcycle learner's permit facts.
// Sources: PennDOT Motorcycle Operator Manual (PUB 147) and pa.gov DMV pages.

export interface Fact {
  label: string;
  value: string;
}

export const TEST_FACTS: Fact[] = [
  { label: "Questions on the knowledge test", value: "20 multiple choice" },
  { label: "Correct answers needed to pass", value: "16 (80%)" },
  { label: "Source material", value: "PA Motorcycle Operator Manual (PUB 147)" },
  { label: "Permit cost", value: "$12" },
  { label: "Permit validity", value: "1 year" },
  { label: "Permits allowed", value: "Up to 3 within 5 years (max 4 total)" },
];

export const PERMIT_RULES: string[] = [
  "Ride only between sunrise and sunset — no nighttime riding.",
  "No passengers, except a properly licensed motorcycle instructor.",
  "Must wear an approved helmet and eye protection at all times.",
  "Must ride accompanied by a Class M license holder.",
];

export const LICENSE_STEPS: string[] = [
  "Get the Motorcycle Learner's Permit Application (Form DL-5) and read the Motorcycle Operator Manual (PUB 147).",
  "At a Driver License Center: pass the vision screening and the motorcycle knowledge test.",
  "Receive your Class M learner's permit (valid one year).",
  "Practice within permit rules, then pass the on-cycle skills test OR complete a PA Motorcycle Safety Program course.",
  "Receive your Class M motorcycle license.",
];

export const SKILLS_TEST: string[] = [
  "Pre-trip inspection of the motorcycle.",
  "Left circles.",
  "Right circles.",
  "Figure eights.",
];

export const UNDER_18: string[] = [
  "Must hold the learner's permit for at least 6 months.",
  "Must complete 65 hours of supervised riding practice.",
  "Must complete a PA Motorcycle Safety Program Basic Rider Course (counts as 15 of the 65 hours).",
];

export const RESTRICTIONS: { code: string; meaning: string }[] = [
  {
    code: '"8" restriction',
    meaning: "Tested on a motorcycle of 5 brake horsepower or less — cannot operate a motorcycle over 5 hp.",
  },
  {
    code: '"9" restriction',
    meaning: "Tested on a 3-wheel motorcycle — cannot operate a 2-wheel motorcycle.",
  },
];
