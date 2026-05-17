"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { Language } from "../lib/i18n";

type AdminConsoleNavProps = {
  language: Language;
};

type NavItem = {
  href: string;
  labelId: string;
  labelEn: string;
  descriptionId?: string;
  descriptionEn?: string;
};

type NavGroup = {
  titleId: string;
  titleEn: string;
  items: NavItem[];
};

const navGroups: NavGroup[] = [
  {
    titleId: "Konten",
    titleEn: "Content",
    items: [
      {
        href: "/admin",
        labelId: "Overview",
        labelEn: "Overview",
        descriptionId: "Ringkasan console",
        descriptionEn: "Console summary",
      },
      {
        href: "/admin/courses",
        labelId: "Courses",
        labelEn: "Courses",
        descriptionId: "Kelola course & lesson",
        descriptionEn: "Manage courses & lessons",
      },
      {
        href: "/admin/courses/new",
        labelId: "Buat Course",
        labelEn: "Create Course",
        descriptionId: "Tambah konten belajar",
        descriptionEn: "Add learning content",
      },
    ],
  },
  {
    titleId: "Quest & Reward",
    titleEn: "Quest & Reward",
    items: [
      {
        href: "/admin/submissions",
        labelId: "Review Submission",
        labelEn: "Review Submissions",
        descriptionId: "Approve quest & XP",
        descriptionEn: "Approve quests & XP",
      },
    ],
  },
  {
    titleId: "Komunitas",
    titleEn: "Community",
    items: [
      {
        href: "/admin/workshops",
        labelId: "Workshops",
        labelEn: "Workshops",
        descriptionId: "Kelola event offline",
        descriptionEn: "Manage offline events",
      },
      {
        href: "/admin/workshops/new",
        labelId: "Buat Workshop",
        labelEn: "Create Workshop",
        descriptionId: "Tambah event komunitas",
        descriptionEn: "Add community event",
      },
      {
        href: "/workshops",
        labelId: "Public Workshops",
        labelEn: "Public Workshops",
        descriptionId: "Halaman publik",
        descriptionEn: "Public page",
      },
    ],
  },
  {
    titleId: "Transparansi",
    titleEn: "Transparency",
    items: [
      {
        href: "/status",
        labelId: "Project Status",
        labelEn: "Project Status",
        descriptionId: "Metrik publik",
        descriptionEn: "Public metrics",
      },
      {
        href: "/changelog",
        labelId: "Changelog",
        labelEn: "Changelog",
        descriptionId: "Riwayat update",
        descriptionEn: "Update history",
      },
      {
        href: "/dashboard",
        labelId: "Learner Dashboard",
        labelEn: "Learner Dashboard",
        descriptionId: "Preview learner",
        descriptionEn: "Learner preview",
      },
      {
        href: "/impact",
        labelId: "Impact Report",
        labelEn: "Impact Report",
        descriptionId: "Bukti dampak grant",
        descriptionEn: "Grant impact proof",
      },
      {
        href: "/reviewer-guide",
        labelId: "Reviewer Guide",
        labelEn: "Reviewer Guide",
        descriptionId: "Panduan reviewer grant",
        descriptionEn: "Grant reviewer guide",
      },
    ],
  },
];

function isActivePath(pathname: string, href: string) {
  if (href === "/admin") {
    return pathname === "/admin";
  }

  return pathname === href || pathname.startsWith(`${href}/`);
}

function groupHasActivePath(pathname: string, group: NavGroup) {
  return group.items.some((item) => isActivePath(pathname, item.href));
}

function ChevronIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-4 w-4 transition group-open:rotate-180"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      aria-hidden="true"
    >
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}

export function AdminConsoleNav({ language }: AdminConsoleNavProps) {
  const pathname = usePathname();

  return (
    <nav className="grid gap-3">
      <div className="rounded-3xl border border-emerald-400/20 bg-emerald-400/10 p-4">
        <p className="text-xs font-bold uppercase tracking-[0.22em] text-emerald-300">
          Console
        </p>
        <p className="mt-2 text-sm leading-6 text-slate-300">
          {language === "id"
            ? "Pilih modul yang ingin dikelola."
            : "Choose a module to manage."}
        </p>
      </div>

      {navGroups.map((group) => {
        const hasActive = groupHasActivePath(pathname, group);

        return (
          <details
            key={group.titleEn}
            open={hasActive}
            className="group rounded-3xl border border-white/10 bg-white/5 p-3"
          >
            <summary className="flex cursor-pointer list-none items-center justify-between gap-3 rounded-2xl px-3 py-3 font-bold text-white">
              <span>{language === "id" ? group.titleId : group.titleEn}</span>
              <ChevronIcon />
            </summary>

            <div className="mt-2 grid gap-2">
              {group.items.map((item) => {
                const active = isActivePath(pathname, item.href);

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={[
                      "rounded-2xl p-4 transition",
                      active
                        ? "bg-emerald-400 text-slate-950"
                        : "bg-slate-900 text-slate-300 hover:bg-slate-800 hover:text-white",
                    ].join(" ")}
                  >
                    <p className="font-bold">
                      {language === "id" ? item.labelId : item.labelEn}
                    </p>

                    {item.descriptionId || item.descriptionEn ? (
                      <p
                        className={[
                          "mt-1 text-xs leading-5",
                          active ? "text-slate-800" : "text-slate-500",
                        ].join(" ")}
                      >
                        {language === "id"
                          ? item.descriptionId
                          : item.descriptionEn}
                      </p>
                    ) : null}
                  </Link>
                );
              })}
            </div>
          </details>
        );
      })}
    </nav>
  );
}