import Link from "next/link";
import { DEFAULT_LANGUAGE, normalizeLanguage, type Language, t } from "@/lib/i18n";

type BottomNavProps = { language?: Language };

function LearnIcon() { return <svg aria-hidden="true" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M4.75 5.75A1.75 1.75 0 0 1 6.5 4h11A1.75 1.75 0 0 1 19.25 5.75v12.5A1.75 1.75 0 0 1 17.5 20h-11a1.75 1.75 0 0 1-1.75-1.75V5.75Z" /><path strokeLinecap="round" strokeLinejoin="round" d="M8 8h8M8 12h8M8 16h5" /></svg>; }
function CourseIcon() { return <svg aria-hidden="true" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M4 6.5A2.5 2.5 0 0 1 6.5 4H20v15H6.5A2.5 2.5 0 0 0 4 21.5v-15Z" /><path strokeLinecap="round" strokeLinejoin="round" d="M8 8h8M8 12h6" /></svg>; }
function LessonIcon() { return <svg aria-hidden="true" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M7 4.75h10A2.25 2.25 0 0 1 19.25 7v10A2.25 2.25 0 0 1 17 19.25H7A2.25 2.25 0 0 1 4.75 17V7A2.25 2.25 0 0 1 7 4.75Z" /><path strokeLinecap="round" strokeLinejoin="round" d="M8.75 8.75h6.5M8.75 12h6.5M8.75 15.25h3.5" /></svg>; }
function CommunityIcon() { return <svg aria-hidden="true" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M8.5 11a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM15.5 11a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM3.75 19.25a4.75 4.75 0 0 1 9.5 0M10.75 19.25a4.75 4.75 0 0 1 9.5 0" /></svg>; }
function PassportIcon() { return <svg aria-hidden="true" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M7 3.75h10A2.25 2.25 0 0 1 19.25 6v12A2.25 2.25 0 0 1 17 20.25H7A2.25 2.25 0 0 1 4.75 18V6A2.25 2.25 0 0 1 7 3.75Z" /><path strokeLinecap="round" strokeLinejoin="round" d="M9 8.25h6M9 12h6M9 15.75h3" /></svg>; }

export function BottomNav({ language }: BottomNavProps) {
  const safeLanguage = normalizeLanguage(language ?? DEFAULT_LANGUAGE);
  const items = [
    { href: "/learner", label: safeLanguage === "id" ? "Belajar" : "Learn", icon: <LearnIcon /> },
    { href: "/courses", label: t(safeLanguage, "courses"), icon: <CourseIcon /> },
    { href: "/lessons", label: safeLanguage === "id" ? "Lesson" : "Lessons", icon: <LessonIcon /> },
    { href: "/workshops", label: safeLanguage === "id" ? "Komunitas" : "Community", icon: <CommunityIcon /> },
    { href: "/passport", label: "Passport", icon: <PassportIcon /> },
  ];
  return <nav className="fixed inset-x-0 bottom-0 z-40 border-t border-white/10 bg-slate-950/95 px-3 py-2 backdrop-blur md:hidden"><div className="mx-auto grid max-w-md grid-cols-5 gap-1">{items.map((item) => <Link key={item.href} href={item.href} className="flex flex-col items-center justify-center gap-1 rounded-2xl px-2 py-2 text-[11px] font-semibold text-slate-300 transition hover:bg-white/10 hover:text-emerald-300">{item.icon}<span className="line-clamp-1">{item.label}</span></Link>)}</div></nav>;
}
