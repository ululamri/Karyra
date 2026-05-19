import Link from "next/link";
import type { ReactNode } from "react";

type CompactCardProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  href?: string;
  badge?: string;
  children?: ReactNode;
  className?: string;
};

const baseClass = "rounded-2xl border border-white/10 bg-white/[0.04] p-4 transition md:p-5";

export function CompactCard({ eyebrow, title, description, href, badge, children, className = "" }: CompactCardProps) {
  const content = (
    <>
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          {eyebrow ? <p className="text-xs font-bold uppercase tracking-wide text-emerald-300">{eyebrow}</p> : null}
          <h3 className="mt-1 text-base font-bold text-white md:text-lg">{title}</h3>
        </div>
        {badge ? (
          <span className="shrink-0 rounded-full border border-emerald-400/20 bg-emerald-400/10 px-2.5 py-1 text-[11px] font-bold text-emerald-300">
            {badge}
          </span>
        ) : null}
      </div>
      {description ? <p className="mt-2 text-sm leading-6 text-slate-400">{description}</p> : null}
      {children ? <div className="mt-3">{children}</div> : null}
    </>
  );

  if (href) {
    return (
      <Link href={href} className={`${baseClass} hover:border-emerald-400/40 hover:bg-emerald-400/10 ${className}`}>
        {content}
      </Link>
    );
  }

  return <article className={`${baseClass} ${className}`}>{content}</article>;
}

export function MetricCard({ label, value, hint }: { label: string; value: string | number; hint?: string }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-3.5 md:p-5">
      <p className="text-xs font-medium text-slate-400 md:text-sm">{label}</p>
      <p className="mt-1 text-2xl font-bold text-white md:text-3xl">{value}</p>
      {hint ? <p className="mt-1 text-xs text-slate-500">{hint}</p> : null}
    </div>
  );
}
