import { z } from "zod";

export const RegisterSchema = z.object({
  name: z.string().min(2, "Ism kamida 2 ta harfdan iborat bo'lishi kerak"),
  email: z.string().email("Email noto'g'ri formatda"),
  password: z.string().min(6, "Parol kamida 6 ta belgidan iborat bo'lishi kerak"),
});

export const LoginSchema = z.object({
  email: z.string().email("Email noto'g'ri formatda"),
  password: z.string().min(1, "Parolni kiriting"),
});

export const OnboardingSchema = z.object({
  class: z.number().int().min(1).max(11),
  subjectSlug: z.string().min(1, "Fanni tanlang"),
  goalScore: z.number().int().min(1),
  examDate: z.string().min(1, "Sanani tanlang"),
  dailyMinutes: z.number().int().min(5),
});

export type RegisterInput = z.infer<typeof RegisterSchema>;
export type LoginInput = z.infer<typeof LoginSchema>;
export type OnboardingInput = z.infer<typeof OnboardingSchema>;
