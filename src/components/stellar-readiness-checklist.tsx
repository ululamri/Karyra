"use client";

import { useMemo, useState } from "react";
import Link from "next/link";

type ChecklistItem = {
  id: string;
  category: string;
  title: string;
  titleEn: string;
  description: string;
  descriptionEn: string;
  riskLevel: "foundation" | "critical" | "practice" | "confidence";
};

const checklistItems: ChecklistItem[] = [
  {
    id: "seed-phrase-private",
    category: "Wallet Safety",
    title: "Saya paham seed phrase tidak boleh dibagikan kepada siapa pun.",
    titleEn: "I understand that a seed phrase must never be shared with anyone.",
    description:
      "Seed phrase adalah akses penuh ke wallet. Admin, mentor, teman, atau komunitas tidak boleh memintanya.",
    descriptionEn:
      "A seed phrase is full access to a wallet. Admins, mentors, friends, or communities should never ask for it.",
    riskLevel: "critical",
  },
  {
    id: "device-hygiene",
    category: "Wallet Safety",
    title: "Saya tahu pentingnya perangkat yang aman sebelum memakai wallet.",
    titleEn: "I understand why a secure device matters before using a wallet.",
    description:
      "Perangkat yang penuh malware, link phishing, atau aplikasi tidak jelas bisa membahayakan wallet.",
    descriptionEn:
      "A device with malware, phishing links, or unknown apps can put a wallet at risk.",
    riskLevel: "foundation",
  },
  {
    id: "address-check",
    category: "Address & Memo",
    title: "Saya terbiasa mengecek address penerima lebih dari sekali.",
    titleEn: "I am used to checking the recipient address more than once.",
    description:
      "Salah address dapat menyebabkan aset terkirim ke penerima yang salah dan sulit dipulihkan.",
    descriptionEn:
      "A wrong address can send assets to the wrong recipient and may be hard to recover.",
    riskLevel: "critical",
  },
  {
    id: "memo-awareness",
    category: "Address & Memo",
    title: "Saya paham memo/destination tag bisa dibutuhkan dalam alur pembayaran tertentu.",
    titleEn: "I understand that a memo/destination tag may be required in some payment flows.",
    description:
      "Memo membantu penerima mengenali transaksi, terutama ketika banyak pengguna memakai address tujuan yang sama.",
    descriptionEn:
      "A memo helps the recipient identify a transaction, especially when many users share the same destination address.",
    riskLevel: "critical",
  },
  {
    id: "stablecoin-basic",
    category: "Payment Literacy",
    title: "Saya paham stablecoin bukan berarti tanpa risiko.",
    titleEn: "I understand that stablecoins are not risk-free.",
    description:
      "Stablecoin dapat membantu pembayaran, tetapi learner tetap perlu memahami jaringan, biaya, penerima, dan risiko platform.",
    descriptionEn:
      "Stablecoins can support payments, but learners still need to understand networks, fees, recipients, and platform risks.",
    riskLevel: "foundation",
  },
  {
    id: "fee-confirmation",
    category: "Payment Literacy",
    title: "Saya tahu perlu mengecek biaya, jaringan, dan status konfirmasi.",
    titleEn: "I know to check fees, network, and confirmation status.",
    description:
      "Kesiapan pembayaran tidak hanya soal menekan tombol kirim, tetapi memahami apa yang terjadi setelah transaksi dibuat.",
    descriptionEn:
      "Payment readiness is not only about pressing send, but understanding what happens after a transaction is created.",
    riskLevel: "practice",
  },
  {
    id: "scam-red-flags",
    category: "Scam Prevention",
    title: "Saya bisa mengenali red flag seperti fake airdrop, phishing, dan impersonator.",
    titleEn: "I can identify red flags such as fake airdrops, phishing, and impersonators.",
    description:
      "Janji profit instan, link mencurigakan, dan permintaan seed phrase adalah sinyal bahaya besar.",
    descriptionEn:
      "Instant-profit promises, suspicious links, and seed phrase requests are major danger signs.",
    riskLevel: "critical",
  },
  {
    id: "small-test-first",
    category: "Pre-Transaction Confidence",
    title: "Saya akan mulai dari simulasi atau nominal kecil sebelum transaksi penting.",
    titleEn: "I will start with a simulation or small amount before important transactions.",
    description:
      "Dry-run dan nominal kecil membantu membangun kebiasaan aman sebelum learner mengambil risiko lebih besar.",
    descriptionEn:
      "Dry-runs and small amounts help build safe habits before learners take larger risks.",
    riskLevel: "practice",
  },
  {
    id: "final-review",
    category: "Pre-Transaction Confidence",
    title: "Saya siap memakai checklist sebelum transaksi nyata.",
    titleEn: "I am ready to use a checklist before a real transaction.",
    description:
      "Checklist akhir: penerima, address, memo, nominal, jaringan, biaya, risiko, dan konfirmasi ulang.",
    descriptionEn:
      "Final checklist: recipient, address, memo, amount, network, fee, risk, and final confirmation.",
    riskLevel: "confidence",
  },
];

function getRiskClass(riskLevel: ChecklistItem["riskLevel"]) {
  switch (riskLevel) {
    case "critical":
      return "border-rose-400/30 bg-rose-400/10 text-rose-300";
    case "practice":
      return "border-sky-400/30 bg-sky-400/10 text-sky-300";
    case "confidence":
      return "border-emerald-400/30 bg-emerald-400/10 text-emerald-300";
    default:
      return "border-white/10 bg-white/5 text-slate-300";
  }
}

function getReadinessLabel(score: number) {
  if (score >= 90) return "Ready for supervised practice";
  if (score >= 70) return "Almost ready";
  if (score >= 40) return "Still learning";
  return "Beginner safety stage";
}

export function StellarReadinessChecklist() {
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({});
  const [reflection, setReflection] = useState("");

  const checkedCount = Object.values(checkedItems).filter(Boolean).length;
  const score = Math.round((checkedCount / checklistItems.length) * 100);
  const isComplete = checkedCount === checklistItems.length;
  const reflectionLength = reflection.trim().length;
  const reflectionReady = reflectionLength >= 80;
  const readinessLabel = getReadinessLabel(score);

  const groupedItems = useMemo(() => {
    return checklistItems.reduce<Record<string, ChecklistItem[]>>((groups, item) => {
      groups[item.category] = groups[item.category] ?? [];
      groups[item.category].push(item);
      return groups;
    }, {});
  }, []);

  return (
    <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
      <aside className="lg:sticky lg:top-6 lg:self-start">
        <div className="rounded-[2rem] border border-emerald-400/20 bg-emerald-400/10 p-6 md:p-8">
          <p className="text-sm font-semibold uppercase tracking-[0.22em] text-emerald-300">
            Readiness Score
          </p>
          <h2 className="mt-4 text-5xl font-bold text-white">{score}%</h2>
          <p className="mt-3 text-lg font-semibold text-emerald-200">
            {readinessLabel}
          </p>

          <div className="mt-5 h-3 overflow-hidden rounded-full bg-slate-950/70">
            <div
              className="h-full rounded-full bg-emerald-400 transition-all"
              style={{ width: `${score}%` }}
            />
          </div>

          <p className="mt-4 text-sm leading-6 text-slate-300">
            {checkedCount}/{checklistItems.length} checklist selesai. Checklist ini
            bukan transaksi sungguhan; ini adalah lapisan kesiapan sebelum praktik.
          </p>

          <div className="mt-6 grid gap-3">
            <Link
              href="/quests?track=stellar-readiness"
              className="rounded-2xl bg-emerald-400 px-5 py-3 text-center text-sm font-bold text-slate-950 transition hover:bg-emerald-300"
            >
              Submit Stellar Quest
            </Link>

            <Link
              href="/stacks/stellar-readiness"
              className="rounded-2xl border border-white/10 bg-white/5 px-5 py-3 text-center text-sm font-bold text-white transition hover:border-emerald-400/40"
            >
              Back to Stellar Stack
            </Link>
          </div>
        </div>

        <div className="mt-5 rounded-[2rem] border border-white/10 bg-white/5 p-6">
          <h3 className="text-xl font-bold">Reflection Note</h3>
          <p className="mt-2 text-sm leading-6 text-slate-400">
            Tulis ringkasan pemahamanmu. Ini belum otomatis tersimpan, tapi bisa
            kamu salin sebagai jawaban quest readiness.
          </p>

          <div className="mt-4 flex justify-between text-xs font-semibold">
            <span className={reflectionReady ? "text-emerald-300" : "text-amber-300"}>
              {reflectionLength}/80 karakter minimum
            </span>
            <span className="text-slate-500">Local draft only</span>
          </div>

          <textarea
            value={reflection}
            onChange={(event) => setReflection(event.target.value)}
            placeholder="Contoh: Sebelum transaksi, saya akan mengecek address, memo, nominal, jaringan, biaya, dan memastikan tidak sedang membuka link mencurigakan..."
            className="mt-2 min-h-36 w-full rounded-2xl border border-white/10 bg-slate-950 p-4 text-sm text-white outline-none placeholder:text-slate-500 focus:border-emerald-400"
          />

          {isComplete && reflectionReady ? (
            <div className="mt-4 rounded-2xl border border-emerald-400/20 bg-emerald-400/10 p-4 text-sm leading-6 text-emerald-200">
              Checklist dan reflection sudah siap. Kamu bisa lanjut submit quest
              Stellar untuk review admin dan Proof-of-Readiness.
            </div>
          ) : (
            <div className="mt-4 rounded-2xl border border-amber-400/20 bg-amber-400/10 p-4 text-sm leading-6 text-amber-200">
              Lengkapi semua checklist dan minimal 80 karakter reflection sebelum
              mengklaim diri siap praktik.
            </div>
          )}
        </div>
      </aside>

      <section className="grid gap-5">
        {Object.entries(groupedItems).map(([category, items]) => (
          <div key={category} className="rounded-[2rem] border border-white/10 bg-white/5 p-5 md:p-6">
            <h2 className="text-2xl font-bold">{category}</h2>
            <div className="mt-5 grid gap-3">
              {items.map((item) => {
                const checked = checkedItems[item.id] ?? false;

                return (
                  <label
                    key={item.id}
                    className={`block cursor-pointer rounded-2xl border p-4 transition ${
                      checked
                        ? "border-emerald-400/40 bg-emerald-400/10"
                        : "border-white/10 bg-slate-950/50 hover:border-emerald-400/30"
                    }`}
                  >
                    <div className="flex gap-4">
                      <input
                        type="checkbox"
                        checked={checked}
                        onChange={(event) => {
                          setCheckedItems((current) => ({
                            ...current,
                            [item.id]: event.target.checked,
                          }));
                        }}
                        className="mt-1 h-5 w-5 accent-emerald-400"
                      />

                      <div className="min-w-0 flex-1">
                        <div className="flex flex-wrap items-start justify-between gap-2">
                          <h3 className="font-bold text-white">{item.title}</h3>
                          <span
                            className={`rounded-full border px-3 py-1 text-xs font-bold uppercase tracking-wide ${getRiskClass(
                              item.riskLevel,
                            )}`}
                          >
                            {item.riskLevel}
                          </span>
                        </div>

                        <p className="mt-1 text-sm font-medium text-slate-500">
                          {item.titleEn}
                        </p>
                        <p className="mt-3 leading-7 text-slate-300">
                          {item.description}
                        </p>
                        <p className="mt-2 text-sm leading-6 text-slate-500">
                          {item.descriptionEn}
                        </p>
                      </div>
                    </div>
                  </label>
                );
              })}
            </div>
          </div>
        ))}
      </section>
    </div>
  );
}
