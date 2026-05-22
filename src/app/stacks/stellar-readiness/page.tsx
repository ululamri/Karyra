import Link from "next/link";

const readinessModules = [
  {
    title: "Wallet Safety",
    text: "Memahami public key, secret key, seed phrase/recovery phrase, dan kenapa Karyra tidak pernah meminta rahasia wallet.",
    status: "Fondasi",
  },
  {
    title: "Wallet Connect Prep",
    text: "Menyiapkan alur opt-in wallet connection melalui Stellar Wallets Kit / Freighter Connect sebagai milestone integrasi, bukan koneksi paksa.",
    status: "Integration Prep",
  },
  {
    title: "Testnet Training",
    text: "Latihan account, memo, payment, asset, dan trustline di Stellar Testnet sebelum menyentuh nilai nyata.",
    status: "Latihan",
  },
  {
    title: "Readiness Review",
    text: "Learner menyelesaikan checklist/refleksi, lalu readiness-nya direview sebelum masuk ke aktivitas mainnet.",
    status: "Review",
  },
  {
    title: "Mainnet Graduation",
    text: "Qualified learner bisa mengikuti opt-in small-value Stellar Mainnet Graduation sebagai pengalaman nyata yang aman dan terbimbing.",
    status: "Tujuan",
  },
  {
    title: "Passport Signal",
    text: "Kesiapan Stellar dicatat sebagai sinyal di Paspor Kesiapan: bukan janji finansial, tetapi bukti kesiapan belajar dan praktik.",
    status: "Proof",
  },
];

const roadmap = [
  "Bangun pemahaman blockchain dan wallet safety.",
  "Kenali Stellar Wallets Kit / Freighter Connect sebagai planned wallet connection layer.",
  "Latihan account, memo, asset, trustline, dan payment di testnet.",
  "Submit checklist/refleksi Stellar readiness.",
  "Review kesiapan sebelum aktivitas bernilai nyata.",
  "Ikuti opt-in small-value Mainnet Graduation jika qualified.",
  "Catat Stellar readiness signal ke Paspor Kesiapan.",
];

export default function StellarReadinessPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <section className="mx-auto flex w-full max-w-7xl flex-col gap-8 px-4 py-6 pb-24 md:px-8 md:py-12">
        <header className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <div>
            <p className="inline-flex rounded-full border border-sky-400/20 bg-sky-400/10 px-3 py-1 text-xs font-black uppercase tracking-[0.18em] text-sky-300">
              Stellar Mainnet Readiness Track
            </p>
            <h1 className="mt-4 max-w-4xl text-3xl font-black tracking-tight md:text-5xl lg:text-6xl">
              Testnet adalah latihan. Mainnet readiness adalah tujuan.
            </h1>
            <p className="mt-4 max-w-3xl text-sm leading-7 text-slate-300 md:text-lg md:leading-8">
              Karyra memposisikan Stellar sebagai jalur kesiapan menuju partisipasi mainnet yang aman, kecil, opt-in, dan terbimbing. Learner tidak langsung diarahkan ke transaksi nyata sebelum memahami wallet safety, memo, asset issuer, trustline, payment flow, dan risiko mainnet.
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <Link
                href="/stacks/stellar-readiness/connect"
                className="inline-flex min-h-12 items-center justify-center rounded-2xl bg-sky-300 px-6 py-3 text-sm font-black text-slate-950 transition hover:bg-sky-200"
              >
                Wallet Connect Prep
              </Link>
              <Link
                href="/stacks/stellar-readiness/checklist"
                className="inline-flex min-h-12 items-center justify-center rounded-2xl border border-white/10 bg-white/5 px-6 py-3 text-sm font-bold text-white transition hover:border-sky-400/40"
              >
                Readiness Checklist
              </Link>
              <Link
                href="/stacks/stellar-readiness/mainnet-graduation"
                className="inline-flex min-h-12 items-center justify-center rounded-2xl border border-emerald-400/30 bg-emerald-400/10 px-6 py-3 text-sm font-black text-emerald-200 transition hover:bg-emerald-400/20"
              >
                Mainnet Graduation
              </Link>
            </div>
          </div>

          <div className="rounded-[2rem] border border-emerald-400/20 bg-emerald-400/10 p-5 md:p-6">
            <p className="text-xs font-black uppercase tracking-[0.18em] text-emerald-300">
              SCF Readiness Positioning
            </p>
            <h2 className="mt-2 text-3xl font-black">
              Wallet integration connects learning to real network action.
            </h2>
            <p className="mt-3 text-sm leading-7 text-slate-300">
              Halaman ini menyiapkan bukti produk bahwa Karyra bukan hanya “mengajar Stellar”, tetapi membangun readiness-to-mainnet flow dengan planned integration ke Stellar Wallets Kit / Freighter Connect.
            </p>
          </div>
        </header>

        <section className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {readinessModules.map((module) => (
            <article
              key={module.title}
              className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-5 md:p-6"
            >
              <p className="inline-flex rounded-full bg-white/10 px-3 py-1 text-xs font-black uppercase tracking-wide text-sky-200">
                {module.status}
              </p>
              <h2 className="mt-4 text-xl font-black">{module.title}</h2>
              <p className="mt-3 text-sm leading-7 text-slate-400">{module.text}</p>
            </article>
          ))}
        </section>

        <section className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-5 md:p-7">
          <div className="grid gap-6 lg:grid-cols-[0.75fr_1.25fr]">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.18em] text-emerald-300">
                Readiness-to-Mainnet Roadmap
              </p>
              <h2 className="mt-2 text-2xl font-black md:text-4xl">
                Dari belajar lokal ke partisipasi Stellar Mainnet.
              </h2>
              <p className="mt-3 text-sm leading-7 text-slate-400">
                Jalur ini menjaga agar Stellar tidak muncul sebagai trading/reward chain, tetapi sebagai jaringan real payment participation yang dipahami secara bertahap.
              </p>
            </div>
            <div className="grid gap-3">
              {roadmap.map((item, index) => (
                <div
                  key={item}
                  className="rounded-2xl border border-white/10 bg-slate-950/60 p-4"
                >
                  <p className="text-xs font-black text-sky-300">0{index + 1}</p>
                  <p className="mt-2 text-sm font-bold leading-6 text-slate-200">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="grid gap-4 lg:grid-cols-3">
          <Link
            href="/quests?track=stellar-readiness"
            className="rounded-[2rem] border border-amber-400/20 bg-amber-400/10 p-5 transition hover:scale-[1.01] md:p-6"
          >
            <p className="text-xs font-black uppercase tracking-[0.18em] text-amber-300">
              Quest
            </p>
            <h2 className="mt-2 text-2xl font-black">Stellar Readiness Practice</h2>
            <p className="mt-3 text-sm leading-7 text-slate-300">
              Latihan checklist/refleksi sebelum learner dinilai qualified untuk mainnet graduation.
            </p>
          </Link>
          <Link
            href="/stacks/stellar-readiness/passport-signal"
            className="rounded-[2rem] border border-emerald-400/20 bg-emerald-400/10 p-5 transition hover:scale-[1.01] md:p-6"
          >
            <p className="text-xs font-black uppercase tracking-[0.18em] text-emerald-300">
              Passport
            </p>
            <h2 className="mt-2 text-2xl font-black">Stellar Readiness Signal</h2>
            <p className="mt-3 text-sm leading-7 text-slate-300">
              Bagaimana readiness Stellar dicatat sebagai sinyal kesiapan, bukan klaim finansial.
            </p>
          </Link>
          <Link
            href="/passport"
            className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-5 transition hover:scale-[1.01] md:p-6"
          >
            <p className="text-xs font-black uppercase tracking-[0.18em] text-slate-400">
              Proof
            </p>
            <h2 className="mt-2 text-2xl font-black">Buka Paspor</h2>
            <p className="mt-3 text-sm leading-7 text-slate-400">
              Lihat bagaimana bukti belajar, partisipasi, dan kesiapan dirangkum.
            </p>
          </Link>
        </section>
      </section>
    </main>
  );
}
