import Link from "next/link";
import { getServerLanguage } from "@/lib/i18n-server";

const pillars = [
  {
    title: "Proof-of-Learning",
    bodyId: "Bukti bahwa learner telah mempelajari konsep dasar melalui course, lesson, dan aktivitas belajar yang terstruktur.",
    bodyEn: "Proof that a learner has studied foundational concepts through structured courses, lessons, and learning activities.",
    flow: ["Course", "Lesson", "Progress", "Learning Proof"],
  },
  {
    title: "Proof-of-Participation",
    bodyId: "Bukti bahwa learner ikut aktivitas komunitas seperti workshop, onboarding offline, atau kegiatan lokal.",
    bodyEn: "Proof that a learner joined community activities such as workshops, offline onboarding, or local events.",
    flow: ["Workshop", "Community", "Attendance", "Participation Proof"],
  },
  {
    title: "Proof-of-Readiness",
    bodyId: "Bukti bahwa learner lebih siap sebelum masuk ke praktik Web3 seperti wallet, stablecoin, payment, memo, dan keamanan dasar.",
    bodyEn: "Proof that a learner is more prepared before practicing Web3 topics such as wallets, stablecoins, payments, memos, and basic safety.",
    flow: ["Quest", "Checklist", "Review", "Readiness Proof"],
  },
];

export default async function ProofSystemPage() {
  const language = await getServerLanguage();

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <section className="mx-auto flex w-full max-w-7xl flex-col gap-8 px-4 py-6 pb-24 md:px-8 md:py-12">
        <header className="max-w-4xl">
          <p className="text-xs font-black uppercase tracking-[0.22em] text-emerald-300">
            Karyra Proof System
          </p>
          <h1 className="mt-4 text-3xl font-black tracking-tight md:text-6xl">
            {language === "id"
              ? "Tiga bukti untuk kesiapan Web3 lokal."
              : "Three proofs for local Web3 readiness."}
          </h1>
          <p className="mt-4 max-w-3xl text-sm leading-7 text-slate-300 md:text-lg md:leading-8">
            {language === "id"
              ? "Karyra tidak hanya mengajarkan Web3. Karyra membantu komunitas membuktikan proses belajar, partisipasi, dan kesiapan sebelum masuk ke praktik Web3 nyata."
              : "Karyra does not only teach Web3. It helps communities prove learning, participation, and readiness before entering real Web3 practice."}
          </p>
        </header>

        <section className="grid gap-4 lg:grid-cols-3">
          {pillars.map((pillar, index) => (
            <article key={pillar.title} className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-5 md:p-6">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-emerald-400 text-lg font-black text-slate-950">
                {index + 1}
              </div>
              <h2 className="mt-5 text-2xl font-black">{pillar.title}</h2>
              <p className="mt-3 text-sm leading-7 text-slate-400">
                {language === "id" ? pillar.bodyId : pillar.bodyEn}
              </p>
              <div className="mt-5 grid gap-2">
                {pillar.flow.map((step) => (
                  <div key={step} className="flex items-center gap-3 rounded-2xl bg-slate-950/60 p-3 text-sm font-bold text-slate-200">
                    <span className="h-2 w-2 rounded-full bg-emerald-400" />
                    {step}
                  </div>
                ))}
              </div>
            </article>
          ))}
        </section>

        <section className="grid gap-4 lg:grid-cols-2">
          <div className="rounded-[2rem] border border-sky-400/20 bg-sky-400/10 p-5 md:p-6">
            <p className="text-xs font-black uppercase tracking-wide text-sky-300">Stellar layer</p>
            <h2 className="mt-2 text-2xl font-black">Financial Web3 Readiness</h2>
            <p className="mt-3 text-sm leading-7 text-slate-300">
              {language === "id"
                ? "Stellar digunakan sebagai jalur pembelajaran kesiapan finansial: wallet safety, memo awareness, payment literacy, dan confidence sebelum transaksi."
                : "Stellar is used as the financial readiness track: wallet safety, memo awareness, payment literacy, and confidence before transactions."}
            </p>
            <Link href="/stacks/stellar-readiness" className="mt-4 inline-flex text-sm font-black text-sky-200">Open Stellar Readiness →</Link>
          </div>

          <div className="rounded-[2rem] border border-violet-400/20 bg-violet-400/10 p-5 md:p-6">
            <p className="text-xs font-black uppercase tracking-wide text-violet-300">Filecoin layer</p>
            <h2 className="mt-2 text-2xl font-black">Proof Archive Layer</h2>
            <p className="mt-3 text-sm leading-7 text-slate-300">
              {language === "id"
                ? "Filecoin diposisikan sebagai arah arsip bukti: manifest, checksum, CID, dan preservasi evidence untuk proof record."
                : "Filecoin is positioned as the proof archive direction: manifests, checksums, CIDs, and evidence preservation for proof records."}
            </p>
            <Link href="/passport" className="mt-4 inline-flex text-sm font-black text-violet-200">View Passport →</Link>
          </div>
        </section>
      </section>
    </main>
  );
}
