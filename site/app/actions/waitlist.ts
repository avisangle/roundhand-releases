"use server";

import { addToWaitlist, type WaitlistResult } from "@/lib/waitlist";

export type WaitlistState = WaitlistResult | { ok: null };

export async function joinWaitlist(_prev: WaitlistState, formData: FormData): Promise<WaitlistState> {
  return addToWaitlist(formData.get("email"), formData.get("company"));
}
