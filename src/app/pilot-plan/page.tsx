import Link from "next/link";

const pilotWeeks = [
  {
    week: "Week 1",
    title: "Recruit & baseline readiness",
    focus:
      "Undang peserta lokal, ukur pemahaman awal, dan jelaskan bahwa Karyra fokus pada safety dan readiness sebelum transaksi.",
    outputs: ["Participant list", "Baseline concerns", "First dashboard activity"],
  },
  {
    week: "Week 2",
    title: "Learning + Stellar checklist",
    focus:
      "Peserta menyelesaikan course dasar dan Stellar Readiness Checklist untuk memahami wallet safety, memo, stablecoin, dan scam prevention.",
    outputs: ["Course progress", "Checklist completion", "Quest submissions"],
  },
  {
    week: "Week 3",
    title: "Review + proof issuance",
    focus:
      "Admin/fasilitator review quest, approve submission, dan peserta melihat Proof-of-Readiness di Passport.",
    outputs: ["Approved submissions", "Proof records", "Readiness score changes"],
  },
  {
    week: "Week 4",
    title: "Workshop reflection + archive demo",
    focus:
      "Peserta mengikuti refleksi komunitas, proof penting diarsipkan ke demo Filecoin manifest, lalu hasil pilot dirangkum untuk grant review.",
    outputs: ["Workshop feedback", "Archived proof manifests", "Impact snapshot"],
  },
];

const successMetrics = [
  {
    label: "Learning activation",
    target: "Peserta membuka course dan menyelesaikan minimal satu lesson.",
  },
  {
    label: "Quest participation",
    target: "Peserta submit minimal satu Stellar Readiness Quest.",
  },
  {
    label: "Readiness signal",
    target: "Submission approved menghasilkan Proof-of-Readiness.",
  },
  {
    label: "Proof archive signal",
    target: "Minimal beberapa proof diarsipkan sebagai demo Filecoin manifest.",
  },
  {
    label: "Community feedback",
    target: "Peserta memberikan feedback tentang wallet fear, scam risk, dan confidence.",
  },
  {
    label: "Grant evidence",
    target: "Reviewer bisa membuka status, impact, transparency, dan passport share.",
  },
];

const riskControls = [
  "Tidak meminta peserta menyimpan aset nyata di fase awal.",
  "Tidak mendorong transaksi mainnet sebelum peserta siap.",
  "Fokus pada simulasi, checklist, dan pemahaman risiko.",
  "Proof archive masih demo CID sampai integrasi Filecoin/IPFS matang.",
  "Fasilitator menjelaskan bahwa Karyra adalah readiness layer, bukan financial advice.",
];

export default function PilotPlanPage() {
  return (
    <main className="min-h-screen bg-slate-950 px-5 py-8 text-white md:px-8 md:py-16">
      <section className="mx-auto flex max-w-7xl flex-col gap-8">
        <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-emerald-300">
              Karyra Pilot Plan
            </p>
            <h1 className="mt-4 max-w-4xl text-4xl font-bold tracking-tight md:text-6xl">
              Rencana pilot 4 minggu untuk komunitas lokal.
            </h1>
            <p className="mt-5 max-w-3xl text-base leading-8 text-slate-300 md:text-lg">
              Pilot ini dirancang untuk membuktikan bahwa Karyra dapat membantu
              pemula membangun literasi, partisipasi, dan readiness sebelum
              masuk ke praktik Web3 yang lebih berisiko.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <Link
              href="/impact"
              className="rounded-2xl border border-white/10 bg-white/5 px-5 py-3 text-sm font-bold text-white transition hover:border-emerald-400/40"
            >
              Impact Report
            </Link>
            <Link
              href="/transparency"
              className="rounded-2xl bg-emerald-400 px-5 py-3 text-sm font-bold text-slate-950 transition hover:bg-emerald-300"
            >
              Transparency
            </Link>
          </div>
        </div>

        <section className="grid gap-4 md:grid-cols-4">
          <div className="rounded-[2rem] border border-white/10 bg-white/5 p-6">
            <p className="text-sm text-slate-400">Duration</p>
            <p className="mt-2 text-3xl font-bold text-emerald-300">4 Weeks</p>
          </div>
          <div className="rounded-[2rem] border border-white/10 bg-white/5 p-6">
            <p className="text-sm text-slate-400">Target</p>
            <p className="mt-2 text-3xl font-bold text-emerald-300">Beginners</p>
          </div>
          <div className="rounded-[2rem] border border-white/10 bg-white/5 p-6">
            <p className="text-sm text-slate-400">Core Layer</p>
            <p className="mt-2 text-3xl font-bold text-emerald-300">Readiness</p>
          </div>
          <div className="rounded-[2rem] border border-white/10 bg-white/5 p-6">
            <p className="text-sm text-slate-400">Evidence</p>
            <p className="mt-2 text-3xl font-bold text-emerald-300">Proofs</p>
          </div>
        </section>

        <section className="rounded-[2rem] border border-white/10 bg-white/5 p-6 md:p-8">
          <p className="text-sm font-semibold uppercase tracking-[0.22em] text-emerald-300">
            Weekly Pilot Flow
          </p>
          <h2 className="mt-4 text-3xl font-bold">Tahapan pilot</h2>
          <div className="mt-6 grid gap-4 lg:grid-cols-2">
            {pilotWeeks.map((week) => (
              <article
                key={week.week}
                className="rounded-3xl border border-white/10 bg-slate-950/50 p-5"
              >
                <p className="text-sm font-bold uppercase tracking-wide text-emerald-300">
                  {week.week}
                </p>
                <h3 className="mt-2 text-2xl font-bold">{week.title}</h3>
                <p className="mt-3 leading-7 text-slate-300">{week.focus}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {week.outputs.map((output) => (
                    <span
                      key={output}
                      className="rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-slate-300"
                    >
                      {output}
                    </span>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="grid gap-6 lg:grid-cols-[1fr_0.9fr]">
          <div className="rounded-[2rem] border border-white/10 bg-white/5 p-6 md:p-8">
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-sky-300">
              Success Metrics
            </p>
            <h2 className="mt-4 text-3xl font-bold">Sinyal keberhasilan</h2>
            <div className="mt-6 grid gap-3">
              {successMetrics.map((metric) => (
                <div key={metric.label} className="rounded-2xl bg-slate-950/50 p-4">
                  <h3 className="font-bold text-sky-200">{metric.label}</h3>
                  <p className="mt-2 leading-7 text-slate-300">{metric.target}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-[2rem] border border-white/10 bg-white/5 p-6 md:p-8">
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-amber-300">
              Risk Controls
            </p>
            <h2 className="mt-4 text-3xl font-bold">Batas keamanan pilot</h2>
            <div className="mt-6 grid gap-3">
              {riskControls.map((control) => (
                <div key={control} className="rounded-2xl bg-slate-950/50 p-4">
                  <p className="leading-7 text-slate-300">• {control}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="rounded-[2rem] border border-emerald-400/20 bg-emerald-400/10 p-6 md:p-8">
          <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
            <div>
              <h2 className="text-3xl font-bold">Gunakan MVP Map untuk demo end-to-end.</h2>
              <p className="mt-3 max-w-3xl leading-8 text-slate-300">
                MVP Map membantu reviewer memahami hubungan learning, quest,
                proof, Filecoin archive, dan Stellar readiness dalam satu alur.
              </p>
            </div>
            <Link
              href="/mvp-map"
              className="rounded-2xl bg-emerald-400 px-6 py-4 text-center text-base font-bold text-slate-950 transition hover:bg-emerald-300"
            >
              Open MVP Map
            </Link>
          </div>
        </section>
      </section>
    </main>
  );
}
