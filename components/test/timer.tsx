"use client";

import { useEffect, useState } from "react";
import { Clock } from "lucide-react";
import { formatDuration } from "@/lib/utils";

export function Timer({ startSeconds = 0 }: { startSeconds?: number }) {
  const [seconds, setSeconds] = useState(startSeconds);

  useEffect(() => {
    const interval = setInterval(() => setSeconds((s) => s + 1), 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex items-center gap-1.5 rounded-full bg-slate-100 px-3 py-1.5 text-sm font-medium text-slate-600 dark:bg-slate-800 dark:text-slate-300">
      <Clock className="h-4 w-4" />
      {formatDuration(seconds)}
    </div>
  );
}
