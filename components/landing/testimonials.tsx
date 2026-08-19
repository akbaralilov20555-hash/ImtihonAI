"use client";

import { Star } from "lucide-react";
import { Reveal } from "@/components/shared/reveal";
import { useLanguage } from "@/lib/i18n/context";

const AVATARS = ["from-brand-400 to-brand-600", "from-emerald-400 to-emerald-600", "from-amber-400 to-amber-600"];

const testimonialsByLocale = {
  uz: [
    { name: "Aziz Rahimov", role: "11-sinf o'quvchisi", text: "Geometriyadan doim past ball olardim. AI aynan qayerda xato qilayotganimni ko'rsatdi — bir oyda 30 ball ko'tardim." },
    { name: "Malika Yusupova", role: "Abituriyent", text: "AI Tutor bilan tunda ham savol berish mumkin — repetitor izlash shart emas edi. Juda qulay." },
    { name: "Jasur Tojiboyev", role: "9-sinf o'quvchisi", text: "Har safar yangi test chiqadi, zerikmayapman. DTM formatiga ham juda o'xshaydi." },
  ],
  ru: [
    { name: "Азиз Рахимов", role: "Ученик 11 класса", text: "Всегда получал низкие баллы по геометрии. AI точно показал, где я ошибаюсь — за месяц поднял результат на 30 баллов." },
    { name: "Малика Юсупова", role: "Абитуриентка", text: "С AI репетитором можно задавать вопросы даже ночью — не пришлось искать репетитора. Очень удобно." },
    { name: "Жасур Тожибоев", role: "Ученик 9 класса", text: "Каждый раз новый тест, не надоедает. Очень похоже на формат ДТМ." },
  ],
  en: [
    { name: "Aziz Rahimov", role: "11th grade student", text: "I always scored low in geometry. The AI showed exactly where I was making mistakes — gained 30 points in a month." },
    { name: "Malika Yusupova", role: "Prospective student", text: "I can ask the AI tutor questions even at night — no need to find a real tutor. Super convenient." },
    { name: "Jasur Tojiboyev", role: "9th grade student", text: "A fresh test every time, never boring. It feels very close to the real DTM format." },
  ],
};

export function Testimonials() {
  const { locale } = useLanguage();
  const items = testimonialsByLocale[locale];

  return (
    <section className="px-6 py-20">
      <div className="mx-auto max-w-5xl">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {items.map((item, i) => (
            <Reveal key={item.name} delay={i * 0.1}>
              <div className="h-full rounded-2xl border border-slate-100 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-navy-900">
                <div className="mb-3 flex gap-0.5">
                  {Array.from({ length: 5 }).map((_, s) => (
                    <Star key={s} className="h-4 w-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                  &ldquo;{item.text}&rdquo;
                </p>
                <div className="mt-5 flex items-center gap-3">
                  <div
                    className={`flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br ${AVATARS[i]} text-sm font-semibold text-white`}
                  >
                    {item.name.charAt(0)}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-slate-900 dark:text-white">{item.name}</p>
                    <p className="text-xs text-slate-500 dark:text-slate-400">{item.role}</p>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
