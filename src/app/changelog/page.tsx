import Link from "next/link";
import { getServerLanguage } from "../../lib/i18n-server";
import { t } from "../../lib/i18n";

export default async function ChangelogPage() {
  const language = await getServerLanguage();

  const updates =
    language === "id"
      ? [
          {
            date: "Mei 2026",
            type: "Core Foundation",
            title: "Database dan Prisma foundation selesai",
            description:
              "Karyra berhasil menjalankan PostgreSQL remote, Prisma 7.8.0, schema inti, migration, Prisma Client, smoke test, dan seed data awal.",
            items: [
              "PostgreSQL remote terhubung",
              "Prisma 7.8.0 berjalan stabil",
              "Schema course, lesson, quest, reward, workshop, badge dibuat",
              "Seed data awal berhasil",
            ],
          },
          {
            date: "Mei 2026",
            type: "Learning Product",
            title: "Learning pages dan learner dashboard aktif",
            description:
              "Halaman course, lesson, quest, homepage, dan learner dashboard sudah mengambil data langsung dari database.",
            items: [
              "Homepage Karyra V2",
              "Course list dan course detail",
              "Lesson detail dengan quiz",
              "Learner dashboard dengan XP, level, badge, dan progress",
            ],
          },
          {
            date: "Mei 2026",
            type: "Quest Engine",
            title: "Quest submission dan reward approval aktif",
            description:
              "Learner dapat submit quest, admin dapat review submission, dan XP reward dicatat melalui RewardLedger.",
            items: [
              "Submit quest dari halaman quest",
              "Admin review submission",
              "Approve/reject flow",
              "XP reward otomatis saat approval",
            ],
          },
          {
            date: "Mei 2026",
            type: "Admin CMS",
            title: "Karyra admin console v0.1 berhasil dibuat",
            description:
              "Admin dapat membuat course baru, module pertama, lesson pertama, publish, archive, dan preview konten.",
            items: [
              "Admin dashboard",
              "Create course form",
              "Auto-create first module",
              "Auto-create first lesson",
              "Publish/archive course",
            ],
          },
          {
            date: "Mei 2026",
            type: "Grant Readiness",
            title: "Public status page dan transparency layer dibuat",
            description:
              "Reviewer dapat melihat metrik platform, roadmap, stack teknologi, dan arah komunitas melalui halaman status publik.",
            items: [
              "Public project status",
              "Platform metrics",
              "Roadmap",
              "Tech stack",
              "Community direction",
            ],
          },
        ]
      : [
          {
            date: "May 2026",
            type: "Core Foundation",
            title: "Database and Prisma foundation completed",
            description:
              "Karyra successfully runs remote PostgreSQL, Prisma 7.8.0, core schema, migration, Prisma Client, smoke test, and initial seed data.",
            items: [
              "Remote PostgreSQL connected",
              "Prisma 7.8.0 running",
              "Course, lesson, quest, reward, workshop, and badge schema created",
              "Initial seed data completed",
            ],
          },
          {
            date: "May 2026",
            type: "Learning Product",
            title: "Learning pages and learner dashboard are active",
            description:
              "Course, lesson, quest, homepage, and learner dashboard pages now read directly from the database.",
            items: [
              "Karyra V2 homepage",
              "Course list and course detail",
              "Lesson detail with quiz",
              "Learner dashboard with XP, level, badge, and progress",
            ],
          },
          {
            date: "May 2026",
            type: "Quest Engine",
            title: "Quest submission and reward approval are active",
            description:
              "Learners can submit quests, admins can review submissions, and XP rewards are recorded through RewardLedger.",
            items: [
              "Submit quest from quest page",
              "Admin review submission",
              "Approve/reject flow",
              "Automatic XP reward on approval",
            ],
          },
          {
            date: "May 2026",
            type: "Admin CMS",
            title: "Karyra admin consol v0.1 completed",
            description:
              "Admins can create new courses, first modules, first lessons, publish, archive, and preview content.",
            items: [
              "Admin dashboard",
              "Create course form",
              "Auto-create first module",
              "Auto-create first lesson",
              "Publish/archive course",
            ],
          },
          {
            date: "May 2026",
            type: "Grant Readiness",
            title: "Public status page and transparency layer created",
            description:
              "Reviewers can see platform metrics, roadmap, tech stack, and community direction through the public status page.",
            items: [
              "Public project status",
              "Platform metrics",
              "Roadmap",
              "Tech stack",
              "Community direction",
            ],
          },
        ];

  const nextMilestones =
    language === "id"
      ? [
          "Workshop registration v0.1",
          "Public workshop page",
          "Admin workshop management",
          "Basic impact report",
          "Grant submission polish",
        ]
      : [
          "Workshop registration v0.1",
          "Public workshop page",
          "Admin workshop management",
          "Basic impact report",
          "Grant submission polish",
        ];

  return (
    <main className="min-h-screen bg-slate-950 px-5 py-8 text-white md:px-8 md:py-16">
      <section className="mx-auto max-w-7xl">
        <div className="grid gap-6 md:grid-cols-[1.1fr_0.9fr]">
          <div className="rounded-[2rem] border border-white/10 bg-white/5 p-6 md:p-8">
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-emerald-300">
              {t(language, "transparency")}
            </p>

            <h1 className="mt-4 text-3xl font-bold md:text-5xl">
              {t(language, "publicChangelog")}
            </h1>

            <p className="mt-5 max-w-3xl text-base leading-8 text-slate-300 md:text-lg">
              {language === "id"
                ? "Halaman ini mencatat progres pengembangan Karyra secara publik agar reviewer, komunitas, dan calon kontributor dapat melihat perkembangan proyek."
                : "This page publicly records Karyra development progress so reviewers, communities, and future contributors can track the project."}
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/status"
                className="rounded-2xl bg-emerald-400 px-6 py-4 text-center font-bold text-slate-950"
              >
                {t(language, "projectStatus")}
              </Link>

              <Link
                href="/admin"
                className="rounded-2xl border border-white/15 px-6 py-4 text-center font-bold text-white"
              >
                Admin CMS
              </Link>
              
              <Link
                href="/impact"
                className="rounded-2xl border border-white/15 px-6 py-4 text-center font-bold text-white"
              >
                {t(language, "impact")}
              </Link>
              
            </div>
          </div>

          <div className="rounded-[2rem] border border-emerald-400/20 bg-emerald-400/10 p-6 md:p-8">
            <h2 className="text-2xl font-bold">{t(language, "nextMilestones")}</h2>

            <div className="mt-5 grid gap-3">
              {nextMilestones.map((milestone, index) => (
                <div
                  key={milestone}
                  className="rounded-2xl bg-slate-950/50 p-4"
                >
                  <p className="text-sm text-slate-400">
                    {language === "id" ? "Berikutnya" : "Next"} {index + 1}
                  </p>
                  <p className="mt-1 font-bold">{milestone}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <section className="mt-10">
          <h2 className="text-2xl font-bold md:text-3xl">
            {t(language, "recentUpdates")}
          </h2>

          <div className="mt-6 grid gap-5">
            {updates.map((update) => (
              <article
                key={`${update.type}-${update.title}`}
                className="rounded-[2rem] border border-white/10 bg-white/5 p-6 md:p-8"
              >
                <div className="flex flex-col justify-between gap-4 md:flex-row md:items-start">
                  <div>
                    <div className="flex flex-wrap gap-2 text-xs font-bold uppercase tracking-wide">
                      <span className="rounded-full bg-emerald-400/10 px-3 py-1 text-emerald-300">
                        {update.type}
                      </span>
                      <span className="rounded-full bg-white/10 px-3 py-1 text-slate-300">
                        {update.date}
                      </span>
                    </div>

                    <h3 className="mt-4 text-2xl font-bold">{update.title}</h3>

                    <p className="mt-3 max-w-4xl leading-8 text-slate-300">
                      {update.description}
                    </p>
                  </div>
                </div>

                <div className="mt-6 grid gap-3 md:grid-cols-2">
                  {update.items.map((item) => (
                    <div key={item} className="rounded-2xl bg-slate-900 p-4">
                      <p className="text-sm leading-6 text-slate-300">
                        ✓ {item}
                      </p>
                    </div>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </section>
      </section>
    </main>
  );
}