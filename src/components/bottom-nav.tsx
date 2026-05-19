import Link from "next/link";

import { type Language, t } from "../lib/i18n";

type BottomNavProps = {
  language: Language;
};

function HomeIcon() {
  return (
    <svg
      aria-hidden="true"
      className="h-5 w-5"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      viewBox="0 0 24 24"
    >
      <path d="m3 11 9-8 9 8" />
      <path d="M5 10v10h14V10" />
      <path d="M9 20v-6h6v6" />
    </svg>
  );
}

function BookIcon() {
  return (
    <svg
      aria-hidden="true"
      className="h-5 w-5"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      viewBox="0 0 24 24"
    >
      <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
      <path d="M4 4.5A2.5 2.5 0 0 1 6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5z" />
    </svg>
  );
}

function QuestIcon() {
  return (
    <svg
      aria-hidden="true"
      className="h-5 w-5"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      viewBox="0 0 24 24"
    >
      <path d="M12 2v4" />
      <path d="M12 18v4" />
      <path d="m4.93 4.93 2.83 2.83" />
      <path d="m16.24 16.24 2.83 2.83" />
      <path d="M2 12h4" />
      <path d="M18 12h4" />
      <path d="m4.93 19.07 2.83-2.83" />
      <path d="m16.24 7.76 2.83-2.83" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}

function PassportIcon() {
  return (
    <svg
      aria-hidden="true"
      className="h-5 w-5"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      viewBox="0 0 24 24"
    >
      <rect height="18" rx="2" width="14" x="5" y="3" />
      <path d="M9 7h6" />
      <path d="M9 17h6" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}

function DashboardIcon() {
  return (
    <svg
      aria-hidden="true"
      className="h-5 w-5"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      viewBox="0 0 24 24"
    >
      <rect height="8" rx="2" width="8" x="3" y="3" />
      <rect height="8" rx="2" width="8" x="13" y="3" />
      <rect height="8" rx="2" width="8" x="3" y="13" />
      <rect height="8" rx="2" width="8" x="13" y="13" />
    </svg>
  );
}

export function BottomNav({ language }: BottomNavProps) {
  const items = [
    {
      href: "/",
      label: t(language, "home"),
      icon: <HomeIcon />,
    },
    {
      href: "/courses",
      label: t(language, "courses"),
      icon: <BookIcon />,
    },
    {
      href: "/quests",
      label: t(language, "quests"),
      icon: <QuestIcon />,
    },
    {
      href: "/passport",
      label: language === "id" ? "Passport" : "Passport",
      icon: <PassportIcon />,
    },
    {
      href: "/dashboard",
      label: t(language, "dashboard"),
      icon: <DashboardIcon />,
    },
  ];

  return (
    <nav className="fixed inset-x-0 bottom-0 z-40 border-t border-white/10 bg-slate-950/95 px-2 py-2 text-white backdrop-blur md:hidden">
      <div className="mx-auto grid max-w-md grid-cols-5 gap-1">
        {items.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="flex flex-col items-center justify-center gap-1 rounded-2xl px-2 py-2 text-[11px] font-semibold text-slate-300 transition hover:bg-white/10 hover:text-emerald-300"
          >
            {item.icon}
            <span className="line-clamp-1">{item.label}</span>
          </Link>
        ))}
      </div>
    </nav>
  );
}
