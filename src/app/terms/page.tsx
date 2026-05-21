import Link from "next/link";

const sections = [
  { title: "1. Penerimaan ketentuan", text: "Dengan mengakses atau menggunakan Karyra, pengguna dianggap memahami dan menyetujui ketentuan penggunaan ini. Jika tidak setuju, pengguna sebaiknya tidak melanjutkan penggunaan platform." },
  { title: "2. Sifat layanan", text: "Karyra adalah platform edukasi dan kesiapan blockchain. Materi, kursus, pelajaran, quest, XP, badge, dan Paspor Kesiapan disediakan untuk pembelajaran, dokumentasi progres, dan pengenalan konsep secara bertahap." },
  { title: "3. Bukan nasihat keuangan", text: "Karyra tidak menyediakan nasihat investasi, keuangan, hukum, pajak, atau rekomendasi transaksi. Informasi tentang blockchain, cryptocurrency, wallet, aset digital, dan Web3 hanya bersifat edukatif." },
  { title: "4. Risiko teknologi blockchain", text: "Pengguna memahami bahwa teknologi blockchain, cryptocurrency, wallet, aset digital, dan Web3 memiliki risiko, termasuk risiko kehilangan akses, kesalahan transaksi, volatilitas nilai, penipuan, phishing, dan kesalahan pengguna." },
  { title: "5. Akun dan data demo", text: "Pada fase pengembangan dan demo, sebagian fitur Karyra dapat menggunakan data contoh atau demo learner. Data demo tidak selalu mewakili akun produksi, histori asli, atau klaim pencapaian final." },
  { title: "6. Konten dan perubahan layanan", text: "Karyra dapat memperbarui, mengubah, menambah, atau menghapus konten dan fitur untuk meningkatkan kualitas pembelajaran, keamanan, dan kesiapan produk." },
  { title: "7. Penggunaan yang dilarang", text: "Pengguna tidak boleh menggunakan Karyra untuk penipuan, spam, manipulasi reward, pelanggaran hukum, penyalahgunaan sistem, atau aktivitas yang merugikan pengguna lain dan komunitas." },
  { title: "8. Batasan tanggung jawab", text: "Karyra berusaha menyediakan informasi yang jelas dan bermanfaat, tetapi tidak menjamin bahwa semua materi bebas dari kesalahan atau selalu sesuai dengan kondisi terbaru. Pengguna tetap bertanggung jawab atas keputusan dan tindakannya sendiri." },
  { title: "9. Ketentuan pihak ketiga", text: "Jika Karyra terhubung dengan layanan pihak ketiga seperti wallet, jaringan blockchain, penyimpanan terdesentralisasi, atau infrastruktur lain, penggunaan layanan tersebut dapat tunduk pada ketentuan masing-masing pihak." },
  { title: "10. Pembaruan ketentuan", text: "Ketentuan ini dapat diperbarui dari waktu ke waktu. Versi terbaru akan ditampilkan di halaman ini atau kanal resmi Karyra." },
];

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <section className="mx-auto flex w-full max-w-5xl flex-col gap-8 px-4 py-6 pb-24 md:px-8 md:py-12">
        <header>
          <p className="inline-flex rounded-full border border-emerald-400/20 bg-emerald-400/10 px-3 py-1 text-xs font-black uppercase tracking-[0.18em] text-emerald-300">Terms & Conditions</p>
          <h1 className="mt-4 text-3xl font-black tracking-tight md:text-5xl">Ketentuan Penggunaan Karyra.</h1>
          <p className="mt-4 max-w-3xl text-sm leading-7 text-slate-300 md:text-base md:leading-8">Halaman ini menjelaskan batasan penggunaan Karyra sebagai platform edukasi dan kesiapan blockchain. Draft ini bersifat awal dan sebaiknya direview kembali sebelum dipakai untuk peluncuran publik resmi atau pengajuan grant besar.</p>
          <p className="mt-3 text-xs font-bold text-slate-500">Terakhir diperbarui: Mei 2026</p>
        </header>
        <section className="grid gap-4">
          {sections.map((section) => (
            <article key={section.title} className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-5 md:p-6">
              <h2 className="text-xl font-black">{section.title}</h2>
              <p className="mt-3 text-sm leading-7 text-slate-400">{section.text}</p>
            </article>
          ))}
        </section>
        <section className="rounded-[2rem] border border-amber-400/20 bg-amber-400/10 p-5 md:p-6">
          <h2 className="text-2xl font-black">Catatan penting</h2>
          <p className="mt-3 text-sm leading-7 text-slate-300">Karena Karyra menyentuh topik blockchain, cryptocurrency, wallet, aset digital, dan Web3, halaman ketentuan ini perlu dianggap sebagai draft awal. Untuk produksi penuh, sebaiknya disesuaikan lagi dengan kebutuhan hukum, privasi, dan yurisdiksi yang berlaku.</p>
          <Link href="/faq" className="mt-5 inline-flex min-h-11 items-center rounded-2xl bg-emerald-400 px-4 py-2.5 text-sm font-black text-slate-950">Baca FAQ</Link>
        </section>
      </section>
    </main>
  );
}
