"use client";

import { useEffect } from "react";
import {
  applyPreviewPreference,
  getStoredPreviewPreference,
  PREVIEW_EVENT_NAME,
} from "../lib/preview-mode";

export function PreviewModeController() {
  useEffect(() => {
    function syncPreviewMode() {
      const preference = getStoredPreviewPreference();
      applyPreviewPreference(preference);

      window.dispatchEvent(
        new CustomEvent(PREVIEW_EVENT_NAME, {
          detail: {
            preference,
            mode: document.documentElement.dataset.previewMode,
          },
        }),
      );
    }

    syncPreviewMode();

    const mediaQuery = window.matchMedia("(max-width: 767px)");

    function handleAutoChange() {
      const preference = getStoredPreviewPreference();

      if (preference === "auto") {
        syncPreviewMode();
      }
    }

    mediaQuery.addEventListener("change", handleAutoChange);
    window.addEventListener("resize", handleAutoChange);

    return () => {
      mediaQuery.removeEventListener("change", handleAutoChange);
      window.removeEventListener("resize", handleAutoChange);
    };
  }, []);

  return null;
}