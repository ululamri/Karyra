import type { Language } from "@/lib/i18n";

type DemoBillboardProps = {
  language: Language;
};

const messageId =
  "KARYRA MVP DEMO / PREVIEW MODE • ROLE-BASED REVIEW ENVIRONMENT • LEARNER, ADMIN, DAN REVIEWER EXPERIENCE DIPISAH SECARA VISUAL • PRODUKSI NANTI AKAN MEMAKAI AUTH DAN PERMISSION ASLI";

const messageEn =
  "KARYRA MVP DEMO / PREVIEW MODE • ROLE-BASED REVIEW ENVIRONMENT • LEARNER, ADMIN, AND REVIEWER EXPERIENCES ARE VISUALLY SEPARATED • PRODUCTION WILL USE REAL AUTH AND PERMISSIONS";

export function DemoBillboard({ language }: DemoBillboardProps) {
  const message = language === "id" ? messageId : messageEn;
  const repeated = `${message} • ${message} • ${message}`;

  return (
    <div className="sticky top-0 z-[70] overflow-hidden border-b border-amber-300/30 bg-amber-300 text-slate-950 shadow-lg shadow-amber-950/20">
      <div className="relative flex h-9 items-center whitespace-nowrap">
        <div className="animate-[karyra-billboard_32s_linear_infinite] text-xs font-black uppercase tracking-[0.22em] md:text-sm">
          <span className="px-6">{repeated}</span>
        </div>
        <div className="animate-[karyra-billboard_32s_linear_infinite] text-xs font-black uppercase tracking-[0.22em] md:text-sm">
          <span className="px-6">{repeated}</span>
        </div>
      </div>
    </div>
  );
}
