import Link from "next/link";

const testnetFlow = [
  {
    title: "Buat atau hubungkan akun testnet",
    text:
      "Pengguna belajar membedakan public key dan secret key. Public key boleh dibagikan, secret key tidak boleh dibagikan.",
  },
  {
    title: "Klaim testnet XLM",
    text:
      "Pengguna mencoba mendapatkan XLM testnet dari Friendbot agar memahami akun testnet tanpa risiko aset nyata.",
  },
  {
    title: "Baca saldo dan network",
    text:
      "Karyra menampilkan jaringan yang dipakai, saldo testnet, dan status akun agar pengguna tidak bingung antara testnet dan mainnet.",
  },
  {
    title: "Simulasi trustline",
    text:
      "Pengguna belajar bahwa asset non-XLM membutuhkan trustline sebelum bisa diterima, sehingga payment tidak gagal tanpa alasan yang jelas.",
  },
  {
    title: "Memo awareness",
    text:
      "Pengguna memahami kapan memo diperlukan, kenapa memo yang salah bisa berisiko, dan bagaimana membaca memo sebelum transaksi.",
  },
  {
    title: "Payment simulation",
    text:
      "Pengguna mencoba alur payment di testnet atau simulasi terpandu sebelum masuk ke transaksi nyata.",
  },
];

const interactiveFeatures = [
  "Friendbot claim button untuk testnet XLM",
  "Public key input dan network indicator",
  "Secret key warning sebelum latihan",
  "Trustline readiness checker",
  "Memo awareness quiz",
  "Payment simulation preview",
  "Transaction hash reader",
  "Readiness badge setelah checklist selesai",
];

const implementationPhases = [
  {
    title: "Fase 1 — Simulasi UI",
    text: "Checklist, quiz, dan penjelasan alur Stellar Testnet tanpa koneksi wallet real.",
  },
  {
    title: "Fase 2 — Friendbot integration",
    text: "Pengguna bisa memasukkan public key testnet dan mencoba klaim testnet XLM dari platform.",
  },
  {
    title: "Fase 3 — Trustline & transaction reader",
    text: "Karyra membaca trustline dan transaction hash dari Stellar Testnet untuk latihan verifikasi.",
  },
  {
    title: "Fase 4 — Payment simulation",
    text: "Pengguna mencoba alur payment testnet dengan guardrail, edukasi memo, dan readiness warning.",
  },
  {
    title: "Fase 5 — Wallet SDK / Freighter",
    text: "Integrasi wallet yang lebih nyata setelah pengguna memahami dasar keamanan dan testnet.",
  },
];

export default function StellarTestnetFlowPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <section className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-4 py-6 pb-24 md:px-8 md:py-12">
        <header>
          <p className="inline-flex rounded-full border border-sky-400/20 bg-sky-400/10 px-3 py-1 text-xs font-black uppercase tracking-[0.18em] text-sky-300">
            Stellar Testnet Flow
          </p>
          <h1 className="mt-4 max-w-4xl text-3xl font-black tracking-tight md:text-5xl">
            Jalur interaktif untuk payment readiness.
          </h1>
          <p className="mt-4 max-w-3xl text-sm leading-7 text-slate-300 md:text-base md:leading-8">
            Stellar Readiness Track harus berkembang dari simulasi edukatif menjadi latihan testnet yang interaktif. Tujuannya bukan membuat pengguna langsung transaksi, tetapi membangun kepercayaan diri dan kebiasaan aman sebelum masuk ke aset nyata.
          </p>
        </header>

        <section className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {testnetFlow.map((step, index) => (
            <article
              key={step.title}
              className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-5 md:p-6"
            >
              <p className="text-xs font-black uppercase tracking-wide text-sky-300">
                0{index + 1}
              </p>
              <h2 className="mt-2 text-xl font-black">{step.title}</h2>
              <p className="mt-3 text-sm leading-7 text-slate-400">{step.text}</p>
            </article>
          ))}
        </section>

        <section className="grid gap-4 lg:grid-cols-[0.85fr_1.15fr]">
          <article className="rounded-[2rem] border border-sky-400/20 bg-sky-400/10 p-5 md:p-6">
            <p className="text-xs font-black uppercase tracking-[0.18em] text-sky-300">
              Fitur Interaktif
            </p>
            <h2 className="mt-2 text-2xl font-black">
              Dari membaca menjadi mencoba.
            </h2>
            <div className="mt-5 grid gap-3">
              {interactiveFeatures.map((feature) => (
                <p
                  key={feature}
                  className="rounded-2xl bg-slate-950/60 p-4 text-sm font-bold leading-6 text-slate-200"
                >
                  {feature}
                </p>
              ))}
            </div>
          </article>

          <article className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-5 md:p-6">
            <p className="text-xs font-black uppercase tracking-[0.18em] text-emerald-300">
              Rencana Implementasi
            </p>
            <div className="mt-5 grid gap-3">
              {implementationPhases.map((phase, index) => (
                <div
                  key={phase.title}
                  className="rounded-2xl border border-white/10 bg-slate-950/60 p-4"
                >
                  <p className="text-xs font-black text-sky-300">0{index + 1}</p>
                  <h3 className="mt-2 font-black">{phase.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-slate-400">{phase.text}</p>
                </div>
              ))}
            </div>
          </article>
        </section>

        <section className="rounded-[2rem] border border-amber-400/20 bg-amber-400/10 p-5 md:p-6">
          <h2 className="text-2xl font-black">Guardrail utama</h2>
          <p className="mt-3 text-sm leading-7 text-slate-300">
            Semua latihan awal harus menggunakan Stellar Testnet. Jangan meminta secret key mainnet, jangan mendorong transaksi aset nyata, dan selalu tampilkan penanda jaringan agar pengguna memahami perbedaan testnet dan mainnet.
          </p>
          <Link
            href="/stacks/stellar-readiness"
            className="mt-5 inline-flex min-h-11 items-center rounded-2xl bg-white px-4 py-2.5 text-sm font-black text-slate-950"
          >
            Buka Stellar Readiness Track
          </Link>
        </section>
      </section>
    </main>
  );
}
