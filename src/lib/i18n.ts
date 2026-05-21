export const DEFAULT_LANGUAGE = "id" as const;

const id = {
  appName: "Karyra",
  appTagline: "Ruang kesiapan blockchain lokal",
  home: "Beranda",
  courses: "Kursus",
  quests: "Quest",
  dashboard: "Dasbor",
  startLearning: "Mulai Belajar",
  viewQuests: "Lihat Quest",
  mobilePreview: "Mode Mobile",
  desktopPreview: "Mode Desktop",
  switchToEnglish: "Ganti ke English",
  switchToIndonesian: "Ganti ke Indonesia",
  heroTitle:
    "Belajar blockchain tanpa harus langsung merasa teknis.",
  heroDescription:
    "Karyra membantu masyarakat lokal memahami blockchain sebagai fondasi kepercayaan digital, lalu mengenal cryptocurrency dan Web3 secara bertahap.",
  activeCourses: "Kursus aktif",
  availableLessons: "Pelajaran tersedia",
  activeQuests: "Quest aktif",
  continueLearning: "Lanjutkan Belajar",
  learnerDashboard: "Dasbor Belajar",
  learningProgress: "Progres Belajar",
  activeQuest: "Quest Aktif",
  earnedBadges: "Badge Didapat",
  currentLevel: "Level Saat Ini",
  totalXp: "Total XP",
  dayStreak: "Hari Streak",
  status: "Status",
  projectStatus: "Status Produk",
  grantProof: "Bukti Progres",
  platformMetrics: "Metrik Platform",
  roadmap: "Roadmap",
  techStack: "Stack Teknologi",
  communityDirection: "Arah Komunitas",
  totalLearners: "Total Learner",
  totalEnrollments: "Total Enrollment",
  totalSubmissions: "Total Submission",
  totalXpDistributed: "Total XP Dibagikan",
  publishedCourses: "Kursus Terbit",
  publishedLessons: "Pelajaran Terbit",
  publishedQuests: "Quest Terbit",
  activeWorkshops: "Workshop Aktif",
  admin: "Admin",
  changelog: "Catatan Perubahan",
  publicChangelog: "Catatan Perubahan Publik",
  recentUpdates: "Update Terbaru",
  nextMilestones: "Milestone Berikutnya",
  transparency: "Transparansi",
  workshops: "Workshop",
  upcomingWorkshops: "Workshop Mendatang",
  registerWorkshop: "Daftar Workshop",
  cancelRegistration: "Batalkan Pendaftaran",
  impact: "Dampak",
  impactReport: "Laporan Dampak",
  learningImpact: "Dampak Pembelajaran",
  communityImpact: "Dampak Komunitas",
  grantReadiness: "Kesiapan Grant",
  completedLessons: "Pelajaran Selesai",
  approvedSubmissions: "Submission Disetujui",
  workshopRegistrations: "Registrasi Workshop",
  averageProgress: "Rata-rata Progres",
  reviewerGuide: "Panduan Reviewer",
  demoFlow: "Alur Demo",
  proofPages: "Halaman Bukti",
  demoAccess: "Akses Demo",
} as const;

type TranslationDictionary = Record<keyof typeof id, string>;

const en: TranslationDictionary = {
  ...id,
};

export const dictionary = {
  id,
  en,
} as const;

export type Language = keyof typeof dictionary;
export type TranslationKey = keyof typeof id;

export function normalizeLanguage(value: string | null | undefined): Language {
  if (value === "en") return "en";
  return DEFAULT_LANGUAGE;
}

export function t(language: Language, key: TranslationKey): string {
  return dictionary[language][key] ?? dictionary[DEFAULT_LANGUAGE][key];
}
