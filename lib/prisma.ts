import { PrismaClient } from "@prisma/client";

// Next.js dev rejimida hot-reload paytida bir nechta PrismaClient
// instansiyasi yaratilishining oldini olish uchun global cache ishlatiladi.
const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: process.env.NODE_ENV === "development" ? ["error", "warn"] : ["error"],
  });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
