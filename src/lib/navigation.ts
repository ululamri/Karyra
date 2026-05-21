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
    titleId: "Belajar",
    titleEn: "Belajar",
    descriptionId: "Mulai dari ruang belajar, lanjutkan kursus dan pelajaran, lalu pantau progres.",
    descriptionEn: "Mulai dari ruang belajar, lanjutkan kursus dan pelajaran, lalu pantau progres.",
    links: [
      { href: "/learner", titleId: "Ruang Belajar", titleEn: "Ruang Belajar", descriptionId: "Pusat perjalanan belajar untuk melihat langkah berikutnya.", descriptionEn: "Pusat perjalanan belajar untuk melihat langkah berikutnya.", badge: "Mulai" },
      { href: "/courses", titleId: "Kursus", titleEn: "Kursus", descriptionId: "Pilih jalur belajar utama untuk memahami blockchain dari dasar.", descriptionEn: "Pilih jalur belajar utama untuk memahami blockchain dari dasar." },
      { href: "/lessons", titleId: "Pelajaran", titleEn: "Pelajaran", descriptionId: "Buka materi pendek sebagai ruang baca bertahap.", descriptionEn: "Buka materi pendek sebagai ruang baca bertahap." },
      { href: "/dashboard", titleId: "Dasbor Belajar", titleEn: "Dasbor Belajar", descriptionId: "Lihat progres, pelajaran berikutnya, dan ringkasan belajar.", descriptionEn: "Lihat progres, pelajaran berikutnya, dan ringkasan belajar." },
      { href: "/passport", titleId: "Paspor Kesiapan", titleEn: "Paspor Kesiapan", descriptionId: "Lihat bukti belajar, bukti partisipasi, dan bukti kesiapan.", descriptionEn: "Lihat bukti belajar, bukti partisipasi, dan bukti kesiapan.", badge: "Bukti" },
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
    id: "kesiapan",
    titleId: "Kesiapan",
    titleEn: "Kesiapan",
    descriptionId: "Kerangka bukti dan kesiapan yang menjadi arah utama Karyra.",
    descriptionEn: "Kerangka bukti dan kesiapan yang menjadi arah utama Karyra.",
    links: [
      { href: "/proof-system", titleId: "Sistem Bukti", titleEn: "Sistem Bukti", descriptionId: "Bukti Belajar, Bukti Partisipasi, dan Bukti Kesiapan.", descriptionEn: "Bukti Belajar, Bukti Partisipasi, dan Bukti Kesiapan.", badge: "Inti" },
      { href: "/docs/readiness-passport", titleId: "Dokumentasi Paspor", titleEn: "Dokumentasi Paspor", descriptionId: "Cara kerja Paspor Kesiapan dan sinyal yang dibaca.", descriptionEn: "Cara kerja Paspor Kesiapan dan sinyal yang dibaca." },
      { href: "/filecoin-proof-archive", titleId: "Filecoin Proof Archive", titleEn: "Filecoin Proof Archive", descriptionId: "Arsip bukti belajar, partisipasi, dan snapshot paspor.", descriptionEn: "Arsip bukti belajar, partisipasi, dan snapshot paspor." },
      { href: "/stacks/stellar-readiness", titleId: "Stellar Readiness Track", titleEn: "Stellar Readiness Track", descriptionId: "Latihan wallet safety, memo, asset, trustline, dan payment readiness.", descriptionEn: "Latihan wallet safety, memo, asset, trustline, dan payment readiness." },
    ],
  },
  {
    id: "ekosistem",
    titleId: "Filecoin + Stellar",
    titleEn: "Filecoin + Stellar",
    descriptionId: "Dua lapisan strategis: arsip bukti dan latihan kesiapan finansial blockchain.",
    descriptionEn: "Dua lapisan strategis: arsip bukti dan latihan kesiapan finansial blockchain.",
    links: [
      { href: "/docs/mainnet-graduation", titleId: "Testnet-to-Mainnet Graduation", titleEn: "Testnet-to-Mainnet Graduation", descriptionId: "Latihan aman dulu, mainnet kemudian.", descriptionEn: "Latihan aman dulu, mainnet kemudian.", badge: "Mainnet" },
      { href: "/docs/filecoin-stellar", titleId: "Strategi Filecoin + Stellar", titleEn: "Strategi Filecoin + Stellar", descriptionId: "Peran Filecoin dan Stellar di dalam Karyra.", descriptionEn: "Peran Filecoin dan Stellar di dalam Karyra.", badge: "Ecosystem" },
      { href: "/docs/filecoin-architecture", titleId: "Filecoin Storage Architecture", titleEn: "Filecoin Storage Architecture", descriptionId: "Calibration, mainnet archive, tooling storage, CID, dan provider strategy.", descriptionEn: "Calibration, mainnet archive, tooling storage, CID, dan provider strategy.", badge: "Filecoin" },
      { href: "/docs/stellar-testnet-flow", titleId: "Stellar Testnet Flow", titleEn: "Stellar Testnet Flow", descriptionId: "Friendbot, testnet XLM, trustline, memo, payment simulation, dan mainnet unlock.", descriptionEn: "Friendbot, testnet XLM, trustline, memo, payment simulation, dan mainnet unlock.", badge: "Stellar" },
    ],
  },
  {
    id: "dokumentasi",
    titleId: "Dokumentasi",
    titleEn: "Dokumentasi",
    descriptionId: "Penjelasan produk, narasi, Paspor Kesiapan, dan ekosistem pembelajaran.",
    descriptionEn: "Penjelasan produk, narasi, Paspor Kesiapan, dan ekosistem pembelajaran.",
    links: [
      { href: "/docs", titleId: "Pusat Dokumentasi", titleEn: "Pusat Dokumentasi", descriptionId: "Pusat penjelasan produk Karyra.", descriptionEn: "Pusat penjelasan produk Karyra.", badge: "Docs" },
      { href: "/docs/product-narrative", titleId: "Narasi Produk", titleEn: "Narasi Produk", descriptionId: "Masalah, pendekatan, dan positioning Karyra.", descriptionEn: "Masalah, pendekatan, dan positioning Karyra." },
      { href: "/status", titleId: "Status Produk", titleEn: "Status Produk", descriptionId: "Ringkasan perkembangan produk, konten, dan aktivitas komunitas.", descriptionEn: "Ringkasan perkembangan produk, konten, dan aktivitas komunitas." },
      { href: "/roadmap", titleId: "Roadmap", titleEn: "Roadmap", descriptionId: "Arah pengembangan Karyra secara bertahap.", descriptionEn: "Arah pengembangan Karyra secara bertahap." },
      { href: "/changelog", titleId: "Catatan Perubahan", titleEn: "Catatan Perubahan", descriptionId: "Riwayat perubahan penting pada produk.", descriptionEn: "Riwayat perubahan penting pada produk." },
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
      { href: "/faq", titleId: "FAQ", titleEn: "FAQ", descriptionId: "Jawaban singkat untuk pertanyaan umum pengguna.", descriptionEn: "Jawaban singkat untuk pertanyaan umum pengguna." },
      { href: "/terms", titleId: "Ketentuan Penggunaan", titleEn: "Ketentuan Penggunaan", descriptionId: "Batasan penggunaan, edukasi, risiko, dan disclaimer Karyra.", descriptionEn: "Batasan penggunaan, edukasi, risiko, dan disclaimer Karyra." },
    ],
  },
];

export const flatNavigationLinks = navigationSections.flatMap((section) => section.links);

export const primaryNavigationLinks: NavigationLink[] = [
  { href: "/", titleId: "Beranda", titleEn: "Beranda", descriptionId: "Pintu masuk utama Karyra.", descriptionEn: "Pintu masuk utama Karyra." },
  { href: "/learner", titleId: "Ruang Belajar", titleEn: "Ruang Belajar", descriptionId: "Lanjutkan perjalanan belajar.", descriptionEn: "Lanjutkan perjalanan belajar.", badge: "Mulai" },
  { href: "/courses", titleId: "Kursus", titleEn: "Kursus", descriptionId: "Mulai dari jalur belajar utama.", descriptionEn: "Mulai dari jalur belajar utama." },
  { href: "/lessons", titleId: "Pelajaran", titleEn: "Pelajaran", descriptionId: "Buka materi sebagai ruang baca.", descriptionEn: "Buka materi sebagai ruang baca." },
  { href: "/dashboard", titleId: "Dasbor", titleEn: "Dasbor", descriptionId: "Pantau progres belajar.", descriptionEn: "Pantau progres belajar." },
  { href: "/passport", titleId: "Paspor", titleEn: "Paspor", descriptionId: "Lihat bukti kesiapan.", descriptionEn: "Lihat bukti kesiapan.", badge: "Bukti" },
  { href: "/workshops", titleId: "Workshop", titleEn: "Workshop", descriptionId: "Ikuti aktivitas komunitas lokal.", descriptionEn: "Ikuti aktivitas komunitas lokal." },
  { href: "/docs", titleId: "Dokumentasi", titleEn: "Dokumentasi", descriptionId: "Baca penjelasan produk.", descriptionEn: "Baca penjelasan produk." },
  { href: "/about", titleId: "Tentang", titleEn: "Tentang", descriptionId: "Kenali arah dan prinsip Karyra.", descriptionEn: "Kenali arah dan prinsip Karyra." },
  { href: "/login", titleId: "Masuk", titleEn: "Masuk", descriptionId: "Masuk ke ruang belajar Karyra.", descriptionEn: "Masuk ke ruang belajar Karyra." },
];
