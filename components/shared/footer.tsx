"use client";

import { useLanguage } from "@/lib/i18n/context";

export function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="border-t border-slate-100 py-10 dark:border-slate-800">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-6 text-sm text-slate-500 md:flex-row">
        <p>© {new Date().getFullYear()} ImtihonAI. {t.footer.rights}</p>
        <p>{t.footer.slogan}</p>
      </div>
    </footer>
  );
}
