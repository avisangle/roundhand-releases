import "server-only";

export type WaitlistResult = { ok: true } | { ok: false; error: string };

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

// Shared by the Server Action (the form on the page) and the /api/waitlist route
// (for anything outside React, e.g. a future Windows installer page).
//
// Signups are forwarded as JSON to WAITLIST_WEBHOOK_URL, so storage is whatever you
// point it at: a Google Apps Script bound to a Sheet, a Zapier/Make hook, Formspree,
// or your own endpoint. Without it, production refuses signups rather than dropping them.
export async function addToWaitlist(rawEmail: unknown, honeypot?: unknown): Promise<WaitlistResult> {
  // Bots fill every field; people never see this one. Pretend it worked.
  if (typeof honeypot === "string" && honeypot.length > 0) return { ok: true };

  const email = typeof rawEmail === "string" ? rawEmail.trim().toLowerCase() : "";
  if (!EMAIL.test(email) || email.length > 254) {
    return { ok: false, error: "Enter a full email address, like name@example.com." };
  }

  const webhook = process.env.WAITLIST_WEBHOOK_URL;
  if (!webhook) {
    if (process.env.NODE_ENV !== "production") {
      console.info(`[waitlist] WAITLIST_WEBHOOK_URL not set; would have saved ${email}`);
      return { ok: true };
    }
    console.error("[waitlist] WAITLIST_WEBHOOK_URL is not configured");
    return { ok: false, error: "The waitlist isn't accepting signups right now. Try again later." };
  }

  try {
    const res = await fetch(webhook, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(process.env.WAITLIST_WEBHOOK_SECRET && {
          Authorization: `Bearer ${process.env.WAITLIST_WEBHOOK_SECRET}`,
        }),
      },
      body: JSON.stringify({ email, platform: "windows", signedUpAt: new Date().toISOString() }),
      signal: AbortSignal.timeout(8000),
    });
    if (!res.ok) throw new Error(`webhook responded ${res.status}`);
    return { ok: true };
  } catch (err) {
    console.error("[waitlist] failed to forward signup", err);
    return { ok: false, error: "Your email couldn't be saved. Try again in a minute." };
  }
}
