import "server-only";

import { createHash, timingSafeEqual } from "crypto";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const ADMIN_COOKIE_NAME = "karyra_admin_session";
const SESSION_MAX_AGE_SECONDS = 60 * 60 * 8;

function sha256(value: string) {
  return createHash("sha256").update(value).digest("hex");
}

function safeCompare(left: string, right: string) {
  const leftDigest = Buffer.from(sha256(left));
  const rightDigest = Buffer.from(sha256(right));

  if (leftDigest.length !== rightDigest.length) {
    return false;
  }

  return timingSafeEqual(leftDigest, rightDigest);
}

function getAdminPassword() {
  return process.env.KARYRA_ADMIN_PASSWORD?.trim() ?? "";
}

function getAdminUsername() {
  return process.env.KARYRA_ADMIN_USERNAME?.trim() || "admin";
}

function getAdminSessionSecret() {
  return (
    process.env.KARYRA_ADMIN_SESSION_SECRET?.trim() ||
    process.env.KARYRA_ADMIN_PASSWORD?.trim() ||
    ""
  );
}

function getExpectedSessionValue() {
  const username = getAdminUsername();
  const password = getAdminPassword();
  const secret = getAdminSessionSecret();

  return sha256(`karyra-admin:${username}:${password}:${secret}`);
}

export function isAdminProtectionEnabled() {
  return Boolean(getAdminPassword());
}

export function getPublicAdminUsernameHint() {
  return getAdminUsername();
}

export async function hasValidAdminSession() {
  if (!isAdminProtectionEnabled()) {
    return true;
  }

  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get(ADMIN_COOKIE_NAME)?.value;

  if (!sessionCookie) {
    return false;
  }

  return safeCompare(sessionCookie, getExpectedSessionValue());
}

export async function requireAdminPage() {
  const allowed = await hasValidAdminSession();

  if (!allowed) {
    redirect("/admin-login");
  }
}

export async function requireAdminAction() {
  const allowed = await hasValidAdminSession();

  if (!allowed) {
    throw new Error("Unauthorized admin action.");
  }
}

export async function createAdminSession(username: string, password: string) {
  if (!isAdminProtectionEnabled()) {
    return { ok: true };
  }

  const expectedUsername = getAdminUsername();
  const expectedPassword = getAdminPassword();

  const usernameMatches = safeCompare(username.trim(), expectedUsername);
  const passwordMatches = safeCompare(password, expectedPassword);

  if (!usernameMatches || !passwordMatches) {
    return {
      ok: false,
      error: "Invalid admin credentials.",
    };
  }

  const cookieStore = await cookies();

  cookieStore.set(ADMIN_COOKIE_NAME, getExpectedSessionValue(), {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: SESSION_MAX_AGE_SECONDS,
  });

  return { ok: true };
}

export async function clearAdminSession() {
  const cookieStore = await cookies();

  cookieStore.set(ADMIN_COOKIE_NAME, "", {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 0,
  });
}
