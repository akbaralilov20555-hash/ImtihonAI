// Demo rejimi: OPENAI_API_KEY sozlanmagan bo'lsa, platforma shu tayyor
// savollar bankidan foydalanadi — shunda foydalanuvchi hech qanday
// sozlashsiz ham to'liq ishlaydigan mahsulotni sinab ko'ra oladi.
// Kalit qo'shilgandan so'ng tizim avtomatik ravishda haqiqiy AI'ga o'tadi.

export interface FallbackQuestion {
  questionText: string;
  topic: string;
  options: string[];
  correctAnswer: string;
  explanation: string;
  difficulty: "EASY" | "MEDIUM" | "HARD" | "EXPERT";
}

export const FALLBACK_QUESTIONS: Record<string, FallbackQuestion[]> = {
  matematika: [
    {
      questionText: "2x + 6 = 14 tenglamada x ning qiymatini toping.",
      topic: "Algebra",
      options: ["2", "4", "6", "8"],
      correctAnswer: "4",
      explanation: "2x = 14 - 6 = 8, demak x = 8/2 = 4.",
      difficulty: "EASY",
    },
    {
      questionText: "Tomoni 5 sm bo'lgan kvadratning yuzi nechaga teng?",
      topic: "Geometriya",
      options: ["10 sm²", "20 sm²", "25 sm²", "30 sm²"],
      correctAnswer: "25 sm²",
      explanation: "Kvadrat yuzi = tomon². 5² = 25 sm².",
      difficulty: "EASY",
    },
    {
      questionText: "x² - 9 = 0 tenglamaning ildizlarini toping.",
      topic: "Tenglamalar",
      options: ["x = 3 va x = -3", "x = 9", "x = 3", "Yechimi yo'q"],
      correctAnswer: "x = 3 va x = -3",
      explanation: "x² = 9, demak x = ±3.",
      difficulty: "MEDIUM",
    },
    {
      questionText: "f(x) = 2x + 1 funksiyada f(3) ni toping.",
      topic: "Funksiyalar",
      options: ["5", "6", "7", "8"],
      correctAnswer: "7",
      explanation: "f(3) = 2(3) + 1 = 6 + 1 = 7.",
      difficulty: "MEDIUM",
    },
    {
      questionText: "Sin(30°) ning qiymati nechaga teng?",
      topic: "Trigonometriya",
      options: ["0", "0.5", "1", "√2/2"],
      correctAnswer: "0.5",
      explanation: "sin(30°) = 1/2 = 0.5 — standart trigonometrik qiymat.",
      difficulty: "MEDIUM",
    },
    {
      questionText: "To'g'ri burchakli uchburchakning kateti 3 va 4 bo'lsa, gipotenuza nechaga teng?",
      topic: "Geometriya",
      options: ["5", "6", "7", "12"],
      correctAnswer: "5",
      explanation: "Pifagor teoremasi: c² = 3² + 4² = 9 + 16 = 25, c = 5.",
      difficulty: "MEDIUM",
    },
  ],
  "ona-tili": [
    {
      questionText: "\"Kitob\" so'zi qaysi so'z turkumiga mansub?",
      topic: "So'z turkumlari",
      options: ["Ot", "Sifat", "Fe'l", "Ravish"],
      correctAnswer: "Ot",
      explanation: "\"Kitob\" — narsa nomini bildiradi, demak bu ot so'z turkumi.",
      difficulty: "EASY",
    },
    {
      questionText: "\"Chiroyli\" so'zi qaysi so'z turkumiga mansub?",
      topic: "So'z turkumlari",
      options: ["Ot", "Sifat", "Son", "Olmosh"],
      correctAnswer: "Sifat",
      explanation: "\"Chiroyli\" — belgini bildiradi, demak bu sifat.",
      difficulty: "EASY",
    },
    {
      questionText: "Quyidagi so'zlardan qaysi biri to'g'ri yozilgan?",
      topic: "Imlo qoidalari",
      options: ["Kitop", "Kitob", "Kitobb", "Kitoob"],
      correctAnswer: "Kitob",
      explanation: "So'z oxiridagi jarangsiz undosh \"b\" harfi bilan yoziladi.",
      difficulty: "EASY",
    },
    {
      questionText: "Gap qanday belgi bilan tugaydi (darak gap uchun)?",
      topic: "Gap tuzilishi",
      options: ["?", "!", ".", ","],
      correctAnswer: ".",
      explanation: "Darak gaplar nuqta bilan tugaydi.",
      difficulty: "EASY",
    },
    {
      questionText: "\"Bormoq\" fe'lining hozirgi zamon shakli qaysi?",
      topic: "Grammatika",
      options: ["Bordim", "Boraman", "Borgan edim", "Borgan bo'lardim"],
      correctAnswer: "Boraman",
      explanation: "\"-a\" qo'shimchasi va shaxs-son qo'shimchasi hozirgi zamonni bildiradi.",
      difficulty: "MEDIUM",
    },
  ],
  tarix: [
    {
      questionText: "O'zbekiston qachon mustaqillikka erishdi?",
      topic: "O'zbekiston tarixi",
      options: ["1989", "1990", "1991", "1992"],
      correctAnswer: "1991",
      explanation: "O'zbekiston 1991-yil 1-sentyabrda mustaqillikni qo'lga kiritdi.",
      difficulty: "EASY",
    },
    {
      questionText: "Amir Temur qaysi shaharda tug'ilgan?",
      topic: "Tarixiy shaxslar",
      options: ["Samarqand", "Buxoro", "Shahrisabz", "Xiva"],
      correctAnswer: "Shahrisabz",
      explanation: "Amir Temur 1336-yilda Shahrisabz shahrida tug'ilgan.",
      difficulty: "MEDIUM",
    },
    {
      questionText: "Ikkinchi jahon urushi qaysi yilda tugagan?",
      topic: "Jahon tarixi",
      options: ["1943", "1944", "1945", "1946"],
      correctAnswer: "1945",
      explanation: "Ikkinchi jahon urushi 1945-yil 2-sentyabrda to'liq tugagan.",
      difficulty: "EASY",
    },
    {
      questionText: "Mirzo Ulug'bek qaysi soha bilan mashhur bo'lgan?",
      topic: "Tarixiy shaxslar",
      options: ["Astronomiya", "Tibbiyot", "Harbiy san'at", "Savdo"],
      correctAnswer: "Astronomiya",
      explanation: "Ulug'bek Samarqandda rasadxona qurdirgan mashhur astronom edi.",
      difficulty: "MEDIUM",
    },
  ],
  "ingliz-tili": [
    {
      questionText: "Choose the correct form: \"She ___ to school every day.\"",
      topic: "Grammar",
      options: ["go", "goes", "going", "gone"],
      correctAnswer: "goes",
      explanation: "Present Simple tense-da 3-shaxs birlik uchun fe'lga \"-s/-es\" qo'shiladi.",
      difficulty: "EASY",
    },
    {
      questionText: "What is the synonym of \"happy\"?",
      topic: "Vocabulary",
      options: ["Sad", "Joyful", "Angry", "Tired"],
      correctAnswer: "Joyful",
      explanation: "\"Joyful\" so'zi \"happy\" so'ziga eng yaqin ma'noli sinonim.",
      difficulty: "EASY",
    },
    {
      questionText: "Choose the correct past tense: \"I ___ to the cinema yesterday.\"",
      topic: "Grammar",
      options: ["go", "goes", "went", "going"],
      correctAnswer: "went",
      explanation: "\"Go\" fe'lining noto'g'ri (irregular) o'tgan zamon shakli \"went\".",
      difficulty: "MEDIUM",
    },
    {
      questionText: "Which word is an antonym of \"big\"?",
      topic: "Vocabulary",
      options: ["Large", "Huge", "Small", "Tall"],
      correctAnswer: "Small",
      explanation: "\"Small\" so'zi \"big\" so'ziga qarama-qarshi ma'noli antonim.",
      difficulty: "EASY",
    },
  ],
};

export function getFallbackQuestions(subjectSlug: string, count: number): FallbackQuestion[] {
  const pool = FALLBACK_QUESTIONS[subjectSlug] ?? FALLBACK_QUESTIONS["matematika"];
  // Bank so'ralgan sondan kam bo'lsa, mavjud savollarni aylantirib takrorlaydi
  const result: FallbackQuestion[] = [];
  for (let i = 0; i < count; i++) {
    result.push(pool[i % pool.length]);
  }
  return result;
}

/** AI Tutor uchun demo javoblar — oddiy kalit so'z bo'yicha moslashtirilgan */
export function getFallbackTutorReply(message: string): string {
  const lower = message.toLowerCase();

  if (lower.includes("kvadrat tenglama")) {
    return `Kvadrat tenglama — ax² + bx + c = 0 ko'rinishidagi tenglama.

Misol: x² - 5x + 6 = 0
Diskriminant: D = b² - 4ac = 25 - 24 = 1
x1,2 = (5 ± 1) / 2 → x1 = 3, x2 = 2

Mashq: x² - 7x + 12 = 0 tenglamani o'zingiz yeching (javob: x1=3, x2=4).

(Bu — demo javob. To'liq AI tutor uchun .env faylida OPENAI_API_KEY ni sozlang.)`;
  }

  if (lower.includes("pifagor")) {
    return `Pifagor teoremasi to'g'ri burchakli uchburchak uchun: a² + b² = c² (c — gipotenuza).

Misol: kateti 3 va 4 bo'lsa, gipotenuza = √(9+16) = √25 = 5.

Mashq: kateti 6 va 8 bo'lgan uchburchakning gipotenuzasini toping.

(Bu — demo javob. To'liq AI tutor uchun .env faylida OPENAI_API_KEY ni sozlang.)`;
  }

  return `Bu — ImtihonAI ning demo rejimi. Hozircha OpenAI kaliti sozlanmagani uchun men faqat bir nechta tayyor mavzular bo'yicha (masalan, "kvadrat tenglama", "Pifagor teoremasi") javob bera olaman.

To'liq AI Tutor — istalgan mavzuda, istalgan savolga jonli javob berishi uchun — .env faylidagi OPENAI_API_KEY qatoriga OpenAI kalitingizni qo'ying va serverni qayta ishga tushiring.

Hozircha "kvadrat tenglama" yoki "Pifagor teoremasi" haqida so'rab ko'rishingiz mumkin.`;
}
