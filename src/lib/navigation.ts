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
    id: "product",
    titleId: "Produk",
    titleEn: "Product",
    descriptionId: "Identitas utama Karyra: sistem bukti kesiapan Web3 lokal.",
    descriptionEn: "Karyra's core identity: a local Web3 readiness proof system.",
    links: [
      {
        href: "/proof-system",
        titleId: "Proof System",
        titleEn: "Proof System",
        descriptionId: "Tiga produk utama: Proof-of-Learning, Proof-of-Participation, dan Proof-of-Readiness.",
        descriptionEn: "The three core products: Proof-of-Learning, Proof-of-Participation, and Proof-of-Readiness.",
        badge: "Core",
      },
      {
        href: "/passport",
        titleId: "Readiness Passport",
        titleEn: "Readiness Passport",
        descriptionId: "Identitas kesiapan learner berdasarkan progress, proof, badge, dan arsip.",
        descriptionEn: "A learner readiness identity based on progress, proofs, badges, and archive status.",
        badge: "Proof",
      },
      {
        href: "/stacks/stellar-readiness",
        titleId: "Stellar Readiness",
        titleEn: "Stellar Readiness",
        descriptionId: "Jalur kesiapan finansial Web3: wallet safety, memo awareness, dan payment confidence.",
        descriptionEn: "A financial Web3 readiness track: wallet safety, memo awareness, and payment confidence.",
        badge: "Stellar",
      },
    ],
  },
  {
    id: "learn",
    titleId: "Belajar",
    titleEn: "Learn",
    descriptionId: "Masuk ke pengalaman learner: materi, quest, checklist, dan progress.",
    descriptionEn: "Enter the learner experience: lessons, quests, checklists, and progress.",
    links: [
      {
        href: "/learner",
        titleId: "Mulai Belajar",
        titleEn: "Start Learning",
        descriptionId: "Entry point user untuk belajar, quest, workshop, dan passport.",
        descriptionEn: "User entry point for learning, quests, workshops, and passport.",
        badge: "Start",
      },
      {
        href: "/courses",
        titleId: "Courses",
        titleEn: "Courses",
        descriptionId: "Materi pembelajaran Web3 untuk pemula dan komunitas lokal.",
        descriptionEn: "Web3 learning materials for beginners and local communities.",
      },
      {
        href: "/quests?track=stellar-readiness",
        titleId: "Quest Readiness",
        titleEn: "Readiness Quests",
        descriptionId: "Quest untuk membangun bukti kesiapan sebelum praktik Web3 nyata.",
        descriptionEn: "Quests to build readiness proof before real Web3 practice.",
      },
      {
        href: "/stacks/stellar-readiness/checklist",
        titleId: "Checklist Stellar",
        titleEn: "Stellar Checklist",
        descriptionId: "Checklist pre-transaction confidence untuk pengguna non-teknikal.",
        descriptionEn: "A pre-transaction confidence checklist for non-technical users.",
      },
    ],
  },
  {
    id: "community",
    titleId: "Komunitas",
    titleEn: "Community",
    descriptionId: "Aktivitas komunitas lokal yang membangun bukti partisipasi.",
    descriptionEn: "Local community activities that build participation proof.",
    links: [
      {
        href: "/workshops",
        titleId: "Workshops",
        titleEn: "Workshops",
        descriptionId: "Workshop lokal, onboarding komunitas, dan aktivitas offline.",
        descriptionEn: "Local workshops, community onboarding, and offline activities.",
        badge: "Local",
      },
      {
        href: "/workshop-kit",
        titleId: "Workshop Kit",
        titleEn: "Workshop Kit",
        descriptionId: "Panduan fasilitator untuk menjalankan onboarding komunitas.",
        descriptionEn: "Facilitator guide for running community onboarding.",
      },
      {
        href: "/pilot-plan",
        titleId: "Pilot Plan",
        titleEn: "Pilot Plan",
        descriptionId: "Rencana pilot komunitas untuk validasi lapangan.",
        descriptionEn: "Community pilot plan for field validation.",
      },
    ],
  },
  {
    id: "about",
    titleId: "Tentang",
    titleEn: "About",
    descriptionId: "Dokumentasi publik, roadmap, dan transparansi produk.",
    descriptionEn: "Public documentation, roadmap, and product transparency.",
    links: [
      {
        href: "/docs",
        titleId: "Docs",
        titleEn: "Docs",
        descriptionId: "Pusat narasi, arsitektur, dan dokumentasi publik Karyra.",
        descriptionEn: "Karyra's public narrative, architecture, and documentation center.",
        badge: "Docs",
      },
      {
        href: "/roadmap",
        titleId: "Roadmap",
        titleEn: "Roadmap",
        descriptionId: "Arah pengembangan produk dan milestone publik.",
        descriptionEn: "Product direction and public milestones.",
      },
      {
        href: "/status",
        titleId: "Status",
        titleEn: "Status",
        descriptionId: "Snapshot status produk, proof, readiness, dan komunitas.",
        descriptionEn: "Status snapshot for product, proofs, readiness, and community.",
      },
      {
        href: "/changelog",
        titleId: "Changelog",
        titleEn: "Changelog",
        descriptionId: "Catatan perkembangan dan perubahan produk.",
        descriptionEn: "Product progress and change history.",
      },
    ],
  },
];

export const flatNavigationLinks = navigationSections.flatMap((section) => section.links);

export const primaryNavigationLinks: NavigationLink[] = [
  {
    href: "/proof-system",
    titleId: "Proof System",
    titleEn: "Proof System",
    descriptionId: "Tiga produk utama Karyra.",
    descriptionEn: "Karyra's three core products.",
    badge: "Core",
  },
  {
    href: "/learner",
    titleId: "Learn",
    titleEn: "Learn",
    descriptionId: "Masuk ke pengalaman learner.",
    descriptionEn: "Enter the learner experience.",
  },
  {
    href: "/passport",
    titleId: "Passport",
    titleEn: "Passport",
    descriptionId: "Lihat readiness passport.",
    descriptionEn: "View the readiness passport.",
  },
  {
    href: "/workshops",
    titleId: "Workshops",
    titleEn: "Workshops",
    descriptionId: "Aktivitas komunitas lokal.",
    descriptionEn: "Local community activities.",
  },
  {
    href: "/login",
    titleId: "Login",
    titleEn: "Login",
    descriptionId: "Masuk ke demo Karyra.",
    descriptionEn: "Enter the Karyra demo.",
    badge: "Demo",
  },
];
