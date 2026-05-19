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
      className="h-3.5 w-3.5"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
    >
      <rect x="8" y="2" width="8" height="20" rx="2" />
      <path d="M11 18h2" />
    </svg>
  );
}

function DesktopIcon() {
  return (
    <svg
      aria-hidden="true"
      className="h-3.5 w-3.5"
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
      className="h-3.5 w-3.5"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
    >
      <path d="M4 12a8 8 0 0 1 13.66-5.66" />
      <path d="M18 4v5h-5" />
      <path d="M20 12a8 8 0 0 1-13.66 5.66" />
      <path d="M6 20v-5h5" />
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

    savePreviewPreference(nextPreference);

    // savePreviewPreference intentionally returns void; apply again locally so
    // this component updates immediately and TypeScript stays aligned with the
    // preview-mode helper contract.
    const state = applyPreviewPreference(nextPreference);
    setPreference(state.preference);
    setMode(state.mode);
  }

  const label =
    preference === "auto" ? "AUTO" : mode === "mobile" ? "MOBILE" : "DESKTOP";

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
      className="inline-flex min-h-9 items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-2 text-xs font-bold text-slate-200 transition hover:border-emerald-400/40 hover:bg-white/10"
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
