import type { Language } from "./i18n";

export type NavigationAudience = "learner" | "admin" | "reviewer" | "docs";

export type NavigationLink = {
  href: string;
  titleId: string;
  titleEn: string;
  descriptionId: string;
  descriptionEn: string;
  badge?: string;
  audience?: NavigationAudience;
};

export type NavigationSection = {
  titleId: string;
  titleEn: string;
  descriptionId: string;
  descriptionEn: string;
  audience: NavigationAudience;
  links: NavigationLink[];
};

export function localize(
  language: Language,
  valueId: string,
  valueEn: string,
) {
  return language === "id" ? valueId : valueEn;
}

export const primaryNavigationLinks: NavigationLink[] = [
  {
    href: "/courses",
    titleId: "Course",
    titleEn: "Courses",
    descriptionId: "Mulai belajar dari lesson, quiz, dan progres course.",
    descriptionEn: "Start learning from lessons, quizzes, and course progress.",
    audience: "learner",
  },
  {
    href: "/quests?track=stellar-readiness",
    titleId: "Quest Stellar",
    titleEn: "Stellar Quests",
    descriptionId: "Submit quest kesiapan pembayaran Web3 dan tunggu review admin.",
    descriptionEn: "Submit Web3 payment-readiness quests and wait for admin review.",
    badge: "Stellar",
    audience: "learner",
  },
  {
    href: "/passport",
    titleId: "Passport",
    titleEn: "Passport",
    descriptionId: "Lihat score kesiapan, proof record, badge, dan status Filecoin.",
    descriptionEn: "View readiness score, proof records, badges, and Filecoin status.",
    badge: "Proof",
    audience: "learner",
  },
  {
    href: "/reviewer",
    titleId: "Reviewer Mode",
    titleEn: "Reviewer Mode",
    descriptionId: "Mulai review dari jalur visitor, learner, admin, atau grant package.",
    descriptionEn: "Start review from visitor, learner, admin, or grant package paths.",
    badge: "Review",
    audience: "reviewer",
  },
];

export const navigationSections: NavigationSection[] = [
  {
    titleId: "Untuk Learner",
    titleEn: "For Learners",
    descriptionId: "Jalur belajar, quest, passport, proof, dan readiness identity.",
    descriptionEn: "Learning, quests, passport, proof, and readiness identity paths.",
    audience: "learner",
    links: [
      {
        href: "/dashboard",
        titleId: "Dashboard Learner",
        titleEn: "Learner Dashboard",
        descriptionId: "Pantau XP, badge, submission, workshop, dan progres belajar.",
        descriptionEn: "Track XP, badges, submissions, workshops, and learning progress.",
      },
      {
        href: "/courses",
        titleId: "Course",
        titleEn: "Courses",
        descriptionId: "Belajar dari course Web3 dan Stellar Readiness.",
        descriptionEn: "Learn through Web3 and Stellar Readiness courses.",
      },
      {
        href: "/quests?track=stellar-readiness",
        titleId: "Quest Stellar",
        titleEn: "Stellar Quests",
        descriptionId: "Submit quest dan bangun Proof-of-Readiness.",
        descriptionEn: "Submit quests and build Proof-of-Readiness.",
        badge: "Stellar",
      },
      {
        href: "/stacks/stellar-readiness",
        titleId: "Stellar Readiness Stack",
        titleEn: "Stellar Readiness Stack",
        descriptionId: "Jalur kesiapan pembayaran Web3 sebelum transaksi nyata.",
        descriptionEn: "The Web3 payment-readiness path before real transactions.",
        badge: "Stellar",
      },
      {
        href: "/stacks/stellar-readiness/checklist",
        titleId: "Checklist Stellar",
        titleEn: "Stellar Checklist",
        descriptionId: "Checklist interaktif untuk pre-transaction confidence.",
        descriptionEn: "Interactive checklist for pre-transaction confidence.",
      },
      {
        href: "/passport",
        titleId: "Readiness Passport",
        titleEn: "Readiness Passport",
        descriptionId: "Score, level, proof, badge, dan status archive learner.",
        descriptionEn: "Learner score, level, proofs, badges, and archive status.",
        badge: "Passport",
      },
      {
        href: "/passport/timeline",
        titleId: "Readiness Timeline",
        titleEn: "Readiness Timeline",
        descriptionId: "Riwayat badge, quest, reward, proof, dan workshop.",
        descriptionEn: "History of badges, quests, rewards, proofs, and workshops.",
      },
      {
        href: "/passport/share",
        titleId: "Share Summary",
        titleEn: "Share Summary",
        descriptionId: "Ringkasan passport yang bisa dibagikan ke reviewer atau mentor.",
        descriptionEn: "Shareable passport summary for reviewers or mentors.",
      },
      {
        href: "/workshops",
        titleId: "Workshop Publik",
        titleEn: "Public Workshops",
        descriptionId: "Daftar workshop dan registrasi learner.",
        descriptionEn: "Workshop list and learner registration.",
      },
    ],
  },
  {
    titleId: "Untuk Admin",
    titleEn: "For Admins",
    descriptionId: "Console internal untuk mengelola course, quest, learner, proof, dan kesehatan sistem.",
    descriptionEn: "Internal console for courses, quests, learners, proofs, and system health.",
    audience: "admin",
    links: [
      {
        href: "/admin",
        titleId: "Admin Console",
        titleEn: "Admin Console",
        descriptionId: "Pusat kendali MVP untuk konten, quest, workshop, learner, dan proof.",
        descriptionEn: "MVP control center for content, quests, workshops, learners, and proofs.",
        badge: "Admin",
      },
      {
        href: "/admin/health",
        titleId: "System Health",
        titleEn: "System Health",
        descriptionId: "Cek koneksi database, metrik readiness, proof, submission, dan Stellar.",
        descriptionEn: "Check database health, readiness, proof, submission, and Stellar metrics.",
        badge: "Health",
      },
      {
        href: "/admin/submissions",
        titleId: "Review Submission",
        titleEn: "Review Submissions",
        descriptionId: "Approve quest dan sinkronkan readiness/proof record.",
        descriptionEn: "Approve quests and sync readiness/proof records.",
      },
      {
        href: "/admin/learners",
        titleId: "Learner Readiness",
        titleEn: "Learner Readiness",
        descriptionId: "Monitor readiness score, level, proof, dan archive status.",
        descriptionEn: "Monitor readiness score, level, proofs, and archive status.",
      },
      {
        href: "/admin/proofs",
        titleId: "Filecoin Proof Archive",
        titleEn: "Filecoin Proof Archive",
        descriptionId: "Archive proof, manifest JSON, checksum, dan demo CID.",
        descriptionEn: "Archive proofs, manifest JSON, checksum, and demo CID.",
        badge: "Filecoin",
      },
      {
        href: "/admin/courses",
        titleId: "Kelola Course",
        titleEn: "Manage Courses",
        descriptionId: "Publish, archive, dan preview konten belajar.",
        descriptionEn: "Publish, archive, and preview learning content.",
      },
      {
        href: "/admin/courses/new",
        titleId: "Buat Course Baru",
        titleEn: "Create New Course",
        descriptionId: "Tambah course, module pertama, dan lesson pertama.",
        descriptionEn: "Add a course, first module, and first lesson.",
      },
      {
        href: "/admin/workshops",
        titleId: "Kelola Workshop",
        titleEn: "Manage Workshops",
        descriptionId: "Buat workshop dan pantau registrasi learner.",
        descriptionEn: "Create workshops and monitor learner registrations.",
      },
    ],
  },
  {
    titleId: "Untuk Reviewer",
    titleEn: "For Reviewers",
    descriptionId: "Jalur review grant, demo, QA, impact, roadmap, dan transparansi publik.",
    descriptionEn: "Grant review, demo, QA, impact, roadmap, and public transparency paths.",
    audience: "reviewer",
    links: [
      {
        href: "/reviewer",
        titleId: "Reviewer Entry",
        titleEn: "Reviewer Entry",
        descriptionId: "Pilih mode review: visitor, learner, admin, atau grant package.",
        descriptionEn: "Choose review mode: visitor, learner, admin, or grant package.",
        badge: "Start",
      },
      {
        href: "/grant-package",
        titleId: "Grant Package",
        titleEn: "Grant Package",
        descriptionId: "Index utama semua link dan bukti MVP untuk reviewer.",
        descriptionEn: "Main index of MVP links and evidence for reviewers.",
        badge: "Review",
      },
      {
        href: "/demo",
        titleId: "Demo Path",
        titleEn: "Demo Path",
        descriptionId: "Alur checkpoint untuk mengevaluasi MVP Karyra.",
        descriptionEn: "Checkpoint path to evaluate the Karyra MVP.",
      },
      {
        href: "/reviewer-guide",
        titleId: "Reviewer Guide",
        titleEn: "Reviewer Guide",
        descriptionId: "Panduan cepat untuk melihat alur produk dan bukti progres.",
        descriptionEn: "Quick guide for product flow and progress proof.",
      },
      {
        href: "/mvp-map",
        titleId: "MVP Map",
        titleEn: "MVP Map",
        descriptionId: "Peta alur learning, quest, proof, Filecoin, dan Stellar.",
        descriptionEn: "Map of learning, quests, proofs, Filecoin, and Stellar flows.",
      },
      {
        href: "/impact",
        titleId: "Impact Report",
        titleEn: "Impact Report",
        descriptionId: "Ringkasan dampak awal learning, proof, reward, dan workshop.",
        descriptionEn: "Early impact summary for learning, proofs, rewards, and workshops.",
      },
      {
        href: "/qa-checklist",
        titleId: "MVP QA Checklist",
        titleEn: "MVP QA Checklist",
        descriptionId: "Checklist manual untuk memastikan flow utama MVP berjalan.",
        descriptionEn: "Manual checklist to verify the main MVP flows.",
        badge: "QA",
      },
      {
        href: "/status",
        titleId: "Status Proyek",
        titleEn: "Project Status",
        descriptionId: "Metrik platform, readiness, proof, dan infrastructure snapshot.",
        descriptionEn: "Platform, readiness, proof, and infrastructure metrics snapshot.",
      },
      {
        href: "/transparency",
        titleId: "Transparency Portal",
        titleEn: "Transparency Portal",
        descriptionId: "Portal transparansi progres, proof, submission, dan demo path.",
        descriptionEn: "Transparency portal for progress, proofs, submissions, and demo path.",
      },
      {
        href: "/roadmap",
        titleId: "Roadmap",
        titleEn: "Roadmap",
        descriptionId: "Fase shipped, in progress, dan next untuk Karyra.",
        descriptionEn: "Shipped, in-progress, and next phases for Karyra.",
      },
      {
        href: "/changelog",
        titleId: "Changelog",
        titleEn: "Changelog",
        descriptionId: "Riwayat update dan milestone pengembangan.",
        descriptionEn: "Development update history and milestones.",
      },
      {
        href: "/release-notes",
        titleId: "Release Notes",
        titleEn: "Release Notes",
        descriptionId: "Catatan rilis fitur yang sudah dikirim.",
        descriptionEn: "Release notes for shipped features.",
      },
    ],
  },
  {
    titleId: "Local Pilot",
    titleEn: "Local Pilot",
    descriptionId: "Materi untuk membawa Karyra ke workshop dan pilot komunitas.",
    descriptionEn: "Resources for bringing Karyra into workshops and community pilots.",
    audience: "reviewer",
    links: [
      {
        href: "/workshop-kit",
        titleId: "Workshop Kit",
        titleEn: "Workshop Kit",
        descriptionId: "Panduan fasilitator, fase workshop, checklist, dan outcome.",
        descriptionEn: "Facilitator guide, workshop phases, checklist, and outcomes.",
        badge: "Local",
      },
      {
        href: "/pilot-plan",
        titleId: "Pilot Plan",
        titleEn: "Pilot Plan",
        descriptionId: "Rencana pilot 4 minggu, success metrics, dan risk controls.",
        descriptionEn: "A 4-week pilot plan, success metrics, and risk controls.",
        badge: "Pilot",
      },
      {
        href: "/workshops",
        titleId: "Workshop Publik",
        titleEn: "Public Workshops",
        descriptionId: "Daftar workshop dan registrasi learner.",
        descriptionEn: "Workshop list and learner registration.",
      },
    ],
  },
  {
    titleId: "Docs",
    titleEn: "Docs",
    descriptionId: "Dokumentasi arsitektur, grant readiness, dan catatan pengembangan.",
    descriptionEn: "Architecture documentation, grant readiness, and development notes.",
    audience: "docs",
    links: [
      {
        href: "/docs",
        titleId: "Docs Hub",
        titleEn: "Docs Hub",
        descriptionId: "Pusat dokumentasi arsitektur, grant readiness, dan demo path.",
        descriptionEn: "Documentation hub for architecture, grant readiness, and demo path.",
      },
      {
        href: "/docs/architecture",
        titleId: "Architecture",
        titleEn: "Architecture",
        descriptionId: "Gambaran arsitektur produk, data flow, dan proof flow.",
        descriptionEn: "Product architecture, data flow, and proof flow overview.",
      },
      {
        href: "/docs/grant-readiness",
        titleId: "Grant Readiness",
        titleEn: "Grant Readiness",
        descriptionId: "Checklist kesiapan Karyra untuk review grant.",
        descriptionEn: "Karyra readiness checklist for grant review.",
      },
    ],
  },
];

export const flatNavigationLinks = navigationSections.flatMap(
  (section) => section.links.map((link) => ({ ...link, audience: link.audience ?? section.audience })),
);
