import type { ReactNode } from "react";

type PageShellProps = {
  children: ReactNode;
  className?: string;
  size?: "default" | "wide" | "narrow";
};

export function PageShell({ children, className = "", size = "wide" }: PageShellProps) {
  const maxWidth = {
    narrow: "max-w-4xl",
    default: "max-w-6xl",
    wide: "max-w-7xl",
  }[size];

  return (
    <main className={`min-h-screen bg-slate-950 text-white ${className}`}>
      <section className={`mx-auto flex w-full ${maxWidth} flex-col gap-5 px-4 py-5 pb-24 md:gap-8 md:px-8 md:py-10 lg:py-12`}>
        {children}
      </section>
    </main>
  );
}
