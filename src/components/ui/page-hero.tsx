import Link from "next/link";
import type { ReactNode } from "react";

type HeroAction = {
  href: string;
  label: string;
  variant?: "primary" | "secondary" | "ghost";
};

type PageHeroProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  actions?: HeroAction[];
  children?: ReactNode;
};

function actionClass(variant: HeroAction["variant"] = "secondary") {
  if (variant === "primary") {
    return "bg-emerald-400 text-slate-950 hover:bg-emerald-300";
  }

  if (variant === "ghost") {
    return "border border-white/10 bg-transparent text-slate-200 hover:border-emerald-400/40 hover:text-emerald-200";
  }

  return "border border-white/10 bg-white/5 text-white hover:border-emerald-400/40 hover:bg-white/10";
}

export function PageHero({ eyebrow, title, description, actions = [], children }: PageHeroProps) {
  return (
    <header className="rounded-3xl border border-white/10 bg-white/[0.04] p-4 shadow-2xl shadow-black/10 md:p-7">
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div className="min-w-0">
          {eyebrow ? (
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-emerald-300 md:text-sm">
              {eyebrow}
            </p>
          ) : null}
          <h1 className="mt-2 max-w-4xl text-2xl font-bold tracking-tight text-white md:mt-3 md:text-4xl lg:text-5xl">
            {title}
          </h1>
          {description ? (
            <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-300 md:text-base md:leading-7">
              {description}
            </p>
          ) : null}
        </div>

        {actions.length > 0 ? (
          <div className="flex shrink-0 flex-wrap gap-2 md:justify-end">
            {actions.map((action) => (
              <Link
                key={`${action.href}-${action.label}`}
                href={action.href}
                className={`inline-flex min-h-11 items-center justify-center rounded-2xl px-4 py-2.5 text-sm font-bold transition ${actionClass(action.variant)}`}
              >
                {action.label}
              </Link>
            ))}
          </div>
        ) : null}
      </div>
      {children ? <div className="mt-4 md:mt-6">{children}</div> : null}
    </header>
  );
}
