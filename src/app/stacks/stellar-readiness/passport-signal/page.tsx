import Link from "next/link";

const signals = [
  {
    title: "Learning Signal",
    text: "Learner memahami dasar blockchain, wallet safety, dan perbedaan testnet/mainnet.",
  },
  {
    title: "Practice Signal",
    text: "Learner menyelesaikan checklist/refleksi memo, asset issuer, trustline, dan payment-readiness.",
  },
  {
    title: "Review Signal",
    text: "Submission learner direview sebelum dicatat sebagai bukti kesiapan.",
  },
  {
    title: "Mainnet Signal",
    text: "Jika qualified, learner dapat mengikuti opt-in small-value Mainnet Graduation dan mencatat hasilnya di Paspor.",
  },
];

export default function StellarPassportSignalPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <section className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-4 py-6 pb-24 md:px-8 md:py-12">
        <header className="grid gap-6 lg:grid-cols-[1fr_0.8fr] lg:items-end">
          <div>
            <p className="inline-flex rounded-full border border-emerald-400/20 bg-emerald-400/10 px-3 py-1 text-xs font-black uppercase tracking-[0.18em] text-emerald-300">
              Stellar Passport Signal
            </p>
            <h1 className="mt-4 max-w-4xl text-3xl font-black tracking-tight md:text-5xl">
              Stellar readiness dicatat sebagai bukti kesiapan, bukan klaim finansial.
            </h1>
            <p className="mt-4 max-w-3xl text-sm leading-7 text-slate-300 md:text-lg md:leading-8">
              Paspor Kesiapan membantu reviewer, fasilitator, dan learner melihat bahwa partisipasi Stellar dilakukan lewat proses: belajar, latihan, review, lalu mainnet graduation secara opt-in.
            </p>
          </div>

          <div className="rounded-[2rem] border border-emerald-400/20 bg-emerald-400/10 p-5 md:p-6">
            <p className="text-xs font-black uppercase tracking-[0.18em] text-emerald-300">
              Signal Model
            </p>
            <h2 className="mt-2 text-2xl font-black">Proof-of-Readiness</h2>
            <p className="mt-3 text-sm leading-7 text-slate-300">
              Sinyal ini membuktikan proses kesiapan, bukan kepemilikan aset atau performa finansial.
            </p>
          </div>
        </header>

        <section className="grid gap-4 md:grid-cols-2">
          {signals.map((signal, index) => (
            <article key={signal.title} className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-5 md:p-6">
              <p className="text-xs font-black uppercase tracking-wide text-emerald-300">
                0{index + 1}
              </p>
              <h2 className="mt-2 text-xl font-black">{signal.title}</h2>
              <p className="mt-3 text-sm leading-7 text-slate-400">{signal.text}</p>
            </article>
          ))}
        </section>

        <section className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-5 md:p-6">
          <p className="text-xs font-black uppercase tracking-[0.18em] text-sky-300">
            For SCF Review
          </p>
          <h2 className="mt-2 text-2xl font-black">
            Mengapa ini penting untuk Stellar?
          </h2>
          <p className="mt-3 text-sm leading-7 text-slate-300">
            Karyra tidak hanya membuat pengguna membuka wallet. Karyra membuat pemula lokal melewati proses kesiapan sebelum wallet connection dan mainnet participation. Ini mengurangi risiko onboarding mentah dan membantu menciptakan pengguna Stellar yang lebih paham, aman, dan bertanggung jawab.
          </p>
        </section>

        <div className="flex flex-col gap-3 sm:flex-row">
          <Link
            href="/passport"
            className="inline-flex min-h-12 items-center justify-center rounded-2xl bg-emerald-400 px-6 py-3 text-sm font-black text-slate-950"
          >
            Buka Paspor
          </Link>
          <Link
            href="/stacks/stellar-readiness/mainnet-graduation"
            className="inline-flex min-h-12 items-center justify-center rounded-2xl border border-white/10 bg-white/5 px-6 py-3 text-sm font-bold text-white"
          >
            Mainnet Graduation
          </Link>
        </div>
      </section>
    </main>
  );
}
