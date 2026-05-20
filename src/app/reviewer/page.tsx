import { getServerLanguage } from "@/lib/i18n-server";
import { PageShell } from "@/components/ui/page-shell";
import { PageHero } from "@/components/ui/page-hero";
import { CompactCard } from "@/components/ui/compact-card";
import { ModePill } from "@/components/ui/mode-pill";

const reviewerFlow = [
  {
    href: "/grant-package",
    title: "Grant Package",
    description: "Pusat bukti MVP, impact, QA, pilot, dan evaluation artifacts.",
  },
  {
    href: "/demo",
    title: "Demo Path",
    description: "Jalur ringkas untuk melihat learner → admin → proof → archive.",
  },
  {
    href: "/proof-system",
    title: "Proof System",
    description: "Tiga produk utama: learning, participation, readiness.",
  },
  {
    href: "/docs",
    title: "Docs",
    description: "Narasi panjang, architecture, grant readiness, dan pilot docs.",
  },
];

export default async function ReviewerPage() {
  const language = await getServerLanguage();

  return (
    <PageShell size="default">
      <PageHero
        eyebrow="Reviewer Demo"
        title={
          language === "id"
            ? "Evaluasi MVP tanpa mencampur pengalaman learner."
            : "Evaluate the MVP without mixing the learner experience."
        }
        description={
          language === "id"
            ? "Reviewer mode adalah lingkungan evaluasi. Ia tidak diposisikan sebagai produk utama, melainkan sebagai jalur untuk memahami bukti, impact, QA, dan rencana pilot."
            : "Reviewer mode is an evaluation environment. It is not positioned as the core product, but as a path to understand evidence, impact, QA, and pilot plans."
        }
        actions={[
          { href: "/grant-package", label: "Grant Package", variant: "primary" },
          { href: "/", label: "Demo Login" },
        ]}
      >
        <ModePill mode="Reviewer" label="Evaluation Mode" />
      </PageHero>

      <section className="grid gap-3 md:grid-cols-2">
        {reviewerFlow.map((item) => (
          <CompactCard
            key={item.href}
            href={item.href}
            eyebrow="Reviewer"
            title={item.title}
            description={item.description}
          />
        ))}
      </section>
    </PageShell>
  );
}
