import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export default async function ResultPage({ params }: { params: { resultId: string } }) {
  const session = await getServerSession(authOptions);
  if (!session?.user) redirect("/login");

  const result = await prisma.result.findUnique({
    where: { id: params.resultId },
    include: { test: { include: { subject: true } } },
  });

  // @ts-expect-error - custom field on session user
  if (!result || result.userId !== session.user.id) {
    redirect("/dashboard");
  }

  const weakTopics = JSON.parse(result.weakTopics || "[]") as string[];
  const strongTopics = JSON.parse(result.strongTopics || "[]") as string[];

  return (
    <div className="mx-auto max-w-2xl space-y-6 py-6">
      <Card>
        <CardHeader className="text-center">
          <p className="text-sm text-slate-500">{result.test.subject.name}</p>
          <CardTitle className="text-4xl">{result.score}%</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex justify-center gap-8 text-center">
            <div>
              <p className="text-2xl font-semibold text-emerald-600">{result.correctAnswers}</p>
              <p className="text-sm text-slate-500">To&apos;g&apos;ri</p>
            </div>
            <div>
              <p className="text-2xl font-semibold text-rose-500">{result.wrongAnswers}</p>
              <p className="text-sm text-slate-500">Xato</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {result.aiAnalysis && (
        <Card>
          <CardHeader>
            <CardTitle className="text-base">AI tahlili</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="whitespace-pre-line text-sm text-slate-600 dark:text-slate-300">
              {result.aiAnalysis}
            </p>
          </CardContent>
        </Card>
      )}

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Zaif mavzular</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-wrap gap-2">
            {weakTopics.length === 0 ? (
              <p className="text-sm text-slate-500">Yo&apos;q</p>
            ) : (
              weakTopics.map((t) => (
                <Badge key={t} variant="warning">
                  {t}
                </Badge>
              ))
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Kuchli mavzular</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-wrap gap-2">
            {strongTopics.length === 0 ? (
              <p className="text-sm text-slate-500">Yo&apos;q</p>
            ) : (
              strongTopics.map((t) => (
                <Badge key={t} variant="success">
                  {t}
                </Badge>
              ))
            )}
          </CardContent>
        </Card>
      </div>

      <div className="flex gap-3">
        <Link href="/dashboard" className="flex-1">
          <Button variant="outline" className="w-full">
            Dashboardga qaytish
          </Button>
        </Link>
        <Link href="/ai-tutor" className="flex-1">
          <Button className="w-full">AI Tutor bilan mashq qilish</Button>
        </Link>
      </div>
    </div>
  );
}
