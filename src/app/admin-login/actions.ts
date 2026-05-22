"use server";

import { redirect } from "next/navigation";
import { clearAdminSession, createAdminSession } from "@/lib/admin-auth";

function getString(formData: FormData, key: string) {
  const value = formData.get(key);
  return typeof value === "string" ? value : "";
}

export async function loginAdminAction(formData: FormData) {
  const username = getString(formData, "username");
  const password = getString(formData, "password");

  const result = await createAdminSession(username, password);

  if (!result.ok) {
    redirect("/admin-login?error=1");
  }

  redirect("/admin");
}

export async function logoutAdminAction() {
  await clearAdminSession();
  redirect("/admin-login");
}
