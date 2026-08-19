import { PrismaClient } from "@prisma/client";
import { SUBJECTS } from "../lib/curriculum/subjects";

const prisma = new PrismaClient();

async function main() {
  for (const subject of SUBJECTS) {
    const createdSubject = await prisma.subject.upsert({
      where: { slug: subject.slug },
      update: {},
      create: { name: subject.name, slug: subject.slug },
    });

    for (const topicName of subject.topics) {
      await prisma.topic.upsert({
        where: {
          subjectId_name: {
            subjectId: createdSubject.id,
            name: topicName,
          },
        },
        update: {},
        create: {
          name: topicName,
          subjectId: createdSubject.id,
        },
      });
    }
  }

  console.log("✅ Fanlar va mavzular muvaffaqiyatli yuklandi.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
