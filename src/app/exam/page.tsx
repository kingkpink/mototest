import Quiz from "@/components/Quiz";
import { QUESTIONS, EXAM_PASS, EXAM_SIZE } from "@/data/questions";

export const metadata = {
  title: "Mock Exam — PA Motorcycle Practice Test",
};

export default function ExamPage() {
  return (
    <Quiz
      mode="exam"
      pool={QUESTIONS}
      title="Mock Knowledge Exam"
      subtitle={`${EXAM_SIZE} random questions — score ${EXAM_PASS} correct (80%) to pass, just like the real PA test.`}
    />
  );
}
