"use client";

import Link from "next/link";
import { Check, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/lib/i18n/context";

export function Pricing() {
  const { t } = useLanguage();

  const freeFeatures = [t.pricing.freeF1, t.pricing.freeF2, t.pricing.freeF3];
  const premiumFeatures = [t.pricing.premF1, t.pricing.premF2, t.pricing.premF3, t.pricing.premF4];

  return (
    <section id="pricing" className="bg-slate-50 px-6 py-20 dark:bg-navy-900/40">
      <div className="mx-auto max-w-4xl">
        <div className="mb-12 text-center">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white md:text-3xl">
            {t.pricing.title}
          </h2>
          <p className="mt-3 text-slate-600 dark:text-slate-300">{t.pricing.subtitle}</p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {/* Free plan */}
          <div className="rounded-3xl border border-slate-200 bg-white p-8 dark:border-slate-800 dark:bg-navy-900">
            <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
              {t.pricing.freeTitle}
            </h3>
            <p className="mt-2 text-3xl font-bold text-slate-900 dark:text-white">
              {t.pricing.freePrice}
            </p>
            <ul className="mt-6 space-y-3">
              {freeFeatures.map((f) => (
                <li key={f} className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300">
                  <Check className="h-4 w-4 shrink-0 text-emerald-500" />
                  {f}
                </li>
              ))}
            </ul>
            <Link href="/register" className="mt-8 block">
              <Button variant="outline" className="w-full">
                {t.pricing.cta}
              </Button>
            </Link>
          </div>

          {/* Premium plan */}
          <div className="relative rounded-3xl border-2 border-brand-600 bg-white p-8 shadow-xl shadow-brand-600/10 dark:bg-navy-900">
            <span
              className={cn(
                "absolute -top-3 right-8 inline-flex items-center gap-1 rounded-full bg-brand-600 px-3 py-1 text-xs font-semibold text-white"
              )}
            >
              <Sparkles className="h-3 w-3" />
              {t.pricing.premiumBadge}
            </span>
            <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
              {t.pricing.premiumTitle}
            </h3>
            <p className="mt-2 text-3xl font-bold text-slate-900 dark:text-white">
              {t.pricing.premiumPrice}
            </p>
            <ul className="mt-6 space-y-3">
              {premiumFeatures.map((f) => (
                <li key={f} className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300">
                  <Check className="h-4 w-4 shrink-0 text-brand-600" />
                  {f}
                </li>
              ))}
            </ul>
            <Link href="/register" className="mt-8 block">
              <Button className="w-full">{t.pricing.cta}</Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
