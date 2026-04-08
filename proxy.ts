import { NextResponse, type NextRequest } from "next/server";
import { getIronSession } from "iron-session";
import { sessionOptions, type SessionData } from "@/app/dashboard/lib/session-config";

// Runs on every /dashboard/* request. Unauth users get bounced to /dashboard/login.
// Fine-grained permission enforcement is done in server components via requirePermission().
export async function proxy(request: NextRequest) {
  const { pathname, search } = request.nextUrl;

  // Login page itself is public.
  if (pathname === "/dashboard/login") {
    return NextResponse.next();
  }

  // iron-session 8 middleware signature: (request, response, options)
  const response = NextResponse.next();
  const session = await getIronSession<SessionData>(request, response, sessionOptions);

  if (!session.userId) {
    const loginUrl = new URL("/dashboard/login", request.url);
    if (pathname !== "/dashboard") {
      loginUrl.searchParams.set("next", pathname + search);
    }
    return NextResponse.redirect(loginUrl);
  }

  return response;
}

export const config = {
  matcher: ["/dashboard/:path*"],
};
