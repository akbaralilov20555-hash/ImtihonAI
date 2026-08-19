import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { createTestAction } from "@/server/actions/test.actions";
import { serializeTestForClient } from "@/server/services/testService";

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    return NextResponse.json({ error: "Tizimga kiring" }, { status: 401 });
  }

  const body = await req.json();

  const result = await createTestAction({
    subjectSlug: body.subjectSlug,
    topics: body.topics,
    difficulty: body.difficulty ?? "MEDIUM",
    questionCount: body.questionCount ?? 10,
    examType: body.examType ?? "PRACTICE",
  });

  if (!result.success) {
    return NextResponse.json({ error: result.error }, { status: 400 });
  }

  if (!result.test) {
    return NextResponse.json({ error: "Test yaratilmadi" }, { status: 500 });
  }

  return NextResponse.json({ test: serializeTestForClient(result.test) });
}
