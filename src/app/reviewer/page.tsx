import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { getServerLanguage } from "@/lib/i18n-server";
import { PageShell } from "@/components/ui/page-shell";
import { PageHero } from "@/components/ui/page-hero";
import { CompactCard, MetricCard } from "@/components/ui/compact-card";
import { ModePill } from "@/components/ui/mode-pill";

const reviewerLinks = [
  { href: "/grant-package", title: "Grant Package", description: "Pusat bukti MVP, impact, architecture, pilot, dan QA.", badge: "Package" },
  { href: "/demo", title: "Demo Path", description: "Jalur demo ringkas untuk melihat learner → admin → proof → archive.", badge: "Demo" },
  { href: "/mvp-map", title: "MVP Map", description: "Peta flow produk, readiness, Filecoin, Stellar, dan reviewer evidence.", badge: "Map" },
  { href: "/impact", title: "Impact Report", description: "Dampak readiness, proof, workshop, dan local onboarding.", badge: "Impact" },
  { href: "/transparency", title: "Transparency", description: "Status publik, proof, submission, dan update project.", badge: "Open" },
  { href: "/qa-checklist", title: "QA Checklist", description: "Checklist manual untuk memverifikasi flow utama MVP.", badge: "QA" },
  { href: "/docs", title: "Docs", description: "Architecture, grant readiness, changelog, dan references.", badge: "Docs" },
  { href: "/workshop-kit", title: "Workshop Kit", description: "Resource fasilitator untuk pilot komunitas lokal.", badge: "Pilot" },
];

export default async function ReviewerPage() {
  const language = await getServerLanguage();
  const [courseCount, questCount, proofCount, archivedProofCount, readinessProfileCount, workshopCount] = await Promise.all([
    prisma.course.count({ where: { status: "PUBLISHED" } }),
    prisma.quest.count({ where: { status: "PUBLISHED" } }),
    prisma.proofRecord.count(),
    prisma.proofRecord.count({ where: { archivedToFilecoin: true } }),
    prisma.readinessProfile.count(),
    prisma.workshop.count(),
  ]);

  return (
    <PageShell>
      <PageHero
        eyebrow="Reviewer / Grant Evaluation Mode"
        title={language === "id" ? "Evaluasi Karyra sebagai MVP readiness infrastructure." : "Evaluate Karyra as a readiness infrastructure MVP."}
        description={language === "id" ? "Mode ini dirancang untuk reviewer, grantee, investor, dan kreator. Jalur ini memperlihatkan produk, impact, QA, pilot, dan bukti readiness tanpa mencampurnya dengan pengalaman learner biasa." : "This mode is designed for reviewers, grantees, investors, and the creator. It shows product, impact, QA, pilot, and readiness evidence without mixing it with the normal learner experience."}
        actions={[{ href: "/grant-package", label: "Grant Package", variant: "primary" }, { href: "/demo", label: "Demo Path" }, { href: "/learner", label: "Try Learner", variant: "ghost" }]}
      >
        <ModePill mode="Reviewer" label="Evaluation Mode" />
      </PageHero>

      <section className="grid grid-cols-2 gap-3 md:grid-cols-6">
        <MetricCard label="Courses" value={courseCount} />
        <MetricCard label="Quests" value={questCount} />
        <MetricCard label="Proofs" value={proofCount} />
        <MetricCard label="Archived" value={archivedProofCount} />
        <MetricCard label="Passports" value={readinessProfileCount} />
        <MetricCard label="Workshops" value={workshopCount} />
      </section>

      <section className="grid gap-3 md:grid-cols-2 lg:grid-cols-4">
        {reviewerLinks.map((link) => <CompactCard key={link.href} href={link.href} eyebrow="Reviewer" title={link.title} description={link.description} badge={link.badge} />)}
      </section>

      <section className="rounded-3xl border border-sky-400/20 bg-sky-400/10 p-4 md:p-6">
        <h2 className="text-xl font-bold md:text-2xl">{language === "id" ? "Jalur review yang disarankan" : "Suggested review path"}</h2>
        <div className="mt-4 grid gap-2 md:grid-cols-5">
          {["Homepage Gateway", "Learner Flow", "Admin Review", "Proof Archive", "Grant Package"].map((step, index) => (
            <div key={step} className="rounded-2xl bg-slate-950/50 p-3">
              <p className="text-xs font-bold text-sky-300">0{index + 1}</p>
              <p className="mt-1 text-sm font-bold">{step}</p>
            </div>
          ))}
        </div>
        <Link href="/grant-package" className="mt-4 inline-flex min-h-11 items-center rounded-2xl bg-sky-300 px-4 py-2.5 text-sm font-bold text-slate-950">Open Grant Package</Link>
      </section>
    </PageShell>
  );
}
