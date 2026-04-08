import type { SessionOptions } from "iron-session";

export type SessionData = {
  userId?: string;
  email?: string;
  roleName?: string;
};

export const SESSION_COOKIE_NAME = "brandghar_session";

export const sessionOptions: SessionOptions = {
  password:
    process.env.SESSION_SECRET ||
    "dev-secret-change-me-to-a-32-plus-char-random-string-for-production",
  cookieName: SESSION_COOKIE_NAME,
  cookieOptions: {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7, // 7 days
  },
};
