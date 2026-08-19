import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth";
import { getUserById, getUserDashboardStats } from "@/server/services/userService";
import { WelcomeCard } from "@/components/dashboard/welcome-card";
import { ProgressCard } from "@/components/dashboard/progress-card";
import { WeakTopicsCard } from "@/components/dashboard/weak-topics-card";
import { StartTestCard } from "@/components/dashboard/start-test-card";
import { SUBJECTS } from "@/lib/curriculum/subjects";

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);
  if (!session?.user) redirect("/login");

  // @ts-expect-error - custom field on session user
  const userId = session.user.id as string;
  const user = await getUserById(userId);

  if (!user) redirect("/login");
  if (!user.onboarded) redirect("/onboarding");

  const stats = await getUserDashboardStats(userId);
  const subjectSlug = SUBJECTS[0]?.slug ?? null;

  return (
    <div className="mx-auto max-w-5xl space-y-6">
      <WelcomeCard name={user.name} dailyMinutes={user.dailyMinutes} />

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <ProgressCard avgScore={stats.avgScore} testsCount={stats.testsCount} />
        <StartTestCard subjectSlug={subjectSlug} />
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <WeakTopicsCard topics={stats.weakTopics} />
      </div>
    </div>
  );
}
