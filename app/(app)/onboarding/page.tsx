"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { SUBJECTS } from "@/lib/curriculum/subjects";
import { submitOnboardingAction } from "@/server/actions/onboarding.actions";
import { cn } from "@/lib/utils";

const STEPS = [
  "Nechinchi sinfsiz?",
  "Qaysi fandan tayyorlanyapsiz?",
  "Maqsadingiz qancha ball?",
  "Imtihongacha qancha vaqt bor?",
  "Kuniga qancha vaqt ajrata olasiz?",
];

export default function OnboardingPage() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    class: 9,
    subjectSlug: "",
    goalScore: 150,
    examDate: "",
    dailyMinutes: 60,
  });

  const progress = ((step + 1) / STEPS.length) * 100;

  async function handleNext() {
    if (step < STEPS.length - 1) {
      setStep(step + 1);
      return;
    }

    setLoading(true);
    setError(null);

    const result = await submitOnboardingAction(form);
    setLoading(false);

    if (!result.success) {
      setError(result.error ?? "Xatolik yuz berdi");
      return;
    }

    router.push("/dashboard");
    router.refresh();
  }

  const canProceed =
    (step === 0 && form.class) ||
    (step === 1 && form.subjectSlug) ||
    (step === 2 && form.goalScore > 0) ||
    (step === 3 && form.examDate) ||
    (step === 4 && form.dailyMinutes > 0);

  return (
    <div className="mx-auto flex min-h-screen max-w-xl flex-col justify-center px-6 py-10">
      <Progress value={progress} className="mb-8" />

      <Card>
        <CardHeader>
          <CardDescription>
            Savol {step + 1} / {STEPS.length}
          </CardDescription>
          <CardTitle>{STEPS[step]}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {step === 0 && (
            <div className="grid grid-cols-3 gap-3">
              {[9, 10, 11].map((c) => (
                <button
                  key={c}
                  onClick={() => setForm({ ...form, class: c })}
                  className={cn(
                    "rounded-xl border py-4 text-center font-medium transition-colors",
                    form.class === c
                      ? "border-brand-600 bg-brand-50 text-brand-700 dark:bg-brand-900/30"
                      : "border-slate-200 dark:border-slate-700"
                  )}
                >
                  {c}-sinf
                </button>
              ))}
            </div>
          )}

          {step === 1 && (
            <div className="grid grid-cols-2 gap-3">
              {SUBJECTS.map((s) => (
                <button
                  key={s.slug}
                  onClick={() => setForm({ ...form, subjectSlug: s.slug })}
                  className={cn(
                    "rounded-xl border py-4 text-center font-medium transition-colors",
                    form.subjectSlug === s.slug
                      ? "border-brand-600 bg-brand-50 text-brand-700 dark:bg-brand-900/30"
                      : "border-slate-200 dark:border-slate-700"
                  )}
                >
                  {s.name}
                </button>
              ))}
            </div>
          )}

          {step === 2 && (
            <div className="space-y-2">
              <Label htmlFor="goalScore">Maqsad ball</Label>
              <Input
                id="goalScore"
                type="number"
                value={form.goalScore}
                onChange={(e) => setForm({ ...form, goalScore: Number(e.target.value) })}
              />
            </div>
          )}

          {step === 3 && (
            <div className="space-y-2">
              <Label htmlFor="examDate">Imtihon sanasi</Label>
              <Input
                id="examDate"
                type="date"
                value={form.examDate}
                onChange={(e) => setForm({ ...form, examDate: e.target.value })}
              />
            </div>
          )}

          {step === 4 && (
            <div className="space-y-2">
              <Label htmlFor="dailyMinutes">Kunlik vaqt (daqiqa)</Label>
              <Input
                id="dailyMinutes"
                type="number"
                value={form.dailyMinutes}
                onChange={(e) => setForm({ ...form, dailyMinutes: Number(e.target.value) })}
              />
            </div>
          )}

          {error && <p className="text-sm text-rose-600">{error}</p>}

          <div className="flex justify-between pt-2">
            {step > 0 ? (
              <Button variant="outline" onClick={() => setStep(step - 1)}>
                Orqaga
              </Button>
            ) : (
              <span />
            )}
            <Button onClick={handleNext} disabled={!canProceed || loading}>
              {loading ? "Saqlanmoqda..." : step === STEPS.length - 1 ? "Yakunlash" : "Keyingi"}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
