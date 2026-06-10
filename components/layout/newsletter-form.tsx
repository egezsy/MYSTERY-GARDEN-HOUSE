"use client";

import { useState } from "react";
import { Send } from "lucide-react";
import type { Dictionary } from "@/lib/dictionaries";
import { Input } from "@/components/ui/input";

export function NewsletterForm({ dict }: { dict: Dictionary }) {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;
    // Placeholder: integrate with a mailing provider later.
    setDone(true);
    setEmail("");
  }

  if (done) {
    return (
      <p className="rounded-md bg-accent/20 px-4 py-3 text-sm text-white">
        {dict.footer.subscribed}
      </p>
    );
  }

  return (
    <form onSubmit={onSubmit} className="flex gap-2">
      <Input
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder={dict.footer.emailPlaceholder}
        className="border-white/20 bg-white/10 text-white placeholder:text-white/50"
        aria-label={dict.footer.emailPlaceholder}
      />
      <button
        type="submit"
        aria-label={dict.footer.subscribe}
        className="flex min-h-[44px] min-w-[44px] items-center justify-center rounded-md bg-accent text-white transition-colors hover:bg-accent-dark"
      >
        <Send className="h-5 w-5" />
      </button>
    </form>
  );
}
