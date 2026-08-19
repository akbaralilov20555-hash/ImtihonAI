"use client";

import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/lib/i18n/context";
import { HeroMockup } from "./hero-mockup";

export function Hero() {
  const { t } = useLanguage();

  return (
    <section className="relative overflow-hidden px-6 pb-24 pt-20 md:pt-28">
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute left-1/2 top-[-15%] h-[600px] w-[900px] -translate-x-1/2 rounded-full bg-gradient-to-tr from-brand-200 via-brand-100 to-transparent opacity-60 blur-3xl dark:from-brand-900/40 dark:via-brand-800/10 dark:opacity-30" />
      </div>

      <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-16 lg:grid-cols-2">
        <div className="text-center lg:text-left">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-brand-50 px-4 py-1.5 text-sm font-medium text-brand-700 dark:bg-brand-900/30 dark:text-brand-300">
            <Sparkles className="h-4 w-4" />
            {t.hero.badge}
          </div>

          <h1 className="text-4xl font-bold tracking-tight text-slate-900 dark:text-white md:text-6xl">
            {t.hero.title1} <span className="text-brand-600">{t.hero.titleHighlight}</span>{" "}
            {t.hero.title2}
          </h1>

          <p className="mx-auto mt-6 max-w-xl text-lg text-slate-600 dark:text-slate-300 lg:mx-0">
            {t.hero.subtitle}
          </p>

          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row lg:justify-start">
            <Link href="/register">
              <Button size="lg" className="gap-2">
                {t.hero.cta1}
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <a href="#how-it-works">
              <Button size="lg" variant="outline">
                {t.hero.cta2}
              </Button>
            </a>
          </div>

          <div className="mx-auto mt-16 grid max-w-lg grid-cols-3 gap-6 border-t border-slate-100 pt-8 dark:border-slate-800 lg:mx-0">
            <div>
              <p className="text-2xl font-bold text-slate-900 dark:text-white">10,000+</p>
              <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">{t.hero.stat1}</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-slate-900 dark:text-white">4</p>
              <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">{t.hero.stat2}</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-slate-900 dark:text-white">24/7</p>
              <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">{t.hero.stat3}</p>
            </div>
          </div>
        </div>

        <div className="hidden lg:block">
          <HeroMockup />
        </div>
      </div>
    </section>
  );
}
