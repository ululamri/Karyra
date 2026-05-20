import Link from "next/link";
import { DEFAULT_LANGUAGE, normalizeLanguage, type Language } from "@/lib/i18n";

type BottomNavProps = {
  language?: Language;
};

function LearnIcon() {
  return (
    <svg aria-hidden="true" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.75c-2-1.5-4.5-2.25-7.5-2.25v13.5c3 0 5.5.75 7.5 2.25m0-13.5c2-1.5 4.5-2.25 7.5-2.25v13.5c-3 0-5.5.75-7.5 2.25m0-13.5v13.5" />
    </svg>
  );
}

function CoursesIcon() {
  return (
    <svg aria-hidden="true" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M4.75 5.75A1.75 1.75 0 0 1 6.5 4h11A1.75 1.75 0 0 1 19.25 5.75v12.5A1.75 1.75 0 0 1 17.5 20h-11a1.75 1.75 0 0 1-1.75-1.75V5.75Z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M8 8h8M8 12h8M8 16h4" />
    </svg>
  );
}

function QuestIcon() {
  return (
    <svg aria-hidden="true" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 3.75 19.5 7.5v5.25c0 4.5-3.1 7.4-7.5 8.5-4.4-1.1-7.5-4-7.5-8.5V7.5L12 3.75Z" />
    </svg>
  );
}

function WorkshopIcon() {
  return (
    <svg aria-hidden="true" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 11a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM15.75 11a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 19.25c.6-3 2.4-5 4.5-5s3.9 2 4.5 5M11.25 19.25c.6-3 2.4-5 4.5-5s3.9 2 4.5 5" />
    </svg>
  );
}

function PassportIcon() {
  return (
    <svg aria-hidden="true" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M7 3.75h10A2.25 2.25 0 0 1 19.25 6v12A2.25 2.25 0 0 1 17 20.25H7A2.25 2.25 0 0 1 4.75 18V6A2.25 2.25 0 0 1 7 3.75Z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 8.25h6M9 12h6M9 15.75h3" />
    </svg>
  );
}

export function BottomNav({ language }: BottomNavProps) {
  const safeLanguage = normalizeLanguage(language ?? DEFAULT_LANGUAGE);

  const items = [
    {
      href: "/learner",
      label: safeLanguage === "id" ? "Belajar" : "Learn",
      icon: <LearnIcon />,
    },
    {
      href: "/courses",
      label: safeLanguage === "id" ? "Course" : "Courses",
      icon: <CoursesIcon />,
    },
    {
      href: "/quests?track=stellar-readiness",
      label: "Quest",
      icon: <QuestIcon />,
    },
    {
      href: "/workshops",
      label: safeLanguage === "id" ? "Komunitas" : "Community",
      icon: <WorkshopIcon />,
    },
    {
      href: "/passport",
      label: "Passport",
      icon: <PassportIcon />,
    },
  ];

  return (
    <nav className="fixed inset-x-0 bottom-0 z-40 border-t border-white/10 bg-slate-950/95 px-3 py-2 backdrop-blur md:hidden">
      <div className="mx-auto grid max-w-md grid-cols-5 gap-1">
        {items.map((item) => (
          <Link key={item.href} href={item.href} className="flex min-h-14 flex-col items-center justify-center gap-1 rounded-2xl px-1.5 py-2 text-[11px] font-bold text-slate-300 transition hover:bg-white/10 hover:text-emerald-300">
            {item.icon}
            <span className="line-clamp-1">{item.label}</span>
          </Link>
        ))}
      </div>
    </nav>
  );
}
