import Link from "next/link";

const readinessItems = [
  {
    area: "Produk berjalan",
    status: "Kuat",
    note: "Karyra sudah memiliki halaman publik, kursus, pelajaran, dasbor, paspor, workshop, dan admin tools.",
  },
  {
    area: "Narasi utama",
    status: "Semakin kuat",
    note: "Arah sudah blockchain-first, lokal, pemula, dan readiness-first.",
  },
  {
    area: "Paspor Kesiapan",
    status: "Perlu dipoles",
    note: "Sudah ada dasar. Perlu dibuat makin kuat sebagai identitas pembeda utama.",
  },
  {
    area: "Demo flow",
    status: "Disiapkan",
    note: "Reviewer bisa mengikuti alur dari Beranda ke Kursus, Pelajaran, Dasbor, Paspor, dan Dokumentasi.",
  },
  {
    area: "Dokumentasi",
    status: "Mulai siap",
    note: "Dokumentasi narasi, Paspor, dan kesiapan grant sudah mulai dipusatkan.",
  },
  {
    area: "Pitch deck / whitepaper",
    status: "Belum final",
    note: "Sebaiknya dibuat setelah app makin matang dan screenshot demo sudah stabil.",
  },
];

export default function GrantReadinessDocsPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <section className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-4 py-6 pb-24 md:px-8 md:py-12">
        <header className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <div>
            <p className="inline-flex rounded-full border border-emerald-400/20 bg-emerald-400/10 px-3 py-1 text-xs font-black uppercase tracking-[0.18em] text-emerald-300">
              Kesiapan Grant
            </p>
            <h1 className="mt-4 max-w-4xl text-3xl font-black tracking-tight md:text-5xl lg:text-6xl">
              Checklist menuju grant-ready.
            </h1>
            <p className="mt-4 max-w-3xl text-sm leading-7 text-slate-300 md:text-lg md:leading-8">
              Halaman ini menjadi dokumentasi internal-publik ringan untuk menilai kesiapan Karyra sebelum masuk ke pitch deck, whitepaper, dan aplikasi grant.
            </p>
          </div>

          <div className="rounded-[2rem] border border-emerald-400/20 bg-emerald-400/10 p-5 md:p-6">
            <p className="text-xs font-black uppercase tracking-[0.18em] text-emerald-300">
              Estimasi
            </p>
            <h2 className="mt-2 text-5xl font-black">±70%</h2>
            <p className="mt-3 text-sm leading-7 text-slate-300">
              Setelah Paspor Kesiapan, demo flow, dokumentasi, screenshot, dan pitch material dipoles, target realistis berikutnya adalah 85%+.
            </p>
          </div>
        </header>

        <section className="grid gap-3">
          {readinessItems.map((item) => (
            <article
              key={item.area}
              className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-5 md:p-6"
            >
              <div className="grid gap-3 md:grid-cols-[0.28fr_0.22fr_0.5fr] md:items-start">
                <h2 className="text-xl font-black">{item.area}</h2>
                <p className="inline-flex w-fit rounded-full border border-emerald-400/20 bg-emerald-400/10 px-3 py-1 text-xs font-black text-emerald-300">
                  {item.status}
                </p>
                <p className="text-sm leading-7 text-slate-400">{item.note}</p>
              </div>
            </article>
          ))}
        </section>

        <section className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-5 md:p-6">
          <h2 className="text-2xl font-black">Langkah berikutnya</h2>
          <p className="mt-3 text-sm leading-7 text-slate-400">
            Setelah batch ini direview lokal dan build bersih, langkah paling logis adalah memperkuat visual Paspor Kesiapan, menyiapkan screenshot demo, lalu membuat pitch deck/whitepaper saat narasi produk sudah stabil.
          </p>
          <div className="mt-5 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/demo-flow"
              className="inline-flex min-h-11 items-center justify-center rounded-2xl bg-emerald-400 px-4 py-2.5 text-sm font-black text-slate-950"
            >
              Buka Alur Demo
            </Link>
            <Link
              href="/docs/product-narrative"
              className="inline-flex min-h-11 items-center justify-center rounded-2xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm font-black text-white"
            >
              Baca Narasi Produk
            </Link>
          </div>
        </section>
      </section>
    </main>
  );
}
