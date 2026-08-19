import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";
import type { RegisterInput, OnboardingInput } from "@/lib/validators/auth.validator";

export async function createUser(input: RegisterInput) {
  const existing = await prisma.user.findUnique({ where: { email: input.email } });
  if (existing) {
    throw new Error("Bu email allaqachon ro'yxatdan o'tgan");
  }

  const hashedPassword = await bcrypt.hash(input.password, 10);

  return prisma.user.create({
    data: {
      name: input.name,
      email: input.email,
      password: hashedPassword,
    },
  });
}

export async function completeOnboarding(userId: string, input: OnboardingInput) {
  return prisma.user.update({
    where: { id: userId },
    data: {
      class: input.class,
      goalScore: input.goalScore,
      examDate: new Date(input.examDate),
      dailyMinutes: input.dailyMinutes,
      onboarded: true,
    },
  });
}

export async function getUserById(userId: string) {
  return prisma.user.findUnique({ where: { id: userId } });
}

export async function getUserDashboardStats(userId: string) {
  const results = await prisma.result.findMany({
    where: { userId },
    orderBy: { createdAt: "desc" },
    take: 10,
  });

  const testsCount = await prisma.test.count({ where: { userId } });

  const avgScore =
    results.length > 0
      ? Math.round(results.reduce((sum, r) => sum + r.score, 0) / results.length)
      : 0;

  const weakTopicCounts = new Map<string, number>();
  for (const r of results) {
    const topics = JSON.parse(r.weakTopics || "[]") as string[];
    for (const t of topics) {
      weakTopicCounts.set(t, (weakTopicCounts.get(t) ?? 0) + 1);
    }
  }
  const weakTopics = [...weakTopicCounts.entries()]
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3)
    .map(([topic]) => topic);

  return {
    testsCount,
    avgScore,
    weakTopics,
    recentResults: results,
  };
}
