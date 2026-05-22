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
  badge?: string;
};

type NavGroup = {
  titleId: string;
  titleEn: string;
  items: NavItem[];
};

const navGroups: NavGroup[] = [
  {
    titleId: "Overview",
    titleEn: "Overview",
    items: [
      {
        href: "/admin",
        labelId: "Command Center",
        labelEn: "Command Center",
        descriptionId: "Ringkasan CMS dan health produk",
        descriptionEn: "CMS and product health summary",
      },
      {
        href: "/admin/health",
        labelId: "System Health",
        labelEn: "System Health",
        descriptionId: "Database, proof, readiness, dan status sistem",
        descriptionEn: "Database, proof, readiness, and system status",
      },
    ],
  },
  {
    titleId: "Content",
    titleEn: "Content",
    items: [
      {
        href: "/admin/courses",
        labelId: "Courses",
        labelEn: "Courses",
        descriptionId: "Kelola course, module, lesson",
        descriptionEn: "Manage courses, modules, lessons",
      },
      {
        href: "/admin/courses/new",
        labelId: "Create Course",
        labelEn: "Create Course",
        descriptionId: "Buat course baru",
        descriptionEn: "Create new course",
        badge: "New",
      },
    ],
  },
  {
    titleId: "Learning Ops",
    titleEn: "Learning Ops",
    items: [
      {
        href: "/admin/submissions",
        labelId: "Submissions",
        labelEn: "Submissions",
        descriptionId: "Review quest dan reward XP",
        descriptionEn: "Review quests and XP rewards",
      },
      {
        href: "/admin/learners",
        labelId: "Learners",
        labelEn: "Learners",
        descriptionId: "Pantau profile dan passport",
        descriptionEn: "Monitor profiles and passports",
      },
      {
        href: "/admin/proofs",
        labelId: "Proof Records",
        labelEn: "Proof Records",
        descriptionId: "Learning, participation, readiness proof",
        descriptionEn: "Learning, participation, readiness proof",
      },
    ],
  },
  {
    titleId: "Community",
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
        labelId: "Create Workshop",
        labelEn: "Create Workshop",
        descriptionId: "Tambah event komunitas",
        descriptionEn: "Add community event",
        badge: "New",
      },
    ],
  },
  {
    titleId: "Public Review",
    titleEn: "Public Review",
    items: [
      {
        href: "/status",
        labelId: "Public Status",
        labelEn: "Public Status",
        descriptionId: "Metrik dan reviewer route",
        descriptionEn: "Metrics and reviewer route",
      },
      {
        href: "/roadmap",
        labelId: "Roadmap",
        labelEn: "Roadmap",
        descriptionId: "Arah produk publik",
        descriptionEn: "Public product direction",
      },
      {
        href: "/stacks/stellar-readiness",
        labelId: "Stellar Readiness",
        labelEn: "Stellar Readiness",
        descriptionId: "Wallet readiness dan mainnet path",
        descriptionEn: "Wallet readiness and mainnet path",
      },
      {
        href: "/filecoin-proof-archive",
        labelId: "Filecoin Archive",
        labelEn: "Filecoin Archive",
        descriptionId: "Proof archive direction",
        descriptionEn: "Proof archive direction",
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

export function AdminConsoleNav({ language }: AdminConsoleNavProps) {
  const pathname = usePathname();

  return (
    <nav className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-3 shadow-2xl shadow-black/10">
      <div className="rounded-3xl border border-emerald-400/20 bg-emerald-400/10 p-4">
        <p className="text-xs font-black uppercase tracking-[0.22em] text-emerald-300">
          Admin CMS
        </p>
        <p className="mt-2 text-sm leading-6 text-slate-300">
          {language === "id"
            ? "Panel internal untuk mengelola produk MVP dengan rapi."
            : "Internal panel to manage the MVP product cleanly."}
        </p>
      </div>

      <div className="mt-3 grid gap-3">
        {navGroups.map((group) => (
          <section key={group.titleEn} className="rounded-3xl border border-white/10 bg-slate-950/60 p-3">
            <p className="px-2 pb-2 text-[11px] font-black uppercase tracking-[0.18em] text-slate-500">
              {language === "id" ? group.titleId : group.titleEn}
            </p>

            <div className="grid gap-1.5">
              {group.items.map((item) => {
                const active = isActivePath(pathname, item.href);

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={[
                      "group rounded-2xl p-3.5 transition",
                      active
                        ? "bg-emerald-400 text-slate-950 shadow-lg shadow-emerald-950/30"
                        : "bg-white/[0.03] text-slate-300 hover:bg-white/[0.07] hover:text-white",
                    ].join(" ")}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="min-w-0">
                        <p className="text-sm font-black">
                          {language === "id" ? item.labelId : item.labelEn}
                        </p>

                        {item.descriptionId || item.descriptionEn ? (
                          <p
                            className={[
                              "mt-1 text-xs leading-5",
                              active ? "text-slate-800" : "text-slate-500 group-hover:text-slate-400",
                            ].join(" ")}
                          >
                            {language === "id" ? item.descriptionId : item.descriptionEn}
                          </p>
                        ) : null}
                      </div>

                      {item.badge ? (
                        <span
                          className={[
                            "shrink-0 rounded-full px-2 py-0.5 text-[10px] font-black uppercase tracking-wide",
                            active ? "bg-slate-950/10 text-slate-800" : "bg-emerald-400/10 text-emerald-300",
                          ].join(" ")}
                        >
                          {item.badge}
                        </span>
                      ) : null}
                    </div>
                  </Link>
                );
              })}
            </div>
          </section>
        ))}
      </div>
    </nav>
  );
}
