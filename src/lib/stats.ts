import type { Category, Question } from "@/data/questions";

// Per-question answer history persisted in localStorage so practice/exam
// results survive reloads and feed the "review missed" pool and per-topic
// accuracy display.

const STORAGE_KEY = "pa-moto-stats-v1";

export interface QuestionStat {
  attempts: number;
  correct: number;
  lastCorrect: boolean;
}

export type StatsMap = Record<number, QuestionStat>;

function load(): StatsMap {
  if (typeof window === "undefined") return {};
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as StatsMap) : {};
  } catch {
    return {};
  }
}

function save(stats: StatsMap) {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(stats));
  } catch {
    // storage full or unavailable — stats are a nice-to-have, never block the quiz
  }
}

export function recordAnswer(questionId: number, correct: boolean) {
  const stats = load();
  const s = stats[questionId] ?? { attempts: 0, correct: 0, lastCorrect: false };
  s.attempts += 1;
  if (correct) s.correct += 1;
  s.lastCorrect = correct;
  stats[questionId] = s;
  save(stats);
}

export function getStats(): StatsMap {
  return load();
}

// "Missed" = most recent attempt was wrong. Answering it correctly later
// removes it from the pile, so the review pool shrinks as you improve.
export function getMissedIds(): number[] {
  const stats = load();
  return Object.entries(stats)
    .filter(([, s]) => !s.lastCorrect)
    .map(([id]) => Number(id));
}

export interface CategoryStat {
  attempts: number;
  correct: number;
}

export function getCategoryStats(
  questions: Question[]
): Map<Category, CategoryStat> {
  const stats = load();
  const byId = new Map(questions.map((q) => [q.id, q.category]));
  const out = new Map<Category, CategoryStat>();
  for (const [id, s] of Object.entries(stats)) {
    const category = byId.get(Number(id));
    if (!category) continue;
    const c = out.get(category) ?? { attempts: 0, correct: 0 };
    c.attempts += s.attempts;
    c.correct += s.correct;
    out.set(category, c);
  }
  return out;
}

export function resetStats() {
  try {
    window.localStorage.removeItem(STORAGE_KEY);
  } catch {
    // ignore
  }
}
