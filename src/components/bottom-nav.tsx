import Link from "next/link";

function HomeIcon() {
  return (
    <svg aria-hidden="true" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M4.75 10.75 12 4.75l7.25 6v7.5A1.75 1.75 0 0 1 17.5 20h-11a1.75 1.75 0 0 1-1.75-1.75v-7.5Z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M9.25 20v-5.25h5.5V20" />
    </svg>
  );
}

function CourseIcon() {
  return (
    <svg aria-hidden="true" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M4 6.5A2.5 2.5 0 0 1 6.5 4H20v15H6.5A2.5 2.5 0 0 0 4 21.5v-15Z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M8 8h8M8 12h6" />
    </svg>
  );
}

function LessonIcon() {
  return (
    <svg aria-hidden="true" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M7 4.75h10A2.25 2.25 0 0 1 19.25 7v10A2.25 2.25 0 0 1 17 19.25H7A2.25 2.25 0 0 1 4.75 17V7A2.25 2.25 0 0 1 7 4.75Z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M8.75 8.75h6.5M8.75 12h6.5M8.75 15.25h3.5" />
    </svg>
  );
}

function DashboardIcon() {
  return (
    <svg aria-hidden="true" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M4.75 5.75A1.75 1.75 0 0 1 6.5 4h3.25v6.25h-5V5.75ZM14.25 4h3.25a1.75 1.75 0 0 1 1.75 1.75v3.5h-5V4ZM4.75 14.25h5V20H6.5a1.75 1.75 0 0 1-1.75-1.75v-4ZM14.25 13.25h5v5A1.75 1.75 0 0 1 17.5 20h-3.25v-6.75Z" />
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

const items = [
  { href: "/", label: "Beranda", icon: <HomeIcon /> },
  { href: "/courses", label: "Kursus", icon: <CourseIcon /> },
  { href: "/lessons", label: "Pelajaran", icon: <LessonIcon /> },
  { href: "/dashboard", label: "Dasbor", icon: <DashboardIcon /> },
  { href: "/passport", label: "Paspor", icon: <PassportIcon /> },
] as const;

export function BottomNav() {
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
