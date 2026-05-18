import Link from "next/link";
import { StellarReadinessChecklist } from "@/components/stellar-readiness-checklist";

export default function StellarReadinessChecklistPage() {
  return (
    <main className="min-h-screen bg-slate-950 px-5 py-8 text-white md:px-8 md:py-16">
      <section className="mx-auto flex max-w-7xl flex-col gap-8">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-emerald-300">
              Stellar Readiness Track
            </p>
            <h1 className="mt-4 max-w-4xl text-4xl font-bold tracking-tight md:text-6xl">
              Pre-Transaction Checklist
            </h1>
            <p className="mt-5 max-w-3xl text-base leading-8 text-slate-300 md:text-lg">
              Checklist ini membantu learner membangun kepercayaan diri sebelum
              praktik pembayaran Web3. Fokusnya adalah wallet safety, address
              dan memo awareness, stablecoin literacy, scam prevention, dan
              kebiasaan cek ulang sebelum transaksi nyata.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <Link
              href="/stacks/stellar-readiness"
              className="rounded-2xl border border-white/10 bg-white/5 px-5 py-3 text-sm font-bold text-white transition hover:border-emerald-400/40"
            >
              Stellar Stack
            </Link>

            <Link
              href="/passport"
              className="rounded-2xl bg-emerald-400 px-5 py-3 text-sm font-bold text-slate-950 transition hover:bg-emerald-300"
            >
              Readiness Passport
            </Link>
          </div>
        </div>

        <section className="rounded-[2rem] border border-sky-400/20 bg-sky-400/10 p-6 md:p-8">
          <p className="text-sm font-semibold uppercase tracking-[0.22em] text-sky-300">
            Non-transactional Safety Layer
          </p>
          <h2 className="mt-4 text-3xl font-bold">
            Cek kesiapan dulu, transaksi belakangan.
          </h2>
          <p className="mt-4 max-w-4xl leading-8 text-slate-300">
            Halaman ini tidak meminta wallet, tidak meminta seed phrase, dan
            tidak membuat transaksi. Ini adalah latihan kesiapan manusia sebelum
            learner menyentuh aset digital bernilai nyata.
          </p>
        </section>

        <StellarReadinessChecklist />
      </section>
    </main>
  );
}
