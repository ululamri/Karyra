import Link from "next/link";

const workshopPhases = [
  {
    title: "1. Pembukaan manusiawi",
    description:
      "Mulai dari cerita sehari-hari: kenapa orang takut wallet, kenapa salah kirim berbahaya, dan kenapa belajar dulu lebih aman daripada langsung transaksi.",
    items: ["Kenalkan Karyra", "Dengar kekhawatiran peserta", "Jelaskan belajar dulu"],
  },
  {
    title: "2. Fondasi blockchain",
    description:
      "Hubungkan blockchain dengan kepercayaan digital sebelum masuk ke cryptocurrency, wallet, aset digital, atau Web3.",
    items: ["Kepercayaan digital", "Catatan yang sulit diubah", "Contoh lokal"],
  },
  {
    title: "3. Safety dan readiness",
    description:
      "Fokus pada seed phrase, phishing, impersonator, perangkat aman, dan kebiasaan cek ulang sebelum mencoba aset digital.",
    items: ["Seed phrase privat", "Cek link", "Red flag scam"],
  },
  {
    title: "4. Latihan dan refleksi",
    description:
      "Peserta mengisi checklist, berdiskusi, lalu mengirim refleksi pendek sebagai latihan partisipasi atau readiness.",
    items: ["Checklist", "Diskusi kelompok", "Submit refleksi"],
  },
  {
    title: "5. Bukti dan tindak lanjut",
    description:
      "Akhiri dengan rangkuman, langkah belajar berikutnya, dan penjelasan bagaimana aktivitas bisa menjadi proof di Paspor.",
    items: ["Lanjut course", "Cek Passport", "Catat feedback"],
  },
];

const facilitatorChecklist = [
  "Siapkan koneksi internet dan perangkat demo.",
  "Buka /courses untuk menjelaskan jalur belajar utama.",
  "Buka /learner untuk memperlihatkan ruang belajar harian.",
  "Buka /stacks/stellar-readiness untuk contoh readiness finansial blockchain.",
  "Buka /stacks/stellar-readiness/checklist untuk latihan peserta.",
  "Buka /quests untuk refleksi atau submission setelah workshop.",
  "Buka /passport untuk memperlihatkan bukti belajar dan partisipasi.",
  "Catat pertanyaan, kekhawatiran, dan feedback komunitas setelah sesi.",
];

const participantOutcomes = [
  "Peserta memahami bahwa blockchain dimulai dari literasi dan safety, bukan transaksi.",
  "Peserta tahu kenapa seed phrase tidak boleh dibagikan.",
  "Peserta mengenali risiko link palsu, impersonator, dan keputusan terburu-buru.",
  "Peserta mampu menjelaskan ulang satu manfaat blockchain dengan bahasa sederhana.",
  "Peserta punya langkah lanjut: course, lesson, quest refleksi, atau workshop berikutnya.",
  "Peserta memahami bahwa bukti partisipasi bisa masuk ke Paspor Kesiapan.",
];

const proofBridge = [
  {
    title: "Registrasi",
    text: "Sinyal awal bahwa peserta ingin ikut aktivitas komunitas.",
  },
  {
    title: "Kehadiran",
    text: "Dapat menjadi Bukti Partisipasi setelah diverifikasi.",
  },
  {
    title: "Refleksi",
    text: "Quest pendek membantu melihat apakah peserta benar-benar paham.",
  },
  {
    title: "Paspor",
    text: "Hasil belajar dan partisipasi dirangkum sebagai readiness signal.",
  },
];

export default function WorkshopKitPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <section className="mx-auto flex w-full max-w-7xl flex-col gap-8 px-4 py-6 pb-24 md:px-8 md:py-12">
        <header className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr] lg:items-end">
          <div>
            <p className="inline-flex rounded-full border border-emerald-400/20 bg-emerald-400/10 px-3 py-1 text-xs font-black uppercase tracking-[0.18em] text-emerald-300">
              Karyra Workshop Kit
            </p>
            <h1 className="mt-4 max-w-4xl text-3xl font-black tracking-tight md:text-5xl lg:text-6xl">
              Panduan workshop untuk komunitas lokal.
            </h1>
            <p className="mt-4 max-w-3xl text-sm leading-7 text-slate-300 md:text-lg md:leading-8">
              Workshop Kit membantu fasilitator menjalankan sesi belajar yang manusiawi: blockchain sebagai fondasi kepercayaan digital, safety sebelum transaksi, latihan sebelum mainnet, dan bukti partisipasi yang bisa masuk ke Paspor.
            </p>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/workshops"
                className="inline-flex min-h-12 items-center justify-center rounded-2xl bg-emerald-400 px-6 py-3 text-sm font-black text-slate-950 transition hover:bg-emerald-300"
              >
                Lihat Workshop
              </Link>
              <Link
                href="/courses"
                className="inline-flex min-h-12 items-center justify-center rounded-2xl border border-white/10 bg-white/5 px-6 py-3 text-sm font-bold text-white transition hover:border-emerald-400/40"
              >
                Jalur Course
              </Link>
              <Link
                href="/quests"
                className="inline-flex min-h-12 items-center justify-center rounded-2xl border border-sky-400/20 bg-sky-400/10 px-6 py-3 text-sm font-bold text-sky-200 transition hover:border-sky-400/40"
              >
                Latihan Refleksi
              </Link>
            </div>
          </div>

          <div className="grid gap-3 md:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3">
            <div className="rounded-[2rem] border border-emerald-400/20 bg-emerald-400/10 p-5">
              <p className="text-sm text-slate-300">Tujuan</p>
              <h2 className="mt-2 text-xl font-black text-emerald-200">
                Percaya diri sebelum praktik
              </h2>
            </div>
            <div className="rounded-[2rem] border border-sky-400/20 bg-sky-400/10 p-5">
              <p className="text-sm text-slate-300">Metode</p>
              <h2 className="mt-2 text-xl font-black text-sky-200">
                Diskusi + refleksi
              </h2>
            </div>
            <div className="rounded-[2rem] border border-violet-400/20 bg-violet-400/10 p-5">
              <p className="text-sm text-slate-300">Hasil</p>
              <h2 className="mt-2 text-xl font-black text-violet-200">
                Bukti partisipasi
              </h2>
            </div>
          </div>
        </header>

        <section className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-5 md:p-7">
          <p className="text-xs font-black uppercase tracking-[0.18em] text-emerald-300">
            Session Flow
          </p>
          <h2 className="mt-2 text-2xl font-black md:text-4xl">
            5 fase workshop
          </h2>
          <div className="mt-6 grid gap-4 lg:grid-cols-2">
            {workshopPhases.map((phase) => (
              <article
                key={phase.title}
                className="rounded-3xl border border-white/10 bg-slate-950/50 p-5"
              >
                <h3 className="text-xl font-black">{phase.title}</h3>
                <p className="mt-3 text-sm leading-7 text-slate-300">
                  {phase.description}
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {phase.items.map((item) => (
                    <span
                      key={item}
                      className="rounded-full bg-white/10 px-3 py-1 text-xs font-bold text-slate-300"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="rounded-[2rem] border border-sky-400/20 bg-sky-400/10 p-5 md:p-6">
          <div className="grid gap-5 lg:grid-cols-[0.75fr_1.25fr] lg:items-center">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.18em] text-sky-300">
                Proof Bridge
              </p>
              <h2 className="mt-2 text-2xl font-black">
                Dari hadir di workshop ke Paspor Kesiapan.
              </h2>
            </div>

            <div className="grid gap-3 md:grid-cols-4">
              {proofBridge.map((item, index) => (
                <div
                  key={item.title}
                  className="rounded-2xl border border-white/10 bg-slate-950/60 p-4"
                >
                  <p className="text-xs font-black text-sky-300">
                    0{index + 1}
                  </p>
                  <h3 className="mt-2 text-sm font-black">{item.title}</h3>
                  <p className="mt-1 text-xs leading-5 text-slate-400">
                    {item.text}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-5 md:p-7">
            <p className="text-xs font-black uppercase tracking-[0.18em] text-sky-300">
              Facilitator Checklist
            </p>
            <h2 className="mt-2 text-2xl font-black">
              Sebelum workshop dimulai
            </h2>
            <div className="mt-6 grid gap-3">
              {facilitatorChecklist.map((item) => (
                <div key={item} className="rounded-2xl bg-slate-950/50 p-4">
                  <p className="text-sm leading-7 text-slate-300">✓ {item}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-5 md:p-7">
            <p className="text-xs font-black uppercase tracking-[0.18em] text-emerald-300">
              Expected Outcomes
            </p>
            <h2 className="mt-2 text-2xl font-black">
              Hasil yang ingin dicapai
            </h2>
            <div className="mt-6 grid gap-3">
              {participantOutcomes.map((item) => (
                <div key={item} className="rounded-2xl bg-slate-950/50 p-4">
                  <p className="text-sm leading-7 text-slate-300">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="rounded-[2rem] border border-emerald-400/20 bg-emerald-400/10 p-5 md:p-7">
          <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
            <div>
              <h2 className="text-2xl font-black md:text-3xl">
                Setelah workshop, lanjutkan dengan refleksi.
              </h2>
              <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-300">
                Gunakan quest sebagai latihan pendek agar peserta menuliskan apa yang mereka pahami. Reward tetap berupa apresiasi proses: XP, badge, proof record, dan pengakuan komunitas.
              </p>
            </div>
            <Link
              href="/quests"
              className="inline-flex min-h-12 items-center justify-center rounded-2xl bg-emerald-400 px-6 py-3 text-sm font-black text-slate-950 transition hover:bg-emerald-300"
            >
              Buka Latihan Refleksi
            </Link>
          </div>
        </section>
      </section>
    </main>
  );
}
