import Link from "next/link";

const plannedStack = [
  {
    title: "Stellar Wallets Kit",
    text: "Diposisikan sebagai wallet connection layer untuk menghubungkan Karyra dengan wallet Stellar-compatible secara opt-in.",
  },
  {
    title: "Freighter Connect",
    text: "Diposisikan sebagai opsi wallet interaction untuk learner yang sudah siap mencoba koneksi wallet secara aman.",
  },
  {
    title: "No Secret Key Collection",
    text: "Karyra tidak meminta, menyimpan, atau menerima secret key, seed phrase, atau recovery phrase learner.",
  },
  {
    title: "Readiness Gate",
    text: "Wallet connection tidak menjadi pintu pertama. Learner harus memahami safety dan menyelesaikan checklist terlebih dulu.",
  },
];

const flow = [
  "Learner membaca wallet safety dan key awareness.",
  "Learner memahami bahwa public key boleh dibagikan, secret key tidak.",
  "Learner membuka halaman wallet connection secara opt-in.",
  "Karyra menampilkan peringatan risiko dan batasan.",
  "Wallet connection digunakan untuk readiness/mainnet graduation flow.",
  "Karyra mencatat completion sebagai readiness signal, bukan akses ke dana learner.",
];

export default function StellarConnectPrepPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <section className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-4 py-6 pb-24 md:px-8 md:py-12">
        <header className="rounded-[2rem] border border-sky-400/20 bg-sky-400/10 p-5 md:p-8">
          <p className="inline-flex rounded-full border border-sky-400/20 bg-sky-400/10 px-3 py-1 text-xs font-black uppercase tracking-[0.18em] text-sky-300">
            Wallet Connect Prep
          </p>
          <h1 className="mt-4 max-w-4xl text-3xl font-black tracking-tight md:text-5xl">
            Planned wallet integration untuk Stellar readiness.
          </h1>
          <p className="mt-4 max-w-4xl text-sm leading-7 text-slate-300 md:text-lg md:leading-8">
            Halaman ini adalah preparation layer untuk integrasi Stellar Wallets Kit / Freighter Connect. Tujuannya memperlihatkan alur produk sebelum implementasi teknis penuh: opt-in wallet connection, no secret key collection, readiness gate, dan mainnet graduation yang aman.
          </p>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <Link
              href="/stacks/stellar-readiness/checklist"
              className="inline-flex min-h-12 items-center justify-center rounded-2xl bg-sky-300 px-6 py-3 text-sm font-black text-slate-950"
            >
              Lihat Checklist
            </Link>
            <Link
              href="/stacks/stellar-readiness/mainnet-graduation"
              className="inline-flex min-h-12 items-center justify-center rounded-2xl border border-emerald-400/30 bg-emerald-400/10 px-6 py-3 text-sm font-black text-emerald-200"
            >
              Mainnet Graduation
            </Link>
          </div>
        </header>

        <section className="grid gap-4 md:grid-cols-2">
          {plannedStack.map((item) => (
            <article
              key={item.title}
              className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-5 md:p-6"
            >
              <h2 className="text-xl font-black">{item.title}</h2>
              <p className="mt-3 text-sm leading-7 text-slate-400">{item.text}</p>
            </article>
          ))}
        </section>

        <section className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-5 md:p-7">
          <p className="text-xs font-black uppercase tracking-[0.18em] text-sky-300">
            Planned Product Flow
          </p>
          <h2 className="mt-2 text-2xl font-black md:text-4xl">
            Koneksi wallet hanya setelah learner siap.
          </h2>
          <div className="mt-5 grid gap-3">
            {flow.map((item, index) => (
              <div key={item} className="rounded-2xl border border-white/10 bg-slate-950/60 p-4">
                <p className="text-xs font-black text-sky-300">0{index + 1}</p>
                <p className="mt-2 text-sm font-bold leading-6 text-slate-200">{item}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="rounded-[2rem] border border-amber-400/20 bg-amber-400/10 p-5 md:p-6">
          <p className="text-xs font-black uppercase tracking-[0.18em] text-amber-300">
            Safety Note
          </p>
          <h2 className="mt-2 text-2xl font-black">Bukan custodial wallet service.</h2>
          <p className="mt-3 text-sm leading-7 text-slate-300">
            Karyra tidak menjadi penyimpan dana, tidak meminta secret key, dan tidak memposisikan wallet connection sebagai trading, yield, atau financial return. Wallet connection hanya dipakai sebagai bagian dari readiness-to-mainnet onboarding yang opt-in dan terbimbing.
          </p>
        </section>
      </section>
    </main>
  );
}
