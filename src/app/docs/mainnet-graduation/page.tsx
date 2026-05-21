import Link from "next/link";

const modelSteps = [
  {
    title: "Belajar",
    text:
      "Pengguna memahami blockchain sebagai fondasi kepercayaan digital sebelum masuk ke wallet, payment, storage, atau transaksi nyata.",
  },
  {
    title: "Latihan aman",
    text:
      "Stellar Testnet dan Filecoin Calibration digunakan sebagai ruang latihan agar pengguna bisa mencoba tanpa risiko aset mainnet.",
  },
  {
    title: "Lulus readiness",
    text:
      "Pengguna menyelesaikan course, checklist, quiz, atau review yang menunjukkan bahwa mereka sudah memahami risiko dasar.",
  },
  {
    title: "Pengalaman mainnet terbimbing",
    text:
      "Mainnet diperkenalkan sebagai tahap kelulusan, bukan pintu masuk awal. Pengguna tetap diberi guardrail dan konteks keamanan.",
  },
  {
    title: "Bukti masuk Paspor",
    text:
      "Aktivitas readiness, archive, dan mainnet experience dirangkum sebagai bukti dalam Paspor Kesiapan.",
  },
];

const networkRoles = [
  {
    title: "Stellar Testnet",
    label: "Latihan payment readiness",
    text:
      "Dipakai dalam pelajaran untuk Friendbot, testnet XLM, memo awareness, trustline simulation, dan payment simulation.",
  },
  {
    title: "Stellar Mainnet",
    label: "Financial access experience",
    text:
      "Dipakai setelah pengguna menyelesaikan readiness track agar mereka merasakan pengalaman mainnet secara terbimbing.",
  },
  {
    title: "Filecoin Calibration",
    label: "Latihan proof archive",
    text:
      "Dipakai untuk menguji upload proof manifest, checksum, CID/PieceCID, retrieval, dan archive status sebelum mainnet.",
  },
  {
    title: "Filecoin Mainnet",
    label: "Official proof archive",
    text:
      "Dipakai saat rilis resmi untuk mengarsipkan bukti belajar, snapshot Paspor Kesiapan, dan proof record penting.",
  },
];

const guardrails = [
  "Mainnet tidak dibuka sebagai pintu masuk awal untuk pemula.",
  "Pengguna harus memahami risiko wallet, secret key, memo, trustline, dan transaksi.",
  "Aktivitas mainnet harus dikaitkan dengan readiness completion.",
  "Biaya mainnet, nilai aset, dan risiko kesalahan transaksi harus dijelaskan sebelum praktik.",
  "Karyra tetap menekankan edukasi dan kesiapan, bukan spekulasi atau janji keuntungan.",
];

export default function MainnetGraduationPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <section className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-4 py-6 pb-24 md:px-8 md:py-12">
        <header>
          <p className="inline-flex rounded-full border border-emerald-400/20 bg-emerald-400/10 px-3 py-1 text-xs font-black uppercase tracking-[0.18em] text-emerald-300">
            Testnet-to-Mainnet Graduation
          </p>
          <h1 className="mt-4 max-w-4xl text-3xl font-black tracking-tight md:text-5xl">
            Latihan aman dulu, pengalaman mainnet kemudian.
          </h1>
          <p className="mt-4 max-w-3xl text-sm leading-7 text-slate-300 md:text-base md:leading-8">
            Karyra tidak membawa pemula langsung ke mainnet. Testnet dan Calibration menjadi ruang latihan, sementara mainnet menjadi pengalaman resmi setelah pengguna menyelesaikan jalur readiness.
          </p>
        </header>

        <section className="grid gap-4 md:grid-cols-5">
          {modelSteps.map((step, index) => (
            <article
              key={step.title}
              className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-5"
            >
              <p className="text-xs font-black uppercase tracking-wide text-emerald-300">
                0{index + 1}
              </p>
              <h2 className="mt-2 text-xl font-black">{step.title}</h2>
              <p className="mt-3 text-sm leading-7 text-slate-400">{step.text}</p>
            </article>
          ))}
        </section>

        <section className="grid gap-4 md:grid-cols-2">
          {networkRoles.map((role) => (
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

        <section className="rounded-[2rem] border border-amber-400/20 bg-amber-400/10 p-5 md:p-6">
          <h2 className="text-2xl font-black">Guardrail mainnet</h2>
          <div className="mt-5 grid gap-3 md:grid-cols-2">
            {guardrails.map((item) => (
              <p
                key={item}
                className="rounded-2xl bg-slate-950/60 p-4 text-sm font-bold leading-6 text-slate-200"
              >
                {item}
              </p>
            ))}
          </div>
        </section>

        <section className="grid gap-3 md:grid-cols-2">
          <Link
            href="/docs/stellar-testnet-flow"
            className="rounded-[2rem] border border-sky-400/20 bg-sky-400/10 p-5 transition hover:border-sky-300/50"
          >
            <p className="text-xs font-black uppercase tracking-wide text-sky-300">
              Stellar path
            </p>
            <h2 className="mt-2 text-2xl font-black">Testnet ke Mainnet</h2>
            <p className="mt-3 text-sm leading-7 text-slate-300">
              Dari Friendbot dan trustline simulation menuju guided mainnet financial access.
            </p>
          </Link>
          <Link
            href="/docs/filecoin-architecture"
            className="rounded-[2rem] border border-violet-400/20 bg-violet-400/10 p-5 transition hover:border-violet-300/50"
          >
            <p className="text-xs font-black uppercase tracking-wide text-violet-300">
              Filecoin path
            </p>
            <h2 className="mt-2 text-2xl font-black">Calibration ke Mainnet</h2>
            <p className="mt-3 text-sm leading-7 text-slate-300">
              Dari proof archive testing menuju arsip resmi bukti belajar di Filecoin mainnet.
            </p>
          </Link>
        </section>
      </section>
    </main>
  );
}
