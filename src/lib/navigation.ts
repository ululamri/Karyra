export type NavigationLink = {
  href: string;
  titleId: string;
  titleEn: string;
  descriptionId: string;
  descriptionEn: string;
  badge?: string;
};

export type NavigationSection = {
  id: "learner" | "admin" | "reviewer" | "local-pilot" | "docs";
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
    titleId: "Masuk sebagai Learner",
    titleEn: "Enter as Learner",
    descriptionId:
      "Area belajar untuk user awam: course, quest, passport, Stellar readiness, dan workshop.",
    descriptionEn:
      "The learner-facing area: courses, quests, passport, Stellar readiness, and workshops.",
    links: [
      {
        href: "/learner",
        titleId: "Learner Home",
        titleEn: "Learner Home",
        descriptionId: "Pintu masuk khusus untuk pengalaman learner.",
        descriptionEn: "Dedicated entry point for the learner experience.",
        badge: "Learner",
      },
      {
        href: "/dashboard",
        titleId: "Dashboard Learner",
        titleEn: "Learner Dashboard",
        descriptionId: "Progress belajar, badge, submission, dan workshop.",
        descriptionEn: "Learning progress, badges, submissions, and workshops.",
      },
      {
        href: "/courses",
        titleId: "Course",
        titleEn: "Courses",
        descriptionId: "Materi pembelajaran Web3 dan Stellar readiness.",
        descriptionEn: "Web3 and Stellar readiness learning materials.",
      },
      {
        href: "/quests?track=stellar-readiness",
        titleId: "Quest Stellar",
        titleEn: "Stellar Quests",
        descriptionId: "Quest readiness untuk wallet, memo, scam, dan checklist transaksi.",
        descriptionEn: "Readiness quests for wallet, memo, scam, and transaction checklist.",
      },
      {
        href: "/passport",
        titleId: "Readiness Passport",
        titleEn: "Readiness Passport",
        descriptionId: "Identitas kesiapan learner berbasis proof record.",
        descriptionEn: "Learner readiness identity powered by proof records.",
      },
      {
        href: "/stacks/stellar-readiness",
        titleId: "Stellar Readiness",
        titleEn: "Stellar Readiness",
        descriptionId: "Jalur kesiapan pembayaran Web3 sebelum transaksi nyata.",
        descriptionEn: "Web3 payment-readiness path before real transactions.",
      },
      {
        href: "/stacks/stellar-readiness/checklist",
        titleId: "Stellar Checklist",
        titleEn: "Stellar Checklist",
        descriptionId: "Checklist interaktif sebelum transaksi.",
        descriptionEn: "Interactive pre-transaction checklist.",
      },
      {
        href: "/workshops",
        titleId: "Workshop",
        titleEn: "Workshops",
        descriptionId: "Registrasi workshop komunitas lokal.",
        descriptionEn: "Local community workshop registration.",
      },
    ],
  },
  {
    id: "admin",
    titleId: "Masuk sebagai Admin",
    titleEn: "Enter as Admin",
    descriptionId:
      "Area internal demo untuk mengelola course, review quest, learner, proof archive, dan health check.",
    descriptionEn:
      "Internal demo area for courses, quest review, learners, proof archive, and health checks.",
    links: [
      {
        href: "/admin",
        titleId: "Admin Console",
        titleEn: "Admin Console",
        descriptionId: "Pusat kontrol demo super admin MVP.",
        descriptionEn: "MVP demo super-admin control center.",
        badge: "Admin",
      },
      {
        href: "/admin/courses",
        titleId: "Kelola Course",
        titleEn: "Manage Courses",
        descriptionId: "Publish, archive, dan preview konten belajar.",
        descriptionEn: "Publish, archive, and preview learning content.",
      },
      {
        href: "/admin/submissions",
        titleId: "Review Submission",
        titleEn: "Review Submissions",
        descriptionId: "Approve quest dan berikan XP.",
        descriptionEn: "Approve quests and grant XP.",
      },
      {
        href: "/admin/learners",
        titleId: "Learner Readiness",
        titleEn: "Learner Readiness",
        descriptionId: "Pantau score, passport, dan readiness learner.",
        descriptionEn: "Monitor learner scores, passports, and readiness.",
      },
      {
        href: "/admin/proofs",
        titleId: "Filecoin Proof Archive",
        titleEn: "Filecoin Proof Archive",
        descriptionId: "Kelola proof, manifest, checksum, dan CID demo.",
        descriptionEn: "Manage proofs, manifests, checksums, and demo CIDs.",
      },
      {
        href: "/admin/workshops",
        titleId: "Kelola Workshop",
        titleEn: "Manage Workshops",
        descriptionId: "Buat workshop dan pantau registrasi learner.",
        descriptionEn: "Create workshops and monitor learner registrations.",
      },
      {
        href: "/admin/health",
        titleId: "System Health",
        titleEn: "System Health",
        descriptionId: "Cek kesehatan data MVP dan readiness flow.",
        descriptionEn: "Check MVP data health and readiness flow.",
        badge: "Health",
      },
    ],
  },
  {
    id: "reviewer",
    titleId: "Masuk sebagai Reviewer / Grantee",
    titleEn: "Enter as Reviewer / Grantee",
    descriptionId:
      "Area evaluasi untuk melihat demo path, grant package, impact, transparency, QA, dan roadmap.",
    descriptionEn:
      "Evaluation area for demo path, grant package, impact, transparency, QA, and roadmap.",
    links: [
      {
        href: "/reviewer",
        titleId: "Reviewer Entry",
        titleEn: "Reviewer Entry",
        descriptionId: "Mulai evaluasi dari mode reviewer.",
        descriptionEn: "Start the evaluation from reviewer mode.",
        badge: "Reviewer",
      },
      {
        href: "/grant-package",
        titleId: "Grant Package",
        titleEn: "Grant Package",
        descriptionId: "Pusat link penting untuk reviewer dan grantee.",
        descriptionEn: "Central package of links for reviewers and grantees.",
      },
      {
        href: "/demo",
        titleId: "Demo Path",
        titleEn: "Demo Path",
        descriptionId: "Alur demo cepat dari learner sampai proof archive.",
        descriptionEn: "Quick demo path from learner to proof archive.",
      },
      {
        href: "/mvp-map",
        titleId: "MVP Map",
        titleEn: "MVP Map",
        descriptionId: "Peta alur fitur dan sistem Karyra.",
        descriptionEn: "Map of Karyra features and system flow.",
      },
      {
        href: "/impact",
        titleId: "Impact Report",
        titleEn: "Impact Report",
        descriptionId: "Snapshot dampak learning, quest, workshop, proof, dan readiness.",
        descriptionEn: "Impact snapshot for learning, quests, workshops, proofs, and readiness.",
      },
      {
        href: "/transparency",
        titleId: "Transparency Portal",
        titleEn: "Transparency Portal",
        descriptionId: "Portal keterbukaan progress dan metrik MVP.",
        descriptionEn: "Transparency portal for progress and MVP metrics.",
      },
      {
        href: "/qa-checklist",
        titleId: "QA Checklist",
        titleEn: "QA Checklist",
        descriptionId: "Checklist manual untuk menguji alur MVP.",
        descriptionEn: "Manual checklist to test MVP flows.",
        badge: "QA",
      },
      {
        href: "/status",
        titleId: "Project Status",
        titleEn: "Project Status",
        descriptionId: "Metrik status, roadmap, dan readiness infrastructure.",
        descriptionEn: "Status metrics, roadmap, and readiness infrastructure.",
      },
    ],
  },
  {
    id: "local-pilot",
    titleId: "Local Pilot",
    titleEn: "Local Pilot",
    descriptionId:
      "Dokumen lapangan untuk workshop, pilot komunitas, dan rencana implementasi lokal.",
    descriptionEn:
      "Field documents for workshops, community pilots, and local implementation plan.",
    links: [
      {
        href: "/workshop-kit",
        titleId: "Workshop Kit",
        titleEn: "Workshop Kit",
        descriptionId: "Panduan fasilitator untuk menjalankan onboarding lokal.",
        descriptionEn: "Facilitator guide for local onboarding sessions.",
      },
      {
        href: "/pilot-plan",
        titleId: "Pilot Plan",
        titleEn: "Pilot Plan",
        descriptionId: "Rencana pilot 4 minggu untuk komunitas lokal.",
        descriptionEn: "Four-week pilot plan for local communities.",
      },
      {
        href: "/roadmap",
        titleId: "Public Roadmap",
        titleEn: "Public Roadmap",
        descriptionId: "Roadmap publik Karyra dan milestone berikutnya.",
        descriptionEn: "Karyra public roadmap and next milestones.",
      },
      {
        href: "/release-notes",
        titleId: "Release Notes",
        titleEn: "Release Notes",
        descriptionId: "Catatan rilis dan checkpoint pengembangan.",
        descriptionEn: "Release notes and development checkpoints.",
      },
    ],
  },
  {
    id: "docs",
    titleId: "Docs & Architecture",
    titleEn: "Docs & Architecture",
    descriptionId:
      "Dokumentasi produk, arsitektur, grant readiness, changelog, dan public proof pages.",
    descriptionEn:
      "Product docs, architecture, grant readiness, changelog, and public proof pages.",
    links: [
      {
        href: "/docs",
        titleId: "Docs Hub",
        titleEn: "Docs Hub",
        descriptionId: "Pusat dokumentasi Karyra.",
        descriptionEn: "Karyra documentation hub.",
      },
      {
        href: "/docs/architecture",
        titleId: "Architecture",
        titleEn: "Architecture",
        descriptionId: "Arsitektur data, role, dan proof flow.",
        descriptionEn: "Data, role, and proof-flow architecture.",
      },
      {
        href: "/docs/grant-readiness",
        titleId: "Grant Readiness Docs",
        titleEn: "Grant Readiness Docs",
        descriptionId: "Dokumentasi kesiapan grant dan next proof targets.",
        descriptionEn: "Grant readiness documentation and next proof targets.",
      },
      {
        href: "/changelog",
        titleId: "Changelog",
        titleEn: "Changelog",
        descriptionId: "Riwayat update produk.",
        descriptionEn: "Product update history.",
      },
      {
        href: "/passport/share",
        titleId: "Passport Share",
        titleEn: "Passport Share",
        descriptionId: "Ringkasan readiness yang bisa dibagikan.",
        descriptionEn: "Shareable readiness summary.",
      },
    ],
  },
];

export const flatNavigationLinks = navigationSections.flatMap(
  (section) => section.links,
);

export const primaryNavigationLinks = [
  navigationSections[0].links[0],
  navigationSections[1].links[0],
  navigationSections[2].links[0],
  navigationSections[2].links[1],
  navigationSections[0].links[4],
  navigationSections[0].links[5],
];
