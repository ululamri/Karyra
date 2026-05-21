import Link from "next/link";

const sections = [
  {
    title: "Apa itu Paspor Kesiapan?",
    text:
      "Paspor Kesiapan adalah ringkasan proses belajar dan partisipasi pengguna. Ia tidak dibuat untuk terlihat seperti sertifikat kosong, tetapi sebagai catatan yang menunjukkan bagaimana seseorang bergerak dari belajar menuju kesiapan.",
  },
  {
    title: "Mengapa bukan langsung wallet?",
    text:
      "Banyak pemula takut atau ragu karena informasi blockchain sering datang dalam bentuk potongan: trading, penipuan, uang cepat, atau istilah teknis. Karyra memulai dari pemahaman sebelum praktik.",
  },
  {
    title: "Apa yang dibuktikan?",
    text:
      "Paspor membaca bukti belajar dari kursus, bukti partisipasi dari aktivitas komunitas, dan bukti kesiapan dari latihan atau review sebelum praktik nyata.",
  },
  {
    title: "Apa hubungannya dengan Filecoin dan Stellar?",
    text:
      "Filecoin dapat menjadi arah arsip bukti jangka panjang, sementara Stellar dapat menjadi jalur readiness finansial seperti wallet safety, memo awareness, dan payment confidence. Keduanya mendukung Paspor, bukan menggantikan fondasi belajar blockchain.",
  },
];

const signals = [
  "Bukti Belajar: kursus dan pelajaran yang diselesaikan.",
  "Bukti Partisipasi: workshop atau aktivitas komunitas.",
  "Bukti Kesiapan: latihan, checklist, atau review readiness.",
  "Readiness score: ringkasan sederhana agar progres mudah dibaca.",
  "Badge: identitas belajar yang muncul dari proses, bukan hadiah kosong.",
  "Arsip bukti: arah penyimpanan dan verifikasi jangka panjang.",
];

export default function ReadinessPassportDocsPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <section className="mx-auto flex w-full max-w-5xl flex-col gap-8 px-4 py-6 pb-24 md:px-8 md:py-12">
        <header>
          <p className="text-xs font-black uppercase tracking-[0.22em] text-emerald-300">
            Dokumentasi
          </p>
          <h1 className="mt-4 text-3xl font-black tracking-tight md:text-5xl">
            Paspor Kesiapan.
          </h1>
          <p className="mt-4 max-w-3xl text-sm leading-7 text-slate-300 md:text-base md:leading-8">
            Paspor Kesiapan adalah salah satu bagian paling penting dari Karyra karena ia mengubah aktivitas belajar menjadi bukti proses yang bisa dibaca oleh pengguna, fasilitator, komunitas, dan reviewer.
          </p>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/passport"
              className="inline-flex min-h-12 items-center justify-center rounded-2xl bg-emerald-400 px-6 py-3 text-sm font-black text-slate-950 transition hover:bg-emerald-300"
            >
              Buka Paspor
            </Link>
            <Link
              href="/passport/demo"
              className="inline-flex min-h-12 items-center justify-center rounded-2xl border border-white/10 bg-white/5 px-6 py-3 text-sm font-bold text-white transition hover:border-emerald-400/40"
            >
              Lihat Demo
            </Link>
          </div>
        </header>

        <section className="grid gap-4">
          {sections.map((section) => (
            <article
              key={section.title}
              className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-5 md:p-6"
            >
              <h2 className="text-2xl font-black">{section.title}</h2>
              <p className="mt-3 text-sm leading-7 text-slate-400">{section.text}</p>
            </article>
          ))}
        </section>

        <section className="rounded-[2rem] border border-emerald-400/20 bg-emerald-400/10 p-5 md:p-6">
          <h2 className="text-2xl font-black">Sinyal yang dirangkum</h2>
          <div className="mt-5 grid gap-3 md:grid-cols-2">
            {signals.map((signal) => (
              <div
                key={signal}
                className="rounded-2xl border border-white/10 bg-slate-950/60 p-4 text-sm font-bold leading-6 text-slate-200"
              >
                {signal}
              </div>
            ))}
          </div>
        </section>
      </section>
    </main>
  );
}
