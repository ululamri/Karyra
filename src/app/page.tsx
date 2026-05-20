import Link from "next/link";
import { getServerLanguage } from "@/lib/i18n-server";

const pillars = [
  {
    title: "Proof-of-Learning",
    titleId: "Proof-of-Learning",
    text: "Learning progress that shows a learner has completed foundational Web3 education.",
    textId: "Bukti bahwa learner telah menyelesaikan pembelajaran dasar Web3.",
  },
  {
    title: "Proof-of-Participation",
    titleId: "Proof-of-Participation",
    text: "Community activity, workshops, and local onboarding captured as participation evidence.",
    textId: "Bukti partisipasi dalam workshop, komunitas, dan onboarding lokal.",
  },
  {
    title: "Proof-of-Readiness",
    titleId: "Proof-of-Readiness",
    text: "Readiness signals before a beginner touches wallets, payments, stablecoins, or real transactions.",
    textId: "Bukti kesiapan sebelum pemula menyentuh wallet, payment, stablecoin, atau transaksi nyata.",
  },
];

export default async function HomePage() {
  const language = await getServerLanguage();

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <section className="mx-auto flex w-full max-w-7xl flex-col gap-8 px-4 py-6 pb-24 md:px-8 md:py-12">
        <section className="grid min-h-[72vh] gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <div>
            <p className="inline-flex rounded-full border border-emerald-400/20 bg-emerald-400/10 px-3 py-1 text-xs font-bold uppercase tracking-[0.18em] text-emerald-300">
              Local Web3 Readiness Platform
            </p>

            <h1 className="mt-5 max-w-4xl text-4xl font-black tracking-tight text-white md:text-6xl lg:text-7xl">
              {language === "id"
                ? "Buktikan kesiapan sebelum masuk Web3."
                : "Prove readiness before entering Web3."}
            </h1>

            <p className="mt-5 max-w-2xl text-base leading-7 text-slate-300 md:text-lg md:leading-8">
              {language === "id"
                ? "Karyra membantu komunitas lokal belajar, berpartisipasi, dan membangun bukti kesiapan sebelum menggunakan wallet, payment, stablecoin, atau transaksi Web3 nyata."
                : "Karyra helps local communities learn, participate, and build readiness proof before using wallets, payments, stablecoins, or real Web3 transactions."}
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
                className="inline-flex min-h-12 items-center justify-center rounded-2xl border border-white/10 bg-white/5 px-6 py-3 text-sm font-bold text-white transition hover:border-emerald-400/40"
              >
                {language === "id" ? "Lihat Proof System" : "Explore Proof System"}
              </Link>
            </div>

            <p className="mt-4 max-w-xl text-xs leading-5 text-slate-500">
              {language === "id"
                ? "MVP preview. Versi produksi akan memiliki akun, role, permission, dan onboarding yang lebih sederhana."
                : "MVP preview. Production will include accounts, roles, permissions, and simpler onboarding."}
            </p>
          </div>

          <div className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-4 shadow-2xl shadow-emerald-950/20 md:p-6">
            <div className="rounded-[1.5rem] border border-emerald-400/20 bg-emerald-400/10 p-4">
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-emerald-300">
                Karyra Proof Passport
              </p>
              <h2 className="mt-3 text-2xl font-black text-white md:text-3xl">
                Learn. Participate. Prove readiness.
              </h2>
              <div className="mt-5 grid gap-3">
                {pillars.map((pillar, index) => (
                  <div key={pillar.title} className="rounded-2xl border border-white/10 bg-slate-950/60 p-4">
                    <div className="flex items-start gap-3">
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-2xl bg-emerald-400 text-sm font-black text-slate-950">
                        {index + 1}
                      </div>
                      <div>
                        <h3 className="font-bold text-white">
                          {language === "id" ? pillar.titleId : pillar.title}
                        </h3>
                        <p className="mt-1 text-sm leading-6 text-slate-400">
                          {language === "id" ? pillar.textId : pillar.text}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
              <Link href="/learner" className="rounded-2xl border border-white/10 bg-white/5 p-4 font-bold text-white transition hover:border-emerald-400/40">
                {language === "id" ? "Mulai belajar" : "Start learning"}
              </Link>
              <Link href="/passport" className="rounded-2xl border border-white/10 bg-white/5 p-4 font-bold text-white transition hover:border-emerald-400/40">
                Passport
              </Link>
            </div>
          </div>
        </section>

        <section className="grid gap-3 md:grid-cols-3">
          <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-5">
            <p className="text-xs font-bold uppercase tracking-wide text-emerald-300">For beginners</p>
            <h2 className="mt-2 text-xl font-bold">{language === "id" ? "Non-teknikal dulu." : "Non-technical first."}</h2>
            <p className="mt-2 text-sm leading-6 text-slate-400">
              {language === "id" ? "Karyra menjelaskan Web3 dari sisi keamanan, kebiasaan, dan kesiapan, bukan langsung transaksi." : "Karyra explains Web3 through safety, habits, and readiness before transactions."}
            </p>
          </div>
          <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-5">
            <p className="text-xs font-bold uppercase tracking-wide text-sky-300">For communities</p>
            <h2 className="mt-2 text-xl font-bold">{language === "id" ? "Belajar bersama." : "Learn together."}</h2>
            <p className="mt-2 text-sm leading-6 text-slate-400">
              {language === "id" ? "Workshop dan aktivitas lokal menjadi bagian dari bukti partisipasi, bukan hanya attendance biasa." : "Workshops and local activities become participation proof, not just attendance."}
            </p>
          </div>
          <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-5">
            <p className="text-xs font-bold uppercase tracking-wide text-amber-300">For readiness</p>
            <h2 className="mt-2 text-xl font-bold">{language === "id" ? "Bukti sebelum praktik." : "Proof before practice."}</h2>
            <p className="mt-2 text-sm leading-6 text-slate-400">
              {language === "id" ? "Readiness Passport merangkum progress, proof, badge, dan kesiapan learner." : "Readiness Passport summarizes progress, proofs, badges, and learner readiness."}
            </p>
          </div>
        </section>
      </section>
    </main>
  );
}
