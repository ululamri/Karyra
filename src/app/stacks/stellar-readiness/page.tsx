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
    title: "SEP-10 Awareness",
    text: "Memahami konsep autentikasi wallet: membuktikan kontrol akun tanpa membagikan secret key.",
  },
];

const integrationPhases = [
  {
    title: "Fase 1 — Materi dan checklist",
    text: "Stellar dipakai sebagai jalur belajar kesiapan wallet/payment tanpa transaksi real.",
  },
  {
    title: "Fase 2 — Address dan testnet reader",
    text: "Pengguna belajar membaca public key, network, dan transaction hash di testnet.",
  },
  {
    title: "Fase 3 — Wallet SDK practice",
    text: "Integrasi Stellar Wallet SDK untuk latihan wallet flow yang lebih nyata namun tetap aman.",
  },
  {
    title: "Fase 4 — Payment simulation",
    text: "Simulasi payment, memo, asset, dan trustline untuk membangun confidence sebelum praktik.",
  },
  {
    title: "Fase 5 — Soroban intro",
    text: "Smart contract diperkenalkan sebagai bagian teknikal kemudian, bukan pintu masuk awal.",
  },
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
              Jalur latihan aman sebelum wallet dan payment nyata.
            </h1>
            <p className="mt-4 max-w-3xl text-sm leading-7 text-slate-300 md:text-lg md:leading-8">
              Stellar diposisikan sebagai safe practice layer: tempat pemula belajar wallet safety, memo, asset, trustline, payment, dan autentikasi wallet secara bertahap sebelum masuk ke transaksi nyata.
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/courses"
                className="inline-flex min-h-12 items-center justify-center rounded-2xl bg-emerald-400 px-6 py-3 text-sm font-black text-slate-950 transition hover:bg-emerald-300"
              >
                Mulai dari Kursus
              </Link>
              <Link
                href="/docs/filecoin-stellar"
                className="inline-flex min-h-12 items-center justify-center rounded-2xl border border-white/10 bg-white/5 px-6 py-3 text-sm font-bold text-white transition hover:border-emerald-400/40"
              >
                Baca Strategi
              </Link>
            </div>
          </div>

          <div className="rounded-[2rem] border border-sky-400/20 bg-sky-400/10 p-5 md:p-6">
            <p className="text-xs font-black uppercase tracking-[0.18em] text-sky-300">
              Prinsip
            </p>
            <h2 className="mt-2 text-3xl font-black">
              Latihan dulu, transaksi kemudian.
            </h2>
            <p className="mt-3 text-sm leading-7 text-slate-300">
              Karyra tidak mendorong pemula langsung mengirim aset. Pengguna membangun pemahaman dan kebiasaan aman terlebih dahulu.
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
                Roadmap Integrasi
              </p>
              <h2 className="mt-2 text-2xl font-black md:text-4xl">
                Dari literasi ke praktik testnet.
              </h2>
              <p className="mt-3 text-sm leading-7 text-slate-400">
                Jalur ini menjaga agar Stellar tidak muncul sebagai tempelan, tetapi sebagai latihan kesiapan finansial blockchain yang aman.
              </p>
            </div>
            <div className="grid gap-3">
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
          </div>
        </section>
      </section>
    </main>
  );
}
