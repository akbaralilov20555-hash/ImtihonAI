"use client";

import { LineChart, AlertTriangle, Target, Flame } from "lucide-react";
import { Reveal } from "@/components/shared/reveal";
import { useLanguage } from "@/lib/i18n/context";

export function ProductPreview() {
  const { locale } = useLanguage();

  const copy = {
    uz: { label: "Mahsulot", title: "Dashboard sizga hammasini bir joyda ko'rsatadi", subtitle: "Progress, zaif mavzular va AI tavsiyalar — barchasi vizual va tushunarli." },
    ru: { label: "Продукт", title: "Дашборд показывает всё в одном месте", subtitle: "Прогресс, слабые темы и советы AI — наглядно и понятно." },
    en: { label: "Product", title: "Your dashboard shows everything at a glance", subtitle: "Progress, weak topics, and AI recommendations — all visual and clear." },
  }[locale];

  return (
    <section className="bg-slate-50 px-6 py-20 dark:bg-navy-900/40">
      <div className="mx-auto max-w-5xl">
        <div className="mb-12 text-center">
          <p className="text-sm font-semibold uppercase tracking-wide text-brand-600">{copy.label}</p>
          <h2 className="mt-2 text-2xl font-bold text-slate-900 dark:text-white md:text-3xl">
            {copy.title}
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-slate-600 dark:text-slate-300">{copy.subtitle}</p>
        </div>

        <Reveal>
          <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-2xl shadow-slate-900/10 dark:border-slate-800 dark:bg-navy-900">
            {/* Browser chrome */}
            <div className="flex items-center gap-1.5 border-b border-slate-100 bg-slate-50 px-4 py-3 dark:border-slate-800 dark:bg-navy-950">
              <span className="h-2.5 w-2.5 rounded-full bg-rose-400" />
              <span className="h-2.5 w-2.5 rounded-full bg-amber-400" />
              <span className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
            </div>

            <div className="grid grid-cols-1 gap-4 p-6 md:grid-cols-3">
              <div className="rounded-2xl bg-gradient-to-br from-brand-600 to-brand-800 p-5 text-white md:col-span-2">
                <p className="text-sm text-brand-100">Salom, Aziz.</p>
                <p className="mt-1 text-lg font-semibold">Bugun 40 daqiqa tayyorgarlik qilamiz.</p>
                <div className="mt-4 h-2 w-full overflow-hidden rounded-full bg-white/20">
                  <div className="h-full w-2/3 rounded-full bg-white" />
                </div>
              </div>

              <div className="rounded-2xl border border-slate-100 p-5 dark:border-slate-800">
                <div className="mb-2 flex items-center gap-2 text-amber-500">
                  <Flame className="h-4 w-4" />
                  <span className="text-xs font-semibold uppercase">Streak</span>
                </div>
                <p className="text-2xl font-bold text-slate-900 dark:text-white">15 kun</p>
              </div>

              <div className="rounded-2xl border border-slate-100 p-5 dark:border-slate-800">
                <div className="mb-2 flex items-center gap-2 text-brand-600">
                  <LineChart className="h-4 w-4" />
                  <span className="text-xs font-semibold uppercase">Natija</span>
                </div>
                <p className="text-2xl font-bold text-slate-900 dark:text-white">72%</p>
              </div>

              <div className="rounded-2xl border border-slate-100 p-5 dark:border-slate-800">
                <div className="mb-2 flex items-center gap-2 text-rose-500">
                  <AlertTriangle className="h-4 w-4" />
                  <span className="text-xs font-semibold uppercase">Zaif mavzu</span>
                </div>
                <p className="text-sm font-medium text-slate-900 dark:text-white">Geometriya — 45%</p>
              </div>

              <div className="rounded-2xl border border-slate-100 p-5 dark:border-slate-800">
                <div className="mb-2 flex items-center gap-2 text-emerald-600">
                  <Target className="h-4 w-4" />
                  <span className="text-xs font-semibold uppercase">Maqsad</span>
                </div>
                <p className="text-sm font-medium text-slate-900 dark:text-white">150 / 189 ball</p>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
