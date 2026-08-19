"use client";

import { Brain, Target, MessageSquare, LineChart } from "lucide-react";
import { useLanguage } from "@/lib/i18n/context";
import { Reveal } from "@/components/shared/reveal";

export function ProblemSolution() {
  const { t } = useLanguage();

  const cards = [
    { icon: Brain, title: t.problem.card1t, desc: t.problem.card1d },
    { icon: Target, title: t.problem.card2t, desc: t.problem.card2d },
    { icon: MessageSquare, title: t.problem.card3t, desc: t.problem.card3d },
    { icon: LineChart, title: t.problem.card4t, desc: t.problem.card4d },
  ];

  return (
    <section className="px-6 py-20">
      <div className="mx-auto max-w-5xl">
        <div className="mb-16 text-center">
          <p className="text-sm font-semibold uppercase tracking-wide text-brand-600">
            {t.problem.label}
          </p>
          <h2 className="mt-2 text-2xl font-bold text-slate-900 dark:text-white md:text-3xl">
            {t.problem.title}
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-slate-600 dark:text-slate-300">
            {t.problem.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {cards.map((item, i) => (
            <Reveal key={item.title} delay={i * 0.08}>
              <div className="group h-full rounded-2xl border border-slate-100 bg-white p-6 text-center shadow-sm transition-all hover:-translate-y-1 hover:shadow-md dark:border-slate-800 dark:bg-navy-900">
                <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-50 transition-colors group-hover:bg-brand-100 dark:bg-brand-900/30 dark:group-hover:bg-brand-900/50">
                  <item.icon className="h-7 w-7 text-brand-600" />
                </div>
                <h3 className="font-semibold text-slate-900 dark:text-white">{item.title}</h3>
                <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">{item.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
