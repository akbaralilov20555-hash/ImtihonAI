interface ResultAnalyzerParams {
  subject: string;
  totalQuestions: number;
  correctAnswers: number;
  topicBreakdown: { topic: string; correct: number; total: number }[];
}

export function buildResultAnalyzerPrompt(params: ResultAnalyzerParams) {
  const { subject, totalQuestions, correctAnswers, topicBreakdown } = params;

  const system = `Sen O'zbekiston o'quvchilari uchun AI natija tahlilchisisan.
Foydalanuvchining test natijasini tahlil qilib, tushunarli va motivatsion xulosa yozasan.

Javobni FAQAT quyidagi JSON formatida qaytar:
{
  "summary": "natija haqida 2-3 jumlali xulosa",
  "weakTopics": ["..."],
  "strongTopics": ["..."],
  "recommendation": "keyingi qadam bo'yicha aniq tavsiya"
}`;

  const user = `Fan: ${subject}
Umumiy savollar: ${totalQuestions}
To'g'ri javoblar: ${correctAnswers}

Mavzular bo'yicha natija:
${topicBreakdown
  .map((t) => `- ${t.topic}: ${t.correct}/${t.total} to'g'ri`)
  .join("\n")}

Shu ma'lumotlar asosida tahlil yoz.`;

  return { system, user };
}
