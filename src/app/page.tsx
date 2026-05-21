import Link from "next/link";

const proofPillars = [
  {
    title: "Bukti Belajar",
    description:
      "Progres yang menunjukkan pengguna sudah mengikuti materi dasar, bukan sekadar membuka halaman.",
  },
  {
    title: "Bukti Partisipasi",
    description:
      "Catatan aktivitas komunitas seperti workshop, diskusi, dan latihan bersama secara terpandu.",
  },
  {
    title: "Bukti Kesiapan",
    description:
      "Sinyal bahwa pemula sudah lebih siap sebelum menyentuh wallet, aset digital, atau transaksi nyata.",
  },
];

const productSteps = [
  {
    label: "01",
    title: "Belajar",
    text: "Mulai dari dasar blockchain sebagai fondasi kepercayaan digital.",
  },
  {
    label: "02",
    title: "Paham",
    text: "Hubungkan konsep blockchain dengan cryptocurrency, wallet, aset digital, dan Web3 secara bertahap.",
  },
  {
    label: "03",
    title: "Siap",
    text: "Bangun kebiasaan aman sebelum masuk ke praktik yang lebih teknis.",
  },
  {
    label: "04",
    title: "Terbukti",
    text: "Tunjukkan progres melalui Paspor Kesiapan yang mudah dipahami.",
  },
];

export default function HomePage() {
  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <section className="mx-auto flex w-full max-w-7xl flex-col gap-10 px-4 py-8 pb-24 md:px-8 md:py-14">
        <section className="grid min-h-[68vh] gap-8 lg:grid-cols-[1.02fr_0.98fr] lg:items-center">
          <div>
            <p className="inline-flex rounded-full border border-emerald-400/20 bg-emerald-400/10 px-3 py-1 text-xs font-black uppercase tracking-[0.18em] text-emerald-300">
              Ruang Kesiapan Blockchain Lokal
            </p>

            <h1 className="mt-5 max-w-4xl text-4xl font-black tracking-tight text-white md:text-6xl lg:text-7xl">
              Belajar blockchain dari hal yang paling manusiawi.
            </h1>

            <p className="mt-5 max-w-2xl text-base leading-7 text-slate-300 md:text-lg md:leading-8">
              Karyra membantu masyarakat lokal keluar dari kebingungan, ketakutan, dan salah paham tentang blockchain. Mulai dari fondasi kepercayaan digital, lalu bergerak bertahap ke cryptocurrency, wallet, aset digital, Web3, dan kesiapan berpartisipasi.
            </p>

            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/learner"
                className="inline-flex min-h-12 items-center justify-center rounded-2xl bg-emerald-400 px-6 py-3 text-sm font-black text-slate-950 transition hover:bg-emerald-300"
              >
                Masuk ke Ruang Belajar
              </Link>
              <Link
                href="/courses"
                className="inline-flex min-h-12 items-center justify-center rounded-2xl border border-white/10 bg-white/5 px-6 py-3 text-sm font-bold text-white transition hover:border-emerald-400/40 hover:bg-white/10"
              >
                Lihat Kursus
              </Link>
            </div>

            <p className="mt-4 max-w-xl text-xs leading-5 text-slate-500">
              Karyra tidak mendorong pemula langsung masuk ke transaksi. Pemahaman dibangun dulu, aspek teknikal masuk kemudian saat konteksnya sudah lebih kuat.
            </p>
          </div>

          <div className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-4 shadow-2xl shadow-emerald-950/20 md:p-6">
            <div className="rounded-[1.5rem] border border-emerald-400/20 bg-emerald-400/10 p-4 md:p-5">
              <p className="text-xs font-black uppercase tracking-[0.18em] text-emerald-300">
                Paspor Kesiapan Karyra
              </p>
              <h2 className="mt-3 text-2xl font-black text-white md:text-3xl">
                Belajar → Paham → Siap → Terbukti
              </h2>
              <p className="mt-2 text-sm leading-6 text-slate-300">
                Satu alur sederhana untuk membawa pemula dari pemahaman dasar menuju kesiapan digital yang bisa ditunjukkan.
              </p>
            </div>

            <div className="mt-4 grid gap-3">
              {proofPillars.map((pillar, index) => (
                <article
                  key={pillar.title}
                  className="rounded-2xl border border-white/10 bg-slate-950/60 p-4"
                >
                  <div className="flex items-start gap-3">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-2xl bg-emerald-400 text-sm font-black text-slate-950">
                      {index + 1}
                    </div>
                    <div>
                      <h3 className="font-bold text-white">{pillar.title}</h3>
                      <p className="mt-1 text-sm leading-6 text-slate-400">
                        {pillar.description}
                      </p>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="grid gap-3 md:grid-cols-4">
          {productSteps.map((step) => (
            <article
              key={step.label}
              className="rounded-3xl border border-white/10 bg-white/[0.04] p-5"
            >
              <p className="text-xs font-black uppercase tracking-wide text-emerald-300">
                {step.label}
              </p>
              <h2 className="mt-2 text-xl font-black text-white">{step.title}</h2>
              <p className="mt-2 text-sm leading-6 text-slate-400">{step.text}</p>
            </article>
          ))}
        </section>

        <section className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-5 md:p-7">
          <div className="grid gap-5 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.18em] text-sky-300">
                Untuk masyarakat lokal dan pemula
              </p>
              <h2 className="mt-2 text-2xl font-black md:text-4xl">
                Non-teknikal dulu, teknikal kemudian.
              </h2>
            </div>
            <p className="text-sm leading-7 text-slate-300 md:text-base md:leading-8">
              Banyak orang mengenal blockchain dari potongan informasi yang tidak utuh: trading, penipuan, uang cepat, atau istilah yang terasa jauh. Karyra menata ulang pintu masuknya: pahami dulu kenapa blockchain ada, bagaimana ia membangun kepercayaan digital, lalu masuk ke cryptocurrency dan Web3 sebagai bagian dari ekosistem yang lebih luas.
            </p>
          </div>
        </section>
      </section>
    </main>
  );
}
