import { cn } from "@/lib/utils";
import { Bot, User } from "lucide-react";

export function ChatBubble({ role, content }: { role: "user" | "assistant"; content: string }) {
  const isUser = role === "user";

  return (
    <div className={cn("flex gap-3", isUser && "flex-row-reverse")}>
      <div
        className={cn(
          "flex h-8 w-8 shrink-0 items-center justify-center rounded-full",
          isUser ? "bg-brand-600 text-white" : "bg-slate-100 text-slate-600 dark:bg-slate-800"
        )}
      >
        {isUser ? <User className="h-4 w-4" /> : <Bot className="h-4 w-4" />}
      </div>
      <div
        className={cn(
          "max-w-[75%] whitespace-pre-line rounded-2xl px-4 py-2.5 text-sm",
          isUser
            ? "bg-brand-600 text-white"
            : "bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-100"
        )}
      >
        {content}
      </div>
    </div>
  );
}
