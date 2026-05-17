import Link from "next/link";
import { getServerLanguage } from "../../lib/i18n-server";
import { t } from "../../lib/i18n";

export default async function ReviewerGuidePage() {
  const language = await getServerLanguage();

  const demoFlow =
    language === "id"
      ? [
          {
            step: "01",
            title: "Mulai dari homepage",
            description:
              "Lihat positioning Karyra sebagai platform edukasi Web3 mobile-first untuk komunitas lokal.",
            href: "/",
            cta: "Buka Homepage",
          },
          {
            step: "02",
            title: "Cek course dan lesson",
            description:
              "Buka course, lihat module, lesson, quiz, dan tombol enroll/start lesson.",
            href: "/courses",
            cta: "Lihat Courses",
          },
          {
            step: "03",
            title: "Uji dashboard learner",
            description:
              "Dashboard menampilkan XP, level, progress, badge, active quest, dan workshop registration.",
            href: "/dashboard",
            cta: "Buka Dashboard",
          },
          {
            step: "04",
            title: "Submit quest",
            description:
              "Learner dapat mengirim submission quest sebagai bukti aktivitas belajar.",
            href: "/quests",
            cta: "Lihat Quest",
          },
          {
            step: "05",
            title: "Review submission di Admin Console",
            description:
              "Admin dapat approve/reject submission dan membagikan XP melalui RewardLedger.",
            href: "/admin/submissions",
            cta: "Review Submission",
          },
          {
            step: "06",
            title: "Cek workshop onboarding",
            description:
              "Workshop menunjukkan narasi online learning + offline community onboarding.",
            href: "/workshops",
            cta: "Lihat Workshop",
          },
        ]
      : [
          {
            step: "01",
            title: "Start from the homepage",
            description:
              "See Karyra's positioning as a mobile-first Web3 education platform for local communities.",
            href: "/",
            cta: "Open Homepage",
          },
          {
            step: "02",
            title: "Check courses and lessons",
            description:
              "Open a course and review modules, lessons, quiz, and enroll/start lesson actions.",
            href: "/courses",
            cta: "View Courses",
          },
          {
            step: "03",
            title: "Test learner dashboard",
            description:
              "The dashboard shows XP, level, progress, badges, active quest, and workshop registration.",
            href: "/dashboard",
            cta: "Open Dashboard",
          },
          {
            step: "04",
            title: "Submit a quest",
            description:
              "Learners can submit quest evidence as proof of learning activity.",
            href: "/quests",
            cta: "View Quests",
          },
          {
            step: "05",
            title: "Review submission in Admin Console",
            description:
              "Admins can approve/reject submissions and grant XP through RewardLedger.",
            href: "/admin/submissions",
            cta: "Review Submission",
          },
          {
            step: "06",
            title: "Check workshop onboarding",
            description:
              "Workshops demonstrate the online learning + offline community onboarding narrative.",
            href: "/workshops",
            cta: "View Workshops",
          },
        ];

  const proofPages =
    language === "id"
      ? [
          {
            title: "Project Status",
            description:
              "Metrik platform, roadmap, stack teknologi, dan arah komunitas.",
            href: "/status",
          },
          {
            title: "Impact Report",
            description:
              "Dampak belajar, quest, reward, workshop, dan sinyal kesiapan grant.",
            href: "/impact",
          },
          {
            title: "Public Changelog",
            description:
              "Riwayat progres pengembangan dan milestone yang sudah dicapai.",
            href: "/changelog",
          },
          {
            title: "Karyra Admin Console",
            description:
              "Panel super admin untuk course, submission, workshop, dan proof layer.",
            href: "/admin",
          },
        ]
      : [
          {
            title: "Project Status",
            description:
              "Platform metrics, roadmap, tech stack, and community direction.",
            href: "/status",
          },
          {
            title: "Impact Report",
            description:
              "Learning, quest, reward, workshop impact, and grant readiness signals.",
            href: "/impact",
          },
          {
            title: "Public Changelog",
            description:
              "Development progress history and completed milestones.",
            href: "/changelog",
          },
          {
            title: "Karyra Admin Console",
            description:
              "Super admin panel for courses, submissions, workshops, and proof layer.",
            href: "/admin",
          },
        ];

  return (
    <main className="min-h-screen bg-slate-950 px-5 py-8 text-white md:px-8 md:py-16">
      <section className="mx-auto max-w-7xl">
        <div className="grid gap-6 md:grid-cols-[1.1fr_0.9fr]">
          <div className="rounded-[2rem] border border-white/10 bg-white/5 p-6 md:p-8">
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-emerald-300">
              Grant Review
            </p>

            <h1 className="mt-4 text-3xl font-bold md:text-5xl">
              {t(language, "reviewerGuide")}
            </h1>

            <p className="mt-5 max-w-3xl text-base leading-8 text-slate-300 md:text-lg">
              {language === "id"
                ? "Panduan singkat untuk reviewer grant agar dapat mengevaluasi Karyra sebagai MVP edukasi Web3, quest, reward, dan onboarding komunitas lokal."
                : "A short guide for grant reviewers to evaluate Karyra as a Web3 education, quest, reward, and local community onboarding MVP."}
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/impact"
                className="rounded-2xl bg-emerald-400 px-6 py-4 text-center font-bold text-slate-950"
              >
                {t(language, "impact")}
              </Link>

              <Link
                href="/status"
                className="rounded-2xl border border-white/15 px-6 py-4 text-center font-bold text-white"
              >
                {t(language, "projectStatus")}
              </Link>

              <Link
                href="/admin"
                className="rounded-2xl border border-white/15 px-6 py-4 text-center font-bold text-white"
              >
                Admin Console
              </Link>
            </div>
          </div>

          <div className="rounded-[2rem] border border-emerald-400/20 bg-emerald-400/10 p-6 md:p-8">
            <h2 className="text-2xl font-bold">{t(language, "demoAccess")}</h2>

            <div className="mt-5 grid gap-4">
              <div className="rounded-2xl bg-slate-950/50 p-4">
                <p className="text-sm text-slate-400">Learner Demo</p>
                <p className="mt-1 text-xl font-bold">username: demo</p>
              </div>

              <div className="rounded-2xl bg-slate-950/50 p-4">
                <p className="text-sm text-slate-400">Admin Demo</p>
                <p className="mt-1 text-xl font-bold">username: admin</p>
              </div>

              <div className="rounded-2xl bg-slate-950/50 p-4">
                <p className="text-sm text-slate-400">
                  {language === "id" ? "Catatan MVP" : "MVP Note"}
                </p>
                <p className="mt-1 leading-7 text-slate-300">
                  {language === "id"
                    ? "Auth penuh belum diaktifkan. Demo ini fokus pada validasi alur produk, data, admin, reward, dan onboarding."
                    : "Full authentication is not enabled yet. This demo focuses on validating product flow, data, admin, rewards, and onboarding."}
                </p>
              </div>
            </div>
          </div>
        </div>

        <section className="mt-10 rounded-[2rem] border border-white/10 bg-white/5 p-6 md:p-8">
          <h2 className="text-2xl font-bold md:text-3xl">
            {t(language, "demoFlow")}
          </h2>

          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {demoFlow.map((item) => (
              <Link
                key={item.step}
                href={item.href}
                className="rounded-3xl bg-slate-900 p-5 transition hover:bg-slate-800"
              >
                <p className="text-sm font-bold text-emerald-300">
                  {item.step}
                </p>

                <h3 className="mt-3 text-xl font-bold">{item.title}</h3>

                <p className="mt-2 min-h-16 leading-7 text-slate-300">
                  {item.description}
                </p>

                <p className="mt-4 text-sm font-bold text-emerald-300">
                  {item.cta} →
                </p>
              </Link>
            ))}
          </div>
        </section>

        <section className="mt-10 rounded-[2rem] border border-white/10 bg-white/5 p-6 md:p-8">
          <h2 className="text-2xl font-bold md:text-3xl">
            {t(language, "proofPages")}
          </h2>

          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {proofPages.map((page) => (
              <Link
                key={page.href}
                href={page.href}
                className="rounded-3xl bg-slate-900 p-5 transition hover:bg-slate-800"
              >
                <h3 className="text-xl font-bold">{page.title}</h3>
                <p className="mt-2 leading-7 text-slate-300">
                  {page.description}
                </p>
              </Link>
            ))}
          </div>
        </section>
      </section>
    </main>
  );
}