import Link from "next/link";
import { getServerLanguage } from "@/lib/i18n-server";

const layers = [
  {
    titleId: "Learning Layer",
    titleEn: "Learning Layer",
    descriptionId:
      "Course, module, lesson, quiz, progress, XP, dan dashboard learner. Lapisan ini membantu pemula memahami Web3 dari nol.",
    descriptionEn:
      "Courses, modules, lessons, quizzes, progress, XP, and learner dashboard. This layer helps beginners understand Web3 from zero.",
    routes: ["/courses", "/lessons/[slug]", "/dashboard"],
    status: "Active",
  },
  {
    titleId: "Quest & Review Layer",
    titleEn: "Quest & Review Layer",
    descriptionId:
      "Learner submit bukti pemahaman, admin review submission, lalu reward XP dicatat melalui RewardLedger.",
    descriptionEn:
      "Learners submit evidence of understanding, admins review submissions, and XP rewards are recorded through RewardLedger.",
    routes: ["/quests", "/admin/submissions"],
    status: "Active",
  },
  {
    titleId: "Readiness Identity Layer",
    titleEn: "Readiness Identity Layer",
    descriptionId:
      "ReadinessProfile, ProofRecord, badge, score, level, dan timeline membentuk identitas kesiapan learner.",
    descriptionEn:
      "ReadinessProfile, ProofRecord, badges, score, level, and timeline form the learner readiness identity.",
    routes: ["/passport", "/passport/timeline", "/passport/share"],
    status: "Active",
  },
  {
    titleId: "Filecoin Proof Archive Layer",
    titleEn: "Filecoin Proof Archive Layer",
    descriptionId:
      "Proof record dapat diarsipkan ke demo Filecoin layer melalui manifest JSON, checksum SHA-256, dan demo CID.",
    descriptionEn:
      "Proof records can be archived into a demo Filecoin layer through JSON manifests, SHA-256 checksums, and demo CIDs.",
    routes: ["/admin/proofs", "/proofs/[id]"],
    status: "Demo",
  },
  {
    titleId: "Stellar Readiness Layer",
    titleEn: "Stellar Readiness Layer",
    descriptionId:
      "Stellar diposisikan sebagai jalur payment-readiness: wallet safety, memo awareness, stablecoin literacy, scam prevention, dan checklist sebelum transaksi.",
    descriptionEn:
      "Stellar is positioned as a payment-readiness path: wallet safety, memo awareness, stablecoin literacy, scam prevention, and pre-transaction checklist.",
    routes: ["/stacks/stellar-readiness", "/stacks/stellar-readiness/checklist", "/quests?track=stellar-readiness"],
    status: "Active",
  },
  {
    titleId: "Admin & Transparency Layer",
    titleEn: "Admin & Transparency Layer",
    descriptionId:
      "Admin Console, status page, changelog, impact report, reviewer guide, dan MVP map membantu reviewer mengecek progres dengan cepat.",
    descriptionEn:
      "Admin Console, status page, changelog, impact report, reviewer guide, and MVP map help reviewers evaluate progress quickly.",
    routes: ["/admin", "/status", "/impact", "/reviewer-guide", "/mvp-map", "/changelog"],
    status: "Active",
  },
];

const dataFlow = [
  "Learner memilih course dan menyelesaikan lesson.",
  "Learner mengirim quest submission sebagai bukti pemahaman.",
  "Admin approve/reject submission dan reward XP dicatat.",
  "Readiness profile disinkronkan, proof record dibuat, badge/timeline diperbarui.",
  "Admin dapat mengarsipkan proof ke demo Filecoin manifest.",
  "Learner/reviewer dapat membuka passport, share summary, timeline, dan proof verification.",
];

export default async function ArchitecturePage() {
  const language = await getServerLanguage();

  return (
    <main className="min-h-screen bg-slate-950 px-5 py-8 text-white md:px-8 md:py-16">
      <section className="mx-auto flex max-w-7xl flex-col gap-8">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-emerald-300">
              Karyra Architecture
            </p>
            <h1 className="mt-4 max-w-4xl text-4xl font-bold tracking-tight md:text-6xl">
              {language === "id"
                ? "Arsitektur MVP: dari belajar sampai proof readiness."
                : "MVP architecture: from learning to readiness proofs."}
            </h1>
            <p className="mt-5 max-w-3xl text-base leading-8 text-slate-300 md:text-lg">
              {language === "id"
                ? "Karyra dibangun sebagai local Web3 readiness infrastructure: pemula belajar, mengerjakan quest, direview, menerima reward, membangun passport, dan menghasilkan proof yang bisa diverifikasi."
                : "Karyra is built as local Web3 readiness infrastructure: beginners learn, complete quests, get reviewed, receive rewards, build a passport, and generate verifiable proofs."}
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <Link
              href="/docs"
              className="rounded-2xl border border-white/10 bg-white/5 px-5 py-3 text-sm font-bold text-white transition hover:border-emerald-400/40"
            >
              Docs
            </Link>
            <Link
              href="/mvp-map"
              className="rounded-2xl bg-emerald-400 px-5 py-3 text-sm font-bold text-slate-950 transition hover:bg-emerald-300"
            >
              MVP Map
            </Link>
          </div>
        </div>

        <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {layers.map((layer) => (
            <article
              key={layer.titleEn}
              className="rounded-[2rem] border border-white/10 bg-white/5 p-6"
            >
              <div className="flex items-center justify-between gap-3">
                <span className="rounded-full border border-emerald-400/20 bg-emerald-400/10 px-3 py-1 text-xs font-bold uppercase tracking-wide text-emerald-300">
                  {layer.status}
                </span>
              </div>

              <h2 className="mt-5 text-2xl font-bold">
                {language === "id" ? layer.titleId : layer.titleEn}
              </h2>
              <p className="mt-3 leading-7 text-slate-300">
                {language === "id" ? layer.descriptionId : layer.descriptionEn}
              </p>

              <div className="mt-5 flex flex-wrap gap-2">
                {layer.routes.map((route) => (
                  <span
                    key={route}
                    className="rounded-full border border-white/10 bg-slate-950/50 px-3 py-1 text-xs font-mono text-slate-300"
                  >
                    {route}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </section>

        <section className="grid gap-6 lg:grid-cols-[0.85fr_1.15fr]">
          <div className="rounded-[2rem] border border-sky-400/20 bg-sky-400/10 p-6 md:p-8">
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-sky-300">
              Design Principle
            </p>
            <h2 className="mt-4 text-3xl font-bold">
              {language === "id"
                ? "Non-teknikal dulu, teknikal kemudian."
                : "Non-technical first, technical later."}
            </h2>
            <p className="mt-4 leading-8 text-slate-300">
              {language === "id"
                ? "Karyra tidak memaksa pengguna lokal langsung bertransaksi. Produk memulai dari safety, literasi, confidence, dan bukti kesiapan sebelum masuk ke praktik teknis."
                : "Karyra does not push local users directly into transactions. The product starts with safety, literacy, confidence, and readiness evidence before technical practice."}
            </p>
          </div>

          <div className="rounded-[2rem] border border-white/10 bg-white/5 p-6 md:p-8">
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-emerald-300">
              Data Flow
            </p>
            <h2 className="mt-4 text-3xl font-bold">
              {language === "id" ? "Alur data utama." : "Core data flow."}
            </h2>

            <div className="mt-6 grid gap-3">
              {dataFlow.map((item, index) => (
                <div
                  key={item}
                  className="rounded-3xl border border-white/10 bg-slate-950/50 p-5"
                >
                  <p className="text-sm font-bold text-emerald-300">
                    Step {index + 1}
                  </p>
                  <p className="mt-2 leading-7 text-slate-300">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </section>
    </main>
  );
}
