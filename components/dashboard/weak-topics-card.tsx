import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertTriangle } from "lucide-react";

export function WeakTopicsCard({ topics }: { topics: string[] }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-base">
          <AlertTriangle className="h-4 w-4 text-amber-500" />
          Zaif mavzular
        </CardTitle>
      </CardHeader>
      <CardContent>
        {topics.length === 0 ? (
          <p className="text-sm text-slate-500">
            Hali ma&apos;lumot yo&apos;q — birinchi testni ishlang.
          </p>
        ) : (
          <ul className="space-y-2">
            {topics.map((t) => (
              <li
                key={t}
                className="rounded-lg bg-amber-50 px-3 py-2 text-sm font-medium text-amber-700 dark:bg-amber-900/20 dark:text-amber-300"
              >
                {t}
              </li>
            ))}
          </ul>
        )}
      </CardContent>
    </Card>
  );
}
