import { buildTestGeneratorPrompt } from "./test-generator.prompt";

/**
 * Diagnostic test — foydalanuvchining boshlang'ich darajasini aniqlash uchun.
 * Aralash qiyinlikda, tanlangan fanning barcha asosiy mavzularidan savol beradi.
 */
export function buildDiagnosticPrompt(params: {
  subject: string;
  topics: string[];
  grade?: number;
  questionCount?: number;
}) {
  return buildTestGeneratorPrompt({
    subject: params.subject,
    topics: params.topics,
    grade: params.grade,
    difficulty: "MIXED",
    questionCount: params.questionCount ?? 10,
    examType: "DIAGNOSTIC",
  });
}
