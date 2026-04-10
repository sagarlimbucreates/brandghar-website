"use client";

import {
  useActionState,
  useEffect,
  useId,
  useRef,
  useState,
} from "react";
import { createPortal } from "react-dom";
import { useFormStatus } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import {
  submitLeadAction,
  type LeadFormState,
} from "@/app/(marketing)/leads-actions";

type Props = {
  open: boolean;
  onClose: () => void;
};

const initialState: LeadFormState = {};

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="w-full bg-accent text-white text-sm font-medium px-7 py-3 rounded-[4px] hover:bg-accent-hover transition-colors duration-300 disabled:opacity-60 disabled:cursor-not-allowed"
    >
      {pending ? "Sending…" : "Send Inquiry"}
    </button>
  );
}

export default function LeadModal({ open, onClose }: Props) {
  const [state, formAction] = useActionState(submitLeadAction, initialState);
  const panelRef = useRef<HTMLDivElement>(null);
  const previouslyFocused = useRef<HTMLElement | null>(null);
  const [mounted, setMounted] = useState(false);
  const titleId = useId();
  const descId = useId();

  // createPortal needs a DOM — only render after mount.
  useEffect(() => {
    setMounted(true);
  }, []);

  // Auto-close on successful submit.
  useEffect(() => {
    if (!open || !state.success) return;
    const t = setTimeout(onClose, 2500);
    return () => clearTimeout(t);
  }, [open, state.success, onClose]);

  // Scroll lock + focus trap + Esc-to-close, only while open.
  useEffect(() => {
    if (!open) return;

    previouslyFocused.current = document.activeElement as HTMLElement | null;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
        return;
      }
      if (e.key !== "Tab" || !panelRef.current) return;

      const focusable = panelRef.current.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), input:not([disabled]), textarea:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])',
      );
      if (focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      const active = document.activeElement as HTMLElement | null;

      if (e.shiftKey && active === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && active === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", handleKeyDown);

    // Focus the first input after the open animation kicks in.
    const focusTimer = window.setTimeout(() => {
      const firstField = panelRef.current?.querySelector<HTMLElement>(
        "input, textarea",
      );
      firstField?.focus();
    }, 60);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = previousOverflow;
      window.clearTimeout(focusTimer);
      // Return focus to whatever opened us (the navbar CTA).
      previouslyFocused.current?.focus?.();
    };
  }, [open, onClose]);

  if (!mounted) return null;

  return createPortal(
    <AnimatePresence>
      {open && (
        <motion.div
          key="lead-modal-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.18 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
          onClick={onClose}
          role="presentation"
        >
          <motion.div
            ref={panelRef}
            key="lead-modal-panel"
            initial={{ opacity: 0, y: 16, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.98 }}
            transition={{ duration: 0.22, ease: "easeOut" }}
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            aria-describedby={descId}
            className="relative w-full max-w-[520px] bg-white rounded-[4px] shadow-[0_20px_60px_rgba(0,0,0,0.25)] max-h-[calc(100vh-2rem)] overflow-y-auto font-sans"
          >
            <button
              type="button"
              onClick={onClose}
              aria-label="Close"
              className="absolute top-4 right-4 text-black/50 hover:text-accent transition-colors"
            >
              <X size={20} />
            </button>

            {state.success ? (
              <div className="px-8 py-12 text-center">
                <h2
                  id={titleId}
                  className="text-2xl font-bold text-black mb-3"
                >
                  Thank you!
                </h2>
                <p id={descId} className="text-sm text-black/70">
                  {state.success}
                </p>
              </div>
            ) : (
              <div className="px-8 py-8">
                <h2
                  id={titleId}
                  className="text-2xl font-bold text-black mb-1"
                >
                  Get a Quote
                </h2>
                <p id={descId} className="text-sm text-black/60 mb-6">
                  Tell us about your project — we usually reply within 24
                  hours.
                </p>

                {state.error && (
                  <div
                    role="alert"
                    className="mb-4 px-4 py-3 bg-[#FFE5E5] border-l-2 border-accent text-sm text-black"
                  >
                    {state.error}
                  </div>
                )}

                <form action={formAction} className="flex flex-col gap-4">
                  <input type="hidden" name="source" value="navbar_cta" />

                  <div>
                    <label
                      htmlFor="lead-fullname"
                      className="block text-[13px] font-medium text-black mb-1.5"
                    >
                      Full name
                    </label>
                    <input
                      id="lead-fullname"
                      name="fullName"
                      type="text"
                      required
                      maxLength={120}
                      autoComplete="name"
                      className="w-full px-4 py-2.5 text-sm text-black bg-white border border-black/15 rounded-[4px] focus:outline-none focus:border-accent transition-colors"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="lead-phone"
                      className="block text-[13px] font-medium text-black mb-1.5"
                    >
                      Phone number
                    </label>
                    <div className="flex items-stretch border border-black/15 rounded-[4px] focus-within:border-accent transition-colors overflow-hidden">
                      <span className="px-3 py-2.5 text-sm text-black/60 bg-black/[0.03] border-r border-black/10 select-none">
                        +977
                      </span>
                      <input
                        id="lead-phone"
                        name="phone"
                        type="tel"
                        inputMode="tel"
                        required
                        pattern="9[678][0-9]{8}"
                        placeholder="98XXXXXXXX"
                        maxLength={10}
                        autoComplete="tel-national"
                        title="Enter a 10-digit Nepali mobile number starting with 96, 97, or 98."
                        className="flex-1 px-4 py-2.5 text-sm text-black bg-white focus:outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="lead-email"
                      className="block text-[13px] font-medium text-black mb-1.5"
                    >
                      Email{" "}
                      <span className="text-black/40 font-normal">
                        (optional)
                      </span>
                    </label>
                    <input
                      id="lead-email"
                      name="email"
                      type="email"
                      maxLength={200}
                      autoComplete="email"
                      className="w-full px-4 py-2.5 text-sm text-black bg-white border border-black/15 rounded-[4px] focus:outline-none focus:border-accent transition-colors"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="lead-message"
                      className="block text-[13px] font-medium text-black mb-1.5"
                    >
                      How can we help?
                    </label>
                    <textarea
                      id="lead-message"
                      name="message"
                      rows={4}
                      required
                      maxLength={5000}
                      className="w-full px-4 py-2.5 text-sm text-black bg-white border border-black/15 rounded-[4px] focus:outline-none focus:border-accent transition-colors resize-none"
                    />
                  </div>

                  <SubmitButton />
                </form>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  );
}
