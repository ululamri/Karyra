import Link from "next/link";

const roles = [
  {
    title: "Karyra",
    label: "Platform kesiapan",
    text: "Membawa pemula dari pemahaman blockchain menuju kesiapan berpartisipasi.",
  },
  {
    title: "Filecoin",
    label: "Proof archive layer",
    text: "Mengarsipkan proof manifest, snapshot paspor, dan bukti partisipasi. Calibration untuk latihan, Mainnet untuk arsip resmi saat rilis.",
  },
  {
    title: "Stellar",
    label: "Safe practice + financial access layer",
    text: "Testnet untuk latihan wallet/payment readiness, Mainnet untuk pengalaman financial access setelah pengguna menyelesaikan readiness track.",
  },
];

const architecture = [
  "Kursus dan Pelajaran membangun fondasi blockchain.",
  "Dasbor mencatat progres belajar dan langkah berikutnya.",
  "Paspor Kesiapan merangkum bukti belajar, partisipasi, dan readiness score.",
  "Filecoin Calibration menguji proof archive workflow sebelum mainnet.",
  "Stellar Testnet melatih wallet/payment readiness secara aman.",
  "Filecoin Mainnet menyimpan official learning proof archive setelah readiness completion.",
  "Stellar Mainnet memberi pengalaman financial access yang terbimbing.",
];

const technicalDecisions = [
  {
    title: "Testnet-to-Mainnet Graduation",
    text:
      "Karyra menggunakan testnet dan Calibration sebagai sandbox belajar, lalu membuka mainnet experience setelah readiness completion.",
    href: "/docs/mainnet-graduation",
  },
  {
    title: "Filecoin tooling",
    text:
      "Jalur utama yang direkomendasikan adalah Synapse SDK / Filecoin Onchain Cloud. Lighthouse.storage dan Web3.Storage tetap dicatat sebagai opsi ekosistem, sementara direct Storage Providers menjadi jalur lanjutan.",
    href: "/docs/filecoin-architecture",
  },
  {
    title: "Stellar testnet",
    text:
      "Stellar Readiness Track berkembang ke pengalaman testnet interaktif: Friendbot, testnet XLM, trustline simulation, memo awareness, dan payment simulation.",
    href: "/docs/stellar-testnet-flow",
  },
  {
    title: "Paspor Kesiapan",
    text:
      "Bukti belajar, bukti partisipasi, readiness score, dan arsip bukti dirangkum agar perjalanan learner bisa dibaca dengan jelas.",
    href: "/docs/readiness-passport",
  },
];

export default function FilecoinStellarDocsPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <section className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-4 py-6 pb-24 md:px-8 md:py-12">
        <header>
          <p className="inline-flex rounded-full border border-emerald-400/20 bg-emerald-400/10 px-3 py-1 text-xs font-black uppercase tracking-[0.18em] text-emerald-300">
            Strategi Filecoin + Stellar
          </p>
          <h1 className="mt-4 max-w-4xl text-3xl font-black tracking-tight md:text-5xl">
            Dua lapisan strategis di dalam Karyra.
          </h1>
          <p className="mt-4 max-w-3xl text-sm leading-7 text-slate-300 md:text-base md:leading-8">
            Filecoin dan Stellar tidak diposisikan sebagai tempelan. Filecoin menjadi lapisan arsip bukti, sementara Stellar menjadi jalur latihan dan pengalaman financial access. Testnet dan Calibration menjadi ruang latihan, mainnet menjadi tahap kelulusan.
          </p>
        </header>

        <section className="grid gap-4 md:grid-cols-3">
          {roles.map((role) => (
            <article
              key={role.title}
              className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-5 md:p-6"
            >
              <p className="text-xs font-black uppercase tracking-wide text-emerald-300">
                {role.label}
              </p>
              <h2 className="mt-2 text-2xl font-black">{role.title}</h2>
              <p className="mt-3 text-sm leading-7 text-slate-400">{role.text}</p>
            </article>
          ))}
        </section>

        <section className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-5 md:p-7">
          <div className="grid gap-6 lg:grid-cols-[0.8fr_1.2fr]">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.18em] text-emerald-300">
                Arsitektur Naratif
              </p>
              <h2 className="mt-2 text-2xl font-black md:text-4xl">
                Belajar → Latihan → Mainnet → Terbukti
              </h2>
            </div>
            <div className="grid gap-3">
              {architecture.map((item) => (
                <p
                  key={item}
                  className="rounded-2xl border border-white/10 bg-slate-950/60 p-4 text-sm font-bold leading-6 text-slate-200"
                >
                  {item}
                </p>
              ))}
            </div>
          </div>
        </section>

        <section className="grid gap-4 md:grid-cols-2">
          {technicalDecisions.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-5 transition hover:border-emerald-400/40 md:p-6"
            >
              <h2 className="text-xl font-black">{item.title}</h2>
              <p className="mt-3 text-sm leading-7 text-slate-400">{item.text}</p>
              <p className="mt-4 text-sm font-black text-emerald-300">Buka detail →</p>
            </Link>
          ))}
        </section>

        <section className="rounded-[2rem] border border-emerald-400/20 bg-emerald-400/10 p-5 md:p-6">
          <h2 className="text-2xl font-black">Model kelulusan yang ingin dibangun</h2>
          <p className="mt-3 text-lg leading-8 text-slate-200">
            Karyra uses Stellar Testnet and Filecoin Calibration as safe learning sandboxes, then introduces guided Stellar Mainnet and Filecoin Mainnet experiences only after learners complete readiness tracks.
          </p>
        </section>
      </section>
    </main>
  );
}
