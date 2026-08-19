import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { streamChatCompletion, MissingApiKeyError } from "@/lib/ai/client";
import { buildTutorSystemPrompt } from "@/lib/ai/prompts/tutor.prompt";
import { getFallbackTutorReply } from "@/lib/ai/fallback";
import { prisma } from "@/lib/prisma";

function isAiConfigured() {
  return Boolean(process.env.OPENAI_API_KEY && process.env.OPENAI_API_KEY.trim() !== "");
}

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    return new Response("Tizimga kiring.", { status: 401 });
  }

  // @ts-expect-error - custom field on session user
  const userId = session.user.id as string;
  const { message, history } = await req.json();

  // Demo rejimi: OpenAI kaliti sozlanmagan bo'lsa, tayyor javob qaytariladi
  // (streaming'ga o'xshatib, so'z-so'z chiqariladi — UI bir xil ishlaydi).
  if (!isAiConfigured()) {
    const reply = getFallbackTutorReply(message ?? "");
    const encoder = new TextEncoder();
    const readable = new ReadableStream({
      async start(controller) {
        const words = reply.split(" ");
        for (const word of words) {
          controller.enqueue(encoder.encode(word + " "));
          await new Promise((r) => setTimeout(r, 15));
        }
        controller.close();
        await prisma.aiChat.create({ data: { userId, message, response: reply } });
      },
    });
    return new Response(readable, { headers: { "Content-Type": "text/plain; charset=utf-8" } });
  }

  const user = await prisma.user.findUnique({ where: { id: userId } });

  const systemPrompt = buildTutorSystemPrompt({
    studentName: user?.name,
    grade: user?.class ?? undefined,
    level: (user?.currentLevel as "BEGINNER" | "INTERMEDIATE" | "ADVANCED") ?? "INTERMEDIATE",
  });

  const messages = [
    ...(history ?? []).map((m: { role: "user" | "assistant"; content: string }) => m),
    { role: "user" as const, content: message },
  ];

  let stream;
  try {
    stream = await streamChatCompletion({ system: systemPrompt, messages });
  } catch (err) {
    const friendlyMessage =
      err instanceof MissingApiKeyError
        ? err.message
        : "AI bilan bog'lanishda xatolik yuz berdi. Birozdan so'ng qayta urinib ko'ring.";

    return new Response(friendlyMessage, {
      status: 200,
      headers: { "Content-Type": "text/plain; charset=utf-8" },
    });
  }

  let fullResponse = "";

  const encoder = new TextEncoder();
  const readable = new ReadableStream({
    async start(controller) {
      try {
        for await (const chunk of stream) {
          const delta = chunk.choices[0]?.delta?.content ?? "";
          if (delta) {
            fullResponse += delta;
            controller.enqueue(encoder.encode(delta));
          }
        }
      } catch {
        controller.enqueue(
          encoder.encode("\n\nKechirasiz, javobni yakunlashda xatolik yuz berdi.")
        );
      } finally {
        controller.close();
      }

      if (fullResponse) {
        await prisma.aiChat.create({
          data: { userId, message, response: fullResponse },
        });
      }
    },
  });

  return new Response(readable, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
