import { getServerLanguage } from "@/lib/i18n-server";
import { PageShell } from "@/components/ui/page-shell";
import { PageHero } from "@/components/ui/page-hero";
import { CompactCard } from "@/components/ui/compact-card";
import { ModePill } from "@/components/ui/mode-pill";

const packageItems = [
  {
    href: "/proof-system",
    title: "Product Core",
    description: "Proof-of-Learning, Proof-of-Participation, Proof-of-Readiness.",
  },
  {
    href: "/impact",
    title: "Impact Report",
    description: "Readiness, local onboarding, proof, and community impact.",
  },
  {
    href: "/transparency",
    title: "Transparency",
    description: "Open status, recent submissions, recent proofs, and progress signals.",
  },
  {
    href: "/qa-checklist",
    title: "QA Checklist",
    description: "Manual flow validation before demo or submission.",
  },
  {
    href: "/workshop-kit",
    title: "Workshop Kit",
    description: "Facilitator materials for local community onboarding.",
  },
  {
    href: "/pilot-plan",
    title: "Pilot Plan",
    description: "Four-week pilot plan and success metrics.",
  },
];

export default async function GrantPackagePage() {
  const language = await getServerLanguage();

  return (
    <PageShell size="default">
      <PageHero
        eyebrow="Grant Package"
        title={
          language === "id"
            ? "Paket evaluasi, bukan halaman produk utama."
            : "Evaluation package, not the main product page."
        }
        description={
          language === "id"
            ? "Semua bukti untuk reviewer/grantee dikumpulkan di sini agar homepage dan learner experience tetap bersih. Karyra tetap diposisikan sebagai platform Proof-of-Readiness lokal."
            : "Reviewer/grantee evidence is collected here so the homepage and learner experience stay clean. Karyra remains positioned as a local Proof-of-Readiness platform."
        }
        actions={[
          { href: "/demo", label: "Demo Path", variant: "primary" },
          { href: "/docs", label: "Docs" },
        ]}
      >
        <ModePill mode="Reviewer" label="Grant Review" />
      </PageHero>

      <section className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
        {packageItems.map((item) => (
          <CompactCard
            key={item.href}
            href={item.href}
            eyebrow="Grant Evidence"
            title={item.title}
            description={item.description}
          />
        ))}
      </section>
    </PageShell>
  );
}
