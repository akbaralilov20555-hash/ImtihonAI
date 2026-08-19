// O'zbekiston maktab dasturiga asoslangan fanlar va mavzular bazasi.
// AI Test Generator shu ro'yxatdan mavzularni tanlaydi, shuning uchun
// yaratilgan testlar doim o'quv dasturiga mos bo'ladi.
// Admin panel qo'shilganda bu ma'lumotlar bazaga ko'chiriladi (hozircha
// kod ichida statik saqlanadi — MVP uchun yetarli).

export interface SubjectDefinition {
  slug: string;
  name: string;
  topics: string[];
}

export const SUBJECTS: SubjectDefinition[] = [
  {
    slug: "matematika",
    name: "Matematika",
    topics: [
      "Algebra",
      "Geometriya",
      "Tenglamalar",
      "Funksiyalar",
      "Trigonometriya",
      "Ehtimollar va statistika",
    ],
  },
  {
    slug: "ona-tili",
    name: "Ona tili",
    topics: [
      "Grammatika",
      "Imlo qoidalari",
      "So'z turkumlari",
      "Gap tuzilishi",
      "Matn tahlili",
    ],
  },
  {
    slug: "tarix",
    name: "Tarix",
    topics: [
      "O'zbekiston tarixi",
      "Jahon tarixi",
      "Sana va voqealar",
      "Tarixiy shaxslar",
    ],
  },
  {
    slug: "ingliz-tili",
    name: "Ingliz tili",
    topics: ["Grammar", "Vocabulary", "Reading", "Listening", "Writing"],
  },
];

export function getSubjectBySlug(slug: string): SubjectDefinition | undefined {
  return SUBJECTS.find((s) => s.slug === slug);
}
