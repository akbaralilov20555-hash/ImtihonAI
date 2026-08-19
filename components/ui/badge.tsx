import { cn } from "@/lib/utils";

export function Badge({
  className,
  variant = "default",
  ...props
}: React.HTMLAttributes<HTMLSpanElement> & { variant?: "default" | "success" | "warning" | "danger" }) {
  const variants = {
    default: "bg-brand-50 text-brand-700 dark:bg-brand-900/40 dark:text-brand-300",
    success: "bg-emerald-50 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300",
    warning: "bg-amber-50 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300",
    danger: "bg-rose-50 text-rose-700 dark:bg-rose-900/40 dark:text-rose-300",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium",
        variants[variant],
        className
      )}
      {...props}
    />
  );
}
