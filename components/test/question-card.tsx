"use client";

import { cn } from "@/lib/utils";
import type { QuestionView } from "@/types/test.types";

export function QuestionCard({
  question,
  selectedAnswer,
  onSelect,
}: {
  question: QuestionView;
  selectedAnswer: string | null;
  onSelect: (answer: string) => void;
}) {
  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
        {question.questionText}
      </h2>

      <div className="space-y-3">
        {question.options.map((option) => (
          <button
            key={option}
            onClick={() => onSelect(option)}
            className={cn(
              "w-full rounded-xl border px-4 py-3 text-left text-sm font-medium transition-colors",
              selectedAnswer === option
                ? "border-brand-600 bg-brand-50 text-brand-700 dark:bg-brand-900/30 dark:text-brand-300"
                : "border-slate-200 hover:bg-slate-50 dark:border-slate-700 dark:hover:bg-slate-800"
            )}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
}
