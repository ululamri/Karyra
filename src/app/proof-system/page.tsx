import Link from "next/link";
import { getServerLanguage } from "@/lib/i18n-server";

const pillars = [
  {
    title: "Proof-of-Learning",
    introId:
      "Bukti bahwa learner telah memahami materi dasar sebelum masuk ke praktik Web3.",
    introEn:
      "Proof that a learner understands foundational material before entering Web3 practice.",
    pointsId: [
      "Course dan lesson terstruktur",
      "Progress belajar yang tercatat",
      "Reward XP dan badge pembelajaran",
    ],
    pointsEn: [
      "Structured courses and lessons",
      "Recorded learning progress",
      "Learning XP and badges",
    ],
  },
  {
    title: "Proof-of-Participation",
    introId:
      "Bukti bahwa learner ikut aktivitas komunitas, workshop, dan onboarding lokal.",
    introEn:
      "Proof that a learner joined community activities, workshops, and local onboarding.",
    pointsId: [
      "Registrasi dan kehadiran workshop",
      "Aktivitas komunitas offline",
      "Bukti partisipasi yang bisa diverifikasi",
    ],
    pointsEn: [
      "Workshop registration and attendance",
      "Offline community activities",
      "Reviewable participation evidence",
    ],
  },
  {
    title: "Proof-of-Readiness",
    introId:
      "Bukti bahwa learner lebih siap dan lebih aman sebelum menyentuh transaksi nyata.",
    introEn:
      "Proof that a learner is safer and more prepared before touching real transactions.",
    pointsId: [
      "Quest dan checklist kesiapan",
      "Review admin sebelum proof diterbitkan",
      "Readiness Passport sebagai ringkasan akhir",
    ],
    pointsEn: [
      "Readiness quests and checklists",
      "Admin review before proof issuance",
      "Readiness Passport as the final summary",
    ],
  },
];

const layers = [
  {
    title: "Stellar Readiness Track",
    label: "Financial readiness",
    href: "/stacks/stellar-readiness",
    textId:
      "Jalur latihan wallet safety, memo awareness, stablecoin/payment literacy, dan pre-transaction confidence.",
    textEn:
      "A track for wallet safety, memo awareness, stablecoin/payment literacy, and pre-transaction confidence.",
  },
  {
    title: "Filecoin Proof Archive",
    label: "Evidence preservation",
    href: "/passport",
    textId:
      "Arah pengarsipan proof record melalui manifest, checksum, CID, dan preservation layer.",
    textEn:
      "A proof record archive direction through manifests, checksums, CIDs, and a preservation layer.",
  },
];

export default async function ProofSystemPage() {
  const language = await getServerLanguage();

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <section className="mx-auto flex w-full max-w-7xl flex-col gap-8 px-4 py-8 pb-24 md:px-8 md:py-14">
        <header className="max-w-4xl">
          <p className="text-xs font-black uppercase tracking-[0.22em] text-emerald-300">
            Karyra Proof System
          </p>
          <h1 className="mt-4 text-3xl font-black tracking-tight md:text-6xl">
            {language === "id"
              ? "Sistem bukti untuk kesiapan Web3 lokal."
              : "A proof system for local Web3 readiness."}
          </h1>
          <p className="mt-4 max-w-3xl text-sm leading-7 text-slate-300 md:text-lg md:leading-8">
            {language === "id"
              ? "Karyra mengubah proses belajar dan partisipasi menjadi bukti kesiapan yang bisa dibaca, direview, dan dikembangkan menjadi identity layer komunitas."
              : "Karyra turns learning and participation into readiness evidence that can be read, reviewed, and developed into a community identity layer."}
          </p>
        </header>

        <section className="grid gap-4 lg:grid-cols-3">
          {pillars.map((pillar, index) => (
            <article
              key={pillar.title}
              className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-5 md:p-6"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-emerald-400 text-lg font-black text-slate-950">
                {index + 1}
              </div>
              <h2 className="mt-5 text-2xl font-black">{pillar.title}</h2>
              <p className="mt-3 text-sm leading-7 text-slate-400">
                {language === "id" ? pillar.introId : pillar.introEn}
              </p>
              <div className="mt-5 grid gap-2">
                {(language === "id" ? pillar.pointsId : pillar.pointsEn).map((point) => (
                  <div
                    key={point}
                    className="flex items-start gap-3 rounded-2xl bg-slate-950/60 p-3 text-sm font-bold leading-6 text-slate-200"
                  >
                    <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-emerald-400" />
                    {point}
                  </div>
                ))}
              </div>
            </article>
          ))}
        </section>

        <section className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-5 md:p-7">
          <div className="grid gap-6 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.18em] text-sky-300">
                Product flow
              </p>
              <h2 className="mt-2 text-2xl font-black md:text-4xl">
                {language === "id"
                  ? "Dari belajar menjadi bukti kesiapan."
                  : "From learning to readiness proof."}
              </h2>
            </div>
            <div className="grid gap-3 md:grid-cols-4">
              {["Learn", "Participate", "Review", "Passport"].map((step, index) => (
                <div key={step} className="rounded-2xl bg-slate-950/60 p-4">
                  <p className="text-xs font-black text-emerald-300">0{index + 1}</p>
                  <p className="mt-2 text-sm font-black text-white">{step}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="grid gap-4 lg:grid-cols-2">
          {layers.map((layer) => (
            <Link
              key={layer.title}
              href={layer.href}
              className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-5 transition hover:border-emerald-400/40 md:p-6"
            >
              <p className="text-xs font-black uppercase tracking-wide text-emerald-300">
                {layer.label}
              </p>
              <h2 className="mt-2 text-2xl font-black">{layer.title}</h2>
              <p className="mt-3 text-sm leading-7 text-slate-400">
                {language === "id" ? layer.textId : layer.textEn}
              </p>
              <p className="mt-4 text-sm font-black text-emerald-300">Open →</p>
            </Link>
          ))}
        </section>
      </section>
    </main>
  );
}
