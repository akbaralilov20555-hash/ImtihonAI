import { Sidebar } from "@/components/shared/sidebar";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-slate-50 dark:bg-navy-950">
      <Sidebar />
      <main className="flex-1 p-6 md:p-10">{children}</main>
    </div>
  );
}
