import Link from "next/link";
import { GraduationCap } from "lucide-react";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 px-6 dark:bg-navy-950">
      <div className="w-full max-w-md">
        <Link
          href="/"
          className="mb-8 flex items-center justify-center gap-2 font-semibold text-slate-900 dark:text-white"
        >
          <GraduationCap className="h-6 w-6 text-brand-600" />
          ImtihonAI
        </Link>
        {children}
      </div>
    </div>
  );
}
