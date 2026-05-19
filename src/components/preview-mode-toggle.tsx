"use client";

import { useEffect, useState } from "react";
import {
  DEFAULT_LANGUAGE,
  type Language,
  normalizeLanguage,
  t,
} from "../lib/i18n";
import {
  applyPreviewPreference,
  getStoredPreviewPreference,
  PREVIEW_EVENT_NAME,
  savePreviewPreference,
  type EffectivePreviewMode,
  type PreviewPreference,
} from "../lib/preview-mode";

type PreviewModeToggleProps = {
  language?: Language | null;
};

function PhoneIcon() {
  return (
    <svg
      aria-hidden="true"
      className="h-4 w-4"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
    >
      <rect x="7" y="2" width="10" height="20" rx="2" />
      <path d="M11 18h2" />
    </svg>
  );
}

function DesktopIcon() {
  return (
    <svg
      aria-hidden="true"
      className="h-4 w-4"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
    >
      <rect x="3" y="4" width="18" height="12" rx="2" />
      <path d="M8 20h8M12 16v4" />
    </svg>
  );
}

function AutoIcon() {
  return (
    <svg
      aria-hidden="true"
      className="h-4 w-4"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
    >
      <path d="M4 4v6h6" />
      <path d="M20 20v-6h-6" />
      <path d="M5 19A9 9 0 0 0 19 5" />
      <path d="M19 5A9 9 0 0 0 5 19" />
    </svg>
  );
}

function getSafeLanguage(language?: Language | null): Language {
  return normalizeLanguage(language ?? DEFAULT_LANGUAGE);
}

export function PreviewModeToggle({ language }: PreviewModeToggleProps) {
  const safeLanguage = getSafeLanguage(language);
  const [preference, setPreference] = useState<PreviewPreference>("auto");
  const [mode, setMode] = useState<EffectivePreviewMode>("desktop");

  useEffect(() => {
    function sync() {
      const currentPreference = getStoredPreviewPreference();
      const state = applyPreviewPreference(currentPreference);

      setPreference(state.preference);
      setMode(state.mode);
    }

    sync();
    window.addEventListener(PREVIEW_EVENT_NAME, sync);

    return () => {
      window.removeEventListener(PREVIEW_EVENT_NAME, sync);
    };
  }, []);

  function handleToggle() {
    const nextPreference: PreviewPreference =
      preference === "auto"
        ? "mobile"
        : preference === "mobile"
          ? "desktop"
          : "auto";

    const state = savePreviewPreference(nextPreference);
    setPreference(state.preference);
    setMode(state.mode);
  }

  const label =
    preference === "auto"
      ? "AUTO"
      : mode === "mobile"
        ? "MOBILE"
        : "DESKTOP";

  const title =
    preference === "mobile"
      ? t(safeLanguage, "mobilePreview")
      : preference === "desktop"
        ? t(safeLanguage, "desktopPreview")
        : `${t(safeLanguage, "mobilePreview")} / ${t(
            safeLanguage,
            "desktopPreview",
          )}`;

  return (
    <button
      type="button"
      onClick={handleToggle}
      title={title}
      className="inline-flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-3 py-2 text-xs font-bold text-slate-200 transition hover:border-emerald-400/40 hover:text-emerald-300"
    >
      {preference === "auto" ? (
        <AutoIcon />
      ) : mode === "mobile" ? (
        <PhoneIcon />
      ) : (
        <DesktopIcon />
      )}
      <span>{label}</span>
    </button>
  );
}
