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

export function localize(language: "id" | "en", id: string, en: string) {
  return language === "id" ? id : en;
}

export const navigationSections: NavigationSection[] = [
  {
    id: "learner",
    titleId: "Learner",
    titleEn: "Learner",
    descriptionId: "Alur belajar untuk user: belajar, quest, passport, dan readiness.",
    descriptionEn: "Learning journey for users: learning, quests, passport, and readiness.",
    links: [
      { href: "/learner", titleId: "Learner Mode", titleEn: "Learner Mode", descriptionId: "Masuk ke pengalaman learner yang tidak bercampur dengan admin/reviewer.", descriptionEn: "Enter a learner experience separated from admin/reviewer pages.", badge: "Start" },
      { href: "/dashboard", titleId: "Dashboard", titleEn: "Dashboard", descriptionId: "XP, badge, progress, submission, reward, dan workshop.", descriptionEn: "XP, badges, progress, submissions, rewards, and workshops.", badge: "App" },
      { href: "/courses", titleId: "Courses", titleEn: "Courses", descriptionId: "Materi Web3 dan Stellar readiness untuk pemula.", descriptionEn: "Web3 and Stellar readiness materials for beginners." },
      { href: "/quests?track=stellar-readiness", titleId: "Quest Stellar", titleEn: "Stellar Quests", descriptionId: "Quest untuk Proof-of-Readiness sebelum transaksi nyata.", descriptionEn: "Quests for Proof-of-Readiness before real transactions.", badge: "Stellar" },
      { href: "/passport", titleId: "Readiness Passport", titleEn: "Readiness Passport", descriptionId: "Score, level, proof, badge, timeline, dan archive status.", descriptionEn: "Score, level, proof, badges, timeline, and archive status.", badge: "Proof" },
      { href: "/stacks/stellar-readiness", titleId: "Stellar Readiness", titleEn: "Stellar Readiness", descriptionId: "Jalur kesiapan pembayaran Web3 berbasis Stellar.", descriptionEn: "Stellar-based Web3 payment-readiness track." },
      { href: "/stacks/stellar-readiness/checklist", titleId: "Checklist Stellar", titleEn: "Stellar Checklist", descriptionId: "Checklist pre-transaction confidence.", descriptionEn: "Pre-transaction confidence checklist." },
      { href: "/workshops", titleId: "Workshops", titleEn: "Workshops", descriptionId: "Aktivitas offline dan onboarding komunitas.", descriptionEn: "Offline activities and community onboarding." },
    ],
  },
  {
    id: "admin",
    titleId: "Admin",
    titleEn: "Admin",
    descriptionId: "Tools internal MVP untuk mengelola konten, review, proof, dan health.",
    descriptionEn: "Internal MVP tools to manage content, review, proofs, and health.",
    links: [
      { href: "/admin", titleId: "Admin Console", titleEn: "Admin Console", descriptionId: "Pusat kontrol internal Super Admin demo.", descriptionEn: "Internal control center for the Super Admin demo.", badge: "Admin" },
      { href: "/admin/health", titleId: "System Health", titleEn: "System Health", descriptionId: "Cek database, readiness, proof, Stellar, Filecoin, dan pending review.", descriptionEn: "Check database, readiness, proofs, Stellar, Filecoin, and pending review.", badge: "Health" },
      { href: "/admin/submissions", titleId: "Review Submission", titleEn: "Review Submissions", descriptionId: "Approve quest dan sinkronkan reward/proof.", descriptionEn: "Approve quests and sync rewards/proofs." },
      { href: "/admin/learners", titleId: "Learner Readiness", titleEn: "Learner Readiness", descriptionId: "Pantau score, level, passport, dan proof learner.", descriptionEn: "Monitor learner scores, levels, passports, and proofs." },
      { href: "/admin/proofs", titleId: "Proof Archive", titleEn: "Proof Archive", descriptionId: "Kelola manifest, checksum, CID demo, dan verification.", descriptionEn: "Manage manifest, checksums, demo CIDs, and verification.", badge: "Filecoin" },
      { href: "/admin/courses", titleId: "Courses Admin", titleEn: "Courses Admin", descriptionId: "Kelola course dan lesson.", descriptionEn: "Manage courses and lessons." },
      { href: "/admin/workshops", titleId: "Workshops Admin", titleEn: "Workshops Admin", descriptionId: "Kelola workshop dan registrasi.", descriptionEn: "Manage workshops and registrations." },
    ],
  },
  {
    id: "reviewer",
    titleId: "Reviewer / Grant",
    titleEn: "Reviewer / Grant",
    descriptionId: "Jalur evaluasi untuk reviewer, grantee, investor, dan kreator.",
    descriptionEn: "Evaluation path for reviewers, grantees, investors, and the creator.",
    links: [
      { href: "/reviewer", titleId: "Reviewer Entry", titleEn: "Reviewer Entry", descriptionId: "Mulai evaluasi MVP dari satu halaman.", descriptionEn: "Start MVP evaluation from one page.", badge: "Start" },
      { href: "/grant-package", titleId: "Grant Package", titleEn: "Grant Package", descriptionId: "Pusat bukti MVP, impact, architecture, pilot, dan QA.", descriptionEn: "Main hub for MVP evidence, impact, architecture, pilot, and QA.", badge: "Package" },
      { href: "/demo", titleId: "Demo Path", titleEn: "Demo Path", descriptionId: "Jalur demo ringkas untuk menilai flow utama.", descriptionEn: "A concise demo path to review the main flow." },
      { href: "/mvp-map", titleId: "MVP Map", titleEn: "MVP Map", descriptionId: "Peta sistem learner, admin, proof, archive, dan reviewer.", descriptionEn: "Map of learner, admin, proof, archive, and reviewer systems." },
      { href: "/impact", titleId: "Impact Report", titleEn: "Impact Report", descriptionId: "Laporan dampak readiness dan local onboarding.", descriptionEn: "Readiness and local onboarding impact report." },
      { href: "/transparency", titleId: "Transparency", titleEn: "Transparency", descriptionId: "Portal transparansi progress dan proof.", descriptionEn: "Transparency portal for progress and proofs." },
      { href: "/qa-checklist", titleId: "QA Checklist", titleEn: "QA Checklist", descriptionId: "Checklist manual untuk memastikan flow inti berjalan.", descriptionEn: "Manual checklist to verify core flows.", badge: "QA" },
      { href: "/release-notes", titleId: "Release Notes", titleEn: "Release Notes", descriptionId: "Catatan rilis MVP.", descriptionEn: "MVP release notes." },
    ],
  },
  {
    id: "local-pilot",
    titleId: "Local Pilot",
    titleEn: "Local Pilot",
    descriptionId: "Resource untuk workshop, pilot komunitas, dan validasi lapangan.",
    descriptionEn: "Resources for workshops, community pilots, and field validation.",
    links: [
      { href: "/workshop-kit", titleId: "Workshop Kit", titleEn: "Workshop Kit", descriptionId: "Kit fasilitator untuk onboarding komunitas lokal.", descriptionEn: "Facilitator kit for local community onboarding." },
      { href: "/pilot-plan", titleId: "Pilot Plan", titleEn: "Pilot Plan", descriptionId: "Rencana pilot 4 minggu dan success metrics.", descriptionEn: "A 4-week pilot plan and success metrics." },
      { href: "/roadmap", titleId: "Roadmap", titleEn: "Roadmap", descriptionId: "Roadmap publik dan milestone MVP.", descriptionEn: "Public roadmap and MVP milestones." },
      { href: "/status", titleId: "Status", titleEn: "Status", descriptionId: "Snapshot metrik readiness, Filecoin, Stellar, dan impact.", descriptionEn: "Metrics snapshot for readiness, Filecoin, Stellar, and impact." },
    ],
  },
  {
    id: "docs",
    titleId: "Docs",
    titleEn: "Docs",
    descriptionId: "Dokumentasi arsitektur, grant readiness, changelog, dan referensi teknis.",
    descriptionEn: "Architecture, grant readiness, changelog, and technical references.",
    links: [
      { href: "/docs", titleId: "Docs Hub", titleEn: "Docs Hub", descriptionId: "Pusat dokumentasi publik Karyra.", descriptionEn: "Public documentation hub for Karyra." },
      { href: "/docs/architecture", titleId: "Architecture", titleEn: "Architecture", descriptionId: "Arsitektur produk dan data flow.", descriptionEn: "Product architecture and data flow." },
      { href: "/docs/grant-readiness", titleId: "Grant Readiness", titleEn: "Grant Readiness", descriptionId: "Kesiapan proposal dan evaluasi grant.", descriptionEn: "Grant proposal and evaluation readiness." },
      { href: "/changelog", titleId: "Changelog", titleEn: "Changelog", descriptionId: "Riwayat perubahan dan milestone.", descriptionEn: "Change history and milestones." },
      { href: "/menu", titleId: "Full Menu", titleEn: "Full Menu", descriptionId: "Navigasi lengkap berdasarkan role.", descriptionEn: "Complete role-based navigation.", badge: "All" },
    ],
  },
];

export const flatNavigationLinks = navigationSections.flatMap((section) => section.links);

export const primaryNavigationLinks: NavigationLink[] = [
  { href: "/learner", titleId: "Learner", titleEn: "Learner", descriptionId: "Masuk sebagai learner.", descriptionEn: "Enter as learner.", badge: "Mode" },
  { href: "/admin", titleId: "Admin", titleEn: "Admin", descriptionId: "Masuk ke admin console.", descriptionEn: "Open admin console.", badge: "Mode" },
  { href: "/reviewer", titleId: "Reviewer", titleEn: "Reviewer", descriptionId: "Masuk ke reviewer mode.", descriptionEn: "Open reviewer mode.", badge: "Mode" },
  { href: "/dashboard", titleId: "Dashboard", titleEn: "Dashboard", descriptionId: "Learner dashboard.", descriptionEn: "Learner dashboard." },
  { href: "/passport", titleId: "Passport", titleEn: "Passport", descriptionId: "Readiness passport.", descriptionEn: "Readiness passport." },
  { href: "/grant-package", titleId: "Grant Package", titleEn: "Grant Package", descriptionId: "Paket review grant.", descriptionEn: "Grant review package." },
  { href: "/menu", titleId: "Full Menu", titleEn: "Full Menu", descriptionId: "Navigasi lengkap.", descriptionEn: "Full navigation." },
];
