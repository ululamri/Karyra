"use client";

import { useFormStatus } from "react-dom";

type SubmitButtonVariant = "primary" | "secondary" | "ghost";

type SubmitButtonProps = {
  children: React.ReactNode;
  pendingText?: string;
  variant?: SubmitButtonVariant;
  className?: string;
};

const variantClassName: Record<SubmitButtonVariant, string> = {
  primary:
    "bg-emerald-400 text-slate-950 hover:bg-emerald-300 disabled:bg-emerald-400/50",
  secondary:
    "border border-white/15 text-white hover:bg-white/10 disabled:text-white/50",
  ghost:
    "bg-white/5 text-white hover:bg-white/10 disabled:text-white/50",
};

export function SubmitButton({
  children,
  pendingText = "Processing...",
  variant = "primary",
  className = "",
}: SubmitButtonProps) {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      aria-disabled={pending}
      className={[
        "inline-flex w-full items-center justify-center rounded-2xl px-6 py-4 font-bold transition disabled:cursor-not-allowed sm:w-auto",
        variantClassName[variant],
        className,
      ].join(" ")}
    >
      {pending ? pendingText : children}
    </button>
  );
}