import type { Language } from "@/lib/i18n";

type DemoBillboardProps = {
  language: Language;
};

const messageId =
  "KARYRA MVP PREVIEW • DEMO ENVIRONMENT • PRODUCTION VERSION WILL USE REAL AUTH, PERMISSIONS, AND ROLE-SPECIFIC DASHBOARDS";

const messageEn =
  "KARYRA MVP PREVIEW • DEMO ENVIRONMENT • PRODUCTION VERSION WILL USE REAL AUTH, PERMISSIONS, AND ROLE-SPECIFIC DASHBOARDS";

export function DemoBillboard({ language }: DemoBillboardProps) {
  const message = language === "id" ? messageId : messageEn;
  const repeated = `${message} • ${message} • ${message}`;

  return (
    <div className="sticky top-0 z-[70] overflow-hidden border-b border-amber-300/20 bg-amber-300/90 text-slate-950 shadow-md shadow-black/10">
      <div className="relative flex h-7 items-center whitespace-nowrap md:h-8">
        <div className="animate-[karyra-billboard_42s_linear_infinite] text-[10px] font-black uppercase tracking-[0.2em] md:text-xs">
          <span className="px-6">{repeated}</span>
        </div>
        <div className="animate-[karyra-billboard_42s_linear_infinite] text-[10px] font-black uppercase tracking-[0.2em] md:text-xs">
          <span className="px-6">{repeated}</span>
        </div>
      </div>
    </div>
  );
}
