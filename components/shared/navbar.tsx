"use client";

import Link from "next/link";
import { GraduationCap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "./theme-toggle";
import { LanguageSwitcher } from "./language-switcher";
import { useLanguage } from "@/lib/i18n/context";

export function Navbar() {
  const { t } = useLanguage();

  return (
    <header className="sticky top-0 z-50 border-b border-slate-100 bg-white/80 backdrop-blur-md dark:border-slate-800 dark:bg-navy-950/80">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <Link href="/" className="flex items-center gap-2 font-semibold text-slate-900 dark:text-white">
          <GraduationCap className="h-6 w-6 text-brand-600" />
          <span>ImtihonAI</span>
        </Link>

        <nav className="hidden items-center gap-8 text-sm text-slate-600 dark:text-slate-300 md:flex">
          <a href="#how-it-works" className="hover:text-brand-600">{t.nav.how}</a>
          <a href="#features" className="hover:text-brand-600">{t.nav.features}</a>
          <a href="#pricing" className="hover:text-brand-600">{t.nav.pricing}</a>
          <a href="#faq" className="hover:text-brand-600">{t.nav.faq}</a>
        </nav>

        <div className="flex items-center gap-2">
          <LanguageSwitcher />
          <ThemeToggle />
          <Link href="/login" className="hidden sm:block">
            <Button variant="ghost" size="sm">
              {t.nav.login}
            </Button>
          </Link>
          <Link href="/register">
            <Button size="sm">{t.nav.start}</Button>
          </Link>
        </div>
      </div>
    </header>
  );
}
