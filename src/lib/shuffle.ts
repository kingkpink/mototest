import type { Question } from "@/data/questions";

// Fisher-Yates shuffle, returns a new array.
export function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

// Pick n random questions, and shuffle each question's options too.
// Returns questions with a remapped `answer` index plus the reordered options.
export interface PreparedQuestion extends Question {
  shuffledOptions: string[];
  shuffledAnswer: number;
}

export function prepare(questions: Question[]): PreparedQuestion[] {
  return questions.map((q) => {
    const order = shuffle(q.options.map((_, i) => i));
    const shuffledOptions = order.map((i) => q.options[i]);
    const shuffledAnswer = order.indexOf(q.answer);
    return { ...q, shuffledOptions, shuffledAnswer };
  });
}

export function pickExam(all: Question[], n: number): PreparedQuestion[] {
  return prepare(shuffle(all).slice(0, n));
}
