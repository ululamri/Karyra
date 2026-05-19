import { prisma } from "@/lib/prisma";
import { getServerLanguage } from "@/lib/i18n-server";
import { PageShell } from "@/components/ui/page-shell";
import { PageHero } from "@/components/ui/page-hero";
import { CompactCard, MetricCard } from "@/components/ui/compact-card";
import { ModePill } from "@/components/ui/mode-pill";

const learnerActions = [
  { href: "/dashboard", label: "01", titleId: "Dashboard", titleEn: "Dashboard", descriptionId: "XP, badge, progress, submission, reward, dan workshop.", descriptionEn: "XP, badges, progress, submissions, rewards, and workshops." },
  { href: "/courses", label: "02", titleId: "Courses", titleEn: "Courses", descriptionId: "Materi Web3 dan Stellar readiness dari level non-teknikal.", descriptionEn: "Web3 and Stellar readiness materials from a non-technical level." },
  { href: "/quests?track=stellar-readiness", label: "03", titleId: "Quest Stellar", titleEn: "Stellar Quests", descriptionId: "Submit quest untuk membangun Proof-of-Readiness sebelum transaksi nyata.", descriptionEn: "Submit quests to build Proof-of-Readiness before real transactions." },
  { href: "/passport", label: "04", titleId: "Readiness Passport", titleEn: "Readiness Passport", descriptionId: "Score, level, proof record, badge, timeline, dan archive status.", descriptionEn: "Score, level, proof records, badges, timeline, and archive status." },
  { href: "/stacks/stellar-readiness/checklist", label: "05", titleId: "Checklist Stellar", titleEn: "Stellar Checklist", descriptionId: "Latihan pre-transaction confidence sebelum menyentuh transaksi bernilai nyata.", descriptionEn: "Practice pre-transaction confidence before touching real-value transactions." },
  { href: "/workshops", label: "06", titleId: "Workshop Lokal", titleEn: "Local Workshops", descriptionId: "Aktivitas offline dan community onboarding.", descriptionEn: "Offline activities and community onboarding." },
];

export default async function LearnerModePage() {
  const language = await getServerLanguage();
  const [courseCount, questCount, workshopCount, proofCount, badgeCount, passportCount] = await Promise.all([
    prisma.course.count({ where: { status: "PUBLISHED" } }),
    prisma.quest.count({ where: { status: "PUBLISHED" } }),
    prisma.workshop.count(),
    prisma.proofRecord.count(),
    prisma.badge.count(),
    prisma.readinessProfile.count(),
  ]);

  const metrics = [
    { label: language === "id" ? "Course" : "Courses", value: courseCount },
    { label: language === "id" ? "Quest" : "Quests", value: questCount },
    { label: language === "id" ? "Workshop" : "Workshops", value: workshopCount },
    { label: "Proof", value: proofCount },
    { label: "Badge", value: badgeCount },
    { label: "Passport", value: passportCount },
  ];

  return (
    <PageShell>
      <PageHero
        eyebrow={language === "id" ? "Learner Mode" : "Learner Mode"}
        title={language === "id" ? "Belajar, ikut quest, lalu bangun bukti kesiapan Web3." : "Learn, complete quests, then build Web3 readiness proof."}
        description={language === "id" ? "Mode ini dirancang untuk user awam: tidak ada admin tools, tidak ada halaman grant yang membingungkan, hanya alur belajar menuju Readiness Passport." : "This mode is designed for everyday users: no admin tools, no confusing grant pages, only a learning flow toward the Readiness Passport."}
        actions={[{ href: "/dashboard", label: language === "id" ? "Buka Dashboard" : "Open Dashboard", variant: "primary" }, { href: "/quests?track=stellar-readiness", label: "Stellar Quests" }]}
      >
        <ModePill mode="Learner" />
      </PageHero>

      <section className="grid grid-cols-2 gap-3 md:grid-cols-6">
        {metrics.map((metric) => <MetricCard key={metric.label} label={metric.label} value={metric.value} />)}
      </section>

      <section className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
        {learnerActions.map((action) => (
          <CompactCard
            key={action.href}
            href={action.href}
            eyebrow={action.label}
            title={language === "id" ? action.titleId : action.titleEn}
            description={language === "id" ? action.descriptionId : action.descriptionEn}
          />
        ))}
      </section>
    </PageShell>
  );
}
