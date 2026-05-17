import { cookies, headers } from "next/headers";
import { DEFAULT_LANGUAGE, normalizeLanguage, type Language } from "./i18n";

export async function getServerLanguage(): Promise<Language> {
  const cookieStore = await cookies();
  const cookieLanguage = cookieStore.get("karyra_lang")?.value;

  if (cookieLanguage) {
    return normalizeLanguage(cookieLanguage);
  }

  const headerStore = await headers();
  const acceptLanguage = headerStore.get("accept-language");

  if (acceptLanguage?.toLowerCase().startsWith("en")) {
    return "en";
  }

  return DEFAULT_LANGUAGE;
}