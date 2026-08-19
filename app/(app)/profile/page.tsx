import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth";
import { getUserById, getUserDashboardStats } from "@/server/services/userService";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { formatDate } from "@/lib/utils";

export default async function ProfilePage() {
  const session = await getServerSession(authOptions);
  if (!session?.user) redirect("/login");

  // @ts-expect-error - custom field on session user
  const userId = session.user.id as string;
  const user = await getUserById(userId);
  if (!user) redirect("/login");

  const stats = await getUserDashboardStats(userId);

  const levelLabel: Record<string, string> = {
    BEGINNER: "Boshlang'ich",
    INTERMEDIATE: "O'rta",
    ADVANCED: "Yuqori",
  };

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <h1 className="text-xl font-semibold text-slate-900 dark:text-white">Profil</h1>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Shaxsiy ma&apos;lumot</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 text-sm">
          <div className="flex justify-between border-b border-slate-100 pb-3 dark:border-slate-800">
            <span className="text-slate-500">Ism</span>
            <span className="font-medium text-slate-900 dark:text-white">{user.name}</span>
          </div>
          <div className="flex justify-between border-b border-slate-100 pb-3 dark:border-slate-800">
            <span className="text-slate-500">Email</span>
            <span className="font-medium text-slate-900 dark:text-white">{user.email}</span>
          </div>
          <div className="flex justify-between border-b border-slate-100 pb-3 dark:border-slate-800">
            <span className="text-slate-500">Sinf</span>
            <span className="font-medium text-slate-900 dark:text-white">
              {user.class ? `${user.class}-sinf` : "—"}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-500">Daraja</span>
            <Badge>{levelLabel[user.currentLevel] ?? user.currentLevel}</Badge>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Maqsad</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 text-sm">
          <div className="flex justify-between border-b border-slate-100 pb-3 dark:border-slate-800">
            <span className="text-slate-500">Maqsad ball</span>
            <span className="font-medium text-slate-900 dark:text-white">
              {user.goalScore ?? "—"}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-500">Imtihon sanasi</span>
            <span className="font-medium text-slate-900 dark:text-white">
              {user.examDate ? formatDate(user.examDate) : "—"}
            </span>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Natijalar</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 text-sm">
          <div className="flex justify-between border-b border-slate-100 pb-3 dark:border-slate-800">
            <span className="text-slate-500">Ishlangan testlar</span>
            <span className="font-medium text-slate-900 dark:text-white">{stats.testsCount}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-500">O&apos;rtacha natija</span>
            <span className="font-medium text-slate-900 dark:text-white">{stats.avgScore}%</span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
