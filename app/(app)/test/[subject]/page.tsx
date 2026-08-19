"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { QuestionCard } from "@/components/test/question-card";
import { Timer } from "@/components/test/timer";
import { submitTestAction } from "@/server/actions/test.actions";
import type { QuestionView } from "@/types/test.types";

interface ApiTest {
  id: string;
  subject: { name: string };
  questions: {
    id: string;
    questionText: string;
    options: unknown;
    difficulty: QuestionView["difficulty"];
    order: number;
  }[];
}

export default function TestPage() {
  const params = useParams<{ subject: string }>();
  const router = useRouter();

  const [test, setTest] = useState<ApiTest | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    async function generate() {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch("/api/ai/generate-test", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            subjectSlug: params.subject,
            difficulty: "MEDIUM",
            questionCount: 10,
            examType: "PRACTICE",
          }),
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error ?? "Test yaratishda xatolik");
        setTest(data.test);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Xatolik yuz berdi");
      } finally {
        setLoading(false);
      }
    }
    generate();
  }, [params.subject]);

  async function handleFinish() {
    if (!test) return;
    setSubmitting(true);

    const result = await submitTestAction({
      testId: test.id,
      answers: Object.entries(answers).map(([questionId, answer]) => ({
        questionId,
        answer,
      })),
    });

    setSubmitting(false);

    if (!result.success) {
      setError(result.error ?? "Natijani saqlashda xatolik");
      return;
    }

    router.push(`/test/result/${result.resultId}`);
  }

  if (loading) {
    return (
      <div className="mx-auto flex min-h-[60vh] max-w-2xl flex-col items-center justify-center gap-3 text-center">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-brand-200 border-t-brand-600" />
        <p className="text-slate-500">AI siz uchun test yaratmoqda...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="mx-auto max-w-2xl rounded-xl border border-rose-200 bg-rose-50 p-6 text-center text-rose-700 dark:bg-rose-900/20">
        <p>{error}</p>
        <Button className="mt-4" variant="outline" onClick={() => router.refresh()}>
          Qayta urinish
        </Button>
      </div>
    );
  }

  if (!test || test.questions.length === 0) {
    return (
      <div className="mx-auto max-w-2xl text-center text-slate-500">
        Savollar topilmadi.
      </div>
    );
  }

  const questions = test.questions as unknown as (QuestionView & { options: string[] })[];
  const current = questions[currentIndex];
  const progress = ((currentIndex + 1) / questions.length) * 100;
  const isLast = currentIndex === questions.length - 1;
  const answeredCount = Object.keys(answers).length;

  return (
    <div className="mx-auto max-w-2xl space-y-6 py-6">
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-slate-500">
          Savol {currentIndex + 1} / {questions.length}
        </span>
        <Timer />
      </div>

      <Progress value={progress} />

      <div className="rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-navy-900">
        <QuestionCard
          question={current}
          selectedAnswer={answers[current.id] ?? null}
          onSelect={(answer) => setAnswers({ ...answers, [current.id]: answer })}
        />
      </div>

      <div className="flex justify-between">
        <Button
          variant="outline"
          disabled={currentIndex === 0}
          onClick={() => setCurrentIndex((i) => Math.max(0, i - 1))}
        >
          Oldingi
        </Button>

        {isLast ? (
          <Button
            onClick={handleFinish}
            disabled={submitting || answeredCount === 0}
          >
            {submitting ? "Yakunlanmoqda..." : "Yakunlash"}
          </Button>
        ) : (
          <Button onClick={() => setCurrentIndex((i) => Math.min(questions.length - 1, i + 1))}>
            Keyingi
          </Button>
        )}
      </div>
    </div>
  );
}
