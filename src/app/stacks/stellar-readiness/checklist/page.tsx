import Link from "next/link";

const checklist = [
  {
    group: "Wallet Safety",
    items: [
      "Saya tahu public key/account address boleh dibagikan.",
      "Saya tahu secret key/seed phrase/recovery phrase tidak boleh dibagikan.",
      "Saya tahu Karyra tidak akan meminta secret key.",
    ],
  },
  {
    group: "Network Awareness",
    items: [
      "Saya memahami perbedaan testnet dan mainnet.",
      "Saya tahu testnet asset tidak bernilai nyata.",
      "Saya tahu mainnet activity melibatkan risiko nyata walaupun nilainya kecil.",
    ],
  },
  {
    group: "Payment Readiness",
    items: [
      "Saya memahami fungsi memo dan kapan memo bisa diperlukan.",
      "Saya memahami bahwa asset punya issuer.",
      "Saya memahami konsep dasar trustline sebelum menerima non-native asset.",
    ],
  },
  {
    group: "Graduation Gate",
    items: [
      "Saya menyelesaikan latihan/refleksi Stellar readiness.",
      "Saya siap mengikuti aktivitas mainnet hanya secara opt-in.",
      "Saya memahami bahwa ini bukan trading, yield, atau janji keuntungan.",
    ],
  },
];

export default function StellarReadinessChecklistPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <section className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-4 py-6 pb-24 md:px-8 md:py-12">
        <header className="grid gap-6 lg:grid-cols-[1fr_0.8fr] lg:items-end">
          <div>
            <p className="inline-flex rounded-full border border-amber-400/20 bg-amber-400/10 px-3 py-1 text-xs font-black uppercase tracking-[0.18em] text-amber-300">
              Stellar Readiness Checklist
            </p>
            <h1 className="mt-4 max-w-4xl text-3xl font-black tracking-tight md:text-5xl">
              Checklist sebelum learner masuk ke mainnet graduation.
            </h1>
            <p className="mt-4 max-w-3xl text-sm leading-7 text-slate-300 md:text-lg md:leading-8">
              Checklist ini membantu Karyra menjaga agar mainnet bukan pintu pertama. Learner perlu memahami safety, network, memo, asset, trustline, dan risiko sebelum aktivitas bernilai nyata.
            </p>
          </div>

          <div className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-5 md:p-6">
            <p className="text-xs font-black uppercase tracking-[0.18em] text-slate-400">
              Readiness Principle
            </p>
            <h2 className="mt-2 text-2xl font-black">Tidak semua learner harus langsung mainnet.</h2>
            <p className="mt-3 text-sm leading-7 text-slate-400">
              Mainnet Graduation adalah tahap opsional untuk learner yang sudah qualified dan memahami risiko.
            </p>
          </div>
        </header>

        <section className="grid gap-4 md:grid-cols-2">
          {checklist.map((section) => (
            <article
              key={section.group}
              className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-5 md:p-6"
            >
              <h2 className="text-xl font-black">{section.group}</h2>
              <div className="mt-4 grid gap-3">
                {section.items.map((item) => (
                  <div key={item} className="flex gap-3 rounded-2xl bg-slate-950/60 p-4">
                    <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald-400 text-xs font-black text-slate-950">
                      ✓
                    </span>
                    <p className="text-sm leading-6 text-slate-300">{item}</p>
                  </div>
                ))}
              </div>
            </article>
          ))}
        </section>

        <section className="rounded-[2rem] border border-sky-400/20 bg-sky-400/10 p-5 md:p-6">
          <p className="text-xs font-black uppercase tracking-[0.18em] text-sky-300">
            Next Action
          </p>
          <h2 className="mt-2 text-2xl font-black">Ubah checklist menjadi proof.</h2>
          <p className="mt-3 text-sm leading-7 text-slate-300">
            Setelah memahami checklist, learner dapat mengirim refleksi di Stellar Readiness Quest. Submission direview sebelum menjadi sinyal di Paspor.
          </p>
          <div className="mt-5 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/quests?track=stellar-readiness"
              className="inline-flex min-h-12 items-center justify-center rounded-2xl bg-sky-300 px-6 py-3 text-sm font-black text-slate-950"
            >
              Buka Stellar Quest
            </Link>
            <Link
              href="/stacks/stellar-readiness/mainnet-graduation"
              className="inline-flex min-h-12 items-center justify-center rounded-2xl border border-white/10 bg-white/5 px-6 py-3 text-sm font-bold text-white"
            >
              Lihat Graduation Model
            </Link>
          </div>
        </section>
      </section>
    </main>
  );
}
