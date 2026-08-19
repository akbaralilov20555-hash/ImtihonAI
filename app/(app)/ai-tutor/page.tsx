"use client";

import { useRef, useState } from "react";
import { Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ChatBubble } from "@/components/tutor/chat-bubble";

interface Message {
  role: "user" | "assistant";
  content: string;
}

export default function AiTutorPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content:
        "Salom! Men sizning AI repetitoringizman. Menga istalgan mavzu bo'yicha savol berishingiz mumkin — masalan, \"Kvadrat tenglamani tushuntir\".",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  async function handleSend() {
    if (!input.trim() || loading) return;

    const userMessage: Message = { role: "user", content: input };
    const history = messages.slice(-8);
    setMessages((prev) => [...prev, userMessage, { role: "assistant", content: "" }]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/ai/tutor", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userMessage.content, history }),
      });

      if (!res.body) throw new Error("Streaming qo'llab-quvvatlanmaydi");

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let accumulated = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        accumulated += decoder.decode(value, { stream: true });

        setMessages((prev) => {
          const updated = [...prev];
          updated[updated.length - 1] = { role: "assistant", content: accumulated };
          return updated;
        });
      }
    } catch {
      setMessages((prev) => {
        const updated = [...prev];
        updated[updated.length - 1] = {
          role: "assistant",
          content: "Kechirasiz, javob berishda xatolik yuz berdi. Qayta urinib ko'ring.",
        };
        return updated;
      });
    } finally {
      setLoading(false);
      bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }

  return (
    <div className="mx-auto flex h-[calc(100vh-5rem)] max-w-2xl flex-col">
      <h1 className="mb-4 text-xl font-semibold text-slate-900 dark:text-white">AI Repetitor</h1>

      <div className="flex-1 space-y-4 overflow-y-auto rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-navy-900">
        {messages.map((m, i) => (
          <ChatBubble key={i} role={m.role} content={m.content || "..."} />
        ))}
        <div ref={bottomRef} />
      </div>

      <div className="mt-4 flex gap-2">
        <Input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
          placeholder="Savolingizni yozing..."
          disabled={loading}
        />
        <Button onClick={handleSend} disabled={loading} size="icon">
          <Send className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
