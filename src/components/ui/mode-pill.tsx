type ModePillProps = {
  mode: "Learner" | "Admin" | "Reviewer" | "Public" | "Docs";
  label?: string;
};

const tone = {
  Learner: "border-emerald-400/25 bg-emerald-400/10 text-emerald-300",
  Admin: "border-amber-400/25 bg-amber-400/10 text-amber-300",
  Reviewer: "border-sky-400/25 bg-sky-400/10 text-sky-300",
  Public: "border-violet-400/25 bg-violet-400/10 text-violet-300",
  Docs: "border-slate-400/25 bg-slate-400/10 text-slate-300",
};

export function ModePill({ mode, label }: ModePillProps) {
  return (
    <span className={`inline-flex rounded-full border px-3 py-1 text-xs font-bold uppercase tracking-wide ${tone[mode]}`}>
      {label ?? `${mode} Mode`}
    </span>
  );
}
