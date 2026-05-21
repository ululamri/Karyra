import Link from "next/link";

const principles = [
  {
    title: "Blockchain-first",
    text: "Karyra memulai dari blockchain sebagai fondasi kepercayaan digital, lalu bergerak ke cryptocurrency, wallet, aset digital, dan Web3 sebagai bagian dari ekosistem yang lebih luas.",
  },
  {
    title: "Lokal dan bertahap",
    text: "Karyra dirancang untuk masyarakat lokal dan pemula yang membutuhkan bahasa sederhana, alur jelas, dan konteks yang dekat dengan kehidupan sehari-hari.",
  },
  {
    title: "Non-teknikal dulu, teknikal kemudian",
    text: "Aspek teknikal tidak dihilangkan. Karyra membangun pemahaman manusiawi terlebih dahulu, lalu memperkenalkan praktik teknikal setelah konteks dan rasa aman terbentuk.",
  },
  {
    title: "Readiness-first",
    text: "Tujuan Karyra bukan mendorong transaksi cepat, tetapi membantu pengguna membangun pemahaman, kebiasaan aman, partisipasi komunitas, dan bukti kesiapan.",
  },
];

const productAreas = [
  { title: "Kursus", href: "/courses", text: "Jalur belajar utama yang berfungsi sebagai syllabus." },
  { title: "Pelajaran", href: "/lessons", text: "Ruang baca untuk memahami konsep kecil secara bertahap." },
  { title: "Dashboard", href: "/dashboard", text: "Ruang aktivitas harian untuk melihat progres dan langkah berikutnya." },
  { title: "Paspor", href: "/passport", text: "Ringkasan bukti belajar, partisipasi, dan kesiapan." },
  { title: "Quest", href: "/quests", text: "Latihan pendukung untuk refleksi, review, dan apresiasi proses." },
  { title: "Workshop", href: "/workshops", text: "Jembatan komunitas lokal menuju Proof-of-Participation." },
];

const trustNotes = [
  "Karyra bukan platform trading.",
  "Karyra tidak menjanjikan keuntungan finansial.",
  "Reward diposisikan sebagai apresiasi proses belajar, bukan insentif spekulatif.",
  "Mainnet adalah tahap kelulusan terbimbing, bukan pintu pertama untuk pemula.",
];

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <section className="mx-auto flex w-full max-w-7xl flex-col gap-8 px-4 py-6 pb-24 md:px-8 md:py-12">
        <header className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <div>
            <p className="inline-flex rounded-full border border-emerald-400/20 bg-emerald-400/10 px-3 py-1 text-xs font-black uppercase tracking-[0.18em] text-emerald-300">
              Tentang Karyra
            </p>
            <h1 className="mt-4 max-w-4xl text-3xl font-black tracking-tight md:text-5xl lg:text-6xl">
              Ruang kesiapan blockchain untuk masyarakat lokal.
            </h1>
            <p className="mt-4 max-w-3xl text-sm leading-7 text-slate-300 md:text-lg md:leading-8">
              Karyra dibangun karena banyak masyarakat lokal mengenal blockchain dari informasi yang tidak utuh: trading, penipuan, uang cepat, risiko tinggi, atau istilah teknis yang terasa jauh. Karyra menata ulang pintu masuknya melalui pembelajaran yang sederhana, bertahap, dan bisa dibuktikan.
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <Link href="/learner" className="inline-flex min-h-12 items-center justify-center rounded-2xl bg-emerald-400 px-6 py-3 text-sm font-black text-slate-950 transition hover:bg-emerald-300">
                Masuk ke Ruang Belajar
              </Link>
              <Link href="/docs/product-narrative" className="inline-flex min-h-12 items-center justify-center rounded-2xl border border-white/10 bg-white/5 px-6 py-3 text-sm font-bold text-white transition hover:border-emerald-400/40">
                Baca Narasi Produk
              </Link>
            </div>
          </div>
          <div className="rounded-[2rem] border border-emerald-400/20 bg-emerald-400/10 p-5 md:p-6">
            <p className="text-xs font-black uppercase tracking-[0.18em] text-emerald-300">
              Alur utama
            </p>
            <h2 className="mt-2 text-3xl font-black">
              Belajar → Paham → Siap → Terbukti
            </h2>
            <p className="mt-3 text-sm leading-7 text-slate-300">
              Karyra membantu pengguna bergerak dari pemahaman dasar menuju kesiapan yang bisa dilihat melalui progres, aktivitas komunitas, dan Paspor Kesiapan.
            </p>
          </div>
        </header>

        <section className="grid gap-4 md:grid-cols-2">
          {principles.map((principle) => (
            <article key={principle.title} className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-5 md:p-6">
              <h2 className="text-2xl font-black">{principle.title}</h2>
              <p className="mt-3 text-sm leading-7 text-slate-400">{principle.text}</p>
            </article>
          ))}
        </section>

        <section className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-5 md:p-7">
          <div className="grid gap-6 lg:grid-cols-[0.8fr_1.2fr]">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.18em] text-sky-300">
                Area produk
              </p>
              <h2 className="mt-2 text-2xl font-black md:text-4xl">
                Satu ekosistem belajar, partisipasi, dan bukti.
              </h2>
            </div>
            <div className="grid gap-3 md:grid-cols-2">
              {productAreas.map((area) => (
                <Link key={area.href} href={area.href} className="rounded-2xl border border-white/10 bg-slate-950/60 p-4 transition hover:border-emerald-400/40 hover:bg-emerald-400/10">
                  <h3 className="font-black">{area.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-slate-400">{area.text}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="rounded-[2rem] border border-amber-400/20 bg-amber-400/10 p-5 md:p-6">
          <p className="text-xs font-black uppercase tracking-[0.18em] text-amber-300">
            Catatan kepercayaan publik
          </p>
          <div className="mt-4 grid gap-3 md:grid-cols-2">
            {trustNotes.map((note) => (
              <p key={note} className="rounded-2xl bg-slate-950/60 p-4 text-sm font-bold leading-6 text-slate-200">
                {note}
              </p>
            ))}
          </div>
        </section>
      </section>
    </main>
  );
}
