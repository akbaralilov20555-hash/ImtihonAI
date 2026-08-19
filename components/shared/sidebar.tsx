"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  BookOpenCheck,
  MessageCircleQuestion,
  UserRound,
  GraduationCap,
  LogOut,
} from "lucide-react";
import { signOut } from "next-auth/react";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/lib/i18n/context";
import { ThemeToggle } from "./theme-toggle";
import { LanguageSwitcher } from "./language-switcher";

export function Sidebar() {
  const pathname = usePathname();
  const { t } = useLanguage();

  const links = [
    { href: "/dashboard", label: t.sidebar.dashboard, icon: LayoutDashboard },
    { href: "/ai-tutor", label: t.sidebar.tutor, icon: MessageCircleQuestion },
    { href: "/profile", label: t.sidebar.profile, icon: UserRound },
  ];

  return (
    <aside className="hidden w-64 flex-col border-r border-slate-100 bg-white p-6 dark:border-slate-800 dark:bg-navy-900 md:flex">
      <Link href="/dashboard" className="mb-6 flex items-center gap-2 font-semibold text-slate-900 dark:text-white">
        <GraduationCap className="h-6 w-6 text-brand-600" />
        <span>ImtihonAI</span>
      </Link>

      <div className="mb-6 flex items-center gap-2">
        <LanguageSwitcher />
        <ThemeToggle />
      </div>

      <nav className="flex flex-1 flex-col gap-1">
        {links.map((link) => {
          const Icon = link.icon;
          const active = pathname?.startsWith(link.href);
          return (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors",
                active
                  ? "bg-brand-50 text-brand-700 dark:bg-brand-900/30 dark:text-brand-300"
                  : "text-slate-600 hover:bg-slate-50 dark:text-slate-300 dark:hover:bg-slate-800"
              )}
            >
              <Icon className="h-4 w-4" />
              {link.label}
            </Link>
          );
        })}
        <Link
          href="/test/matematika"
          className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-slate-600 hover:bg-slate-50 dark:text-slate-300 dark:hover:bg-slate-800"
        >
          <BookOpenCheck className="h-4 w-4" />
          {t.sidebar.test}
        </Link>
      </nav>

      <button
        onClick={() => signOut({ callbackUrl: "/" })}
        className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-slate-500 hover:bg-slate-50 dark:text-slate-400 dark:hover:bg-slate-800"
      >
        <LogOut className="h-4 w-4" />
        {t.sidebar.logout}
      </button>
    </aside>
  );
}
