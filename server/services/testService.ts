import { prisma } from "@/lib/prisma";
import { getSubjectBySlug } from "@/lib/curriculum/subjects";
import { generateTestQuestions, generateDiagnosticTest } from "./aiService";
import { getFallbackQuestions, type FallbackQuestion } from "@/lib/ai/fallback";
import type { Difficulty, ExamType } from "@/types/test.types";

function isAiConfigured() {
  return Boolean(process.env.OPENAI_API_KEY && process.env.OPENAI_API_KEY.trim() !== "");
}

async function ensureSubjectInDb(slug: string) {
  const def = getSubjectBySlug(slug);
  if (!def) throw new Error("Fan topilmadi");

  let subject = await prisma.subject.findUnique({ where: { slug } });
  if (!subject) {
    subject = await prisma.subject.create({ data: { name: def.name, slug: def.slug } });
    for (const topicName of def.topics) {
      await prisma.topic.create({ data: { name: topicName, subjectId: subject.id } });
    }
  }
  return { subject, def };
}

async function resolveTopicId(subjectId: string, topicName: string) {
  // SQLite "insensitive" mode'ni qo'llab-quvvatlamaydi, shuning uchun
  // taqqoslash JS tomonida amalga oshiriladi.
  const topics = await prisma.topic.findMany({ where: { subjectId } });
  const match = topics.find(
    (t) => t.name.toLowerCase() === topicName.toLowerCase()
  );
  return match?.id ?? null;
}

export async function createPracticeTest(params: {
  userId: string;
  subjectSlug: string;
  topics?: string[];
  difficulty: Difficulty | "MIXED";
  questionCount: number;
  examType: ExamType;
}) {
  const { subject, def } = await ensureSubjectInDb(params.subjectSlug);
  const topics = params.topics?.length ? params.topics : def.topics;

  let questions: FallbackQuestion[];

  if (isAiConfigured()) {
    try {
      const aiResult =
        params.examType === "DIAGNOSTIC"
          ? await generateDiagnosticTest({
              subject: subject.name,
              topics,
              questionCount: params.questionCount,
            } as never)
          : await generateTestQuestions({
              subject: subject.name,
              topics,
              difficulty: params.difficulty,
              questionCount: params.questionCount,
              examType: params.examType,
            });
      questions = aiResult.questions;
    } catch {
      // AI so'rovi muvaffaqiyatsiz bo'lsa (masalan, kvota tugagan), demo
      // savollarga o'tiladi — foydalanuvchi baribir bo'sh qo'l bilan qolmaydi.
      questions = getFallbackQuestions(params.subjectSlug, params.questionCount);
    }
  } else {
    // Demo rejimi: OpenAI kaliti sozlanmagan — tayyor savollar banki ishlatiladi.
    questions = getFallbackQuestions(params.subjectSlug, params.questionCount);
  }

  const test = await prisma.test.create({
    data: {
      userId: params.userId,
      subjectId: subject.id,
      topic: topics.join(", "),
      difficulty: params.difficulty === "MIXED" ? "MEDIUM" : params.difficulty,
      examType: params.examType,
    },
  });

  for (let i = 0; i < questions.length; i++) {
    const q = questions[i];
    const topicId = await resolveTopicId(subject.id, q.topic);

    await prisma.question.create({
      data: {
        testId: test.id,
        topicId,
        questionText: q.questionText,
        options: JSON.stringify(q.options),
        correctAnswer: q.correctAnswer,
        explanation: q.explanation,
        difficulty: q.difficulty,
        order: i,
      },
    });
  }

  return getTestWithQuestions(test.id);
}

export async function getTestWithQuestions(testId: string) {
  return prisma.test.findUnique({
    where: { id: testId },
    include: {
      subject: true,
      questions: { orderBy: { order: "asc" }, include: { topic: true } },
    },
  });
}

/**
 * Test'ni clientga yuborishdan oldin `options` maydonini
 * (JSON string) haqiqiy array'ga o'giradi.
 */
export function serializeTestForClient<
  T extends { questions: { options: string }[] }
>(test: T) {
  return {
    ...test,
    questions: test.questions.map((q) => ({
      ...q,
      options: JSON.parse(q.options) as string[],
    })),
  };
}
