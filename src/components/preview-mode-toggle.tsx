"use client";

import { useEffect, useState } from "react";
import { type Language, t } from "../lib/i18n";
import {
  applyPreviewPreference,
  getStoredPreviewPreference,
  PREVIEW_EVENT_NAME,
  savePreviewPreference,
  type EffectivePreviewMode,
  type PreviewPreference,
} from "../lib/preview-mode";

type PreviewModeToggleProps = {
  language: Language;
};

function PhoneIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className="h-5 w-5 md:h-6 md:w-6"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <rect x="7" y="2" width="10" height="20" rx="2" />
      <path d="M11 18h2" />
    </svg>
  );
}

function DesktopIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className="h-5 w-5 md:h-6 md:w-6"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <rect x="3" y="4" width="18" height="12" rx="2" />
      <path d="M8 20h8" />
      <path d="M12 16v4" />
    </svg>
  );
}

function AutoIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className="h-5 w-5 md:h-6 md:w-6"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path d="M4 6h16" />
      <path d="M4 12h10" />
      <path d="M4 18h7" />
      <path d="M18 14v6" />
      <path d="M15 17h6" />
    </svg>
  );
}

export function PreviewModeToggle({ language }: PreviewModeToggleProps) {
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
  }

  const label =
    preference === "auto" ? "AUTO" : mode === "mobile" ? "MOBILE" : "DESKTOP";

  return (
    <button
      type="button"
      onClick={handleToggle}
      title={
        mode === "mobile"
          ? t(language, "desktopPreview")
          : t(language, "mobilePreview")
      }
      className="inline-flex h-10 items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-3 text-xs font-bold text-white md:h-12 md:px-4 md:text-sm"
    >
      {preference === "auto" ? (
        <AutoIcon />
      ) : mode === "mobile" ? (
        <PhoneIcon />
      ) : (
        <DesktopIcon />
      )}

      <span className="hidden md:inline">{label}</span>
    </button>
  );
}