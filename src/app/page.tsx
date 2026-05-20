import Link from "next/link";
import { getServerLanguage } from "@/lib/i18n-server";

const proofPillars = [
  {
    title: "Proof-of-Learning",
    titleId: "Proof-of-Learning",
    description:
      "Structured progress that shows a learner has completed foundational Web3 learning.",
    descriptionId:
      "Progress terstruktur yang menunjukkan learner telah menyelesaikan pembelajaran dasar Web3.",
  },
  {
    title: "Proof-of-Participation",
    titleId: "Proof-of-Participation",
    description:
      "Community activity evidence from workshops, local onboarding, and guided participation.",
    descriptionId:
      "Bukti aktivitas komunitas dari workshop, onboarding lokal, dan partisipasi terpandu.",
  },
  {
    title: "Proof-of-Readiness",
    titleId: "Proof-of-Readiness",
    description:
      "Signals that a beginner is safer and more confident before touching wallets or transactions.",
    descriptionId:
      "Sinyal bahwa pemula lebih aman dan percaya diri sebelum menyentuh wallet atau transaksi.",
  },
];

const productSteps = [
  {
    label: "01",
    title: "Learn",
    titleId: "Belajar",
    text: "Start from simple, local-first Web3 lessons.",
    textId: "Mulai dari materi Web3 yang sederhana dan lokal-first.",
  },
  {
    label: "02",
    title: "Join",
    titleId: "Ikut",
    text: "Participate in quests, workshops, and community onboarding.",
    textId: "Ikut quest, workshop, dan onboarding komunitas.",
  },
  {
    label: "03",
    title: "Prove",
    titleId: "Buktikan",
    text: "Build a readiness passport before entering real Web3 practice.",
    textId: "Bangun readiness passport sebelum masuk ke praktik Web3 nyata.",
  },
];

export default async function HomePage() {
  const language = await getServerLanguage();

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <section className="mx-auto flex w-full max-w-7xl flex-col gap-10 px-4 py-8 pb-24 md:px-8 md:py-14">
        <section className="grid min-h-[68vh] gap-8 lg:grid-cols-[1.02fr_0.98fr] lg:items-center">
          <div>
            <p className="inline-flex rounded-full border border-emerald-400/20 bg-emerald-400/10 px-3 py-1 text-xs font-black uppercase tracking-[0.18em] text-emerald-300">
              Local Web3 Readiness Platform
            </p>

            <h1 className="mt-5 max-w-4xl text-4xl font-black tracking-tight text-white md:text-6xl lg:text-7xl">
              {language === "id"
                ? "Buktikan kesiapan, bukan sekadar belajar Web3."
                : "Prove readiness, not just Web3 learning."}
            </h1>

            <p className="mt-5 max-w-2xl text-base leading-7 text-slate-300 md:text-lg md:leading-8">
              {language === "id"
                ? "Karyra membantu komunitas lokal belajar, berpartisipasi, dan membangun bukti kesiapan sebelum masuk ke wallet, payment, stablecoin, atau transaksi Web3 nyata."
                : "Karyra helps local communities learn, participate, and build readiness proof before entering wallets, payments, stablecoins, or real Web3 transactions."}
            </p>

            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/login"
                className="inline-flex min-h-12 items-center justify-center rounded-2xl bg-emerald-400 px-6 py-3 text-sm font-black text-slate-950 transition hover:bg-emerald-300"
              >
                {language === "id" ? "Masuk ke Karyra" : "Enter Karyra"}
              </Link>
              <Link
                href="/proof-system"
                className="inline-flex min-h-12 items-center justify-center rounded-2xl border border-white/10 bg-white/5 px-6 py-3 text-sm font-bold text-white transition hover:border-emerald-400/40 hover:bg-white/10"
              >
                {language === "id" ? "Lihat Proof System" : "Explore Proof System"}
              </Link>
            </div>

            <p className="mt-4 max-w-xl text-xs leading-5 text-slate-500">
              {language === "id"
                ? "MVP preview. Public site ini menampilkan arah produk akhir; area internal tetap tersedia untuk admin/developer."
                : "MVP preview. This public site shows the final product direction; internal tools remain available for admins/developers."}
            </p>
          </div>

          <div className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-4 shadow-2xl shadow-emerald-950/20 md:p-6">
            <div className="rounded-[1.5rem] border border-emerald-400/20 bg-emerald-400/10 p-4 md:p-5">
              <p className="text-xs font-black uppercase tracking-[0.18em] text-emerald-300">
                Karyra Proof Passport
              </p>
              <h2 className="mt-3 text-2xl font-black text-white md:text-3xl">
                Learn. Participate. Prove readiness.
              </h2>
              <p className="mt-2 text-sm leading-6 text-slate-300">
                {language === "id"
                  ? "Satu alur sederhana untuk membawa pemula dari pemahaman dasar menuju kesiapan praktik Web3."
                  : "A simple journey that takes beginners from basic understanding toward safer Web3 practice."}
              </p>
            </div>

            <div className="mt-4 grid gap-3">
              {proofPillars.map((pillar, index) => (
                <article
                  key={pillar.title}
                  className="rounded-2xl border border-white/10 bg-slate-950/60 p-4"
                >
                  <div className="flex items-start gap-3">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-2xl bg-emerald-400 text-sm font-black text-slate-950">
                      {index + 1}
                    </div>
                    <div>
                      <h3 className="font-bold text-white">
                        {language === "id" ? pillar.titleId : pillar.title}
                      </h3>
                      <p className="mt-1 text-sm leading-6 text-slate-400">
                        {language === "id" ? pillar.descriptionId : pillar.description}
                      </p>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="grid gap-3 md:grid-cols-3">
          {productSteps.map((step) => (
            <article
              key={step.label}
              className="rounded-3xl border border-white/10 bg-white/[0.04] p-5"
            >
              <p className="text-xs font-black uppercase tracking-wide text-emerald-300">
                {step.label}
              </p>
              <h2 className="mt-2 text-xl font-black text-white">
                {language === "id" ? step.titleId : step.title}
              </h2>
              <p className="mt-2 text-sm leading-6 text-slate-400">
                {language === "id" ? step.textId : step.text}
              </p>
            </article>
          ))}
        </section>

        <section className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-5 md:p-7">
          <div className="grid gap-5 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.18em] text-sky-300">
                Built for local onboarding
              </p>
              <h2 className="mt-2 text-2xl font-black md:text-4xl">
                {language === "id"
                  ? "Non-teknikal dulu, teknikal belakangan."
                  : "Non-technical first, technical later."}
              </h2>
            </div>
            <p className="text-sm leading-7 text-slate-300 md:text-base md:leading-8">
              {language === "id"
                ? "Karyra tidak mendorong pemula langsung bertransaksi. Platform ini membangun literasi, kebiasaan aman, dan bukti kesiapan sebelum pengguna menyentuh praktik Web3 yang lebih berisiko."
                : "Karyra does not push beginners straight into transactions. It builds literacy, safe habits, and readiness evidence before users touch riskier Web3 practice."}
            </p>
          </div>
        </section>
      </section>
    </main>
  );
}
