import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { SUBJECTS } from "@/lib/curriculum/subjects";

export function StartTestCard({ subjectSlug }: { subjectSlug: string | null }) {
  const subject = SUBJECTS.find((s) => s.slug === subjectSlug) ?? SUBJECTS[0];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">Bugungi reja</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm text-slate-500">
          {subject.name} fanidan yangi AI test tayyorlab qo&apos;ydik. Boshlashga tayyormisiz?
        </p>
        <Link href={`/test/${subject.slug}`}>
          <Button className="w-full">Testni boshlash</Button>
        </Link>
      </CardContent>
    </Card>
  );
}
