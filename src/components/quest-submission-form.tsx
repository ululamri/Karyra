"use client";

import { useMemo, useState } from "react";
import { useFormStatus } from "react-dom";
import { submitQuestAction } from "@/app/actions/learner";

type QuestSubmissionFormProps = {
  questId: string;
  questSlug: string;
  minCharacters?: number;
};

function QuestSubmitButton({
  disabled,
  isValid,
}: {
  disabled: boolean;
  isValid: boolean;
}) {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={disabled || pending}
      className="mt-4 inline-flex rounded-2xl bg-emerald-400 px-5 py-3 text-sm font-bold text-slate-950 transition hover:bg-emerald-300 disabled:cursor-not-allowed disabled:bg-slate-700 disabled:text-slate-400"
    >
      {pending
        ? "Submitting..."
        : isValid
          ? "Submit Quest"
          : "Lengkapi jawaban dulu"}
    </button>
  );
}

export function QuestSubmissionForm({
  questId,
  questSlug,
  minCharacters = 40,
}: QuestSubmissionFormProps) {
  const [text, setText] = useState("");
  const [hasTouched, setHasTouched] = useState(false);

  const trimmedLength = text.trim().length;
  const remainingCharacters = Math.max(0, minCharacters - trimmedLength);
  const isValid = trimmedLength >= minCharacters;

  const helperText = useMemo(() => {
    if (isValid) {
      return "Jawaban sudah memenuhi minimum karakter.";
    }

    if (!hasTouched && trimmedLength === 0) {
      return `Minimal ${minCharacters} karakter sebelum submit.`;
    }

    return `Kurang ${remainingCharacters} karakter lagi.`;
  }, [hasTouched, isValid, minCharacters, remainingCharacters, trimmedLength]);

  return (
    <form
      action={submitQuestAction}
      className="mt-5"
      onSubmit={(event) => {
        setHasTouched(true);

        if (!isValid) {
          event.preventDefault();
        }
      }}
    >
      <input type="hidden" name="questId" value={questId} />
      <input type="hidden" name="questSlug" value={questSlug} />

      {/* Backward-compatible untuk action lama dan baru */}
      <input type="hidden" name="evidenceText" value={text} />

      <div className="mb-2 flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
        <label className="text-sm font-semibold text-slate-300">
          Jawaban / bukti penyelesaian quest
        </label>

        <span
          className={`text-xs font-semibold ${
            isValid ? "text-emerald-300" : "text-amber-300"
          }`}
        >
          {trimmedLength}/{minCharacters} karakter minimum
        </span>
      </div>

      <textarea
        name="submissionText"
        required
        minLength={minCharacters}
        value={text}
        onBlur={() => setHasTouched(true)}
        onChange={(event) => {
          setText(event.target.value);
        }}
        placeholder="Tulis jawaban atau bukti penyelesaian quest..."
        className={`min-h-32 w-full rounded-2xl border bg-slate-950 p-4 text-sm text-white outline-none placeholder:text-slate-500 ${
          hasTouched && !isValid
            ? "border-amber-400 focus:border-amber-300"
            : "border-white/10 focus:border-emerald-400"
        }`}
      />

      <p
        className={`mt-2 text-sm ${
          isValid ? "text-emerald-300" : "text-amber-300"
        }`}
      >
        {helperText}
      </p>

      <QuestSubmitButton disabled={!isValid} isValid={isValid} />
    </form>
  );
}