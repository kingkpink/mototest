# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md

## What this is

PA motorcycle permit test prep site. Static Next.js 16 (App Router, Turbopack) + React 19 + Tailwind v4 + TypeScript. No backend, no database — all state lives in localStorage. Question content sourced from the PennDOT Motorcycle Operator Manual (PUB 147; PDF and derived study notes live in the parent directory, outside this project).

## Commands

```bash
npm run dev      # dev server (localhost:3000)
npm run build    # production build (also runs TypeScript checking)
npm run lint     # eslint
npx tsc --noEmit # typecheck only
```

No test suite.

## Architecture

Two quiz modes share one engine:

- `src/components/Quiz.tsx` — the entire quiz engine (client component). Takes `mode: "exam" | "practice"` plus a question `pool`. Exam: 20 random questions, graded at the end. Practice: full pool, instant reveal per answer. Questions/options are shuffled client-side in a `useEffect` guarded by a seed ref to avoid hydration mismatches and StrictMode double-builds — don't move that work into render.
- `src/app/exam/page.tsx` and `src/app/practice/page.tsx` are thin wrappers selecting the pool; practice adds category filtering and a "review missed" pool driven by stats.

Data layer (no fetching — all static TS):

- `src/data/questions.ts` — the 85-question bank. Each `Question` has `id`, `category`, `options`, `answer` (index), `explanation`, `page` (manual page ref). `EXAM_SIZE`/`EXAM_PASS` constants live here. IDs must stay stable — localStorage stats key off them.
- `src/data/facts.ts` — permit facts/rules/steps rendered on home, about, and guide pages.

Persistence:

- `src/lib/stats.ts` — localStorage answer history (`pa-moto-stats-v1`). Feeds per-category accuracy and the "missed" pool ("missed" = last attempt wrong). All access is SSR-guarded; storage failures are swallowed — stats must never block the quiz.
- Font choice persists under `pa-moto-font`, applied pre-paint by an inline script in `src/app/layout.tsx` (`data-font` attribute on `<html>`, mapped to `--app-font` in `globals.css`, switched by `src/components/FontPicker.tsx`). Default font: Inter.

Styling: forced light theme (`globals.css` sets `color-scheme: light only`) — no dark mode. Tailwind v4 (CSS-based config via `@theme`, no tailwind.config file).
