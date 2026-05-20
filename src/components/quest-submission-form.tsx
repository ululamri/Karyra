"use client";

import { useMemo, useState } from "react";
import { useFormStatus } from "react-dom";
import { submitQuestAction } from "@/app/actions/learner";

type QuestSubmissionFormProps = {
  questId: string;
  questSlug: string;
  minCharacters?: number;
};

function QuestSubmitButton({ disabled, isValid }: { disabled: boolean; isValid: boolean }) {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={disabled || pending}
      className="inline-flex min-h-11 w-full items-center justify-center rounded-2xl bg-emerald-400 px-5 py-3 text-sm font-black text-slate-950 transition hover:bg-emerald-300 disabled:cursor-not-allowed disabled:bg-slate-800 disabled:text-slate-500 sm:w-auto"
    >
      {pending ? "Submitting..." : isValid ? "Submit readiness evidence" : "Complete your evidence first"}
    </button>
  );
}

export function QuestSubmissionForm({ questId, questSlug, minCharacters = 40 }: QuestSubmissionFormProps) {
  const [text, setText] = useState("");
  const [hasTouched, setHasTouched] = useState(false);

  const trimmedLength = text.trim().length;
  const remainingCharacters = Math.max(0, minCharacters - trimmedLength);
  const isValid = trimmedLength >= minCharacters;
  const progressPct = Math.min(100, Math.round((trimmedLength / minCharacters) * 100));

  const helperText = useMemo(() => {
    if (isValid) {
      return "Good. Your evidence is long enough to submit for review.";
    }

    if (!hasTouched && trimmedLength === 0) {
      return `Write at least ${minCharacters} characters about what you learned or checked.`;
    }

    return `${remainingCharacters} more characters needed before you can submit.`;
  }, [hasTouched, isValid, minCharacters, remainingCharacters, trimmedLength]);

  return (
    <form
      action={submitQuestAction}
      className="mt-5 rounded-3xl border border-white/10 bg-slate-950/50 p-4 md:p-5"
      onSubmit={(event) => {
        setHasTouched(true);

        if (!isValid) {
          event.preventDefault();
        }
      }}
    >
      <input type="hidden" name="questId" value={questId} />
      <input type="hidden" name="questSlug" value={questSlug} />
      <input type="hidden" name="evidenceText" value={text} />

      <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <label className="text-sm font-black text-white">Readiness evidence</label>
          <p className="mt-1 text-xs leading-5 text-slate-400">
            Describe what you learned, checked, or practiced. Admin review will turn approved submissions into readiness proof.
          </p>
        </div>
        <span className={`text-xs font-black ${isValid ? "text-emerald-300" : "text-amber-300"}`}>
          {trimmedLength}/{minCharacters} minimum
        </span>
      </div>

      <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-slate-800">
        <div className={`h-full rounded-full ${isValid ? "bg-emerald-400" : "bg-amber-300"}`} style={{ width: `${progressPct}%` }} />
      </div>

      <textarea
        name="submissionText"
        required
        minLength={minCharacters}
        value={text}
        onBlur={() => setHasTouched(true)}
        onChange={(event) => setText(event.target.value)}
        placeholder="Example: I checked the destination address, understood why memo matters, and can explain the risk before making a payment..."
        className={`mt-4 min-h-36 w-full resize-y rounded-2xl border bg-slate-950 p-4 text-sm leading-6 text-white outline-none placeholder:text-slate-600 ${
          hasTouched && !isValid ? "border-amber-400 focus:border-amber-300" : "border-white/10 focus:border-emerald-400"
        }`}
      />

      <div className="mt-3 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className={`text-sm ${isValid ? "text-emerald-300" : "text-amber-300"}`}>{helperText}</p>
        <QuestSubmitButton disabled={!isValid} isValid={isValid} />
      </div>
    </form>
  );
}
