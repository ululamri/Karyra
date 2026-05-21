import Link from "next/link";

const pillars = [
  {
    title: "Bukti Belajar",
    intro:
      "Bukti bahwa pengguna telah mengikuti kursus dan pelajaran dasar sebelum masuk ke praktik yang lebih teknis.",
    points: [
      "Kursus dan pelajaran terstruktur",
      "Progres belajar yang tercatat",
      "XP dan badge sebagai sinyal belajar",
    ],
  },
  {
    title: "Bukti Partisipasi",
    intro:
      "Bukti bahwa pengguna ikut aktivitas komunitas, workshop, dan onboarding lokal.",
    points: [
      "Registrasi dan kehadiran workshop",
      "Aktivitas komunitas offline",
      "Bukti partisipasi yang bisa direview",
    ],
  },
  {
    title: "Bukti Kesiapan",
    intro:
      "Bukti bahwa pengguna lebih siap dan lebih aman sebelum menyentuh wallet, aset digital, atau transaksi nyata.",
    points: [
      "Quest dan checklist kesiapan",
      "Review admin sebelum bukti diterbitkan",
      "Paspor Kesiapan sebagai ringkasan akhir",
    ],
  },
];

const layers = [
  {
    title: "Stellar Readiness Track",
    label: "Kesiapan finansial",
    href: "/stacks/stellar-readiness",
    text:
      "Jalur latihan untuk wallet safety, memo awareness, stablecoin/payment literacy, dan pre-transaction confidence.",
  },
  {
    title: "Filecoin Proof Archive",
    label: "Arsip bukti",
    href: "/passport",
    text:
      "Arah pengarsipan proof record melalui manifest, checksum, CID, dan preservation layer.",
  },
];

export default function ProofSystemPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <section className="mx-auto flex w-full max-w-7xl flex-col gap-8 px-4 py-8 pb-24 md:px-8 md:py-14">
        <header className="max-w-4xl">
          <p className="text-xs font-black uppercase tracking-[0.22em] text-emerald-300">
            Sistem Bukti Karyra
          </p>
          <h1 className="mt-4 text-3xl font-black tracking-tight md:text-6xl">
            Dari belajar menjadi bukti kesiapan.
          </h1>
          <p className="mt-4 max-w-3xl text-sm leading-7 text-slate-300 md:text-lg md:leading-8">
            Karyra mengubah proses belajar dan partisipasi menjadi bukti kesiapan yang bisa dibaca, direview, dan dikembangkan menjadi identity layer komunitas.
          </p>
        </header>

        <section className="grid gap-4 lg:grid-cols-3">
          {pillars.map((pillar, index) => (
            <article
              key={pillar.title}
              className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-5 md:p-6"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-emerald-400 text-lg font-black text-slate-950">
                {index + 1}
              </div>
              <h2 className="mt-5 text-2xl font-black">{pillar.title}</h2>
              <p className="mt-3 text-sm leading-7 text-slate-400">
                {pillar.intro}
              </p>
              <div className="mt-5 grid gap-2">
                {pillar.points.map((point) => (
                  <div
                    key={point}
                    className="flex items-start gap-3 rounded-2xl bg-slate-950/60 p-3 text-sm font-bold leading-6 text-slate-200"
                  >
                    <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-emerald-400" />
                    {point}
                  </div>
                ))}
              </div>
            </article>
          ))}
        </section>

        <section className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-5 md:p-7">
          <div className="grid gap-6 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.18em] text-sky-300">
                Alur Produk
              </p>
              <h2 className="mt-2 text-2xl font-black md:text-4xl">
                Belajar → Paham → Siap → Terbukti
              </h2>
            </div>
            <div className="grid gap-3 md:grid-cols-4">
              {["Kursus", "Partisipasi", "Review", "Paspor"].map((step, index) => (
                <div key={step} className="rounded-2xl bg-slate-950/60 p-4">
                  <p className="text-xs font-black text-emerald-300">0{index + 1}</p>
                  <p className="mt-2 text-sm font-black text-white">{step}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="grid gap-4 lg:grid-cols-2">
          {layers.map((layer) => (
            <Link
              key={layer.title}
              href={layer.href}
              className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-5 transition hover:border-emerald-400/40 md:p-6"
            >
              <p className="text-xs font-black uppercase tracking-wide text-emerald-300">
                {layer.label}
              </p>
              <h2 className="mt-2 text-2xl font-black">{layer.title}</h2>
              <p className="mt-3 text-sm leading-7 text-slate-400">
                {layer.text}
              </p>
              <p className="mt-4 text-sm font-black text-emerald-300">Buka →</p>
            </Link>
          ))}
        </section>
      </section>
    </main>
  );
}
