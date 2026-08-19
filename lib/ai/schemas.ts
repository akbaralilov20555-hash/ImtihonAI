import { z } from "zod";

// AI Test Generator qaytaradigan har bir savol shu shaklda bo'lishi shart.
// Bu sxema AI Question Validator vazifasini bajaradi: agar OpenAI javobi
// shu formatga mos kelmasa, parse xato beradi va biz testni qayta so'raymiz.
export const AiQuestionSchema = z.object({
  questionText: z.string().min(5),
  topic: z.string().min(1),
  options: z.array(z.string()).length(4),
  correctAnswer: z.string().min(1),
  explanation: z.string().min(5),
  difficulty: z.enum(["EASY", "MEDIUM", "HARD", "EXPERT"]),
});

export const AiTestGenerationSchema = z.object({
  questions: z.array(AiQuestionSchema).min(1),
});

export type AiQuestion = z.infer<typeof AiQuestionSchema>;
export type AiTestGeneration = z.infer<typeof AiTestGenerationSchema>;

export const AiResultAnalysisSchema = z.object({
  summary: z.string().min(5),
  weakTopics: z.array(z.string()),
  strongTopics: z.array(z.string()),
  recommendation: z.string().min(5),
});

export type AiResultAnalysis = z.infer<typeof AiResultAnalysisSchema>;
