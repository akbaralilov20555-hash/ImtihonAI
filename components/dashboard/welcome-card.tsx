import { Card, CardContent } from "@/components/ui/card";

export function WelcomeCard({ name, dailyMinutes }: { name: string; dailyMinutes: number | null }) {
  return (
    <Card className="bg-gradient-to-br from-brand-600 to-brand-800 text-white">
      <CardContent className="p-6">
        <h2 className="text-xl font-semibold">Salom, {name}.</h2>
        <p className="mt-1 text-brand-100">
          Bugun {dailyMinutes ?? 30} daqiqa tayyorgarlik qilamiz.
        </p>
      </CardContent>
    </Card>
  );
}
