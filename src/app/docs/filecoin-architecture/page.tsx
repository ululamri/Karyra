import Link from "next/link";

const storageOptions = [
  {
    title: "Synapse SDK / Filecoin Onchain Cloud",
    status: "Rekomendasi utama",
    text:
      "Cocok untuk stack Next.js/TypeScript karena menyediakan API tingkat tinggi untuk storage operations, payment operations, provider selection, dan PieceCID.",
  },
  {
    title: "Lighthouse.storage",
    status: "Alternatif cepat",
    text:
      "Cocok sebagai opsi developer-friendly untuk upload dan manajemen metadata berbasis IPFS/Filecoin jika kita membutuhkan integrasi cepat untuk prototype.",
  },
  {
    title: "Web3.Storage",
    status: "Alternatif ekosistem",
    text:
      "Cocok dipertimbangkan jika kebutuhan utama adalah developer workflow sederhana untuk penyimpanan data berbasis content addressing.",
  },
  {
    title: "Direct Storage Providers",
    status: "Tahap lanjutan",
    text:
      "Cocok untuk tahap teknikal lebih dalam ketika Karyra membutuhkan kontrol langsung terhadap Storage Provider, deal policy, retrieval, dan durability strategy.",
  },
];

const networkPath = [
  {
    title: "Local manifest",
    text:
      "Karyra membuat proof manifest, checksum, dan archive status dari proof record tanpa upload real.",
  },
  {
    title: "Filecoin Calibration",
    text:
      "Calibration dipakai untuk menguji upload manifest, retrieval, CID/PieceCID, dan storage workflow dengan test FIL.",
  },
  {
    title: "Mainnet readiness review",
    text:
      "Sebelum mainnet, Karyra mengevaluasi biaya, provider strategy, renewal policy, retrieval reliability, dan data lifecycle.",
  },
  {
    title: "Filecoin Mainnet",
    text:
      "Saat rilis resmi, proof manifest dan snapshot Paspor Kesiapan yang penting dapat diarsipkan ke Filecoin Mainnet.",
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
  "manifestVersion",
  "checksum",
  "network",
  "archiveTool",
  "archiveStatus",
  "cid",
  "pieceCid",
  "provider",
  "retrievalUrl",
];

const advancedCourseTopics = [
  "Apa itu CID dan content addressing",
  "Apa itu decentralized storage",
  "Apa itu Storage Provider",
  "Apa itu retrieval",
  "Apa itu proof manifest",
  "Kenapa bukti belajar perlu diarsipkan",
  "Cara membaca CID di Paspor Kesiapan",
  "Perbedaan Calibration dan Mainnet",
];

export default function FilecoinArchitecturePage() {
  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <section className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-4 py-6 pb-24 md:px-8 md:py-12">
        <header>
          <p className="inline-flex rounded-full border border-violet-400/20 bg-violet-400/10 px-3 py-1 text-xs font-black uppercase tracking-[0.18em] text-violet-300">
            Filecoin Storage Architecture
          </p>
          <h1 className="mt-4 max-w-4xl text-3xl font-black tracking-tight md:text-5xl">
            Dari Calibration menuju arsip resmi di Filecoin Mainnet.
          </h1>
          <p className="mt-4 max-w-3xl text-sm leading-7 text-slate-300 md:text-base md:leading-8">
            Filecoin Calibration digunakan sebagai ruang uji proof archive. Saat rilis resmi, Filecoin Mainnet menjadi lapisan arsip untuk bukti belajar dan Paspor Kesiapan yang sudah memenuhi readiness requirement.
          </p>
        </header>

        <section className="grid gap-4 md:grid-cols-2">
          {storageOptions.map((option) => (
            <article
              key={option.title}
              className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-5 md:p-6"
            >
              <p className="text-xs font-black uppercase tracking-wide text-violet-300">
                {option.status}
              </p>
              <h2 className="mt-2 text-2xl font-black">{option.title}</h2>
              <p className="mt-3 text-sm leading-7 text-slate-400">{option.text}</p>
            </article>
          ))}
        </section>

        <section className="rounded-[2rem] border border-violet-400/20 bg-violet-400/10 p-5 md:p-7">
          <div className="grid gap-6 lg:grid-cols-[0.8fr_1.2fr]">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.18em] text-violet-300">
                Network Path
              </p>
              <h2 className="mt-2 text-2xl font-black md:text-4xl">
                Local → Calibration → Mainnet
              </h2>
              <p className="mt-3 text-sm leading-7 text-slate-300">
                Ini menjaga agar proof archive aman untuk diuji, tetapi tetap punya jalur mainnet yang jelas untuk rilis resmi.
              </p>
            </div>
            <div className="grid gap-3">
              {networkPath.map((item, index) => (
                <div
                  key={item.title}
                  className="rounded-2xl bg-slate-950/60 p-4"
                >
                  <p className="text-xs font-black text-violet-300">0{index + 1}</p>
                  <h3 className="mt-2 font-black">{item.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-slate-400">{item.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="grid gap-4 lg:grid-cols-[0.9fr_1.1fr]">
          <article className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-5 md:p-6">
            <p className="text-xs font-black uppercase tracking-[0.18em] text-emerald-300">
              Advanced Filecoin Course
            </p>
            <h2 className="mt-2 text-2xl font-black">
              Filecoin masuk ke jalur lanjutan.
            </h2>
            <p className="mt-3 text-sm leading-7 text-slate-400">
              Filecoin tidak harus menjadi pintu masuk awal pemula. Ia cocok menjadi advanced course setelah pengguna memahami blockchain, bukti, dan Paspor Kesiapan.
            </p>
            <div className="mt-5 grid gap-2">
              {advancedCourseTopics.map((topic) => (
                <p
                  key={topic}
                  className="rounded-2xl border border-white/10 bg-slate-950/60 p-3 text-sm font-bold text-slate-200"
                >
                  {topic}
                </p>
              ))}
            </div>
          </article>

          <article className="rounded-[2rem] border border-violet-400/20 bg-violet-400/10 p-5 md:p-6">
            <p className="text-xs font-black uppercase tracking-[0.18em] text-violet-300">
              Proof Manifest Schema
            </p>
            <p className="mt-3 text-sm leading-7 text-slate-300">
              Manifest menjadi format portable antara database Karyra, Paspor Kesiapan, Calibration testing, dan Filecoin Mainnet archive.
            </p>
            <div className="mt-5 grid grid-cols-2 gap-2 md:grid-cols-3">
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
        </section>

        <section className="rounded-[2rem] border border-amber-400/20 bg-amber-400/10 p-5 md:p-6">
          <h2 className="text-2xl font-black">Catatan wording proposal</h2>
          <p className="mt-3 text-sm leading-7 text-slate-300">
            Gunakan frasa “Calibration testing for proof archive workflows” dan “Filecoin Mainnet for official learning proof archive after readiness completion”. Hindari klaim permanen tanpa menjelaskan renewal, retrieval, dan provider strategy.
          </p>
          <Link
            href="/filecoin-proof-archive"
            className="mt-5 inline-flex min-h-11 items-center rounded-2xl bg-white px-4 py-2.5 text-sm font-black text-slate-950"
          >
            Buka Filecoin Proof Archive
          </Link>
        </section>
      </section>
    </main>
  );
}
