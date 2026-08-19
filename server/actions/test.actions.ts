"use server";

import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { createPracticeTest } from "@/server/services/testService";
import { submitAndAnalyzeTest } from "@/server/services/analysisService";
import type { Difficulty, ExamType } from "@/types/test.types";

export async function createTestAction(params: {
  subjectSlug: string;
  topics?: string[];
  difficulty: Difficulty | "MIXED";
  questionCount: number;
  examType: ExamType;
}) {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    return { success: false as const, error: "Tizimga kiring" };
  }

  try {
    // @ts-expect-error - custom field on session user
    const test = await createPracticeTest({ userId: session.user.id, ...params });
    return { success: true as const, test };
  } catch (err) {
    return {
      success: false as const,
      error: err instanceof Error ? err.message : "Test yaratishda xatolik",
    };
  }
}

export async function submitTestAction(params: {
  testId: string;
  answers: { questionId: string; answer: string }[];
}) {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    return { success: false as const, error: "Tizimga kiring" };
  }

  try {
    // @ts-expect-error - custom field on session user
    const result = await submitAndAnalyzeTest({ userId: session.user.id, ...params });
    return { success: true as const, resultId: result.id };
  } catch (err) {
    return {
      success: false as const,
      error: err instanceof Error ? err.message : "Natijani saqlashda xatolik",
    };
  }
}
