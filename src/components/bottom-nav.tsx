import Link from "next/link";
import {
  DEFAULT_LANGUAGE,
  normalizeLanguage,
  type Language,
  t,
} from "@/lib/i18n";

type BottomNavProps = {
  language?: Language;
};

function HomeIcon() {
  return (
    <svg
      aria-hidden="true"
      className="h-5 w-5"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M3 10.75 12 3l9 7.75V20a1 1 0 0 1-1 1h-5.25v-6h-5.5v6H4a1 1 0 0 1-1-1v-9.25Z"
      />
    </svg>
  );
}

function BookIcon() {
  return (
    <svg
      aria-hidden="true"
      className="h-5 w-5"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M4 5.5A2.5 2.5 0 0 1 6.5 3H20v16H6.5A2.5 2.5 0 0 0 4 21.5v-16Z"
      />
      <path strokeLinecap="round" strokeLinejoin="round" d="M8 7h8M8 11h8" />
    </svg>
  );
}

function QuestIcon() {
  return (
    <svg
      aria-hidden="true"
      className="h-5 w-5"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M9 12.75 11.25 15 15 9.75"
      />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 3.75 19.5 7.5v5.25c0 4.5-3.1 7.4-7.5 8.5-4.4-1.1-7.5-4-7.5-8.5V7.5L12 3.75Z"
      />
    </svg>
  );
}

function PassportIcon() {
  return (
    <svg
      aria-hidden="true"
      className="h-5 w-5"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M7 3.75h10A2.25 2.25 0 0 1 19.25 6v12A2.25 2.25 0 0 1 17 20.25H7A2.25 2.25 0 0 1 4.75 18V6A2.25 2.25 0 0 1 7 3.75Z"
      />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M9 8.25h6M9 12h6M9 15.75h3"
      />
    </svg>
  );
}

function DashboardIcon() {
  return (
    <svg
      aria-hidden="true"
      className="h-5 w-5"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M4.75 5.75A1.75 1.75 0 0 1 6.5 4h3A1.75 1.75 0 0 1 11.25 5.75v3A1.75 1.75 0 0 1 9.5 10.5h-3A1.75 1.75 0 0 1 4.75 8.75v-3ZM12.75 5.75A1.75 1.75 0 0 1 14.5 4h3a1.75 1.75 0 0 1 1.75 1.75v3A1.75 1.75 0 0 1 17.5 10.5h-3a1.75 1.75 0 0 1-1.75-1.75v-3ZM4.75 14.75A1.75 1.75 0 0 1 6.5 13h3a1.75 1.75 0 0 1 1.75 1.75v3A1.75 1.75 0 0 1 9.5 19.5h-3a1.75 1.75 0 0 1-1.75-1.75v-3ZM12.75 14.75A1.75 1.75 0 0 1 14.5 13h3a1.75 1.75 0 0 1 1.75 1.75v3a1.75 1.75 0 0 1-1.75 1.75h-3a1.75 1.75 0 0 1-1.75-1.75v-3Z"
      />
    </svg>
  );
}

export function BottomNav({ language }: BottomNavProps) {
  const safeLanguage = normalizeLanguage(language ?? DEFAULT_LANGUAGE);

  const items = [
    {
      href: "/",
      label: t(safeLanguage, "home"),
      icon: <HomeIcon />,
    },
    {
      href: "/courses",
      label: t(safeLanguage, "courses"),
      icon: <BookIcon />,
    },
    {
      href: "/quests",
      label: t(safeLanguage, "quests"),
      icon: <QuestIcon />,
    },
    {
      href: "/passport",
      label: "Passport",
      icon: <PassportIcon />,
    },
    {
      href: "/dashboard",
      label: t(safeLanguage, "dashboard"),
      icon: <DashboardIcon />,
    },
  ];

  return (
    <nav className="fixed inset-x-0 bottom-0 z-40 border-t border-white/10 bg-slate-950/95 px-3 py-2 backdrop-blur md:hidden">
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
