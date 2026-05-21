const metricTargets = [
  {
    metric: "1.000 pengguna lokal pertama",
    timeframe: "3 bulan setelah grant cair",
    reason:
      "Target ini cukup ambisius untuk pilot komunitas, tetapi masih realistis jika dikombinasikan dengan workshop offline, demo learner, dan distribusi lokal.",
  },
  {
    metric: "1.000 penyelesaian Stellar Payment Readiness",
    timeframe: "3 bulan",
    reason:
      "Mengukur apakah pengguna tidak hanya membaca materi, tetapi menyelesaikan jalur readiness wallet/payment.",
  },
  {
    metric: "1.000 Filecoin Learning Passport CID",
    timeframe: "3 bulan",
    reason:
      "Mengukur apakah bukti belajar benar-benar dipaketkan menjadi manifest dan diarsipkan melalui Filecoin layer.",
  },
  {
    metric: "3 workshop komunitas awal",
    timeframe: "3 bulan",
    reason:
      "Target ini disesuaikan dengan kapasitas tim awal. Fokus pilot adalah kualitas onboarding, dokumentasi proses, dan bukti partisipasi, bukan jumlah event yang terlalu besar.",
  },
  {
    metric: "60% completion rate",
    timeframe: "Pilot cohort",
    reason:
      "Mengukur apakah kursus dan pelajaran cukup mudah diikuti oleh pemula.",
  },
  {
    metric: "100 proof records terverifikasi",
    timeframe: "Pilot awal",
    reason:
      "Mengukur kualitas bukti belajar, partisipasi, dan kesiapan yang bisa dibaca dari Paspor.",
  },
];

const reportingSections = [
  "Jumlah learner aktif",
  "Course completion",
  "Lesson completion",
  "Stellar readiness completion",
  "Filecoin archive count",
  "Workshop participation",
  "Proof records created",
  "Readiness score distribution",
  "Community feedback",
];

export default function ImpactMetricsPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <section className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-4 py-6 pb-24 md:px-8 md:py-12">
        <header>
          <p className="inline-flex rounded-full border border-emerald-400/20 bg-emerald-400/10 px-3 py-1 text-xs font-black uppercase tracking-[0.18em] text-emerald-300">
            Impact Metrics
          </p>
          <h1 className="mt-4 max-w-4xl text-3xl font-black tracking-tight md:text-5xl">
            Target dampak yang bisa dibaca reviewer.
          </h1>
          <p className="mt-4 max-w-3xl text-sm leading-7 text-slate-300 md:text-base md:leading-8">
            Proposal grant tidak cukup hanya menjual ide. Karyra perlu menunjukkan target angka yang masuk akal, dapat dilacak, dan terhubung langsung dengan Filecoin Proof Archive serta Stellar Readiness Track.
          </p>
        </header>

        <section className="grid gap-4 md:grid-cols-2">
          {metricTargets.map((item) => (
            <article
              key={item.metric}
              className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-5 md:p-6"
            >
              <p className="text-xs font-black uppercase tracking-wide text-emerald-300">
                {item.timeframe}
              </p>
              <h2 className="mt-2 text-2xl font-black">{item.metric}</h2>
              <p className="mt-3 text-sm leading-7 text-slate-400">{item.reason}</p>
            </article>
          ))}
        </section>

        <section className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-5 md:p-7">
          <div className="grid gap-6 lg:grid-cols-[0.8fr_1.2fr]">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.18em] text-sky-300">
                Reporting
              </p>
              <h2 className="mt-2 text-2xl font-black md:text-4xl">
                Apa yang dilaporkan?
              </h2>
              <p className="mt-3 text-sm leading-7 text-slate-400">
                Metrik ini bisa masuk ke proposal, changelog, impact report, dan pembaruan publik selama grant berjalan.
              </p>
            </div>
            <div className="grid gap-3 md:grid-cols-2">
              {reportingSections.map((item) => (
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

        <section className="rounded-[2rem] border border-emerald-400/20 bg-emerald-400/10 p-5 md:p-6">
          <h2 className="text-2xl font-black">Kalimat siap proposal</h2>
          <p className="mt-3 text-lg leading-8 text-slate-200">
            Dalam 3 bulan setelah grant cair, Karyra menargetkan 1.000 pengguna lokal pertama untuk menyelesaikan Stellar Payment Readiness, mencetak Filecoin Learning Passport CID, dan menjalankan 3 workshop komunitas awal sebagai bukti belajar serta partisipasi yang dapat diverifikasi.
          </p>
        </section>
      </section>
    </main>
  );
}
