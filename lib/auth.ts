import { cookies } from "next/headers";

const COOKIE_NAME = "mgh_admin";
const COOKIE_VALUE = "authenticated";

export function verifyCredentials(username: string, password: string) {
  const u = process.env.ADMIN_USERNAME || "admin";
  const p = process.env.ADMIN_PASSWORD || "garden2024";
  return username === u && password === p;
}

export function setAdminSession() {
  cookies().set(COOKIE_NAME, COOKIE_VALUE, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 8, // 8 hours
  });
}

export function clearAdminSession() {
  cookies().delete(COOKIE_NAME);
}

export function isAdmin() {
  return cookies().get(COOKIE_NAME)?.value === COOKIE_VALUE;
}
