"use client";

import { useEffect, useMemo, useState } from "react";
import Quiz from "@/components/Quiz";
import { QUESTIONS, CATEGORIES, type Category } from "@/data/questions";
import { getCategoryStats, getMissedIds, type CategoryStat } from "@/lib/stats";

type Selection = Category | "ALL" | "MISSED" | null;

function accuracyColor(pct: number): string {
  if (pct >= 80) return "text-emerald-600";
  if (pct >= 60) return "text-amber-600";
  return "text-red-600";
}

export default function PracticePage() {
  const [selected, setSelected] = useState<Selection>(null);
  // Stats load after mount (localStorage isn't available during SSR) and
  // refresh every time the user returns to the picker from a quiz.
  const [catStats, setCatStats] = useState<Map<Category, CategoryStat>>(
    new Map()
  );
  const [missedIds, setMissedIds] = useState<number[]>([]);

  useEffect(() => {
    if (selected === null) {
      setCatStats(getCategoryStats(QUESTIONS));
      setMissedIds(getMissedIds());
    }
  }, [selected]);

  const counts = useMemo(() => {
    const m = new Map<string, number>();
    for (const q of QUESTIONS) m.set(q.category, (m.get(q.category) ?? 0) + 1);
    return m;
  }, []);

  if (selected) {
    const pool =
      selected === "ALL"
        ? QUESTIONS
        : selected === "MISSED"
        ? QUESTIONS.filter((q) => missedIds.includes(q.id))
        : QUESTIONS.filter((q) => q.category === selected);
    return (
      <div>
        <button
          onClick={() => setSelected(null)}
          className="mb-5 text-sm font-medium text-blue-800 hover:underline"
        >
          ← Choose another topic
        </button>
        <Quiz
          key={selected}
          mode="practice"
          pool={pool}
          title={
            selected === "ALL"
              ? "All Topics"
              : selected === "MISSED"
              ? "Review Missed"
              : selected
          }
          subtitle={
            selected === "MISSED"
              ? "Questions you got wrong last time. Answer correctly to clear them."
              : "Practice mode — get instant feedback after each answer."
          }
        />
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Practice by topic</h1>
      <p className="mt-1 text-slate-600">
        Pick an area to drill. You&apos;ll see the correct answer and an
        explanation right after each question.
      </p>
      <p className="mt-3 text-sm text-slate-600 border-l-2 border-blue-800 pl-3">
        These questions closely match what riders saw on the real PA permit
        test at the DMV.
      </p>

      {missedIds.length > 0 && (
        <button
          onClick={() => setSelected("MISSED")}
          className="mt-6 w-full text-left rounded-lg border border-red-200 bg-red-50 p-5 hover:border-red-400 transition"
        >
          <div className="flex items-center justify-between">
            <span className="font-semibold text-red-900">Review missed</span>
            <span className="text-sm text-red-700 font-medium">
              {missedIds.length} question{missedIds.length === 1 ? "" : "s"}
            </span>
          </div>
          <p className="text-sm text-red-800/80 mt-1">
            Drill the questions you got wrong until they stick.
          </p>
        </button>
      )}

      <button
        onClick={() => setSelected("ALL")}
        className={`${
          missedIds.length > 0 ? "mt-4" : "mt-6"
        } w-full text-left rounded-lg border border-blue-200 bg-blue-50 p-5 hover:border-blue-500 transition`}
      >
        <div className="flex items-center justify-between">
          <span className="font-semibold text-blue-900">All topics</span>
          <span className="text-sm text-blue-800 font-medium">
            {QUESTIONS.length} questions
          </span>
        </div>
        <p className="text-sm text-blue-900/70 mt-1">
          Every question in the bank, shuffled.
        </p>
      </button>

      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        {CATEGORIES.map((c) => {
          const s = catStats.get(c);
          const pct =
            s && s.attempts > 0
              ? Math.round((s.correct / s.attempts) * 100)
              : null;
          return (
            <button
              key={c}
              onClick={() => setSelected(c)}
              className="text-left rounded-lg border border-slate-200 bg-white p-4 hover:border-blue-700 hover:shadow-sm transition"
            >
              <div className="flex items-center justify-between">
                <span className="font-semibold text-slate-900">{c}</span>
                <span className="text-xs text-slate-500 font-medium">
                  {counts.get(c) ?? 0} Q
                </span>
              </div>
              <div className="mt-1 text-xs font-medium">
                {pct === null ? (
                  <span className="text-slate-400">Not practiced yet</span>
                ) : (
                  <span className={accuracyColor(pct)}>
                    {pct}% correct ({s!.correct}/{s!.attempts})
                  </span>
                )}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
