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
            type: "Readiness Infrastructure",
            title: "Readiness Passport, timeline, dan share summary aktif",
            description:
              "Karyra sekarang memiliki learner passport, timeline aktivitas, badge readiness, proof record, dan ringkasan shareable untuk memperlihatkan perjalanan kesiapan learner.",
            items: [
              "Readiness Passport dengan score dan level",
              "Readiness Timeline untuk badge, quest, reward, proof, dan workshop",
              "Shareable Passport Summary placeholder",
              "Proof verification link dari passport",
            ],
          },
          {
            date: "Mei 2026",
            type: "Filecoin Proof Archive",
            title: "Demo Filecoin archive layer ditambahkan",
            description:
              "Proof record dapat diarsipkan ke demo Filecoin layer dengan CID placeholder, manifest JSON, dan checksum SHA-256 untuk memperjelas arah Proof Archive.",
            items: [
              "Admin Proof Archive monitor",
              "Archive action untuk proof record",
              "Manifest JSON v0.1",
              "Checksum SHA-256 placeholder",
              "Public proof verification page",
            ],
          },
          {
            date: "Mei 2026",
            type: "Stellar Readiness",
            title: "Stellar Readiness Track menjadi course, quest, badge, dan checklist",
            description:
              "Stellar diposisikan sebagai jalur payment-readiness: wallet safety, memo awareness, stablecoin literacy, scam prevention, dan pre-transaction confidence.",
            items: [
              "Halaman Stellar Readiness Stack",
              "Course Stellar Readiness for Local Communities",
              "Quest filter untuk Stellar Readiness",
              "Badge Stellar Readiness Pioneer",
              "Checklist interaktif pre-transaction confidence",
            ],
          },
          {
            date: "Mei 2026",
            type: "Quest Engine",
            title: "Quest submission dan reward approval diperkuat",
            description:
              "Learner dapat submit quest dengan validasi karakter, admin dapat approve/reject, XP reward dicatat, dan readiness profile tersinkron setelah approval.",
            items: [
              "Client-side character counter",
              "Submission status di dashboard",
              "Approve flow lebih tahan ECONNABORTED",
              "Auto-sync readiness setelah approval",
            ],
          },
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
              "Learner dashboard dengan XP, level, badge, progress, dan submission status",
            ],
          },
          {
            date: "Mei 2026",
            type: "Admin Console",
            title: "Karyra Admin Console diperluas",
            description:
              "Admin dapat mengelola course, submission, workshop, learner readiness, proof archive, dan project flow dari satu console.",
            items: [
              "Admin dashboard berbasis quickActions",
              "Course management",
              "Submission review",
              "Learner readiness monitor",
              "Proof archive monitor",
            ],
          },
          {
            date: "Mei 2026",
            type: "Grant Readiness",
            title: "Public status page dan transparency layer dibuat",
            description:
              "Reviewer dapat melihat metrik platform, roadmap, stack teknologi, readiness infrastructure, dan arah komunitas melalui halaman status publik.",
            items: [
              "Public project status",
              "Readiness impact metrics",
              "Roadmap",
              "Tech stack",
              "Community direction",
            ],
          },
        ]
      : [
          {
            date: "May 2026",
            type: "Readiness Infrastructure",
            title: "Readiness Passport, timeline, and share summary are active",
            description:
              "Karyra now includes a learner passport, activity timeline, readiness badges, proof records, and a shareable summary to show each learner's readiness journey.",
            items: [
              "Readiness Passport with score and level",
              "Readiness Timeline for badges, quests, rewards, proofs, and workshops",
              "Shareable Passport Summary placeholder",
              "Proof verification links from passport",
            ],
          },
          {
            date: "May 2026",
            type: "Filecoin Proof Archive",
            title: "Demo Filecoin archive layer added",
            description:
              "Proof records can be archived to a demo Filecoin layer with placeholder CIDs, manifest JSON, and SHA-256 checksums to clarify the Proof Archive direction.",
            items: [
              "Admin Proof Archive monitor",
              "Archive action for proof records",
              "Manifest JSON v0.1",
              "SHA-256 checksum placeholder",
              "Public proof verification page",
            ],
          },
          {
            date: "May 2026",
            type: "Stellar Readiness",
            title: "Stellar Readiness Track became a course, quests, badge, and checklist",
            description:
              "Stellar is positioned as the payment-readiness track: wallet safety, memo awareness, stablecoin literacy, scam prevention, and pre-transaction confidence.",
            items: [
              "Stellar Readiness Stack page",
              "Stellar Readiness for Local Communities course",
              "Quest filter for Stellar Readiness",
              "Stellar Readiness Pioneer badge",
              "Interactive pre-transaction confidence checklist",
            ],
          },
          {
            date: "May 2026",
            type: "Quest Engine",
            title: "Quest submission and reward approval strengthened",
            description:
              "Learners can submit quests with character validation, admins can approve/reject, XP rewards are recorded, and readiness profiles sync after approval.",
            items: [
              "Client-side character counter",
              "Submission status on dashboard",
              "Approve flow hardened against ECONNABORTED",
              "Auto-sync readiness after approval",
            ],
          },
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
              "Learner dashboard with XP, level, badge, progress, and submission status",
            ],
          },
          {
            date: "May 2026",
            type: "Admin Console",
            title: "Karyra Admin Console expanded",
            description:
              "Admins can manage courses, submissions, workshops, learner readiness, proof archive, and project flow from one console.",
            items: [
              "Admin dashboard using quickActions",
              "Course management",
              "Submission review",
              "Learner readiness monitor",
              "Proof archive monitor",
            ],
          },
          {
            date: "May 2026",
            type: "Grant Readiness",
            title: "Public status page and transparency layer created",
            description:
              "Reviewers can see platform metrics, roadmap, tech stack, readiness infrastructure, and community direction through the public status page.",
            items: [
              "Public project status",
              "Readiness impact metrics",
              "Roadmap",
              "Tech stack",
              "Community direction",
            ],
          },
        ];

  const nextMilestones =
    language === "id"
      ? [
          "Polish reviewer guide agar alur demo lebih jelas",
          "Tambahkan Filecoin archive export/share placeholder",
          "Perkuat Stellar readiness quest menjadi checklist + proof flow",
          "Rapikan README sesuai fitur terbaru",
          "Siapkan grant-review MVP checklist",
        ]
      : [
          "Polish reviewer guide so the demo flow is clearer",
          "Add Filecoin archive export/share placeholder",
          "Strengthen Stellar readiness quests into checklist + proof flow",
          "Update README with the latest features",
          "Prepare the grant-review MVP checklist",
        ];

  return (
    <main className="min-h-screen bg-slate-950 px-5 py-8 text-white md:px-8 md:py-16">
      <section className="mx-auto max-w-6xl">
        <p className="text-sm font-semibold uppercase tracking-[0.22em] text-emerald-300">
          {t(language, "transparency")}
        </p>

        <div className="mt-4 flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
          <div>
            <h1 className="text-4xl font-bold md:text-6xl">
              {t(language, "publicChangelog")}
            </h1>
            <p className="mt-5 max-w-3xl text-base leading-8 text-slate-300 md:text-lg">
              {language === "id"
                ? "Halaman ini mencatat progres pengembangan Karyra secara publik agar reviewer, komunitas, dan calon kontributor dapat melihat perkembangan proyek."
                : "This page publicly records Karyra development progress so reviewers, communities, and future contributors can track the project."}
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <Link
              href="/status"
              className="rounded-2xl border border-white/10 bg-white/5 px-5 py-3 text-sm font-bold text-white transition hover:border-emerald-400/40"
            >
              {t(language, "projectStatus")}
            </Link>
            <Link
              href="/passport/share"
              className="rounded-2xl bg-emerald-400 px-5 py-3 text-sm font-bold text-slate-950 transition hover:bg-emerald-300"
            >
              Passport Share
            </Link>
            <Link
              href="/impact"
              className="rounded-2xl border border-white/10 bg-white/5 px-5 py-3 text-sm font-bold text-white transition hover:border-emerald-400/40"
            >
              {t(language, "impact")}
            </Link>
          </div>
        </div>

        <section className="mt-8 rounded-[2rem] border border-emerald-400/20 bg-emerald-400/10 p-6 md:p-8">
          <h2 className="text-2xl font-bold">
            {language === "id" ? "Snapshot update terbaru" : "Latest update snapshot"}
          </h2>
          <p className="mt-3 max-w-3xl leading-8 text-slate-300">
            {language === "id"
              ? "Batch terbaru memperkuat Karyra sebagai local Web3 readiness infrastructure: Filecoin untuk Proof Archive, Stellar untuk payment-readiness, dan Passport untuk identitas kesiapan learner."
              : "The latest batch strengthens Karyra as local Web3 readiness infrastructure: Filecoin for Proof Archive, Stellar for payment-readiness, and Passport for learner readiness identity."}
          </p>
        </section>

        <section className="mt-8 grid gap-6 lg:grid-cols-[0.8fr_1.2fr]">
          <div className="rounded-[2rem] border border-white/10 bg-white/5 p-6 md:p-8">
            <h2 className="text-2xl font-bold">{t(language, "nextMilestones")}</h2>

            <div className="mt-5 grid gap-3">
              {nextMilestones.map((milestone, index) => (
                <div key={milestone} className="rounded-2xl bg-slate-950/50 p-4">
                  <p className="text-xs font-bold uppercase tracking-wide text-emerald-300">
                    {language === "id" ? "Berikutnya" : "Next"} {index + 1}
                  </p>
                  <p className="mt-2 text-slate-200">{milestone}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-[2rem] border border-white/10 bg-white/5 p-6 md:p-8">
            <h2 className="text-2xl font-bold">
              {language === "id" ? "Arah produk yang sudah terbentuk" : "Product direction now visible"}
            </h2>
            <div className="mt-5 grid gap-3">
              <Link
                href="/stacks/stellar-readiness"
                className="rounded-2xl border border-sky-400/20 bg-sky-400/10 p-4 transition hover:bg-sky-400/20"
              >
                <p className="font-bold text-sky-300">Stellar Readiness</p>
                <p className="mt-2 text-sm leading-6 text-slate-300">
                  Payment-readiness untuk wallet safety, memo awareness, stablecoin literacy, dan pre-transaction confidence.
                </p>
              </Link>
              <Link
                href="/admin/proofs"
                className="rounded-2xl border border-fuchsia-400/20 bg-fuchsia-400/10 p-4 transition hover:bg-fuchsia-400/20"
              >
                <p className="font-bold text-fuchsia-300">Filecoin Proof Archive</p>
                <p className="mt-2 text-sm leading-6 text-slate-300">
                  Demo archive layer dengan CID placeholder, manifest JSON, checksum, dan proof verification.
                </p>
              </Link>
              <Link
                href="/passport"
                className="rounded-2xl border border-emerald-400/20 bg-emerald-400/10 p-4 transition hover:bg-emerald-400/20"
              >
                <p className="font-bold text-emerald-300">Readiness Passport</p>
                <p className="mt-2 text-sm leading-6 text-slate-300">
                  Learning identity layer untuk score, badge, proof, timeline, dan share summary.
                </p>
              </Link>
            </div>
          </div>
        </section>

        <section className="mt-8">
          <h2 className="text-3xl font-bold">{t(language, "recentUpdates")}</h2>

          <div className="mt-6 grid gap-5">
            {updates.map((update) => (
              <article
                key={`${update.type}-${update.title}`}
                className="rounded-[2rem] border border-white/10 bg-white/5 p-6 md:p-8"
              >
                <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                  <div>
                    <div className="flex flex-wrap gap-2 text-xs font-bold uppercase tracking-wide">
                      <span className="rounded-full bg-emerald-400/15 px-3 py-1 text-emerald-300">
                        {update.type}
                      </span>
                      <span className="rounded-full bg-white/10 px-3 py-1 text-slate-300">
                        {update.date}
                      </span>
                    </div>

                    <h3 className="mt-4 text-2xl font-bold">{update.title}</h3>
                    <p className="mt-3 leading-8 text-slate-300">
                      {update.description}
                    </p>
                  </div>
                </div>

                <div className="mt-5 grid gap-2 md:grid-cols-2">
                  {update.items.map((item) => (
                    <div
                      key={item}
                      className="rounded-2xl bg-slate-950/50 px-4 py-3 text-sm text-slate-300"
                    >
                      <span className="mr-2 text-emerald-300">✓</span>
                      {item}
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
