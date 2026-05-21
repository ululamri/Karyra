import Link from "next/link";

const archiveFlow = [
  {
    title: "Buat bukti",
    text: "Karyra mencatat progres belajar, partisipasi workshop, badge, dan readiness signal dari pengguna.",
  },
  {
    title: "Susun manifest",
    text: "Bukti diringkas menjadi proof manifest berisi tipe bukti, waktu, sumber, network, checksum, dan status arsip.",
  },
  {
    title: "Uji di Calibration",
    text: "Workflow upload, CID/PieceCID, retrieval, dan archive status diuji di Filecoin Calibration sebelum masuk mainnet.",
  },
  {
    title: "Arsip mainnet",
    text: "Saat rilis resmi, proof manifest penting dapat diarsipkan di Filecoin Mainnet sebagai official learning proof archive.",
  },
];

const networkPath = [
  "Local proof manifest untuk demo dan review UX.",
  "Filecoin Calibration untuk upload test dan retrieval test.",
  "Mainnet readiness review untuk biaya, provider, dan lifecycle.",
  "Filecoin Mainnet untuk arsip resmi setelah readiness completion.",
];

const advancedCourseTopics = [
  "CID dan content addressing",
  "Decentralized storage",
  "Storage Provider",
  "Retrieval",
  "Proof manifest",
  "Calibration vs Mainnet",
  "Membaca CID di Paspor Kesiapan",
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
              Dari latihan Calibration menuju arsip resmi mainnet.
            </h1>
            <p className="mt-4 max-w-3xl text-sm leading-7 text-slate-300 md:text-lg md:leading-8">
              Filecoin diposisikan sebagai proof archive layer. Calibration menjadi ruang uji alur arsip, sementara Filecoin Mainnet menjadi tujuan arsip resmi saat Karyra dirilis secara penuh.
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/passport"
                className="inline-flex min-h-12 items-center justify-center rounded-2xl bg-emerald-400 px-6 py-3 text-sm font-black text-slate-950 transition hover:bg-emerald-300"
              >
                Lihat Paspor
              </Link>
              <Link
                href="/docs/filecoin-architecture"
                className="inline-flex min-h-12 items-center justify-center rounded-2xl border border-white/10 bg-white/5 px-6 py-3 text-sm font-bold text-white transition hover:border-emerald-400/40"
              >
                Baca Arsitektur Filecoin
              </Link>
            </div>
          </div>

          <div className="rounded-[2rem] border border-violet-400/20 bg-violet-400/10 p-5 md:p-6">
            <p className="text-xs font-black uppercase tracking-[0.18em] text-violet-300">
              Advanced Course
            </p>
            <h2 className="mt-2 text-3xl font-black">
              Filecoin masuk setelah fondasi blockchain kuat.
            </h2>
            <p className="mt-3 text-sm leading-7 text-slate-300">
              Filecoin cocok sebagai course lanjutan untuk membahas decentralized storage, CID, Storage Provider, retrieval, dan proof archive.
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
          <article className="rounded-[2rem] border border-violet-400/20 bg-violet-400/10 p-5 md:p-6">
            <p className="text-xs font-black uppercase tracking-[0.18em] text-violet-300">
              Network Path
            </p>
            <h2 className="mt-2 text-2xl font-black">
              Local → Calibration → Mainnet
            </h2>
            <div className="mt-5 grid gap-3">
              {networkPath.map((item) => (
                <p
                  key={item}
                  className="rounded-2xl bg-slate-950/60 p-4 text-sm font-bold leading-6 text-slate-200"
                >
                  {item}
                </p>
              ))}
            </div>
          </article>

          <article className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-5 md:p-6">
            <p className="text-xs font-black uppercase tracking-[0.18em] text-emerald-300">
              Materi Advanced Filecoin
            </p>
            <div className="mt-5 grid gap-3">
              {advancedCourseTopics.map((topic) => (
                <p
                  key={topic}
                  className="rounded-2xl border border-white/10 bg-slate-950/60 p-4 text-sm font-bold leading-6 text-slate-200"
                >
                  {topic}
                </p>
              ))}
            </div>
          </article>
        </section>
      </section>
    </main>
  );
}
