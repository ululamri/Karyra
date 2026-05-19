import { prisma } from "@/lib/prisma";
import { getServerLanguage } from "@/lib/i18n-server";
import { PageShell } from "@/components/ui/page-shell";
import { PageHero } from "@/components/ui/page-hero";
import { CompactCard, MetricCard } from "@/components/ui/compact-card";
import { ModePill } from "@/components/ui/mode-pill";

const packageLinks = [
  { href: "/reviewer", title: "Reviewer Entry", description: "Mulai evaluasi dari mode khusus reviewer.", badge: "Start" },
  { href: "/demo", title: "Demo Path", description: "Jalur demo learner → admin → proof → archive.", badge: "Demo" },
  { href: "/mvp-map", title: "MVP Map", description: "Peta sistem dan flow utama Karyra.", badge: "Map" },
  { href: "/impact", title: "Impact Report", description: "Dampak readiness, local onboarding, dan proof evidence.", badge: "Impact" },
  { href: "/transparency", title: "Transparency", description: "Status terbuka, proof, changelog, dan progress.", badge: "Open" },
  { href: "/qa-checklist", title: "QA Checklist", description: "Checklist manual untuk memvalidasi alur MVP.", badge: "QA" },
  { href: "/admin/health", title: "System Health", description: "Metrik internal untuk database, proof, Stellar, Filecoin, dan review.", badge: "Health" },
  { href: "/workshop-kit", title: "Workshop Kit", description: "Resource fasilitator untuk pilot komunitas lokal.", badge: "Pilot" },
  { href: "/pilot-plan", title: "Pilot Plan", description: "Rencana pilot 4 minggu dan success metrics.", badge: "Plan" },
  { href: "/docs", title: "Docs Hub", description: "Architecture, grant readiness, changelog, dan referensi teknis.", badge: "Docs" },
];

export default async function GrantPackagePage() {
  const language = await getServerLanguage();
  const [learnerCount, courseCount, questCount, proofRecordCount, archivedProofCount, readinessProfileCount, workshopCount, pendingSubmissionCount] = await Promise.all([
    prisma.user.count({ where: { role: "LEARNER" } }),
    prisma.course.count({ where: { status: "PUBLISHED" } }),
    prisma.quest.count({ where: { status: "PUBLISHED" } }),
    prisma.proofRecord.count(),
    prisma.proofRecord.count({ where: { archivedToFilecoin: true } }),
    prisma.readinessProfile.count(),
    prisma.workshop.count(),
    prisma.questSubmission.count({ where: { status: { in: ["SUBMITTED", "NEEDS_REVIEW"] } } }),
  ]);

  const metrics = [
    { label: "Learners", value: learnerCount },
    { label: "Courses", value: courseCount },
    { label: "Quests", value: questCount },
    { label: "Proofs", value: proofRecordCount },
    { label: "Archived", value: archivedProofCount },
    { label: "Passports", value: readinessProfileCount },
    { label: "Workshops", value: workshopCount },
    { label: "Pending", value: pendingSubmissionCount },
  ];

  return (
    <PageShell>
      <PageHero
        eyebrow="Grant Package"
        title={language === "id" ? "Paket evaluasi Karyra MVP." : "Karyra MVP evaluation package."}
        description={language === "id" ? "Satu pusat untuk melihat demo path, impact, transparency, QA, system health, pilot plan, dan evidence readiness. Halaman ini dibuat untuk reviewer, grantee, investor, dan kreator." : "A single hub for demo path, impact, transparency, QA, system health, pilot plan, and readiness evidence. This page is built for reviewers, grantees, investors, and the creator."}
        actions={[{ href: "/demo", label: "Demo Path", variant: "primary" }, { href: "/qa-checklist", label: "QA Checklist" }, { href: "/reviewer", label: "Reviewer", variant: "ghost" }]}
      >
        <ModePill mode="Reviewer" label="Grant Review Mode" />
      </PageHero>

      <section className="grid grid-cols-2 gap-3 md:grid-cols-4 lg:grid-cols-8">
        {metrics.map((metric) => <MetricCard key={metric.label} label={metric.label} value={metric.value} />)}
      </section>

      <section className="grid gap-3 md:grid-cols-2 lg:grid-cols-5">
        {packageLinks.map((link) => <CompactCard key={link.href} href={link.href} eyebrow="Grant Package" title={link.title} description={link.description} badge={link.badge} />)}
      </section>

      <section className="grid gap-4 lg:grid-cols-3">
        <CompactCard href="/stacks/stellar-readiness" eyebrow="Stellar" title="Payment Readiness" description="Wallet safety, memo awareness, stablecoin/payment literacy, scam prevention, dan pre-transaction confidence." />
        <CompactCard href="/admin/proofs" eyebrow="Filecoin" title="Proof Archive" description="Proof manifest, checksum, demo CID, dan public verification sebagai pondasi evidence preservation." />
        <CompactCard href="/passport/share" eyebrow="Passport" title="Shareable Readiness" description="Ringkasan learner readiness, proof count, badge, archive status, dan verification links." />
      </section>
    </PageShell>
  );
}
