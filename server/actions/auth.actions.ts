"use server";

import { RegisterSchema, type RegisterInput } from "@/lib/validators/auth.validator";
import { createUser } from "@/server/services/userService";

export async function registerAction(input: RegisterInput) {
  const parsed = RegisterSchema.safeParse(input);
  if (!parsed.success) {
    return { success: false, error: parsed.error.errors[0]?.message ?? "Xato ma'lumot" };
  }

  try {
    const user = await createUser(parsed.data);
    return { success: true, userId: user.id };
  } catch (err) {
    return {
      success: false,
      error: err instanceof Error ? err.message : "Ro'yxatdan o'tishda xatolik",
    };
  }
}
