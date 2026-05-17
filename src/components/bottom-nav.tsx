import Link from "next/link";
import { type Language, t } from "../lib/i18n";

type BottomNavProps = {
  language: Language;
};

function HomeIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M3 10.5 12 3l9 7.5" />
      <path d="M5 10v10h14V10" />
    </svg>
  );
}

function BookIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H20v16H6.5A2.5 2.5 0 0 0 4 21.5z" />
      <path d="M4 5.5v16" />
    </svg>
  );
}

function QuestIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M12 2 15 8l6 .9-4.5 4.4 1.1 6.2L12 16.6 6.4 19.5l1.1-6.2L3 8.9 9 8z" />
    </svg>
  );
}

function DashboardIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="3" y="3" width="8" height="8" rx="2" />
      <rect x="13" y="3" width="8" height="8" rx="2" />
      <rect x="3" y="13" width="8" height="8" rx="2" />
      <rect x="13" y="13" width="8" height="8" rx="2" />
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
    href: "/status",
    label: t(language, "status"),
    icon: <DashboardIcon />,
  },
];

  return (
  <nav className="bottom-nav fixed bottom-0 left-0 right-0 z-50 border-t border-white/10 bg-slate-950/95 px-3 py-2 text-white backdrop-blur md:hidden">
    <div className="mx-auto grid max-w-md grid-cols-4 gap-1">
      {items.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className="flex flex-col items-center justify-center rounded-2xl px-2 py-2 text-xs text-slate-300"
        >
          {item.icon}
          <span className="mt-1">{item.label}</span>
        </Link>
      ))}
    </div>
  </nav>
);
}