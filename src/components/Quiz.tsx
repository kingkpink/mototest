"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import type { Question } from "@/data/questions";
import { EXAM_PASS, EXAM_SIZE } from "@/data/questions";
import { pickExam, prepare, type PreparedQuestion } from "@/lib/shuffle";
import { recordAnswer } from "@/lib/stats";

type Mode = "exam" | "practice";

interface QuizProps {
  mode: Mode;
  pool: Question[];
  title: string;
  subtitle?: string;
}

const LETTERS = ["A", "B", "C", "D", "E"];

export default function Quiz({ mode, pool, title, subtitle }: QuizProps) {
  const [questions, setQuestions] = useState<PreparedQuestion[]>([]);
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState<(number | null)[]>([]);
  const [revealed, setRevealed] = useState<boolean[]>([]); // practice mode per-question
  const [finished, setFinished] = useState(false);
  const [seed, setSeed] = useState(0); // bump to restart
  const builtForSeed = useRef(-1); // which seed the current question set was built for

  // Prepare questions on the client to avoid hydration mismatch from randomness.
  // Build ONCE per seed. Guards against React StrictMode's double-invoke in dev
  // (which would otherwise re-pick and visibly swap the questions) and against
  // any incidental re-render re-running the build mid-exam.
  useEffect(() => {
    if (builtForSeed.current === seed) return; // already built for this seed
    builtForSeed.current = seed;

    const prepared =
      mode === "exam"
        ? pickExam(pool, Math.min(EXAM_SIZE, pool.length))
        : prepare([...pool]);
    setQuestions(prepared);
    setAnswers(new Array(prepared.length).fill(null));
    setRevealed(new Array(prepared.length).fill(false));
    setCurrent(0);
    setFinished(false);
  }, [mode, pool, seed]);

  const score = useMemo(
    () =>
      questions.reduce(
        (acc, q, i) => acc + (answers[i] === q.shuffledAnswer ? 1 : 0),
        0
      ),
    [questions, answers]
  );

  if (questions.length === 0) {
    return <div className="text-center text-slate-500 py-20">Loading questions…</div>;
  }

  const passNeeded = mode === "exam" ? EXAM_PASS : Math.ceil(questions.length * 0.8);
  const passed = score >= passNeeded;

  // ---------- Results screen ----------
  if (finished) {
    const pct = Math.round((score / questions.length) * 100);
    return (
      <div className="max-w-3xl mx-auto">
        <div
          className={`rounded-lg p-6 sm:p-8 text-center border ${
            passed
              ? "bg-emerald-50 border-emerald-200"
              : "bg-red-50 border-red-200"
          }`}
        >
          <p
            className={`text-xs font-semibold uppercase tracking-widest mb-2 ${
              passed ? "text-emerald-700" : "text-red-700"
            }`}
          >
            {passed ? "Result: Pass" : "Result: Below passing"}
          </p>
          <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
            {passed ? "You passed" : "Keep studying"}
          </h2>
          <p className="mt-2 text-slate-600">
            You scored <span className="font-bold">{score}</span> /{" "}
            {questions.length} ({pct}%).
          </p>
          <p className="mt-1 text-sm text-slate-500">
            {mode === "exam"
              ? `The real PA test needs ${EXAM_PASS} of ${EXAM_SIZE} correct (80%).`
              : `Passing target: ${passNeeded} of ${questions.length}.`}
          </p>
          <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-center">
            <button
              onClick={() => setSeed((s) => s + 1)}
              className="px-5 py-2.5 rounded-lg bg-blue-800 text-white font-semibold hover:bg-blue-900 transition"
            >
              {mode === "exam" ? "New exam" : "Restart"}
            </button>
            <Link
              href="/"
              className="px-5 py-2.5 rounded-lg bg-white border border-slate-300 text-slate-700 font-semibold hover:bg-slate-50 transition"
            >
              Home
            </Link>
          </div>
        </div>

        {/* Review */}
        <h3 className="mt-10 mb-4 text-lg font-bold text-slate-800">Review</h3>
        <div className="space-y-4">
          {questions.map((q, i) => {
            const yourAns = answers[i];
            const correct = yourAns === q.shuffledAnswer;
            return (
              <div
                key={q.id}
                className="rounded-lg border border-slate-200 bg-white p-4 sm:p-5"
              >
                <div className="flex items-start gap-3">
                  <span
                    className={`mt-0.5 shrink-0 w-6 h-6 rounded-full text-white text-sm font-bold grid place-items-center ${
                      correct ? "bg-emerald-600" : "bg-red-600"
                    }`}
                  >
                    {correct ? "✓" : "✕"}
                  </span>
                  <div className="flex-1">
                    <p className="font-semibold text-slate-800">
                      {i + 1}. {q.question}
                    </p>
                    <ul className="mt-2 space-y-1 text-sm">
                      {q.shuffledOptions.map((opt, oi) => {
                        const isCorrect = oi === q.shuffledAnswer;
                        const isYours = oi === yourAns;
                        return (
                          <li
                            key={oi}
                            className={`px-3 py-1.5 rounded-md ${
                              isCorrect
                                ? "bg-emerald-50 text-emerald-800 font-medium"
                                : isYours
                                ? "bg-red-50 text-red-800"
                                : "text-slate-600"
                            }`}
                          >
                            {LETTERS[oi]}. {opt}
                            {isCorrect && " ✓"}
                            {isYours && !isCorrect && " ← your answer"}
                          </li>
                        );
                      })}
                    </ul>
                    <p className="mt-2 text-sm text-slate-600 bg-slate-50 rounded-md px-3 py-2">
                      <span className="font-semibold">Why: </span>
                      {q.explanation}{" "}
                      <span className="text-slate-500">
                        (Manual p. {q.page})
                      </span>
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  // ---------- Question screen ----------
  const q = questions[current];
  const chosen = answers[current];
  const isRevealed = mode === "practice" && revealed[current];
  const isLast = current === questions.length - 1;

  function choose(optIndex: number) {
    if (mode === "practice" && revealed[current]) return; // lock after reveal
    const next = [...answers];
    next[current] = optIndex;
    setAnswers(next);
    if (mode === "practice") {
      const r = [...revealed];
      r[current] = true;
      setRevealed(r);
      recordAnswer(q.id, optIndex === q.shuffledAnswer);
    }
  }

  function goNext() {
    if (isLast) {
      if (mode === "exam") {
        // Exam grades at the end — record the whole sheet once.
        questions.forEach((qq, i) =>
          recordAnswer(qq.id, answers[i] === qq.shuffledAnswer)
        );
      }
      setFinished(true);
    } else setCurrent((c) => c + 1);
  }

  const progress = ((current + 1) / questions.length) * 100;

  return (
    <div className="max-w-3xl mx-auto">
      <div className="flex items-center justify-between mb-1">
        <h1 className="text-xl font-bold text-slate-800">{title}</h1>
        <span className="text-sm font-medium text-slate-500">
          {current + 1} / {questions.length}
        </span>
      </div>
      {subtitle && <p className="text-sm text-slate-500 mb-3">{subtitle}</p>}

      <div className="h-1.5 w-full bg-slate-200 rounded-full overflow-hidden mb-6">
        <div
          className="h-full bg-blue-800 transition-all duration-300"
          style={{ width: `${progress}%` }}
        />
      </div>

      <div className="rounded-lg border border-slate-200 bg-white p-4 sm:p-6 shadow-sm">
        <div className="mb-1 text-xs font-semibold uppercase tracking-widest text-blue-800">
          {q.category}
        </div>
        <p className="text-lg font-semibold text-slate-900 mb-5">{q.question}</p>

        <div className="space-y-3">
          {q.shuffledOptions.map((opt, oi) => {
            const selected = chosen === oi;
            let cls =
              "border-slate-200 bg-white hover:border-blue-700 hover:bg-blue-50/50";
            if (isRevealed) {
              if (oi === q.shuffledAnswer)
                cls = "border-emerald-500 bg-emerald-50";
              else if (selected) cls = "border-red-400 bg-red-50";
              else cls = "border-slate-200 bg-white opacity-60";
            } else if (selected) {
              cls = "border-blue-700 bg-blue-50";
            }
            return (
              <button
                key={oi}
                onClick={() => choose(oi)}
                disabled={isRevealed}
                className={`w-full text-left px-3 sm:px-4 py-3 rounded-lg border-2 transition flex items-start gap-3 ${cls}`}
              >
                <span className="shrink-0 w-7 h-7 rounded-full bg-slate-100 text-slate-700 font-semibold text-sm grid place-items-center">
                  {LETTERS[oi]}
                </span>
                <span className="text-slate-800">{opt}</span>
              </button>
            );
          })}
        </div>

        {isRevealed && (
          <div
            className={`mt-5 rounded-lg px-4 py-3 text-sm ${
              chosen === q.shuffledAnswer
                ? "bg-emerald-50 text-emerald-800"
                : "bg-red-50 text-red-800"
            }`}
          >
            <span className="font-bold">
              {chosen === q.shuffledAnswer ? "Correct! " : "Not quite. "}
            </span>
            {q.explanation}{" "}
            <span className="opacity-70">(Manual p. {q.page})</span>
          </div>
        )}
      </div>

      <div className="mt-6 flex items-center justify-between">
        <button
          onClick={() => setCurrent((c) => Math.max(0, c - 1))}
          disabled={current === 0}
          className="px-4 py-2 rounded-lg text-slate-600 font-medium disabled:opacity-40 hover:bg-slate-100 transition"
        >
          Back
        </button>

        <button
          onClick={goNext}
          disabled={chosen === null}
          className="px-6 py-2.5 rounded-lg bg-blue-800 text-white font-semibold disabled:opacity-40 hover:bg-blue-900 transition"
        >
          {isLast ? "Finish" : "Next"}
        </button>
      </div>
    </div>
  );
}
