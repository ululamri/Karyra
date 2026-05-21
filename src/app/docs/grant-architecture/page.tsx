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
      "Proof record, snapshot paspor, dan bukti partisipasi disusun sebagai proof manifest yang diuji di Calibration dan diarsipkan secara resmi di Filecoin Mainnet saat rilis.",
  },
  {
    title: "Stellar Readiness Track",
    label: "Micro-payment & Financial Access Layer",
    text:
      "Stellar Testnet digunakan untuk latihan wallet, public key, memo, trustline, asset, dan payment. Stellar Mainnet digunakan sebagai pengalaman financial access setelah readiness selesai.",
  },
];

const architectureFlow = [
  "Learner menyelesaikan kursus dan pelajaran blockchain-first.",
  "Karyra mencatat progres, XP, badge, workshop, dan readiness signal.",
  "Paspor Kesiapan merangkum Bukti Belajar, Bukti Partisipasi, dan Bukti Kesiapan.",
  "Filecoin Calibration menguji proof manifest upload, checksum, CID/PieceCID, dan retrieval flow.",
  "Stellar Testnet melatih wallet safety, trustline, memo, dan payment simulation.",
  "Setelah readiness selesai, mainnet experience dibuka secara terbimbing.",
  "Filecoin Mainnet menyimpan official learning proof archive, Stellar Mainnet memberi pengalaman financial access.",
  "Reviewer melihat alur demo, dokumen arsitektur, dan impact metrics dari satu tempat.",
];

const grantClaims = [
  "Karyra bukan sekadar platform edukasi, tetapi readiness infrastructure untuk komunitas lokal.",
  "Filecoin membuat bukti belajar tidak berhenti sebagai data internal aplikasi.",
  "Stellar memberi jalur praktik finansial blockchain yang aman sebelum transaksi nyata.",
  "Testnet-to-mainnet graduation membuat Karyra aman untuk pemula tetapi tetap realistis terhadap pengalaman blockchain sesungguhnya.",
];

const routes = [
  { href: "/docs/mainnet-graduation", title: "Testnet-to-Mainnet Graduation" },
  { href: "/docs/filecoin-architecture", title: "Filecoin Storage Architecture" },
  { href: "/docs/stellar-testnet-flow", title: "Stellar Testnet Flow" },
  { href: "/docs/impact-metrics", title: "Impact Metrics" },
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
            Karyra diposisikan sebagai jembatan hibrida: Filecoin untuk decentralized proof archive, Stellar untuk micro-payment dan financial access readiness, dan Karyra sebagai ruang pembelajaran lokal yang menghubungkan keduanya melalui model testnet-to-mainnet graduation.
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
                Belajar → Latihan → Lulus → Mainnet → Terbukti
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

        <section className="grid gap-3 md:grid-cols-4">
          {routes.map((route) => (
            <Link
              key={route.href}
              href={route.href}
              className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-5 transition hover:border-emerald-400/40"
            >
              <h2 className="text-lg font-black">{route.title}</h2>
              <p className="mt-3 text-sm font-black text-emerald-300">Buka →</p>
            </Link>
          ))}
        </section>
      </section>
    </main>
  );
}
