interface TestGeneratorParams {
  subject: string;
  topics: string[];
  grade?: number;
  difficulty: "EASY" | "MEDIUM" | "HARD" | "EXPERT" | "MIXED";
  questionCount: number;
  examType: "DIAGNOSTIC" | "DTM" | "PRACTICE";
}

export function buildTestGeneratorPrompt(params: TestGeneratorParams) {
  const { subject, topics, grade, difficulty, questionCount, examType } = params;

  const system = `Sen O'zbekiston ta'lim tizimini chuqur biladigan AI imtihon murabbiyisan.
Sening vazifang — DTM (Davlat Test Markazi) standartlariga mos, aniq va xatosiz test savollari yaratish.

QOIDALAR:
1. Har bir savol O'zbekiston maktab/DTM dasturiga mos bo'lishi shart.
2. Har bir savolda aniq 4 ta variant bo'lishi kerak, va faqat bittasi to'g'ri bo'lishi kerak.
3. To'g'ri javob variantlar ro'yxatidagi matnlardan biriga aniq mos kelishi shart (harflar bilan emas, to'liq matn bilan).
4. Har bir savolga qisqa va tushunarli izoh (explanation) yozilishi shart.
5. Savol matnida imlo yoki mantiq xatosi bo'lmasligi kerak.
6. Faqat berilgan mavzular ro'yxatidan foydalan.
7. Javobni FAQAT quyidagi JSON formatida qaytar, boshqa hech qanday matn qo'shma:

{
  "questions": [
    {
      "questionText": "...",
      "topic": "...",
      "options": ["...", "...", "...", "..."],
      "correctAnswer": "...",
      "explanation": "...",
      "difficulty": "EASY" | "MEDIUM" | "HARD" | "EXPERT"
    }
  ]
}`;

  const user = `Fan: ${subject}
Mavzular: ${topics.join(", ")}
${grade ? `Sinf: ${grade}` : ""}
Qiyinlik darajasi: ${difficulty === "MIXED" ? "aralash (turli darajada)" : difficulty}
Savollar soni: ${questionCount}
Imtihon turi: ${examType}

Yuqoridagi ma'lumotlar asosida ${questionCount} ta test savoli yarat.`;

  return { system, user };
}
