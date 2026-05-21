import Link from "next/link";

const layers = [
  {
    title: "Karyra Core",
    label: "Local Blockchain Readiness Platform",
    text:
      "Kursus, pelajaran, dasbor, workshop, quest opsional, dan Paspor Kesiapan menjadi pengalaman utama untuk membawa pemula dari belajar menuju kesiapan.",
  },
  {
    title: "Filecoin Proof Archive",
    label: "Decentralized Storage / Proof Layer",
    text:
      "Proof record, snapshot paspor, dan bukti partisipasi disusun sebagai proof manifest yang dapat diarsipkan, diberi checksum, dan dihubungkan ke CID/PieceCID.",
  },
  {
    title: "Stellar Readiness Track",
    label: "Micro-payment & Financial Access Layer",
    text:
      "Stellar Testnet digunakan untuk latihan wallet, public key, memo, trustline, asset, payment simulation, dan readiness sebelum transaksi nyata.",
  },
];

const architectureFlow = [
  "Learner menyelesaikan kursus dan pelajaran blockchain-first.",
  "Karyra mencatat progres, XP, badge, workshop, dan readiness signal.",
  "Paspor Kesiapan merangkum Bukti Belajar, Bukti Partisipasi, dan Bukti Kesiapan.",
  "Filecoin layer menyiapkan proof manifest, checksum, CID/PieceCID, dan archive status.",
  "Stellar layer menyediakan latihan testnet untuk wallet dan micro-payment readiness.",
  "Reviewer melihat alur demo, dokumen arsitektur, dan impact metrics dari satu tempat.",
];

const grantClaims = [
  "Karyra bukan sekadar platform edukasi, tetapi readiness infrastructure untuk komunitas lokal.",
  "Filecoin membuat bukti belajar tidak berhenti sebagai data internal aplikasi.",
  "Stellar memberi jalur praktik finansial blockchain yang aman sebelum transaksi nyata.",
  "Kombinasi Filecoin + Stellar membuat Karyra berbeda dari platform kursus atau quest biasa.",
];

export default function GrantArchitecturePage() {
  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <section className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-4 py-6 pb-24 md:px-8 md:py-12">
        <header>
          <p className="inline-flex rounded-full border border-emerald-400/20 bg-emerald-400/10 px-3 py-1 text-xs font-black uppercase tracking-[0.18em] text-emerald-300">
            Grant Architecture
          </p>
          <h1 className="mt-4 max-w-4xl text-3xl font-black tracking-tight md:text-5xl">
            Dual-Network Architecture Ecosystem.
          </h1>
          <p className="mt-4 max-w-3xl text-sm leading-7 text-slate-300 md:text-base md:leading-8">
            Karyra diposisikan sebagai jembatan hibrida: Filecoin untuk decentralized proof archive, Stellar untuk micro-payment dan financial access readiness, dan Karyra sebagai ruang pembelajaran lokal yang menghubungkan keduanya.
          </p>
        </header>

        <section className="grid gap-4 md:grid-cols-3">
          {layers.map((layer) => (
            <article
              key={layer.title}
              className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-5 md:p-6"
            >
              <p className="text-xs font-black uppercase tracking-wide text-emerald-300">
                {layer.label}
              </p>
              <h2 className="mt-2 text-2xl font-black">{layer.title}</h2>
              <p className="mt-3 text-sm leading-7 text-slate-400">{layer.text}</p>
            </article>
          ))}
        </section>

        <section className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-5 md:p-7">
          <div className="grid gap-6 lg:grid-cols-[0.8fr_1.2fr]">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.18em] text-sky-300">
                Alur Arsitektur
              </p>
              <h2 className="mt-2 text-2xl font-black md:text-4xl">
                Belajar → Bukti → Arsip → Latihan → Siap
              </h2>
            </div>
            <div className="grid gap-3">
              {architectureFlow.map((item, index) => (
                <div
                  key={item}
                  className="rounded-2xl border border-white/10 bg-slate-950/60 p-4"
                >
                  <p className="text-xs font-black text-emerald-300">0{index + 1}</p>
                  <p className="mt-2 text-sm font-bold leading-6 text-slate-200">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="rounded-[2rem] border border-emerald-400/20 bg-emerald-400/10 p-5 md:p-6">
          <h2 className="text-2xl font-black">Klaim utama untuk proposal</h2>
          <div className="mt-5 grid gap-3 md:grid-cols-2">
            {grantClaims.map((claim) => (
              <p
                key={claim}
                className="rounded-2xl bg-slate-950/60 p-4 text-sm font-bold leading-6 text-slate-200"
              >
                {claim}
              </p>
            ))}
          </div>
        </section>

        <section className="grid gap-3 md:grid-cols-2">
          <Link
            href="/docs/filecoin-architecture"
            className="rounded-[2rem] border border-violet-400/20 bg-violet-400/10 p-5 transition hover:border-violet-300/50 md:p-6"
          >
            <p className="text-xs font-black uppercase tracking-wide text-violet-300">
              Detail Filecoin
            </p>
            <h2 className="mt-2 text-2xl font-black">Storage Architecture</h2>
            <p className="mt-3 text-sm leading-7 text-slate-300">
              Tooling options, manifest, checksum, CID/PieceCID, dan rencana integrasi.
            </p>
          </Link>
          <Link
            href="/docs/stellar-testnet-flow"
            className="rounded-[2rem] border border-sky-400/20 bg-sky-400/10 p-5 transition hover:border-sky-300/50 md:p-6"
          >
            <p className="text-xs font-black uppercase tracking-wide text-sky-300">
              Detail Stellar
            </p>
            <h2 className="mt-2 text-2xl font-black">Testnet Practice Flow</h2>
            <p className="mt-3 text-sm leading-7 text-slate-300">
              Friendbot, testnet XLM, trustline, memo, dan payment simulation.
            </p>
          </Link>
        </section>
      </section>
    </main>
  );
}
