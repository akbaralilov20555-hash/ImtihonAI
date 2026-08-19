import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const MODEL = process.env.OPENAI_MODEL || "gpt-4o-mini";

export class MissingApiKeyError extends Error {
  constructor() {
    super(
      "OpenAI API kaliti sozlanmagan. .env faylidagi OPENAI_API_KEY qatoriga o'z kalitingizni qo'ying (https://platform.openai.com/api-keys dan olinadi), so'ng serverni qayta ishga tushiring."
    );
    this.name = "MissingApiKeyError";
  }
}

function assertApiKeyConfigured() {
  if (!process.env.OPENAI_API_KEY || process.env.OPENAI_API_KEY.trim() === "") {
    throw new MissingApiKeyError();
  }
}

/**
 * Strukturalangan (JSON) javob talab qiladigan AI chaqiruvlari uchun.
 * Diagnostic, Test Generator va Result Analyzer shu funksiyadan foydalanadi.
 */
export async function generateJson<T>(params: {
  system: string;
  user: string;
  parse: (raw: unknown) => T;
  retries?: number;
}): Promise<T> {
  assertApiKeyConfigured();

  const { system, user, parse, retries = 1 } = params;

  let lastError: unknown;

  for (let attempt = 0; attempt <= retries; attempt++) {
    try {
      const completion = await openai.chat.completions.create({
        model: MODEL,
        response_format: { type: "json_object" },
        temperature: 0.4,
        messages: [
          { role: "system", content: system },
          { role: "user", content: user },
        ],
      });

      const raw = completion.choices[0]?.message?.content;
      if (!raw) throw new Error("AI bo'sh javob qaytardi");

      const parsed = JSON.parse(raw);
      return parse(parsed); // Zod orqali validatsiya — noto'g'ri format bo'lsa throw qiladi
    } catch (err) {
      lastError = err;
      // Autentifikatsiya/kalit xatosi bo'lsa qayta urinishning ma'nosi yo'q
      if (err instanceof MissingApiKeyError) throw err;
      // Boshqa xatolarda keyingi urinishda AI'ga qayta so'rov yuboriladi
      // (Question Validator mantiqi shu retry orqali amalga oshadi)
    }
  }

  throw lastError instanceof Error
    ? lastError
    : new Error("AI so'rovi muvaffaqiyatsiz tugadi");
}

/**
 * AI Tutor uchun streaming javob generatori.
 */
export async function streamChatCompletion(params: {
  system: string;
  messages: { role: "user" | "assistant"; content: string }[];
}) {
  assertApiKeyConfigured();

  const { system, messages } = params;

  return openai.chat.completions.create({
    model: MODEL,
    stream: true,
    temperature: 0.6,
    messages: [{ role: "system", content: system }, ...messages],
  });
}
