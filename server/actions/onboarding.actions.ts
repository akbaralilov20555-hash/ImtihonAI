"use server";

import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { OnboardingSchema, type OnboardingInput } from "@/lib/validators/auth.validator";
import { completeOnboarding } from "@/server/services/userService";

export async function submitOnboardingAction(input: OnboardingInput) {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    return { success: false, error: "Tizimga kiring" };
  }

  const parsed = OnboardingSchema.safeParse(input);
  if (!parsed.success) {
    return { success: false, error: parsed.error.errors[0]?.message ?? "Xato ma'lumot" };
  }

  try {
    // @ts-expect-error - custom field on session user
    await completeOnboarding(session.user.id, parsed.data);
    return { success: true };
  } catch (err) {
    return {
      success: false,
      error: err instanceof Error ? err.message : "Xatolik yuz berdi",
    };
  }
}
