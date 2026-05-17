export type PreviewPreference = "auto" | "mobile" | "desktop";
export type EffectivePreviewMode = "mobile" | "desktop";

export const PREVIEW_STORAGE_KEY = "karyra_preview_preference";
export const PREVIEW_EVENT_NAME = "karyra:preview-mode-change";

export function getStoredPreviewPreference(): PreviewPreference {
  if (typeof window === "undefined") return "auto";

  const value = window.localStorage.getItem(PREVIEW_STORAGE_KEY);

  if (value === "mobile" || value === "desktop") return value;

  return "auto";
}

export function resolvePreviewMode(
  preference: PreviewPreference,
): EffectivePreviewMode {
  if (preference === "mobile" || preference === "desktop") {
    return preference;
  }

  if (typeof window === "undefined") return "desktop";

  return window.matchMedia("(max-width: 767px)").matches
    ? "mobile"
    : "desktop";
}

export function applyPreviewPreference(preference: PreviewPreference) {
  if (typeof document === "undefined") {
    return {
      preference,
      mode: "desktop" as EffectivePreviewMode,
    };
  }

  const mode = resolvePreviewMode(preference);

  document.documentElement.dataset.previewPreference = preference;
  document.documentElement.dataset.previewMode = mode;

  return {
    preference,
    mode,
  };
}

export function savePreviewPreference(preference: PreviewPreference) {
  if (typeof window === "undefined") return;

  if (preference === "auto") {
    window.localStorage.removeItem(PREVIEW_STORAGE_KEY);
  } else {
    window.localStorage.setItem(PREVIEW_STORAGE_KEY, preference);
  }

  const state = applyPreviewPreference(preference);

  window.dispatchEvent(
    new CustomEvent(PREVIEW_EVENT_NAME, {
      detail: state,
    }),
  );
}