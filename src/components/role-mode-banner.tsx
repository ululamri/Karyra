import Link from "next/link";

export type RoleMode = "learner" | "admin" | "reviewer";

type RoleModeBannerProps = {
  mode: RoleMode;
  language?: "id" | "en";
};

const modeConfig = {
  learner: {
    eyebrowId: "Learner Mode",
    eyebrowEn: "Learner Mode",
    titleId: "Ruang belajar untuk user awam.",
    titleEn: "A learning space for everyday users.",
    descriptionId:
      "Mode ini hanya menampilkan perjalanan learner: course, quest, workshop, readiness passport, dan Stellar checklist. Admin tools dan reviewer pages sengaja tidak dijadikan fokus di sini.",
    descriptionEn:
      "This mode focuses only on the learner journey: courses, quests, workshops, readiness passport, and Stellar checklist. Admin tools and reviewer pages are intentionally not the focus here.",
    badge: "User-facing",
    className: "border-emerald-400/20 bg-emerald-400/10 text-emerald-300",
    primaryHref: "/dashboard",
    primaryId: "Buka Dashboard",
    primaryEn: "Open Dashboard",
    secondaryHref: "/reviewer",
    secondaryId: "Mode Reviewer",
    secondaryEn: "Reviewer Mode",
  },
  admin: {
    eyebrowId: "Admin Mode",
    eyebrowEn: "Admin Mode",
    titleId: "Internal console untuk operator MVP.",
    titleEn: "Internal console for MVP operators.",
    descriptionId:
      "Mode ini berisi alat admin: review submission, kelola course/workshop, pantau readiness, arsipkan proof, dan cek system health. Di produk final, area ini akan dilindungi auth dan permission asli.",
    descriptionEn:
      "This mode contains admin tools: review submissions, manage courses/workshops, monitor readiness, archive proofs, and check system health. In production, this area will be protected by real auth and permissions.",
    badge: "Internal MVP",
    className: "border-sky-400/20 bg-sky-400/10 text-sky-300",
    primaryHref: "/admin/health",
    primaryId: "Cek System Health",
    primaryEn: "Check System Health",
    secondaryHref: "/reviewer",
    secondaryId: "Mode Reviewer",
    secondaryEn: "Reviewer Mode",
  },
  reviewer: {
    eyebrowId: "Reviewer Mode",
    eyebrowEn: "Reviewer Mode",
    titleId: "Paket evaluasi untuk grant, investor, dan reviewer.",
    titleEn: "Evaluation package for grants, investors, and reviewers.",
    descriptionId:
      "Mode ini mengumpulkan demo path, grant package, impact, transparency, roadmap, QA checklist, dan dokumentasi agar evaluator bisa memahami MVP tanpa tersesat di alur learner/admin.",
    descriptionEn:
      "This mode gathers the demo path, grant package, impact, transparency, roadmap, QA checklist, and documentation so evaluators can understand the MVP without getting lost in learner/admin flows.",
    badge: "Review-ready",
    className: "border-amber-400/20 bg-amber-400/10 text-amber-300",
    primaryHref: "/grant-package",
    primaryId: "Buka Grant Package",
    primaryEn: "Open Grant Package",
    secondaryHref: "/learner",
    secondaryId: "Coba Learner Mode",
    secondaryEn: "Try Learner Mode",
  },
} satisfies Record<RoleMode, Record<string, string>>;

export function RoleModeBanner({ mode, language = "id" }: RoleModeBannerProps) {
  const copy = modeConfig[mode];
  const isId = language === "id";

  return (
    <section className={`rounded-[2rem] border p-5 md:p-6 ${copy.className}`}>
      <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <span className="rounded-full border border-current/20 bg-black/20 px-3 py-1 text-xs font-bold uppercase tracking-[0.18em]">
              {isId ? copy.eyebrowId : copy.eyebrowEn}
            </span>
            <span className="rounded-full border border-white/10 bg-white/10 px-3 py-1 text-xs font-semibold text-white/80">
              {copy.badge}
            </span>
          </div>

          <h2 className="mt-4 text-2xl font-bold text-white md:text-3xl">
            {isId ? copy.titleId : copy.titleEn}
          </h2>
          <p className="mt-3 max-w-4xl leading-7 text-slate-200/90">
            {isId ? copy.descriptionId : copy.descriptionEn}
          </p>
        </div>

        <div className="flex shrink-0 flex-col gap-3 sm:flex-row md:flex-col lg:flex-row">
          <Link
            href={copy.primaryHref}
            className="rounded-2xl bg-white px-5 py-3 text-center text-sm font-bold text-slate-950 transition hover:bg-slate-200"
          >
            {isId ? copy.primaryId : copy.primaryEn}
          </Link>
          <Link
            href={copy.secondaryHref}
            className="rounded-2xl border border-white/15 bg-white/10 px-5 py-3 text-center text-sm font-bold text-white transition hover:bg-white/15"
          >
            {isId ? copy.secondaryId : copy.secondaryEn}
          </Link>
        </div>
      </div>
    </section>
  );
}
