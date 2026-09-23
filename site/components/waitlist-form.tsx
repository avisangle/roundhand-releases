"use client";

import { useActionState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Check, Loader2 } from "lucide-react";
import { joinWaitlist, type WaitlistState } from "@/app/actions/waitlist";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const initialState: WaitlistState = { ok: null };

export function WaitlistForm() {
  const [state, formAction, pending] = useActionState(joinWaitlist, initialState);

  return (
    <AnimatePresence mode="wait" initial={false}>
      {state.ok === true ? (
        <motion.p
          key="done"
          role="status"
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-start gap-2 text-foreground"
        >
          <Check aria-hidden className="mt-0.5 size-5 shrink-0 text-foreground" />
          You&rsquo;re on the list. We&rsquo;ll email you once when Roundhand for Windows is ready.
        </motion.p>
      ) : (
        <motion.form key="form" action={formAction} exit={{ opacity: 0 }} noValidate>
          <label htmlFor="waitlist-email" className="text-sm font-medium">
            Email address
          </label>
          <div className="mt-2 flex flex-col gap-2 sm:flex-row">
            <Input
              id="waitlist-email"
              name="email"
              type="email"
              autoComplete="email"
              inputMode="email"
              required
              placeholder="you@example.com"
              aria-invalid={state.ok === false || undefined}
              aria-describedby="waitlist-message"
              className="h-11 bg-background px-3.5 text-base focus-visible:border-foreground focus-visible:ring-foreground/15 md:text-base"
            />
            {/* Honeypot: hidden from people and assistive tech, filled in by bots. */}
            <input type="text" name="company" tabIndex={-1} autoComplete="off" aria-hidden className="hidden" />
            <Button type="submit" disabled={pending} className="h-11 rounded-lg bg-foreground px-5 text-base font-semibold text-background hover:bg-foreground/85">
              {pending && <Loader2 aria-hidden className="animate-spin" />}
              {pending ? "Joining" : "Join the waitlist"}
            </Button>
          </div>
          <p id="waitlist-message" aria-live="polite" className="mt-2 min-h-5 text-sm">
            {state.ok === false ? (
              <span className="text-destructive">{state.error}</span>
            ) : (
              <span className="text-muted-foreground">One email at launch. No newsletter.</span>
            )}
          </p>
        </motion.form>
      )}
    </AnimatePresence>
  );
}
