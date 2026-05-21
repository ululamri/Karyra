export type NavigationLink = {
  href: string;
  titleId: string;
  titleEn: string;
  descriptionId: string;
  descriptionEn: string;
  badge?: string;
};

export type NavigationSection = {
  id: string;
  titleId: string;
  titleEn: string;
  descriptionId: string;
  descriptionEn: string;
  links: NavigationLink[];
};

export function localize(_language: "id" | "en", id: string, _en: string) {
  return id;
}

export const navigationSections: NavigationSection[] = [
  {
    id: "belajar",
    titleId: "Jalur Belajar",
    titleEn: "Jalur Belajar",
    descriptionId: "Mulai dari kursus, lanjutkan pelajaran, lalu pantau progres di dasbor.",
    descriptionEn: "Mulai dari kursus, lanjutkan pelajaran, lalu pantau progres di dasbor.",
    links: [
      { href: "/courses", titleId: "Kursus", titleEn: "Kursus", descriptionId: "Pilih jalur belajar sebagai syllabus utama untuk memahami blockchain dari dasar.", descriptionEn: "Pilih jalur belajar sebagai syllabus utama untuk memahami blockchain dari dasar.", badge: "Mulai" },
      { href: "/lessons", titleId: "Pelajaran", titleEn: "Pelajaran", descriptionId: "Buka materi sebagai ruang baca dan pemahaman bertahap.", descriptionEn: "Buka materi sebagai ruang baca dan pemahaman bertahap." },
      { href: "/dashboard", titleId: "Dasbor Belajar", titleEn: "Dasbor Belajar", descriptionId: "Lihat progres, pelajaran berikutnya, dan ringkasan perjalanan belajar.", descriptionEn: "Lihat progres, pelajaran berikutnya, dan ringkasan perjalanan belajar." },
      { href: "/passport", titleId: "Paspor Kesiapan", titleEn: "Paspor Kesiapan", descriptionId: "Bangun bukti belajar, bukti partisipasi, dan bukti kesiapan.", descriptionEn: "Bangun bukti belajar, bukti partisipasi, dan bukti kesiapan.", badge: "Bukti" },
    ],
  },
  {
    id: "demo",
    titleId: "Demo",
    titleEn: "Demo",
    descriptionId: "Rute singkat untuk memahami produk dari sudut pandang reviewer.",
    descriptionEn: "Rute singkat untuk memahami produk dari sudut pandang reviewer.",
    links: [
      { href: "/demo-flow", titleId: "Alur Demo", titleEn: "Alur Demo", descriptionId: "Urutan halaman yang sebaiknya dibuka saat menilai Karyra.", descriptionEn: "Urutan halaman yang sebaiknya dibuka saat menilai Karyra.", badge: "Review" },
      { href: "/passport/demo", titleId: "Demo Paspor", titleEn: "Demo Paspor", descriptionId: "Cara membaca Paspor Kesiapan sebagai bukti proses belajar.", descriptionEn: "Cara membaca Paspor Kesiapan sebagai bukti proses belajar." },
    ],
  },
  {
    id: "komunitas",
    titleId: "Komunitas",
    titleEn: "Komunitas",
    descriptionId: "Aktivitas lokal untuk memperkuat pemahaman dan partisipasi.",
    descriptionEn: "Aktivitas lokal untuk memperkuat pemahaman dan partisipasi.",
    links: [
      { href: "/workshops", titleId: "Workshop", titleEn: "Workshop", descriptionId: "Kegiatan belajar langsung bersama komunitas lokal.", descriptionEn: "Kegiatan belajar langsung bersama komunitas lokal.", badge: "Lokal" },
      { href: "/workshop-kit", titleId: "Perangkat Workshop", titleEn: "Perangkat Workshop", descriptionId: "Panduan fasilitator untuk menjalankan sesi belajar komunitas.", descriptionEn: "Panduan fasilitator untuk menjalankan sesi belajar komunitas." },
    ],
  },
  {
    id: "dokumentasi",
    titleId: "Dokumentasi",
    titleEn: "Dokumentasi",
    descriptionId: "Penjelasan produk, narasi, Paspor Kesiapan, dan kesiapan grant.",
    descriptionEn: "Penjelasan produk, narasi, Paspor Kesiapan, dan kesiapan grant.",
    links: [
      { href: "/docs", titleId: "Pusat Dokumentasi", titleEn: "Pusat Dokumentasi", descriptionId: "Pusat penjelasan produk dan kesiapan grant.", descriptionEn: "Pusat penjelasan produk dan kesiapan grant.", badge: "Docs" },
      { href: "/docs/product-narrative", titleId: "Narasi Produk", titleEn: "Narasi Produk", descriptionId: "Masalah, pendekatan, dan positioning Karyra.", descriptionEn: "Masalah, pendekatan, dan positioning Karyra." },
      { href: "/docs/readiness-passport", titleId: "Dokumentasi Paspor", titleEn: "Dokumentasi Paspor", descriptionId: "Cara kerja Paspor Kesiapan dan sinyal yang dibaca.", descriptionEn: "Cara kerja Paspor Kesiapan dan sinyal yang dibaca." },
      { href: "/docs/grant-readiness", titleId: "Kesiapan Grant", titleEn: "Kesiapan Grant", descriptionId: "Checklist internal menuju grant-ready.", descriptionEn: "Checklist internal menuju grant-ready." },
    ],
  },
  {
    id: "informasi",
    titleId: "Informasi",
    titleEn: "Informasi",
    descriptionId: "Halaman pendukung untuk memahami Karyra dan batasan penggunaannya.",
    descriptionEn: "Halaman pendukung untuk memahami Karyra dan batasan penggunaannya.",
    links: [
      { href: "/about", titleId: "Tentang Karyra", titleEn: "Tentang Karyra", descriptionId: "Penjelasan singkat tentang alasan, arah, dan prinsip Karyra.", descriptionEn: "Penjelasan singkat tentang alasan, arah, dan prinsip Karyra.", badge: "About" },
      { href: "/faq", titleId: "FAQ", titleEn: "FAQ", descriptionId: "Jawaban singkat untuk pertanyaan umum pengguna dan reviewer.", descriptionEn: "Jawaban singkat untuk pertanyaan umum pengguna dan reviewer." },
      { href: "/terms", titleId: "Ketentuan Penggunaan", titleEn: "Ketentuan Penggunaan", descriptionId: "Batasan penggunaan, edukasi, risiko, dan disclaimer Karyra.", descriptionEn: "Batasan penggunaan, edukasi, risiko, dan disclaimer Karyra." },
    ],
  },
  {
    id: "produk",
    titleId: "Kesiapan",
    titleEn: "Kesiapan",
    descriptionId: "Kerangka bukti dan kesiapan yang menjadi arah utama Karyra.",
    descriptionEn: "Kerangka bukti dan kesiapan yang menjadi arah utama Karyra.",
    links: [
      { href: "/proof-system", titleId: "Sistem Bukti", titleEn: "Sistem Bukti", descriptionId: "Bukti Belajar, Bukti Partisipasi, dan Bukti Kesiapan.", descriptionEn: "Bukti Belajar, Bukti Partisipasi, dan Bukti Kesiapan.", badge: "Inti" },
      { href: "/status", titleId: "Status Produk", titleEn: "Status Produk", descriptionId: "Ringkasan perkembangan produk, konten, dan aktivitas komunitas.", descriptionEn: "Ringkasan perkembangan produk, konten, dan aktivitas komunitas." },
      { href: "/roadmap", titleId: "Roadmap", titleEn: "Roadmap", descriptionId: "Arah pengembangan Karyra secara bertahap.", descriptionEn: "Arah pengembangan Karyra secara bertahap." },
      { href: "/changelog", titleId: "Catatan Perubahan", titleEn: "Catatan Perubahan", descriptionId: "Riwayat perubahan penting pada produk.", descriptionEn: "Riwayat perubahan penting pada produk." },
    ],
  },
];

export const flatNavigationLinks = navigationSections.flatMap((section) => section.links);

export const primaryNavigationLinks: NavigationLink[] = [
  { href: "/", titleId: "Beranda", titleEn: "Beranda", descriptionId: "Pintu masuk dan wajah utama Karyra.", descriptionEn: "Pintu masuk dan wajah utama Karyra." },
  { href: "/courses", titleId: "Kursus", titleEn: "Kursus", descriptionId: "Mulai dari jalur belajar utama.", descriptionEn: "Mulai dari jalur belajar utama." },
  { href: "/lessons", titleId: "Pelajaran", titleEn: "Pelajaran", descriptionId: "Buka materi sebagai ruang baca.", descriptionEn: "Buka materi sebagai ruang baca." },
  { href: "/dashboard", titleId: "Dasbor", titleEn: "Dasbor", descriptionId: "Pantau progres belajar.", descriptionEn: "Pantau progres belajar." },
  { href: "/passport", titleId: "Paspor", titleEn: "Paspor", descriptionId: "Lihat bukti kesiapan.", descriptionEn: "Lihat bukti kesiapan." },
  { href: "/about", titleId: "Tentang", titleEn: "Tentang", descriptionId: "Kenali arah dan prinsip Karyra.", descriptionEn: "Kenali arah dan prinsip Karyra." },
  { href: "/faq", titleId: "FAQ", titleEn: "FAQ", descriptionId: "Baca pertanyaan umum.", descriptionEn: "Baca pertanyaan umum." },
  { href: "/demo-flow", titleId: "Alur Demo", titleEn: "Alur Demo", descriptionId: "Ikuti rute penilaian produk.", descriptionEn: "Ikuti rute penilaian produk." },
  { href: "/docs", titleId: "Dokumentasi", titleEn: "Dokumentasi", descriptionId: "Baca penjelasan produk.", descriptionEn: "Baca penjelasan produk." },
  { href: "/login", titleId: "Masuk", titleEn: "Masuk", descriptionId: "Masuk ke ruang belajar Karyra.", descriptionEn: "Masuk ke ruang belajar Karyra." },
];
