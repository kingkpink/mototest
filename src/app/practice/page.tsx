"use client";

import { useMemo, useState } from "react";
import Quiz from "@/components/Quiz";
import { QUESTIONS, CATEGORIES, type Category } from "@/data/questions";

type Selection = Category | "ALL" | null;

export default function PracticePage() {
  const [selected, setSelected] = useState<Selection>(null);

  const counts = useMemo(() => {
    const m = new Map<string, number>();
    for (const q of QUESTIONS) m.set(q.category, (m.get(q.category) ?? 0) + 1);
    return m;
  }, []);

  if (selected) {
    const pool =
      selected === "ALL"
        ? QUESTIONS
        : QUESTIONS.filter((q) => q.category === selected);
    return (
      <div>
        <button
          onClick={() => setSelected(null)}
          className="mb-5 text-sm font-medium text-blue-600 hover:underline"
        >
          ← Choose another topic
        </button>
        <Quiz
          mode="practice"
          pool={pool}
          title={selected === "ALL" ? "All Topics" : selected}
          subtitle="Practice mode — get instant feedback after each answer."
        />
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold text-slate-800">Practice by topic</h1>
      <p className="mt-1 text-slate-600">
        Pick an area to drill. You&apos;ll see the correct answer and an
        explanation right after each question.
      </p>

      <button
        onClick={() => setSelected("ALL")}
        className="mt-6 w-full text-left rounded-xl border-2 border-blue-200 bg-blue-50 p-5 hover:border-blue-400 transition"
      >
        <div className="flex items-center justify-between">
          <span className="font-bold text-blue-800">All topics</span>
          <span className="text-sm text-blue-600 font-medium">
            {QUESTIONS.length} questions
          </span>
        </div>
        <p className="text-sm text-blue-700/80 mt-1">
          Every question in the bank, shuffled.
        </p>
      </button>

      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        {CATEGORIES.map((c) => (
          <button
            key={c}
            onClick={() => setSelected(c)}
            className="text-left rounded-xl border border-slate-200 bg-white p-4 hover:border-blue-400 hover:shadow-sm transition"
          >
            <div className="flex items-center justify-between">
              <span className="font-semibold text-slate-800">{c}</span>
              <span className="text-xs text-slate-400 font-medium">
                {counts.get(c) ?? 0} Q
              </span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
