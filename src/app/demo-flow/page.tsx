import Link from "next/link";

const demoFlow = [
  {
    title: "Beranda",
    href: "/",
    goal: "Melihat wajah utama Karyra sebagai ruang kesiapan blockchain lokal.",
    check: "Narasi blockchain-first, bukan langsung crypto atau reward.",
  },
  {
    title: "Kursus",
    href: "/courses",
    goal: "Melihat jalur belajar sebagai syllabus utama.",
    check: "Kursus menjelaskan urutan belajar sebelum masuk teknikal.",
  },
  {
    title: "Pelajaran",
    href: "/lessons",
    goal: "Melihat ruang baca dan materi pendek.",
    check: "Pelajaran terasa berbeda dari kursus dan berfungsi sebagai reader/player.",
  },
  {
    title: "Dasbor",
    href: "/dashboard",
    goal: "Melihat progres, kursus aktif, dan langkah berikutnya.",
    check: "Pengguna tahu apa yang harus dilanjutkan.",
  },
  {
    title: "Paspor",
    href: "/passport",
    goal: "Melihat bukti belajar, partisipasi, dan kesiapan.",
    check: "Readiness tidak diklaim kosong, tetapi dirangkum dari aktivitas.",
  },
  {
    title: "Dokumentasi",
    href: "/docs",
    goal: "Melihat penjelasan produk untuk reviewer.",
    check: "Reviewer memahami masalah, solusi, dan arah pengembangan.",
  },
];

export default function DemoFlowPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <section className="mx-auto flex w-full max-w-7xl flex-col gap-8 px-4 py-6 pb-24 md:px-8 md:py-12">
        <header className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <div>
            <p className="inline-flex rounded-full border border-emerald-400/20 bg-emerald-400/10 px-3 py-1 text-xs font-black uppercase tracking-[0.18em] text-emerald-300">
              Alur Demo
            </p>
            <h1 className="mt-4 max-w-4xl text-3xl font-black tracking-tight md:text-5xl lg:text-6xl">
              Rute singkat untuk memahami Karyra.
            </h1>
            <p className="mt-4 max-w-3xl text-sm leading-7 text-slate-300 md:text-lg md:leading-8">
              Halaman ini disiapkan agar reviewer grant bisa mengikuti alur produk tanpa menebak. Fokusnya: pemahaman blockchain, jalur belajar, progres, dan Paspor Kesiapan.
            </p>
          </div>

          <div className="rounded-[2rem] border border-emerald-400/20 bg-emerald-400/10 p-5 md:p-6">
            <p className="text-xs font-black uppercase tracking-[0.18em] text-emerald-300">
              Urutan utama
            </p>
            <h2 className="mt-2 text-3xl font-black">
              Beranda → Kursus → Pelajaran → Dasbor → Paspor
            </h2>
            <p className="mt-3 text-sm leading-7 text-slate-300">
              Ini adalah alur produk publik yang perlu terasa matang sebelum pitch deck atau whitepaper dibuat.
            </p>
          </div>
        </header>

        <section className="grid gap-4">
          {demoFlow.map((step, index) => (
            <Link
              key={step.href}
              href={step.href}
              className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-5 transition hover:border-emerald-400/40 hover:bg-emerald-400/10 md:p-6"
            >
              <div className="grid gap-4 lg:grid-cols-[0.25fr_0.75fr_1fr] lg:items-start">
                <div>
                  <p className="text-xs font-black uppercase tracking-wide text-emerald-300">
                    0{index + 1}
                  </p>
                  <h2 className="mt-2 text-2xl font-black">{step.title}</h2>
                </div>
                <div>
                  <p className="text-xs font-black uppercase tracking-wide text-slate-500">
                    Tujuan
                  </p>
                  <p className="mt-2 text-sm leading-6 text-slate-300">{step.goal}</p>
                </div>
                <div>
                  <p className="text-xs font-black uppercase tracking-wide text-slate-500">
                    Yang dicek
                  </p>
                  <p className="mt-2 text-sm leading-6 text-slate-300">{step.check}</p>
                </div>
              </div>
            </Link>
          ))}
        </section>
      </section>
    </main>
  );
}
