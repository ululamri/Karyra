import Link from "next/link";

const gates = [
  "Menyelesaikan blockchain dan wallet safety lesson.",
  "Memahami public key vs secret key.",
  "Menyelesaikan memo, asset issuer, dan trustline checklist.",
  "Menyelesaikan testnet practice.",
  "Mengirim refleksi/readiness submission.",
  "Mendapat review/approval sebagai qualified learner.",
];

const graduationFlow = [
  {
    title: "Opt-in",
    text: "Learner memilih sendiri untuk ikut. Mainnet Graduation tidak otomatis dan tidak dipaksakan.",
  },
  {
    title: "Small-value",
    text: "Aktivitas bernilai nyata dibatasi kecil dan edukatif, bukan trading atau spekulasi.",
  },
  {
    title: "Guided",
    text: "Setiap langkah diberi guardrail, warning, dan konteks risiko.",
  },
  {
    title: "Proof",
    text: "Completion dicatat sebagai readiness signal di Paspor, bukan klaim keuntungan finansial.",
  },
];

export default function StellarMainnetGraduationPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <section className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-4 py-6 pb-24 md:px-8 md:py-12">
        <header className="rounded-[2rem] border border-emerald-400/20 bg-emerald-400/10 p-5 md:p-8">
          <p className="inline-flex rounded-full border border-emerald-400/20 bg-emerald-400/10 px-3 py-1 text-xs font-black uppercase tracking-[0.18em] text-emerald-300">
            Stellar Mainnet Graduation
          </p>
          <h1 className="mt-4 max-w-4xl text-3xl font-black tracking-tight md:text-5xl">
            Mainnet sebagai tahap kelulusan, bukan pintu pertama.
          </h1>
          <p className="mt-4 max-w-4xl text-sm leading-7 text-slate-300 md:text-lg md:leading-8">
            Karyra menempatkan Stellar Mainnet sebagai pengalaman nyata yang opsional, kecil, dan terbimbing setelah learner menyelesaikan readiness gate. Tujuannya bukan trading, melainkan memahami real network behavior dengan lebih aman.
          </p>
        </header>

        <section className="grid gap-4 lg:grid-cols-[0.85fr_1.15fr]">
          <div className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-5 md:p-6">
            <p className="text-xs font-black uppercase tracking-[0.18em] text-emerald-300">
              Eligibility Gates
            </p>
            <h2 className="mt-2 text-2xl font-black">Siapa yang qualified?</h2>
            <p className="mt-3 text-sm leading-7 text-slate-400">
              Learner tidak masuk ke mainnet hanya karena ingin mencoba. Ada gate sederhana agar proses lebih bertanggung jawab.
            </p>
          </div>
          <div className="grid gap-3">
            {gates.map((gate, index) => (
              <div key={gate} className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
                <p className="text-xs font-black text-emerald-300">Gate 0{index + 1}</p>
                <p className="mt-2 text-sm font-bold leading-6 text-slate-200">{gate}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {graduationFlow.map((item) => (
            <article key={item.title} className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-5">
              <h2 className="text-xl font-black">{item.title}</h2>
              <p className="mt-3 text-sm leading-7 text-slate-400">{item.text}</p>
            </article>
          ))}
        </section>

        <section className="rounded-[2rem] border border-amber-400/20 bg-amber-400/10 p-5 md:p-6">
          <p className="text-xs font-black uppercase tracking-[0.18em] text-amber-300">
            Guardrail
          </p>
          <h2 className="mt-2 text-2xl font-black">Bukan trading, bukan yield, bukan janji untung.</h2>
          <p className="mt-3 text-sm leading-7 text-slate-300">
            Mainnet Graduation di Karyra adalah aktivitas edukatif bernilai kecil untuk memahami real network. Karyra tidak mempromosikan pembelian aset, yield, trading, atau financial return.
          </p>
        </section>

        <div className="flex flex-col gap-3 sm:flex-row">
          <Link
            href="/stacks/stellar-readiness/checklist"
            className="inline-flex min-h-12 items-center justify-center rounded-2xl bg-emerald-400 px-6 py-3 text-sm font-black text-slate-950"
          >
            Buka Checklist
          </Link>
          <Link
            href="/stacks/stellar-readiness/passport-signal"
            className="inline-flex min-h-12 items-center justify-center rounded-2xl border border-white/10 bg-white/5 px-6 py-3 text-sm font-bold text-white"
          >
            Passport Signal
          </Link>
        </div>
      </section>
    </main>
  );
}
