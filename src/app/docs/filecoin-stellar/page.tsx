import Link from "next/link";

const roles = [
  {
    title: "Karyra",
    label: "Platform kesiapan",
    text: "Membawa pemula dari pemahaman blockchain menuju kesiapan berpartisipasi.",
  },
  {
    title: "Filecoin",
    label: "Proof archive layer",
    text: "Mengarsipkan proof manifest, snapshot paspor, dan bukti partisipasi agar lebih kuat dan dapat diverifikasi.",
  },
  {
    title: "Stellar",
    label: "Safe practice layer",
    text: "Melatih wallet safety, memo, asset, trustline, payment, dan autentikasi wallet secara bertahap.",
  },
];

const architecture = [
  "Kursus dan Pelajaran membangun fondasi blockchain.",
  "Dasbor mencatat progres belajar dan langkah berikutnya.",
  "Paspor Kesiapan merangkum bukti belajar, partisipasi, dan readiness score.",
  "Filecoin Proof Archive menyiapkan arsip bukti melalui manifest dan CID/PieceCID.",
  "Stellar Readiness Track melatih kesiapan wallet/payment sebelum transaksi nyata.",
];

const grantNarratives = [
  "Filecoin membuat bukti belajar dan partisipasi tidak berhenti sebagai data internal aplikasi.",
  "Stellar memberi jalur praktik yang konkret untuk kesiapan finansial blockchain.",
  "Karyra menjembatani dua lapisan itu untuk masyarakat lokal dan pemula.",
  "Narasi ini membuat Karyra lebih kuat daripada platform belajar biasa atau quest platform biasa.",
];

export default function FilecoinStellarDocsPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <section className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-4 py-6 pb-24 md:px-8 md:py-12">
        <header>
          <p className="inline-flex rounded-full border border-emerald-400/20 bg-emerald-400/10 px-3 py-1 text-xs font-black uppercase tracking-[0.18em] text-emerald-300">
            Strategi Filecoin + Stellar
          </p>
          <h1 className="mt-4 max-w-4xl text-3xl font-black tracking-tight md:text-5xl">
            Dua lapisan strategis di dalam Karyra.
          </h1>
          <p className="mt-4 max-w-3xl text-sm leading-7 text-slate-300 md:text-base md:leading-8">
            Filecoin dan Stellar tidak diposisikan sebagai tempelan. Filecoin menjadi lapisan arsip bukti, sementara Stellar menjadi jalur latihan kesiapan finansial blockchain. Karyra menjadi ruang belajar lokal yang menghubungkan keduanya.
          </p>
        </header>

        <section className="grid gap-4 md:grid-cols-3">
          {roles.map((role) => (
            <article
              key={role.title}
              className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-5 md:p-6"
            >
              <p className="text-xs font-black uppercase tracking-wide text-emerald-300">
                {role.label}
              </p>
              <h2 className="mt-2 text-2xl font-black">{role.title}</h2>
              <p className="mt-3 text-sm leading-7 text-slate-400">{role.text}</p>
            </article>
          ))}
        </section>

        <section className="grid gap-4 lg:grid-cols-[1fr_1fr]">
          <article className="rounded-[2rem] border border-violet-400/20 bg-violet-400/10 p-5 md:p-6">
            <p className="text-xs font-black uppercase tracking-[0.18em] text-violet-300">
              Filecoin Proof Archive
            </p>
            <h2 className="mt-2 text-2xl font-black">
              Bukti proses belajar dijaga dan bisa diverifikasi.
            </h2>
            <p className="mt-3 text-sm leading-7 text-slate-300">
              Proof record, workshop participation, badge, dan snapshot Paspor Kesiapan dapat disusun menjadi manifest yang siap diarsipkan.
            </p>
            <Link
              href="/filecoin-proof-archive"
              className="mt-5 inline-flex min-h-11 items-center rounded-2xl bg-white px-4 py-2.5 text-sm font-black text-slate-950"
            >
              Buka Filecoin Layer
            </Link>
          </article>

          <article className="rounded-[2rem] border border-sky-400/20 bg-sky-400/10 p-5 md:p-6">
            <p className="text-xs font-black uppercase tracking-[0.18em] text-sky-300">
              Stellar Readiness Track
            </p>
            <h2 className="mt-2 text-2xl font-black">
              Kesiapan wallet dan payment dilatih secara aman.
            </h2>
            <p className="mt-3 text-sm leading-7 text-slate-300">
              Pengguna belajar public key, secret key, testnet, memo, asset, trustline, payment, dan autentikasi wallet sebelum praktik nyata.
            </p>
            <Link
              href="/stacks/stellar-readiness"
              className="mt-5 inline-flex min-h-11 items-center rounded-2xl bg-white px-4 py-2.5 text-sm font-black text-slate-950"
            >
              Buka Stellar Layer
            </Link>
          </article>
        </section>

        <section className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-5 md:p-7">
          <div className="grid gap-6 lg:grid-cols-[0.8fr_1.2fr]">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.18em] text-emerald-300">
                Arsitektur Naratif
              </p>
              <h2 className="mt-2 text-2xl font-black md:text-4xl">
                Belajar → Bukti → Arsip → Latihan → Siap
              </h2>
            </div>
            <div className="grid gap-3">
              {architecture.map((item) => (
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
          <h2 className="text-2xl font-black">Narasi grant yang ingin kita capai</h2>
          <div className="mt-5 grid gap-3 md:grid-cols-2">
            {grantNarratives.map((item) => (
              <p
                key={item}
                className="rounded-2xl bg-slate-950/60 p-4 text-sm font-bold leading-6 text-slate-200"
              >
                {item}
              </p>
            ))}
          </div>
        </section>
      </section>
    </main>
  );
}
