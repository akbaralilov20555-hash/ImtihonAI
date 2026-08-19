"use client";

import Link from "next/link";
import { Sparkles, MessageSquare, LineChart, Target } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useLanguage } from "@/lib/i18n/context";
import { Reveal } from "@/components/shared/reveal";

export function Features() {
  const { t } = useLanguage();

  const features = [
    { icon: Sparkles, title: t.features.f1t, desc: t.features.f1d },
    { icon: MessageSquare, title: t.features.f2t, desc: t.features.f2d },
    { icon: LineChart, title: t.features.f3t, desc: t.features.f3d },
    { icon: Target, title: t.features.f4t, desc: t.features.f4d },
  ];

  return (
    <section id="features" className="px-6 py-20">
      <div className="mx-auto max-w-5xl">
        <h2 className="mb-12 text-center text-2xl font-bold text-slate-900 dark:text-white md:text-3xl">
          {t.features.title}
        </h2>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((f, i) => (
            <Reveal key={f.title} delay={i * 0.08}>
              <Card className="h-full transition-all hover:-translate-y-1 hover:shadow-md">
                <CardHeader>
                  <div className="mb-2 flex h-11 w-11 items-center justify-center rounded-xl bg-brand-50 dark:bg-brand-900/30">
                    <f.icon className="h-5 w-5 text-brand-600" />
                  </div>
                  <CardTitle className="text-base">{f.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-slate-500 dark:text-slate-400">{f.desc}</p>
                </CardContent>
              </Card>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export function CTA() {
  const { t } = useLanguage();

  return (
    <section className="px-6 py-20">
      <div className="relative mx-auto max-w-3xl overflow-hidden rounded-3xl bg-gradient-to-br from-brand-600 to-brand-800 px-8 py-16 text-center text-white">
        <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-white/10 blur-3xl" />
        <h2 className="relative text-2xl font-bold md:text-3xl">{t.cta.title}</h2>
        <p className="relative mt-3 text-brand-100">{t.cta.subtitle}</p>
        <Link href="/register" className="relative mt-8 inline-block">
          <Button size="lg" variant="secondary">
            {t.cta.button}
          </Button>
        </Link>
      </div>
    </section>
  );
}
