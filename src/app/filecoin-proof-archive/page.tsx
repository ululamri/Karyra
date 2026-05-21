import Link from "next/link";

const archiveFlow = [
  {
    title: "Buat bukti",
    text: "Karyra mencatat progres belajar, partisipasi workshop, badge, dan readiness signal dari pengguna.",
  },
  {
    title: "Susun manifest",
    text: "Bukti diringkas menjadi proof manifest berisi tipe bukti, waktu, sumber, checksum, dan status arsip.",
  },
  {
    title: "Arsipkan",
    text: "Manifest disiapkan untuk diarsipkan melalui Filecoin Onchain Cloud menggunakan Synapse SDK pada tahap integrasi.",
  },
  {
    title: "Verifikasi",
    text: "Paspor Kesiapan dapat menampilkan status arsip, checksum, PieceCID/CID, dan tautan verifikasi bukti.",
  },
];

const manifestFields = [
  "proofId",
  "learnerId",
  "proofType",
  "sourceType",
  "sourceId",
  "issuedAt",
  "readinessScore",
  "checksum",
  "archiveStatus",
  "pieceCid",
  "provider",
];

const integrationPhases = [
  {
    title: "Fase 1 — Simulasi manifest",
    text: "Karyra membuat struktur proof manifest dan status arsip tanpa upload real. Ini aman untuk demo grant dan review UX.",
  },
  {
    title: "Fase 2 — Upload testnet",
    text: "Integrasi Synapse SDK pada environment testnet/calibration untuk menguji upload, PieceCID, dan retrieval.",
  },
  {
    title: "Fase 3 — Arsip paspor",
    text: "Snapshot Paspor Kesiapan dan proof record tertentu diarsipkan sebagai bukti proses belajar dan partisipasi.",
  },
  {
    title: "Fase 4 — Verifikasi publik",
    text: "Pengguna dan reviewer dapat melihat metadata arsip, checksum, dan status verifikasi dari halaman proof.",
  },
];

export default function FilecoinProofArchivePage() {
  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <section className="mx-auto flex w-full max-w-7xl flex-col gap-8 px-4 py-6 pb-24 md:px-8 md:py-12">
        <header className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <div>
            <p className="inline-flex rounded-full border border-violet-400/20 bg-violet-400/10 px-3 py-1 text-xs font-black uppercase tracking-[0.18em] text-violet-300">
              Filecoin Proof Archive
            </p>
            <h1 className="mt-4 max-w-4xl text-3xl font-black tracking-tight md:text-5xl lg:text-6xl">
              Lapisan arsip bukti untuk Paspor Kesiapan.
            </h1>
            <p className="mt-4 max-w-3xl text-sm leading-7 text-slate-300 md:text-lg md:leading-8">
              Filecoin diposisikan sebagai proof archive layer: tempat Karyra menyiapkan bukti belajar, partisipasi, dan snapshot paspor agar dapat diarsipkan, dibaca, dan diverifikasi secara lebih kuat.
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/passport"
                className="inline-flex min-h-12 items-center justify-center rounded-2xl bg-emerald-400 px-6 py-3 text-sm font-black text-slate-950 transition hover:bg-emerald-300"
              >
                Lihat Paspor
              </Link>
              <Link
                href="/docs/filecoin-stellar"
                className="inline-flex min-h-12 items-center justify-center rounded-2xl border border-white/10 bg-white/5 px-6 py-3 text-sm font-bold text-white transition hover:border-emerald-400/40"
              >
                Baca Strategi
              </Link>
            </div>
          </div>

          <div className="rounded-[2rem] border border-violet-400/20 bg-violet-400/10 p-5 md:p-6">
            <p className="text-xs font-black uppercase tracking-[0.18em] text-violet-300">
              Narasi Grant
            </p>
            <h2 className="mt-2 text-3xl font-black">
              Bukan hanya belajar, tapi bukti proses yang bisa dijaga.
            </h2>
            <p className="mt-3 text-sm leading-7 text-slate-300">
              Karyra menggunakan pendekatan manifest agar setiap bukti belajar dan partisipasi dapat disiapkan untuk arsip terdesentralisasi.
            </p>
          </div>
        </header>

        <section className="grid gap-3 md:grid-cols-4">
          {archiveFlow.map((step, index) => (
            <article
              key={step.title}
              className="rounded-3xl border border-white/10 bg-white/[0.04] p-5"
            >
              <p className="text-xs font-black uppercase tracking-wide text-violet-300">
                0{index + 1}
              </p>
              <h2 className="mt-2 text-xl font-black">{step.title}</h2>
              <p className="mt-2 text-sm leading-6 text-slate-400">{step.text}</p>
            </article>
          ))}
        </section>

        <section className="grid gap-4 lg:grid-cols-[0.9fr_1.1fr]">
          <article className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-5 md:p-6">
            <p className="text-xs font-black uppercase tracking-[0.18em] text-emerald-300">
              Proof Manifest
            </p>
            <h2 className="mt-2 text-2xl font-black">
              Struktur bukti yang siap diarsipkan.
            </h2>
            <p className="mt-3 text-sm leading-7 text-slate-400">
              Manifest menjadi jembatan antara data belajar di Karyra dan arsip Filecoin. Pada MVP, manifest bisa dimulai sebagai JSON internal sebelum upload real diaktifkan.
            </p>
            <div className="mt-5 grid grid-cols-2 gap-2">
              {manifestFields.map((field) => (
                <code
                  key={field}
                  className="rounded-2xl border border-white/10 bg-slate-950/70 px-3 py-2 text-xs font-bold text-slate-300"
                >
                  {field}
                </code>
              ))}
            </div>
          </article>

          <article className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-5 md:p-6">
            <p className="text-xs font-black uppercase tracking-[0.18em] text-sky-300">
              Rencana Integrasi
            </p>
            <div className="mt-4 grid gap-3">
              {integrationPhases.map((phase) => (
                <div
                  key={phase.title}
                  className="rounded-2xl border border-white/10 bg-slate-950/60 p-4"
                >
                  <h3 className="font-black">{phase.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-slate-400">{phase.text}</p>
                </div>
              ))}
            </div>
          </article>
        </section>
      </section>
    </main>
  );
}
