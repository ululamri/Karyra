import Link from "next/link";

const workshopPhases = [
  {
    title: "1. Warm-up komunitas",
    description:
      "Mulai dari bahasa sehari-hari: kenapa orang takut wallet, kenapa salah kirim berbahaya, dan kenapa belajar dulu lebih aman daripada langsung transaksi.",
    items: ["Kenalkan Karyra", "Jelaskan readiness", "Tanya kekhawatiran peserta"],
  },
  {
    title: "2. Wallet safety mini session",
    description:
      "Fokus pada seed phrase, phishing, impersonator, perangkat aman, dan kebiasaan cek ulang sebelum mencoba aset digital.",
    items: ["Seed phrase tidak dibagikan", "Cek link", "Latihan red flag scam"],
  },
  {
    title: "3. Stellar readiness practice",
    description:
      "Gunakan Stellar Readiness Track untuk memahami address, memo, stablecoin, dan payment-readiness tanpa memaksa transaksi nyata.",
    items: ["Address awareness", "Memo awareness", "Pre-transaction checklist"],
  },
  {
    title: "4. Quest + proof activity",
    description:
      "Peserta submit quest pendek, admin review, lalu readiness passport memperlihatkan proof record dan status kesiapan.",
    items: ["Submit quest", "Admin review", "Proof-of-Readiness"],
  },
  {
    title: "5. Closing dan follow-up",
    description:
      "Akhiri dengan ringkasan risiko, langkah lanjut, dan ajakan melihat passport/share summary sebagai bukti perjalanan belajar.",
    items: ["Review checklist", "Share passport", "Catat feedback komunitas"],
  },
];

const facilitatorChecklist = [
  "Siapkan koneksi internet dan perangkat demo.",
  "Buka /demo untuk alur reviewer/fasilitator.",
  "Buka /stacks/stellar-readiness untuk menjelaskan payment-readiness.",
  "Buka /stacks/stellar-readiness/checklist untuk latihan peserta.",
  "Buka /quests?track=stellar-readiness untuk aktivitas submission.",
  "Buka /admin/submissions untuk simulasi review admin.",
  "Buka /passport dan /passport/share untuk memperlihatkan hasil readiness.",
  "Buka /admin/proofs untuk menjelaskan arah Filecoin Proof Archive.",
];

const participantOutcomes = [
  "Peserta memahami bahwa Web3 onboarding dimulai dari safety, bukan transaksi.",
  "Peserta tahu kenapa seed phrase tidak boleh dibagikan.",
  "Peserta mengenali pentingnya address dan memo awareness.",
  "Peserta mampu menyusun checklist sebelum transaksi.",
  "Peserta melihat proof record sebagai catatan kesiapan belajar.",
  "Fasilitator punya data awal untuk menilai readiness komunitas.",
];

export default function WorkshopKitPage() {
  return (
    <main className="min-h-screen bg-slate-950 px-5 py-8 text-white md:px-8 md:py-16">
      <section className="mx-auto flex max-w-7xl flex-col gap-8">
        <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-emerald-300">
              Karyra Workshop Kit
            </p>
            <h1 className="mt-4 max-w-4xl text-4xl font-bold tracking-tight md:text-6xl">
              Offline onboarding flow untuk komunitas lokal.
            </h1>
            <p className="mt-5 max-w-3xl text-base leading-8 text-slate-300 md:text-lg">
              Halaman ini membantu fasilitator menjalankan workshop Karyra:
              non-teknikal dulu, safety dulu, readiness dulu, lalu proof sebagai
              catatan perjalanan peserta.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <Link
              href="/demo"
              className="rounded-2xl border border-white/10 bg-white/5 px-5 py-3 text-sm font-bold text-white transition hover:border-emerald-400/40"
            >
              Demo Path
            </Link>
            <Link
              href="/workshops"
              className="rounded-2xl bg-emerald-400 px-5 py-3 text-sm font-bold text-slate-950 transition hover:bg-emerald-300"
            >
              Workshops
            </Link>
          </div>
        </div>

        <section className="grid gap-4 md:grid-cols-3">
          <div className="rounded-[2rem] border border-emerald-400/20 bg-emerald-400/10 p-6">
            <p className="text-sm text-slate-300">Primary Goal</p>
            <h2 className="mt-2 text-2xl font-bold text-emerald-200">
              Build confidence before transaction
            </h2>
          </div>
          <div className="rounded-[2rem] border border-sky-400/20 bg-sky-400/10 p-6">
            <p className="text-sm text-slate-300">Stellar Role</p>
            <h2 className="mt-2 text-2xl font-bold text-sky-200">
              Payment-readiness literacy
            </h2>
          </div>
          <div className="rounded-[2rem] border border-violet-400/20 bg-violet-400/10 p-6">
            <p className="text-sm text-slate-300">Filecoin Role</p>
            <h2 className="mt-2 text-2xl font-bold text-violet-200">
              Proof archive direction
            </h2>
          </div>
        </section>

        <section className="rounded-[2rem] border border-white/10 bg-white/5 p-6 md:p-8">
          <p className="text-sm font-semibold uppercase tracking-[0.22em] text-emerald-300">
            Session Flow
          </p>
          <h2 className="mt-4 text-3xl font-bold">5 fase workshop</h2>
          <div className="mt-6 grid gap-4 lg:grid-cols-2">
            {workshopPhases.map((phase) => (
              <article
                key={phase.title}
                className="rounded-3xl border border-white/10 bg-slate-950/50 p-5"
              >
                <h3 className="text-xl font-bold">{phase.title}</h3>
                <p className="mt-3 leading-7 text-slate-300">
                  {phase.description}
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {phase.items.map((item) => (
                    <span
                      key={item}
                      className="rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-slate-300"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="rounded-[2rem] border border-white/10 bg-white/5 p-6 md:p-8">
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-sky-300">
              Facilitator Checklist
            </p>
            <h2 className="mt-4 text-3xl font-bold">Sebelum workshop dimulai</h2>
            <div className="mt-6 grid gap-3">
              {facilitatorChecklist.map((item) => (
                <div key={item} className="rounded-2xl bg-slate-950/50 p-4">
                  <p className="leading-7 text-slate-300">✓ {item}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-[2rem] border border-white/10 bg-white/5 p-6 md:p-8">
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-emerald-300">
              Expected Outcomes
            </p>
            <h2 className="mt-4 text-3xl font-bold">Hasil yang ingin dicapai</h2>
            <div className="mt-6 grid gap-3">
              {participantOutcomes.map((item) => (
                <div key={item} className="rounded-2xl bg-slate-950/50 p-4">
                  <p className="leading-7 text-slate-300">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="rounded-[2rem] border border-emerald-400/20 bg-emerald-400/10 p-6 md:p-8">
          <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
            <div>
              <h2 className="text-3xl font-bold">Mulai dari checklist Stellar.</h2>
              <p className="mt-3 max-w-3xl leading-8 text-slate-300">
                Gunakan checklist sebagai aktivitas inti sebelum peserta submit
                quest dan melihat hasil readiness di passport.
              </p>
            </div>
            <Link
              href="/stacks/stellar-readiness/checklist"
              className="rounded-2xl bg-emerald-400 px-6 py-4 text-center text-base font-bold text-slate-950 transition hover:bg-emerald-300"
            >
              Open Checklist
            </Link>
          </div>
        </section>
      </section>
    </main>
  );
}
