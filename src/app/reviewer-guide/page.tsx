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
              "Lihat positioning Karyra sebagai platform kesiapan Web3 lokal, bukan sekadar landing page atau course catalog biasa.",
            href: "/",
            cta: "Buka Homepage",
          },
          {
            step: "02",
            title: "Cek status proyek",
            description:
              "Buka halaman status untuk melihat metrik platform, readiness infrastructure, roadmap, dan arah Filecoin + Stellar.",
            href: "/status",
            cta: "Lihat Status",
          },
          {
            step: "03",
            title: "Uji course dan lesson",
            description:
              "Buka course, lihat module, lesson, quiz, dan tombol enroll/start lesson untuk menguji learning loop.",
            href: "/courses",
            cta: "Lihat Courses",
          },
          {
            step: "04",
            title: "Uji Stellar Readiness Track",
            description:
              "Lihat jalur kesiapan pembayaran Web3: wallet safety, memo awareness, stablecoin literacy, scam prevention, dan checklist.",
            href: "/stacks/stellar-readiness",
            cta: "Buka Stellar Track",
          },
          {
            step: "05",
            title: "Coba checklist Stellar",
            description:
              "Gunakan checklist interaktif untuk melihat bagaimana Karyra membangun pre-transaction confidence sebelum transaksi nyata.",
            href: "/stacks/stellar-readiness/checklist",
            cta: "Buka Checklist",
          },
          {
            step: "06",
            title: "Submit quest Stellar",
            description:
              "Submit quest dengan character counter dan validasi client-side agar reviewer bisa menguji alur evidence submission.",
            href: "/quests?track=stellar-readiness",
            cta: "Submit Quest",
          },
          {
            step: "07",
            title: "Review submission di Admin Console",
            description:
              "Admin dapat approve/reject submission, membagikan XP, membuat reward ledger, dan memicu readiness sync.",
            href: "/admin/submissions",
            cta: "Review Submission",
          },
          {
            step: "08",
            title: "Cek Readiness Passport",
            description:
              "Passport menampilkan score, readiness level, badge, proof records, Filecoin status, dan link proof verification.",
            href: "/passport",
            cta: "Buka Passport",
          },
          {
            step: "09",
            title: "Cek Proof Archive dan manifest",
            description:
              "Admin dapat mengarsipkan proof ke demo Filecoin layer dengan manifest JSON, checksum, dan demo CID.",
            href: "/admin/proofs",
            cta: "Buka Proof Archive",
          },
          {
            step: "10",
            title: "Cek share summary dan timeline",
            description:
              "Lihat ringkasan shareable passport dan readiness timeline untuk memahami learning identity journey learner.",
            href: "/passport/share",
            cta: "Buka Share Summary",
          },
        ]
      : [
          {
            step: "01",
            title: "Start from the homepage",
            description:
              "Review Karyra's positioning as a local Web3 readiness platform, not just a landing page or course catalog.",
            href: "/",
            cta: "Open Homepage",
          },
          {
            step: "02",
            title: "Check project status",
            description:
              "Open the status page to review platform metrics, readiness infrastructure, roadmap, and the Filecoin + Stellar direction.",
            href: "/status",
            cta: "View Status",
          },
          {
            step: "03",
            title: "Test courses and lessons",
            description:
              "Open a course, review modules, lessons, quizzes, and enroll/start lesson actions to test the learning loop.",
            href: "/courses",
            cta: "View Courses",
          },
          {
            step: "04",
            title: "Test Stellar Readiness Track",
            description:
              "Review the Web3 payment-readiness path: wallet safety, memo awareness, stablecoin literacy, scam prevention, and checklist.",
            href: "/stacks/stellar-readiness",
            cta: "Open Stellar Track",
          },
          {
            step: "05",
            title: "Try the Stellar checklist",
            description:
              "Use the interactive checklist to see how Karyra builds pre-transaction confidence before real transactions.",
            href: "/stacks/stellar-readiness/checklist",
            cta: "Open Checklist",
          },
          {
            step: "06",
            title: "Submit a Stellar quest",
            description:
              "Submit a quest with character counter and client-side validation to test the evidence submission flow.",
            href: "/quests?track=stellar-readiness",
            cta: "Submit Quest",
          },
          {
            step: "07",
            title: "Review submission in Admin Console",
            description:
              "Admins can approve/reject submissions, grant XP, create reward ledger records, and trigger readiness sync.",
            href: "/admin/submissions",
            cta: "Review Submission",
          },
          {
            step: "08",
            title: "Check Readiness Passport",
            description:
              "Passport shows score, readiness level, badges, proof records, Filecoin status, and proof verification links.",
            href: "/passport",
            cta: "Open Passport",
          },
          {
            step: "09",
            title: "Check Proof Archive and manifest",
            description:
              "Admins can archive proof records to the demo Filecoin layer with manifest JSON, checksum, and demo CID.",
            href: "/admin/proofs",
            cta: "Open Proof Archive",
          },
          {
            step: "10",
            title: "Check share summary and timeline",
            description:
              "Review the shareable passport summary and readiness timeline to understand the learner identity journey.",
            href: "/passport/share",
            cta: "Open Share Summary",
          },
        ];

  const proofPages =
    language === "id"
      ? [
          {
            title: "Project Status",
            description:
              "Metrik platform, readiness infrastructure, roadmap, stack teknologi, dan arah komunitas.",
            href: "/status",
          },
          {
            title: "Impact Report",
            description:
              "Dampak belajar, quest, reward, workshop, readiness, Filecoin archive, dan Stellar track.",
            href: "/impact",
          },
          {
            title: "Readiness Passport",
            description:
              "Ringkasan learner: score, level, badge, proof records, dan status arsip Filecoin.",
            href: "/passport",
          },
          {
            title: "Passport Share Summary",
            description:
              "Halaman ringkasan yang bisa dijadikan placeholder untuk share/export readiness learner.",
            href: "/passport/share",
          },
          {
            title: "Readiness Timeline",
            description:
              "Riwayat badge, quest, reward, proof, workshop, dan arsip Filecoin sebagai learning identity journey.",
            href: "/passport/timeline",
          },
          {
            title: "Filecoin Proof Archive",
            description:
              "Admin proof archive dengan manifest JSON, checksum SHA-256, dan demo CID.",
            href: "/admin/proofs",
          },
          {
            title: "Stellar Readiness Track",
            description:
              "Jalur kesiapan pembayaran Web3 untuk wallet safety, memo awareness, stablecoin literacy, dan checklist.",
            href: "/stacks/stellar-readiness",
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
              "Panel super admin untuk course, submission, workshop, learner readiness, dan proof archive.",
            href: "/admin",
          },
        ]
      : [
          {
            title: "Project Status",
            description:
              "Platform metrics, readiness infrastructure, roadmap, tech stack, and community direction.",
            href: "/status",
          },
          {
            title: "Impact Report",
            description:
              "Learning, quests, rewards, workshops, readiness, Filecoin archive, and Stellar track impact.",
            href: "/impact",
          },
          {
            title: "Readiness Passport",
            description:
              "Learner summary: score, level, badges, proof records, and Filecoin archive status.",
            href: "/passport",
          },
          {
            title: "Passport Share Summary",
            description:
              "A summary page that works as a placeholder for learner readiness share/export.",
            href: "/passport/share",
          },
          {
            title: "Readiness Timeline",
            description:
              "Badge, quest, reward, proof, workshop, and Filecoin archive history as a learning identity journey.",
            href: "/passport/timeline",
          },
          {
            title: "Filecoin Proof Archive",
            description:
              "Admin proof archive with manifest JSON, SHA-256 checksum, and demo CID.",
            href: "/admin/proofs",
          },
          {
            title: "Stellar Readiness Track",
            description:
              "Web3 payment-readiness path for wallet safety, memo awareness, stablecoin literacy, and checklist.",
            href: "/stacks/stellar-readiness",
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
              "Super admin panel for courses, submissions, workshops, learner readiness, and proof archive.",
            href: "/admin",
          },
        ];

  const reviewSignals =
    language === "id"
      ? [
          "MVP aktif dengan database PostgreSQL, Prisma, App Router, dan seed data.",
          "Learning loop tersedia: course, lesson, quiz, progress, XP, dan dashboard.",
          "Quest loop tersedia: submit evidence, client validation, admin review, reward ledger, dan readiness sync.",
          "Proof layer tersedia: Readiness Passport, Proof Records, public proof page, dan timeline.",
          "Filecoin direction terlihat melalui proof archive manifest, checksum, dan demo CID.",
          "Stellar direction terlihat melalui stack, course, quest, badge, checklist, dan payment-readiness narrative.",
          "Public transparency tersedia melalui status, impact, changelog, reviewer guide, dan share summary.",
        ]
      : [
          "Active MVP with PostgreSQL, Prisma, App Router, and seed data.",
          "Learning loop is available: courses, lessons, quizzes, progress, XP, and dashboard.",
          "Quest loop is available: evidence submission, client validation, admin review, reward ledger, and readiness sync.",
          "Proof layer is available: Readiness Passport, Proof Records, public proof page, and timeline.",
          "Filecoin direction is visible through proof archive manifest, checksum, and demo CID.",
          "Stellar direction is visible through stack, course, quest, badge, checklist, and payment-readiness narrative.",
          "Public transparency is available through status, impact, changelog, reviewer guide, and share summary.",
        ];

  return (
    <main className="min-h-screen bg-slate-950 px-5 py-8 text-white md:px-8 md:py-16">
      <section className="mx-auto max-w-7xl">
        <p className="text-sm font-semibold uppercase tracking-[0.22em] text-emerald-300">
          Grant Review
        </p>
        <h1 className="mt-4 max-w-4xl text-4xl font-bold tracking-tight md:text-6xl">
          {t(language, "reviewerGuide")}
        </h1>
        <p className="mt-5 max-w-3xl text-base leading-8 text-slate-300 md:text-lg">
          {language === "id"
            ? "Panduan singkat untuk reviewer grant agar dapat mengevaluasi Karyra sebagai MVP aktif: edukasi Web3, quest, reward, readiness passport, Filecoin proof archive, Stellar readiness, dan onboarding komunitas lokal."
            : "A short guide for grant reviewers to evaluate Karyra as an active MVP: Web3 education, quests, rewards, readiness passport, Filecoin proof archive, Stellar readiness, and local community onboarding."}
        </p>

        <div className="mt-7 flex flex-wrap gap-3">
          <Link
            href="/impact"
            className="rounded-2xl bg-emerald-400 px-5 py-3 text-sm font-bold text-slate-950 transition hover:bg-emerald-300"
          >
            {t(language, "impact")}
          </Link>
          <Link
            href="/status"
            className="rounded-2xl border border-white/10 bg-white/5 px-5 py-3 text-sm font-bold text-white transition hover:border-emerald-400/40"
          >
            {t(language, "projectStatus")}
          </Link>
          <Link
            href="/admin"
            className="rounded-2xl border border-white/10 bg-white/5 px-5 py-3 text-sm font-bold text-white transition hover:border-emerald-400/40"
          >
            Admin Console
          </Link>
        </div>

        <section className="mt-10 grid gap-5 md:grid-cols-3">
          <div className="rounded-[2rem] border border-white/10 bg-white/5 p-6">
            <p className="text-sm text-slate-400">Learner Demo</p>
            <p className="mt-2 font-mono text-xl font-bold text-emerald-300">
              username: demo
            </p>
          </div>
          <div className="rounded-[2rem] border border-white/10 bg-white/5 p-6">
            <p className="text-sm text-slate-400">Admin Demo</p>
            <p className="mt-2 font-mono text-xl font-bold text-emerald-300">
              username: admin
            </p>
          </div>
          <div className="rounded-[2rem] border border-amber-400/20 bg-amber-400/10 p-6">
            <p className="text-sm text-amber-200">
              {language === "id" ? "Catatan MVP" : "MVP Note"}
            </p>
            <p className="mt-2 leading-7 text-slate-300">
              {language === "id"
                ? "Auth penuh belum diaktifkan. Demo ini fokus pada validasi alur produk, data, admin, reward, proof, dan onboarding."
                : "Full authentication is not enabled yet. This demo focuses on validating product flow, data, admin, rewards, proof, and onboarding."}
            </p>
          </div>
        </section>

        <section className="mt-10 rounded-[2rem] border border-white/10 bg-white/5 p-6 md:p-8">
          <p className="text-sm font-semibold uppercase tracking-[0.22em] text-emerald-300">
            Review Signals
          </p>
          <h2 className="mt-4 text-3xl font-bold">
            {language === "id"
              ? "Apa yang harus terlihat oleh reviewer?"
              : "What should reviewers notice?"}
          </h2>
          <div className="mt-6 grid gap-3 md:grid-cols-2">
            {reviewSignals.map((signal) => (
              <div key={signal} className="rounded-3xl bg-slate-950/50 p-5">
                <p className="leading-7 text-slate-300">✓ {signal}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-10">
          <h2 className="text-3xl font-bold">{t(language, "demoFlow")}</h2>
          <div className="mt-6 grid gap-5 md:grid-cols-2">
            {demoFlow.map((item) => (
              <Link
                key={item.step}
                href={item.href}
                className="rounded-[2rem] border border-white/10 bg-white/5 p-6 transition hover:border-emerald-400/40 hover:bg-white/10"
              >
                <p className="text-sm font-bold text-emerald-300">
                  {item.step}
                </p>
                <h3 className="mt-3 text-2xl font-bold">{item.title}</h3>
                <p className="mt-3 leading-7 text-slate-300">
                  {item.description}
                </p>
                <p className="mt-5 text-sm font-bold text-emerald-300">
                  {item.cta} →
                </p>
              </Link>
            ))}
          </div>
        </section>

        <section className="mt-10">
          <h2 className="text-3xl font-bold">{t(language, "proofPages")}</h2>
          <div className="mt-6 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {proofPages.map((page) => (
              <Link
                key={page.href}
                href={page.href}
                className="rounded-[2rem] border border-white/10 bg-white/5 p-6 transition hover:border-emerald-400/40 hover:bg-white/10"
              >
                <h3 className="text-xl font-bold">{page.title}</h3>
                <p className="mt-3 leading-7 text-slate-300">
                  {page.description}
                </p>
                <p className="mt-5 text-sm font-bold text-emerald-300">
                  Open →
                </p>
              </Link>
            ))}
          </div>
        </section>
      </section>
    </main>
  );
}
