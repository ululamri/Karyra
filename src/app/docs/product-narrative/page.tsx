import Link from "next/link";

const problemPoints = [
  "Banyak masyarakat lokal mengenal blockchain dari informasi yang tidak utuh.",
  "Blockchain sering disamakan dengan trading, uang cepat, penipuan, atau risiko tinggi.",
  "Istilah teknis membuat pemula takut sebelum benar-benar memahami konteksnya.",
  "Minimnya literasi lokal membuat misinformation mudah menyebar.",
];

const approachPoints = [
  "Mulai dari blockchain sebagai fondasi kepercayaan digital.",
  "Masuk ke cryptocurrency sebagai salah satu penerapan blockchain.",
  "Perkenalkan wallet, aset digital, dan Web3 setelah konteks dasar terbentuk.",
  "Gunakan kursus, pelajaran, komunitas, quest pendukung, dan Paspor Kesiapan sebagai alur bertahap.",
];

const productModel = [
  {
    title: "Course/Lesson",
    text: "Inti belajar Karyra. Pengguna memahami konsep secara bertahap.",
  },
  {
    title: "Dashboard",
    text: "Ruang aktivitas harian untuk melihat progres dan langkah berikutnya.",
  },
  {
    title: "Quest/Reward",
    text: "Latihan pendukung. Reward adalah apresiasi proses, bukan janji penghasilan.",
  },
  {
    title: "Workshop",
    text: "Jembatan komunitas lokal untuk Proof-of-Participation.",
  },
  {
    title: "Passport",
    text: "Ringkasan bukti belajar, partisipasi, kesiapan, badge, dan proof record.",
  },
  {
    title: "Filecoin + Stellar",
    text: "Layer strategis untuk proof archive dan readiness finansial blockchain.",
  },
];

export default function ProductNarrativeDocsPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <section className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-4 py-6 pb-24 md:px-8 md:py-12">
        <header>
          <p className="inline-flex rounded-full border border-emerald-400/20 bg-emerald-400/10 px-3 py-1 text-xs font-black uppercase tracking-[0.18em] text-emerald-300">
            Narasi Produk
          </p>
          <h1 className="mt-4 max-w-4xl text-3xl font-black tracking-tight md:text-5xl">
            Karyra dibangun dari masalah literasi blockchain lokal.
          </h1>
          <p className="mt-4 max-w-3xl text-sm leading-7 text-slate-300 md:text-base md:leading-8">
            Karyra bukan sekadar platform Web3, bukan sekadar quest, dan bukan sekadar reward. Dasar utamanya adalah membantu masyarakat lokal memahami blockchain dari fondasi yang lebih manusiawi.
          </p>
        </header>

        <section className="grid gap-4 lg:grid-cols-2">
          <article className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-5 md:p-6">
            <p className="text-xs font-black uppercase tracking-wide text-rose-300">
              Masalah
            </p>
            <h2 className="mt-2 text-2xl font-black">
              Kebingungan dan ketakutan.
            </h2>
            <div className="mt-5 grid gap-3">
              {problemPoints.map((point) => (
                <p key={point} className="rounded-2xl bg-slate-950/60 p-4 text-sm leading-6 text-slate-300">
                  {point}
                </p>
              ))}
            </div>
          </article>

          <article className="rounded-[2rem] border border-emerald-400/20 bg-emerald-400/10 p-5 md:p-6">
            <p className="text-xs font-black uppercase tracking-wide text-emerald-300">
              Pendekatan
            </p>
            <h2 className="mt-2 text-2xl font-black">
              Non-teknikal dulu, teknikal kemudian.
            </h2>
            <div className="mt-5 grid gap-3">
              {approachPoints.map((point) => (
                <p key={point} className="rounded-2xl bg-slate-950/60 p-4 text-sm leading-6 text-slate-200">
                  {point}
                </p>
              ))}
            </div>
          </article>
        </section>

        <section className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-5 md:p-6">
          <h2 className="text-2xl font-black">Model produk</h2>
          <div className="mt-5 grid gap-3 md:grid-cols-2 lg:grid-cols-3">
            {productModel.map((item) => (
              <article key={item.title} className="rounded-2xl border border-white/10 bg-slate-950/60 p-4">
                <h3 className="font-black text-emerald-300">{item.title}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-400">{item.text}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="rounded-[2rem] border border-emerald-400/20 bg-emerald-400/10 p-5 md:p-6">
          <h2 className="text-2xl font-black">Kalimat inti</h2>
          <p className="mt-3 text-lg leading-8 text-slate-200">
            Karyra membantu masyarakat lokal keluar dari kebingungan, ketakutan, dan salah paham tentang blockchain dengan alur belajar bertahap: Belajar → Paham → Siap → Terbukti.
          </p>
          <div className="mt-5 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/courses"
              className="inline-flex min-h-11 items-center justify-center rounded-2xl bg-emerald-400 px-4 py-2.5 text-sm font-black text-slate-950"
            >
              Mulai dari Kursus
            </Link>
            <Link
              href="/roadmap"
              className="inline-flex min-h-11 items-center justify-center rounded-2xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm font-black text-white"
            >
              Lihat Roadmap
            </Link>
          </div>
        </section>
      </section>
    </main>
  );
}
