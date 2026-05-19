import type { Language } from "./i18n";

export type NavigationLink = {
  href: string;
  titleId: string;
  titleEn: string;
  descriptionId: string;
  descriptionEn: string;
  badge?: string;
};

export type NavigationSection = {
  titleId: string;
  titleEn: string;
  descriptionId: string;
  descriptionEn: string;
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
  },
  {
    href: "/quests?track=stellar-readiness",
    titleId: "Quest Stellar",
    titleEn: "Stellar Quests",
    descriptionId: "Submit quest kesiapan pembayaran Web3 dan tunggu review admin.",
    descriptionEn: "Submit Web3 payment-readiness quests and wait for admin review.",
    badge: "Stellar",
  },
  {
    href: "/dashboard",
    titleId: "Dashboard",
    titleEn: "Dashboard",
    descriptionId: "Pantau XP, badge, submission, workshop, dan progres belajar.",
    descriptionEn: "Track XP, badges, submissions, workshops, and learning progress.",
  },
  {
    href: "/passport",
    titleId: "Readiness Passport",
    titleEn: "Readiness Passport",
    descriptionId: "Lihat score kesiapan, proof record, badge, dan status Filecoin.",
    descriptionEn: "View readiness score, proof records, badges, and Filecoin status.",
    badge: "Proof",
  },
];

export const navigationSections: NavigationSection[] = [
  {
    titleId: "Learner Flow",
    titleEn: "Learner Flow",
    descriptionId: "Jalur utama untuk mencoba Karyra sebagai learner.",
    descriptionEn: "The main path to try Karyra as a learner.",
    links: [
      {
        href: "/courses",
        titleId: "Course",
        titleEn: "Courses",
        descriptionId: "Belajar dari course Web3 dan Stellar Readiness.",
        descriptionEn: "Learn through Web3 and Stellar Readiness courses.",
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
        href: "/quests?track=stellar-readiness",
        titleId: "Quest Stellar",
        titleEn: "Stellar Quests",
        descriptionId: "Submit quest dan bangun Proof-of-Readiness.",
        descriptionEn: "Submit quests and build Proof-of-Readiness.",
      },
      {
        href: "/dashboard",
        titleId: "Dashboard Learner",
        titleEn: "Learner Dashboard",
        descriptionId: "Pantau status submission, badge, XP, dan workshop.",
        descriptionEn: "Track submission status, badges, XP, and workshops.",
      },
      {
        href: "/workshops",
        titleId: "Workshop",
        titleEn: "Workshops",
        descriptionId: "Hubungkan pembelajaran online dengan kegiatan komunitas lokal.",
        descriptionEn: "Connect online learning with local community activities.",
      },
    ],
  },
  {
    titleId: "Passport & Proof",
    titleEn: "Passport & Proof",
    descriptionId: "Identitas kesiapan, bukti belajar, dan arsip Filecoin demo.",
    descriptionEn: "Readiness identity, learning proof, and demo Filecoin archive.",
    links: [
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
        href: "/admin/proofs",
        titleId: "Filecoin Proof Archive",
        titleEn: "Filecoin Proof Archive",
        descriptionId: "Archive proof, manifest JSON, checksum, dan demo CID.",
        descriptionEn: "Archive proofs, manifest JSON, checksum, and demo CID.",
        badge: "Filecoin",
      },
    ],
  },
  {
    titleId: "Public Review",
    titleEn: "Public Review",
    descriptionId: "Halaman untuk grant reviewer, komunitas, dan transparansi publik.",
    descriptionEn: "Pages for grant reviewers, community, and public transparency.",
    links: [
      {
        href: "/demo",
        titleId: "Demo Path",
        titleEn: "Demo Path",
        descriptionId: "Alur 8 checkpoint untuk mengevaluasi MVP Karyra.",
        descriptionEn: "An 8-checkpoint path to evaluate the Karyra MVP.",
      },
      {
        href: "/qa-checklist",
        titleId: "QA Checklist",
        titleEn: "QA Checklist",
        descriptionId: "Checklist manual untuk menguji flow utama sebelum demo atau grant review.",
        descriptionEn: "Manual checklist to test key flows before demo or grant review.",
        badge: "QA",
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
    descriptionId: "Perangkat untuk menjalankan pilot komunitas lokal dan workshop offline.",
    descriptionEn: "Resources for running local community pilots and offline workshops.",
    links: [
      {
        href: "/workshop-kit",
        titleId: "Workshop Kit",
        titleEn: "Workshop Kit",
        descriptionId: "Panduan fasilitator, fase workshop, checklist, dan expected outcomes.",
        descriptionEn: "Facilitator guide, workshop phases, checklist, and expected outcomes.",
      },
      {
        href: "/pilot-plan",
        titleId: "Pilot Plan",
        titleEn: "Pilot Plan",
        descriptionId: "Rencana pilot 4 minggu, success metrics, dan risk controls.",
        descriptionEn: "Four-week pilot plan, success metrics, and risk controls.",
      },
      {
        href: "/grant-package",
        titleId: "Grant Package",
        titleEn: "Grant Package",
        descriptionId: "Pusat link penting untuk reviewer grant dan partner komunitas.",
        descriptionEn: "Central link package for grant reviewers and community partners.",
        badge: "Grant",
      },
    ],
  },
  {
    titleId: "Docs & Admin",
    titleEn: "Docs & Admin",
    descriptionId: "Dokumentasi publik dan console internal pengelolaan MVP.",
    descriptionEn: "Public documentation and internal MVP management console.",
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
      {
        href: "/admin",
        titleId: "Admin Console",
        titleEn: "Admin Console",
        descriptionId: "Kelola course, quest review, workshop, learner, dan proof archive.",
        descriptionEn: "Manage courses, quest review, workshops, learners, and proof archive.",
        badge: "Admin",
      },
      {
        href: "/admin/health",
        titleId: "System Health",
        titleEn: "System Health",
        descriptionId: "Cek database, course, quest, proof, archive, dan readiness health.",
        descriptionEn: "Check database, course, quest, proof, archive, and readiness health.",
        badge: "Health",
      },
      {
        href: "/admin/learners",
        titleId: "Learner Readiness",
        titleEn: "Learner Readiness",
        descriptionId: "Monitor readiness score, level, proof, dan archive status.",
        descriptionEn: "Monitor readiness score, level, proofs, and archive status.",
      },
      {
        href: "/admin/submissions",
        titleId: "Review Submission",
        titleEn: "Review Submissions",
        descriptionId: "Approve quest dan sinkronkan readiness/proof record.",
        descriptionEn: "Approve quests and sync readiness/proof records.",
      },
    ],
  },
];

export const flatNavigationLinks = navigationSections.flatMap(
  (section) => section.links,
);
