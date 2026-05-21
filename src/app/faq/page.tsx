import Link from "next/link";

const faqs = [
  {
    question: "Apa itu Karyra?",
    answer: "Karyra adalah ruang kesiapan blockchain untuk masyarakat lokal dan pemula. Karyra membantu pengguna memahami blockchain dari dasar, lalu bergerak bertahap ke cryptocurrency, wallet, aset digital, Web3, dan kesiapan berpartisipasi.",
  },
  {
    question: "Apakah Karyra platform investasi atau trading?",
    answer: "Bukan. Karyra adalah platform edukasi dan kesiapan. Karyra tidak memberikan saran investasi, tidak menjanjikan keuntungan, dan tidak mendorong pengguna langsung masuk ke transaksi.",
  },
  {
    question: "Kenapa Karyra mulai dari blockchain, bukan langsung Web3?",
    answer: "Karena blockchain adalah fondasi utama. Cryptocurrency dan Web3 adalah bagian dari ekosistem yang berkembang dari fondasi tersebut. Untuk pemula, memahami dasar kepercayaan digital lebih penting sebelum masuk ke istilah yang lebih teknis.",
  },
  {
    question: "Apa maksud non-teknikal dulu, teknikal kemudian?",
    answer: "Artinya pengguna diajak memahami konsep dengan bahasa sederhana terlebih dahulu. Aspek teknikal tetap penting, tetapi masuk setelah pengguna punya konteks dan rasa aman yang cukup.",
  },
  {
    question: "Apa itu Paspor Kesiapan?",
    answer: "Paspor Kesiapan adalah ringkasan bukti proses belajar, partisipasi, badge, XP, workshop, proof record, dan readiness score. Tujuannya membantu pengguna melihat perkembangan mereka dari belajar menuju kesiapan.",
  },
  {
    question: "Apa perbedaan Dashboard dan Paspor?",
    answer: "Dashboard adalah ruang aktivitas harian untuk melihat progres dan langkah berikutnya. Paspor adalah ringkasan bukti hasil perjalanan belajar, partisipasi, dan kesiapan.",
  },
  {
    question: "Apakah quest dan reward menjadi inti Karyra?",
    answer: "Tidak. Quest, XP, dan reward adalah lapisan pendukung untuk latihan, refleksi, dan engagement komunitas. Inti Karyra tetap kursus, pelajaran, progres belajar, dan Paspor Kesiapan.",
  },
  {
    question: "Reward di Karyra berarti uang atau token?",
    answer: "Untuk MVP, reward diposisikan sebagai XP, badge, proof record, dan pengakuan komunitas. Reward bukan janji penghasilan, bukan trading incentive, dan bukan dorongan spekulatif.",
  },
  {
    question: "Bagaimana workshop masuk ke alur Karyra?",
    answer: "Workshop adalah jembatan komunitas lokal. Peserta bisa belajar bersama, berdiskusi, melakukan refleksi, lalu membangun Bukti Partisipasi yang nantinya terlihat di Paspor.",
  },
  {
    question: "Apakah Karyra sudah memakai akun asli?",
    answer: "Pada fase MVP, sebagian alur masih memakai demo learner. Autentikasi produksi bisa dihubungkan pada iterasi berikutnya setelah UX, learning flow, dan public trust layer stabil.",
  },
  {
    question: "Apakah Karyra cocok untuk sekolah atau komunitas?",
    answer: "Arah jangka panjang Karyra cocok untuk komunitas lokal, workshop, fasilitator, dan nantinya bisa diperluas ke sekolah atau lembaga edukasi yang membutuhkan literasi blockchain bertahap.",
  },
];

export default function FAQPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <section className="mx-auto flex w-full max-w-5xl flex-col gap-8 px-4 py-6 pb-24 md:px-8 md:py-12">
        <header>
          <p className="inline-flex rounded-full border border-emerald-400/20 bg-emerald-400/10 px-3 py-1 text-xs font-black uppercase tracking-[0.18em] text-emerald-300">
            FAQ
          </p>
          <h1 className="mt-4 text-3xl font-black tracking-tight md:text-5xl">
            Pertanyaan yang sering muncul.
          </h1>
          <p className="mt-4 max-w-3xl text-sm leading-7 text-slate-300 md:text-base md:leading-8">
            Halaman ini membantu pengguna baru memahami arah Karyra: apa yang dilakukan, apa yang tidak dilakukan, dan bagaimana belajar, quest, workshop, reward, dan Paspor saling terhubung.
          </p>
        </header>

        <section className="grid gap-3">
          {faqs.map((faq) => (
            <article key={faq.question} className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-5 md:p-6">
              <h2 className="text-xl font-black">{faq.question}</h2>
              <p className="mt-3 text-sm leading-7 text-slate-400">{faq.answer}</p>
            </article>
          ))}
        </section>

        <section className="rounded-[2rem] border border-emerald-400/20 bg-emerald-400/10 p-5 md:p-6">
          <h2 className="text-2xl font-black">Ingin mulai dari alur utama?</h2>
          <p className="mt-3 text-sm leading-7 text-slate-300">
            Mulai dari ruang belajar, lanjutkan kursus dan pelajaran, lalu lihat progres di Dashboard dan bukti di Paspor.
          </p>
          <div className="mt-5 flex flex-col gap-3 sm:flex-row">
            <Link href="/learner" className="inline-flex min-h-11 items-center justify-center rounded-2xl bg-emerald-400 px-4 py-2.5 text-sm font-black text-slate-950">
              Masuk ke Ruang Belajar
            </Link>
            <Link href="/about" className="inline-flex min-h-11 items-center justify-center rounded-2xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm font-black text-white">
              Tentang Karyra
            </Link>
          </div>
        </section>
      </section>
    </main>
  );
}
