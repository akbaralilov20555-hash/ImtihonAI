"use client";

import { useLanguage } from "@/lib/i18n/context";

export function HowItWorks() {
  const { t } = useLanguage();

  const steps = [
    { number: "1", title: t.how.s1t, desc: t.how.s1d },
    { number: "2", title: t.how.s2t, desc: t.how.s2d },
    { number: "3", title: t.how.s3t, desc: t.how.s3d },
  ];

  return (
    <section id="how-it-works" className="bg-slate-50 px-6 py-20 dark:bg-navy-900/40">
      <div className="mx-auto max-w-5xl">
        <h2 className="mb-12 text-center text-2xl font-bold text-slate-900 dark:text-white md:text-3xl">
          {t.how.title}
        </h2>

        <div className="relative grid grid-cols-1 gap-8 md:grid-cols-3">
          <div className="absolute left-0 right-0 top-6 hidden h-px bg-slate-200 dark:bg-slate-800 md:block" />
          {steps.map((step) => (
            <div key={step.number} className="relative text-center">
              <div className="relative z-10 mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-brand-600 text-lg font-bold text-white shadow-lg shadow-brand-600/30">
                {step.number}
              </div>
              <h3 className="font-semibold text-slate-900 dark:text-white">{step.title}</h3>
              <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
