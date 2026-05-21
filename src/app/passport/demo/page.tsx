import Link from "next/link";

const demoSteps = [
  {
    title: "Mulai dari kursus",
    href: "/courses",
    text: "Reviewer melihat bahwa Karyra tidak langsung membawa pengguna ke wallet atau transaksi.",
  },
  {
    title: "Buka pelajaran",
    href: "/lessons",
    text: "Materi diposisikan sebagai ruang baca bertahap untuk membangun pemahaman.",
  },
  {
    title: "Pantau dasbor",
    href: "/dashboard",
    text: "Progres pengguna terlihat sebagai perjalanan belajar yang bisa dilanjutkan.",
  },
  {
    title: "Baca Paspor Kesiapan",
    href: "/passport",
    text: "Bukti belajar, partisipasi, dan readiness dirangkum dalam satu identitas.",
  },
];

const passportSignals = [
  "Bukti Belajar dari kursus dan pelajaran yang selesai.",
  "Bukti Partisipasi dari workshop atau aktivitas komunitas.",
  "Bukti Kesiapan dari latihan, checklist, atau review sebelum praktik nyata.",
  "Readiness score sebagai ringkasan sederhana, bukan pengganti penilaian manusia.",
];

export default function PassportDemoPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <section className="mx-auto flex w-full max-w-7xl flex-col gap-8 px-4 py-6 pb-24 md:px-8 md:py-12">
        <header className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <div>
            <p className="inline-flex rounded-full border border-emerald-400/20 bg-emerald-400/10 px-3 py-1 text-xs font-black uppercase tracking-[0.18em] text-emerald-300">
              Demo Paspor Kesiapan
            </p>
            <h1 className="mt-4 max-w-4xl text-3xl font-black tracking-tight md:text-5xl lg:text-6xl">
              Cara membaca Paspor Kesiapan Karyra.
            </h1>
            <p className="mt-4 max-w-3xl text-sm leading-7 text-slate-300 md:text-lg md:leading-8">
              Halaman ini menjelaskan demo flow untuk reviewer: dari kursus, pelajaran, progres, sampai Paspor Kesiapan sebagai bukti bahwa pengguna sedang bergerak dari belajar menuju kesiapan.
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/demo-flow"
                className="inline-flex min-h-12 items-center justify-center rounded-2xl bg-emerald-400 px-6 py-3 text-sm font-black text-slate-950 transition hover:bg-emerald-300"
              >
                Buka Alur Demo
              </Link>
              <Link
                href="/docs/readiness-passport"
                className="inline-flex min-h-12 items-center justify-center rounded-2xl border border-white/10 bg-white/5 px-6 py-3 text-sm font-bold text-white transition hover:border-emerald-400/40"
              >
                Dokumentasi Paspor
              </Link>
            </div>
          </div>

          <div className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-5 md:p-6">
            <p className="text-xs font-black uppercase tracking-[0.18em] text-sky-300">
              Prinsip
            </p>
            <h2 className="mt-2 text-2xl font-black">
              Paspor bukan sekadar badge.
            </h2>
            <p className="mt-3 text-sm leading-7 text-slate-300">
              Paspor adalah ringkasan proses: apa yang dipelajari, aktivitas apa yang diikuti, dan sinyal kesiapan apa yang sudah muncul sebelum pengguna masuk ke praktik yang lebih teknis.
            </p>
          </div>
        </header>

        <section className="grid gap-4 md:grid-cols-4">
          {demoSteps.map((step, index) => (
            <Link
              key={step.href}
              href={step.href}
              className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-5 transition hover:border-emerald-400/40 hover:bg-emerald-400/10"
            >
              <p className="text-xs font-black uppercase tracking-wide text-emerald-300">
                0{index + 1}
              </p>
              <h2 className="mt-3 text-xl font-black">{step.title}</h2>
              <p className="mt-2 text-sm leading-6 text-slate-400">{step.text}</p>
              <p className="mt-4 text-sm font-black text-emerald-300">Buka →</p>
            </Link>
          ))}
        </section>

        <section className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-5 md:p-7">
          <div className="grid gap-6 lg:grid-cols-[0.8fr_1.2fr]">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.18em] text-emerald-300">
                Sinyal yang dibaca
              </p>
              <h2 className="mt-2 text-2xl font-black md:text-4xl">
                Dari proses menjadi bukti.
              </h2>
            </div>
            <div className="grid gap-3">
              {passportSignals.map((signal) => (
                <div
                  key={signal}
                  className="rounded-2xl border border-white/10 bg-slate-950/60 p-4 text-sm font-bold leading-6 text-slate-200"
                >
                  {signal}
                </div>
              ))}
            </div>
          </div>
        </section>
      </section>
    </main>
  );
}
