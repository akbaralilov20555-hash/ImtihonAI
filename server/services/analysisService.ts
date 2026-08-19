import { prisma } from "@/lib/prisma";
import { analyzeTestResult } from "./aiService";

interface SubmittedAnswer {
  questionId: string;
  answer: string;
}

export async function submitAndAnalyzeTest(params: {
  userId: string;
  testId: string;
  answers: SubmittedAnswer[];
}) {
  const test = await prisma.test.findUnique({
    where: { id: params.testId },
    include: { subject: true, questions: { include: { topic: true } } },
  });

  if (!test || test.userId !== params.userId) {
    throw new Error("Test topilmadi");
  }

  const answerMap = new Map(params.answers.map((a) => [a.questionId, a.answer]));

  let correctAnswers = 0;
  const topicStats = new Map<string, { correct: number; total: number }>();

  for (const q of test.questions) {
    const userAnswer = answerMap.get(q.id) ?? null;
    const isCorrect = userAnswer === q.correctAnswer;
    if (isCorrect) correctAnswers++;

    await prisma.question.update({
      where: { id: q.id },
      data: { userAnswer, isCorrect },
    });

    const topicName = q.topic?.name ?? "Umumiy";
    const stat = topicStats.get(topicName) ?? { correct: 0, total: 0 };
    stat.total += 1;
    if (isCorrect) stat.correct += 1;
    topicStats.set(topicName, stat);
  }

  const totalQuestions = test.questions.length;
  const wrongAnswers = totalQuestions - correctAnswers;
  const score = totalQuestions > 0 ? Math.round((correctAnswers / totalQuestions) * 100) : 0;

  const topicBreakdown = [...topicStats.entries()].map(([topic, s]) => ({
    topic,
    correct: s.correct,
    total: s.total,
  }));

  let aiAnalysis: string | null = null;
  let weakTopics: string[] = [];
  let strongTopics: string[] = [];

  try {
    const analysis = await analyzeTestResult({
      subject: test.subject.name,
      totalQuestions,
      correctAnswers,
      topicBreakdown,
    });
    aiAnalysis = `${analysis.summary}\n\n${analysis.recommendation}`;
    weakTopics = analysis.weakTopics;
    strongTopics = analysis.strongTopics;
  } catch {
    // AI tahlil ishlamasa (masalan, demo rejimida) — oddiy qoidaviy tahlil
    // ishlatiladi, natija baribir mazmunli ko'rinadi.
    weakTopics = topicBreakdown
      .filter((t) => t.correct / t.total < 0.6)
      .map((t) => t.topic);
    strongTopics = topicBreakdown
      .filter((t) => t.correct / t.total >= 0.8)
      .map((t) => t.topic);

    const scoreText =
      score >= 80
        ? "Ajoyib natija! Siz mavzularni yaxshi o'zlashtirgansiz."
        : score >= 50
          ? "Yaxshi boshlanish, lekin ba'zi mavzularda mustahkamlash kerak."
          : "Bu mavzularda hali ko'proq mashq qilish kerak — tashvishlanmang, bu normal jarayon.";

    aiAnalysis = `${scoreText}\n\n${
      weakTopics.length > 0
        ? `Diqqat qaratish kerak bo'lgan mavzular: ${weakTopics.join(", ")}.`
        : "Barcha mavzular bo'yicha natijangiz yaxshi."
    }`;
  }

  const result = await prisma.result.create({
    data: {
      userId: params.userId,
      testId: test.id,
      score,
      correctAnswers,
      wrongAnswers,
      weakTopics: JSON.stringify(weakTopics),
      strongTopics: JSON.stringify(strongTopics),
      aiAnalysis,
    },
  });

  return result;
}
