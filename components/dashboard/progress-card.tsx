import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp } from "lucide-react";

export function ProgressCard({
  avgScore,
  testsCount,
}: {
  avgScore: number;
  testsCount: number;
}) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">Umumiy natija</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-end justify-between">
          <div>
            <p className="text-3xl font-bold text-slate-900 dark:text-white">{avgScore}%</p>
            <p className="mt-1 text-sm text-slate-500">O&apos;rtacha natija</p>
          </div>
          <div className="flex items-center gap-1 text-emerald-600">
            <TrendingUp className="h-4 w-4" />
            <span className="text-sm font-medium">{testsCount} ta test</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
