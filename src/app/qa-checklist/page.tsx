"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

type ChecklistItem = {
  id: string;
  group: string;
  title: string;
  description: string;
  href: string;
};

const checklistItems: ChecklistItem[] = [
  {
    id: "home",
    group: "Public Review",
    title: "Open Homepage",
    description: "Homepage loads and shows the current Karyra grant-ready snapshot.",
    href: "/",
  },
  {
    id: "menu",
    group: "Navigation",
    title: "Open Menu",
    description: "Global menu opens and key pages are discoverable.",
    href: "/menu",
  },
  {
    id: "stellar-stack",
    group: "Stellar Readiness",
    title: "Open Stellar Readiness Stack",
    description: "Stack page shows course status, quests, checklist, and payment-readiness narrative.",
    href: "/stacks/stellar-readiness",
  },
  {
    id: "stellar-checklist",
    group: "Stellar Readiness",
    title: "Complete Stellar Checklist",
    description: "Interactive checklist score updates and links to Stellar quests.",
    href: "/stacks/stellar-readiness/checklist",
  },
  {
    id: "courses",
    group: "Learning Flow",
    title: "Open Courses",
    description: "Learner can see Web3 and Stellar course options.",
    href: "/courses",
  },
  {
    id: "stellar-course",
    group: "Learning Flow",
    title: "Open Stellar Course",
    description: "Stellar Readiness course detail loads with modules and lessons.",
    href: "/courses/stellar-readiness-for-local-communities",
  },
  {
    id: "quests",
    group: "Quest Flow",
    title: "Open Stellar Quests",
    description: "Filtered Stellar quests load and submission form validates minimum characters.",
    href: "/quests?track=stellar-readiness",
  },
  {
    id: "dashboard",
    group: "Learner Flow",
    title: "Open Dashboard",
    description: "Dashboard shows XP, badges, submissions, workshops, and passport shortcut.",
    href: "/dashboard",
  },
  {
    id: "admin-submissions",
    group: "Admin Flow",
    title: "Review Quest Submission",
    description: "Admin can approve/reject submissions and trigger readiness/proof sync.",
    href: "/admin/submissions",
  },
  {
    id: "passport",
    group: "Passport Flow",
    title: "Open Readiness Passport",
    description: "Passport shows readiness score, badges, proof records, and archive status.",
    href: "/passport",
  },
  {
    id: "timeline",
    group: "Passport Flow",
    title: "Open Readiness Timeline",
    description: "Timeline shows badge, quest, reward, proof, workshop, and archive events.",
    href: "/passport/timeline",
  },
  {
    id: "share",
    group: "Passport Flow",
    title: "Open Share Summary",
    description: "Shareable passport summary shows proof, badge, archived proof, and public links.",
    href: "/passport/share",
  },
  {
    id: "proof-archive",
    group: "Filecoin Flow",
    title: "Open Filecoin Proof Archive",
    description: "Admin archive page lists proof records and can generate demo Filecoin manifests.",
    href: "/admin/proofs",
  },
  {
    id: "health",
    group: "Internal QA",
    title: "Open System Health",
    description: "Admin health page shows database, readiness, proof, Stellar, and pending review checks.",
    href: "/admin/health",
  },
  {
    id: "grant-package",
    group: "Grant Review",
    title: "Open Grant Package",
    description: "Grant package index links reviewer guide, MVP map, impact, transparency, docs, and pilot pages.",
    href: "/grant-package",
  },
  {
    id: "transparency",
    group: "Grant Review",
    title: "Open Transparency Portal",
    description: "Transparency portal shows demo path, recent proofs, submissions, and progress links.",
    href: "/transparency",
  },
  {
    id: "workshop-kit",
    group: "Local Pilot",
    title: "Open Workshop Kit",
    description: "Workshop kit supports facilitator-led offline onboarding sessions.",
    href: "/workshop-kit",
  },
  {
    id: "pilot-plan",
    group: "Local Pilot",
    title: "Open Pilot Plan",
    description: "Pilot plan shows 4-week pilot flow, success metrics, and risk controls.",
    href: "/pilot-plan",
  },
];

const groups = Array.from(new Set(checklistItems.map((item) => item.group)));

export default function QaChecklistPage() {
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({});

  const completedCount = useMemo(
    () => checklistItems.filter((item) => checkedItems[item.id]).length,
    [checkedItems],
  );

  const progress = Math.round((completedCount / checklistItems.length) * 100);

  return (
    <main className="min-h-screen bg-slate-950 px-5 py-8 text-white md:px-8 md:py-16">
      <section className="mx-auto flex max-w-7xl flex-col gap-8">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-emerald-300">
              Karyra QA Checklist
            </p>
            <h1 className="mt-4 text-4xl font-bold tracking-tight md:text-6xl">
              MVP Manual Test Path
            </h1>
            <p className="mt-5 max-w-3xl text-base leading-8 text-slate-300 md:text-lg">
              Checklist manual untuk memastikan flow utama Karyra tetap hidup sebelum demo, grant review, atau push besar berikutnya.
            </p>
          </div>

          <div className="rounded-[2rem] border border-emerald-400/20 bg-emerald-400/10 p-5 md:min-w-64">
            <p className="text-sm text-slate-300">Progress</p>
            <p className="mt-2 text-4xl font-bold text-emerald-300">{progress}%</p>
            <p className="mt-2 text-sm text-slate-400">
              {completedCount}/{checklistItems.length} checks completed
            </p>
            <div className="mt-4 h-3 overflow-hidden rounded-full bg-slate-900">
              <div className="h-full rounded-full bg-emerald-400" style={{ width: `${progress}%` }} />
            </div>
          </div>
        </div>

        <section className="grid gap-3 md:grid-cols-4">
          <Link href="/admin/health" className="rounded-3xl border border-white/10 bg-white/5 p-5 transition hover:border-emerald-400/40">
            <p className="text-sm text-slate-400">Internal</p>
            <h2 className="mt-2 text-xl font-bold">System Health</h2>
          </Link>
          <Link href="/demo" className="rounded-3xl border border-white/10 bg-white/5 p-5 transition hover:border-emerald-400/40">
            <p className="text-sm text-slate-400">Reviewer</p>
            <h2 className="mt-2 text-xl font-bold">Demo Path</h2>
          </Link>
          <Link href="/grant-package" className="rounded-3xl border border-white/10 bg-white/5 p-5 transition hover:border-emerald-400/40">
            <p className="text-sm text-slate-400">Grant</p>
            <h2 className="mt-2 text-xl font-bold">Grant Package</h2>
          </Link>
          <button
            type="button"
            onClick={() => setCheckedItems({})}
            className="rounded-3xl border border-white/10 bg-white/5 p-5 text-left transition hover:border-rose-400/40"
          >
            <p className="text-sm text-slate-400">Reset</p>
            <h2 className="mt-2 text-xl font-bold">Clear Checks</h2>
          </button>
        </section>

        <section className="grid gap-6">
          {groups.map((group) => {
            const groupItems = checklistItems.filter((item) => item.group === group);
            const groupCompleted = groupItems.filter((item) => checkedItems[item.id]).length;

            return (
              <div key={group} className="rounded-[2rem] border border-white/10 bg-white/5 p-6 md:p-8">
                <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
                  <div>
                    <p className="text-sm font-semibold uppercase tracking-[0.22em] text-emerald-300">
                      {group}
                    </p>
                    <h2 className="mt-3 text-2xl font-bold">
                      {groupCompleted}/{groupItems.length} completed
                    </h2>
                  </div>
                </div>

                <div className="mt-5 grid gap-3">
                  {groupItems.map((item) => {
                    const checked = Boolean(checkedItems[item.id]);

                    return (
                      <article key={item.id} className="rounded-2xl border border-white/10 bg-slate-950/50 p-4">
                        <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                          <label className="flex cursor-pointer items-start gap-4">
                            <input
                              type="checkbox"
                              checked={checked}
                              onChange={(event) =>
                                setCheckedItems((current) => ({
                                  ...current,
                                  [item.id]: event.target.checked,
                                }))
                              }
                              className="mt-1 h-5 w-5 accent-emerald-400"
                            />
                            <span>
                              <span className="block font-bold text-white">{item.title}</span>
                              <span className="mt-1 block text-sm leading-6 text-slate-400">{item.description}</span>
                            </span>
                          </label>

                          <Link href={item.href} className="shrink-0 rounded-2xl border border-white/10 px-4 py-2 text-sm font-bold text-emerald-300 transition hover:border-emerald-400/40">
                            Open
                          </Link>
                        </div>
                      </article>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </section>
      </section>
    </main>
  );
}
