import { generateJson } from "@/lib/ai/client";
import { buildTestGeneratorPrompt } from "@/lib/ai/prompts/test-generator.prompt";
import { buildDiagnosticPrompt } from "@/lib/ai/prompts/diagnostic.prompt";
import { buildResultAnalyzerPrompt } from "@/lib/ai/prompts/result-analyzer.prompt";
import {
  AiTestGenerationSchema,
  AiResultAnalysisSchema,
  type AiTestGeneration,
  type AiResultAnalysis,
} from "@/lib/ai/schemas";

export async function generateTestQuestions(params: {
  subject: string;
  topics: string[];
  grade?: number;
  difficulty: "EASY" | "MEDIUM" | "HARD" | "EXPERT" | "MIXED";
  questionCount: number;
  examType: "DIAGNOSTIC" | "DTM" | "PRACTICE";
}): Promise<AiTestGeneration> {
  const { system, user } = buildTestGeneratorPrompt(params);

  // AI Question Validator: Zod parse xato bersa, client.ts avtomatik qayta so'raydi
  return generateJson({
    system,
    user,
    parse: (raw) => AiTestGenerationSchema.parse(raw),
    retries: 2,
  });
}

export async function generateDiagnosticTest(params: {
  subject: string;
  topics: string[];
  grade?: number;
}): Promise<AiTestGeneration> {
  const { system, user } = buildDiagnosticPrompt(params);

  return generateJson({
    system,
    user,
    parse: (raw) => AiTestGenerationSchema.parse(raw),
    retries: 2,
  });
}

export async function analyzeTestResult(params: {
  subject: string;
  totalQuestions: number;
  correctAnswers: number;
  topicBreakdown: { topic: string; correct: number; total: number }[];
}): Promise<AiResultAnalysis> {
  const { system, user } = buildResultAnalyzerPrompt(params);

  return generateJson({
    system,
    user,
    parse: (raw) => AiResultAnalysisSchema.parse(raw),
    retries: 1,
  });
}
