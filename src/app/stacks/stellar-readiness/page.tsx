import Link from "next/link";

const trackModules = [
  {
    title: "Wallet Safety",
    text: "Memahami public key, secret key, seed phrase, dan kenapa pengguna tidak boleh membagikan rahasia wallet.",
  },
  {
    title: "Testnet Practice",
    text: "Latihan membaca address dan transaksi di testnet sebelum menyentuh aset nyata.",
  },
  {
    title: "Memo Awareness",
    text: "Mengenali memo, kapan memo diperlukan, dan kenapa memo yang salah bisa berisiko.",
  },
  {
    title: "Asset & Trustline",
    text: "Memahami asset, issuer, trustline, dan hubungan aset dengan kepercayaan.",
  },
  {
    title: "Payment Readiness",
    text: "Membaca payment flow secara aman sebelum pengguna mencoba transaksi nyata.",
  },
  {
    title: "Guided Mainnet Experience",
    text: "Setelah readiness selesai, pengguna diperkenalkan ke Stellar Mainnet secara terbimbing dengan guardrail yang jelas.",
  },
];

const graduationPath = [
  "Belajar wallet safety dan network awareness.",
  "Klaim testnet XLM melalui Friendbot.",
  "Latihan memo, trustline, asset, dan payment simulation.",
  "Selesaikan Stellar Payment Readiness.",
  "Unlock guided Stellar Mainnet experience.",
  "Catat pengalaman readiness ke Paspor Kesiapan.",
];

export default function StellarReadinessPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <section className="mx-auto flex w-full max-w-7xl flex-col gap-8 px-4 py-6 pb-24 md:px-8 md:py-12">
        <header className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <div>
            <p className="inline-flex rounded-full border border-sky-400/20 bg-sky-400/10 px-3 py-1 text-xs font-black uppercase tracking-[0.18em] text-sky-300">
              Stellar Readiness Track
            </p>
            <h1 className="mt-4 max-w-4xl text-3xl font-black tracking-tight md:text-5xl lg:text-6xl">
              Jalur latihan aman sebelum pengalaman mainnet.
            </h1>
            <p className="mt-4 max-w-3xl text-sm leading-7 text-slate-300 md:text-lg md:leading-8">
              Stellar Testnet digunakan untuk latihan wallet dan payment readiness. Setelah pengguna menyelesaikan readiness track, Stellar Mainnet dapat diperkenalkan sebagai pengalaman financial access yang terbimbing.
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/docs/stellar-testnet-flow"
                className="inline-flex min-h-12 items-center justify-center rounded-2xl bg-emerald-400 px-6 py-3 text-sm font-black text-slate-950 transition hover:bg-emerald-300"
              >
                Baca Testnet Flow
              </Link>
              <Link
                href="/docs/mainnet-graduation"
                className="inline-flex min-h-12 items-center justify-center rounded-2xl border border-white/10 bg-white/5 px-6 py-3 text-sm font-bold text-white transition hover:border-emerald-400/40"
              >
                Graduation Model
              </Link>
            </div>
          </div>

          <div className="rounded-[2rem] border border-sky-400/20 bg-sky-400/10 p-5 md:p-6">
            <p className="text-xs font-black uppercase tracking-[0.18em] text-sky-300">
              Prinsip
            </p>
            <h2 className="mt-2 text-3xl font-black">
              Testnet dulu, mainnet kemudian.
            </h2>
            <p className="mt-3 text-sm leading-7 text-slate-300">
              Karyra tidak mendorong pemula langsung mengirim aset. Pengguna membangun pemahaman, rasa aman, dan readiness sebelum mainnet.
            </p>
          </div>
        </header>

        <section className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {trackModules.map((module) => (
            <article
              key={module.title}
              className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-5 md:p-6"
            >
              <h2 className="text-xl font-black">{module.title}</h2>
              <p className="mt-3 text-sm leading-7 text-slate-400">{module.text}</p>
            </article>
          ))}
        </section>

        <section className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-5 md:p-7">
          <div className="grid gap-6 lg:grid-cols-[0.75fr_1.25fr]">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.18em] text-emerald-300">
                Graduation Path
              </p>
              <h2 className="mt-2 text-2xl font-black md:text-4xl">
                Dari latihan ke financial access.
              </h2>
              <p className="mt-3 text-sm leading-7 text-slate-400">
                Jalur ini menjaga agar Stellar tidak muncul sebagai reward chain, tetapi sebagai latihan kesiapan finansial blockchain yang aman.
              </p>
            </div>
            <div className="grid gap-3">
              {graduationPath.map((item, index) => (
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
      </section>
    </main>
  );
}
