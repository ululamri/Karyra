import Link from "next/link";

const transparencyItems = [
  {
    title: "GitHub terbuka",
    text:
      "Repositori Karyra menjadi pusat kode, README, dokumentasi teknis, issue ringan, dan riwayat pengembangan.",
  },
  {
    title: "Roadmap publik",
    text:
      "Roadmap menjelaskan arah pengembangan agar reviewer dan komunitas memahami prioritas Karyra.",
  },
  {
    title: "Changelog publik",
    text:
      "Changelog mencatat perubahan penting sehingga progres tidak hanya diklaim, tetapi dapat dilihat.",
  },
  {
    title: "Lisensi open source",
    text:
      "Lisensi MIT membuat arah open source lebih jelas dan mengurangi ketidakpastian saat reviewer menilai repository.",
  },
  {
    title: "Demo flow",
    text:
      "Alur demo membantu reviewer mengikuti pengalaman produk tanpa harus menebak route mana yang penting.",
  },
  {
    title: "Dokumentasi grant",
    text:
      "Dokumentasi arsitektur, metrik dampak, dan strategi Filecoin + Stellar menjadi sumber bahan proposal dan pitch deck.",
  },
];

const repositoryChecklist = [
  "README menjelaskan positioning blockchain-first",
  "README menjelaskan Filecoin + Stellar architecture",
  "LICENSE tersedia",
  "Roadmap dan changelog aktif",
  "Route demo flow tersedia",
  "Dokumentasi grant architecture tersedia",
  "Build command dan development command jelas",
  "Batasan MVP ditulis transparan",
];

export default function OpenSourcePage() {
  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <section className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-4 py-6 pb-24 md:px-8 md:py-12">
        <header>
          <p className="inline-flex rounded-full border border-emerald-400/20 bg-emerald-400/10 px-3 py-1 text-xs font-black uppercase tracking-[0.18em] text-emerald-300">
            Open Source & Transparansi
          </p>
          <h1 className="mt-4 max-w-4xl text-3xl font-black tracking-tight md:text-5xl">
            Repository harus siap dibaca reviewer.
          </h1>
          <p className="mt-4 max-w-3xl text-sm leading-7 text-slate-300 md:text-base md:leading-8">
            Karena Karyra diarahkan menuju grant, repositori perlu terlihat rapi, terbuka, dan konsisten dengan narasi produk. Halaman ini menjadi checklist agar GitHub, roadmap, changelog, dan lisensi mendukung proposal.
          </p>
        </header>

        <section className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {transparencyItems.map((item) => (
            <article
              key={item.title}
              className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-5 md:p-6"
            >
              <h2 className="text-xl font-black">{item.title}</h2>
              <p className="mt-3 text-sm leading-7 text-slate-400">{item.text}</p>
            </article>
          ))}
        </section>

        <section className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-5 md:p-7">
          <div className="grid gap-6 lg:grid-cols-[0.8fr_1.2fr]">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.18em] text-sky-300">
                Checklist Repository
              </p>
              <h2 className="mt-2 text-2xl font-black md:text-4xl">
                Siap untuk reviewer.
              </h2>
            </div>
            <div className="grid gap-3 md:grid-cols-2">
              {repositoryChecklist.map((item) => (
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

        <section className="grid gap-3 md:grid-cols-3">
          <Link
            href="/roadmap"
            className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-5 transition hover:border-emerald-400/40"
          >
            <h2 className="text-xl font-black">Roadmap</h2>
            <p className="mt-2 text-sm leading-6 text-slate-400">Lihat arah pengembangan.</p>
          </Link>
          <Link
            href="/changelog"
            className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-5 transition hover:border-emerald-400/40"
          >
            <h2 className="text-xl font-black">Changelog</h2>
            <p className="mt-2 text-sm leading-6 text-slate-400">Lihat riwayat perubahan.</p>
          </Link>
          <Link
            href="/docs/grant-architecture"
            className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-5 transition hover:border-emerald-400/40"
          >
            <h2 className="text-xl font-black">Grant Architecture</h2>
            <p className="mt-2 text-sm leading-6 text-slate-400">Lihat arsitektur grant.</p>
          </Link>
        </section>
      </section>
    </main>
  );
}
