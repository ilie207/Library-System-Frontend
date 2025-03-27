import { NextResponse } from "next/server";
import { createServerClient } from "@supabase/ssr";
import { verifyToken } from "./lib/csrf";

export async function middleware(req) {
  console.log("Middleware executed for path:", req.nextUrl.pathname);

  const res = NextResponse.next();

  // creating the supabase client
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL ?? "",
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "",
    {
      cookies: {
        getAll: (name) => req.cookies.getAll(name)?.value,
        setAll: (name, value, options) =>
          res.cookies.setAll({ name, value, ...options }),
      },
    }
  );

  // check CSRF for mutation requests to API routes
  if (
    req.nextUrl.pathname.startsWith("/api/") &&
    !req.nextUrl.pathname.startsWith("/api/csrf") &&
    !req.nextUrl.pathname.startsWith("/api/auth") &&
    (req.method === "POST" || req.method === "PUT" || req.method === "DELETE")
  ) {
    const csrfToken = req.headers.get("X-CSRF-Token");
    const csrfSecret = req.cookies.get("csrf_secret")?.value;

    if (!csrfToken || !csrfSecret || !verifyToken(csrfSecret, csrfToken)) {
      return new NextResponse(
        JSON.stringify({ message: "Invalid CSRF token" }),
        {
          status: 403,
          headers: { "Content-Type": "application/json" },
        }
      );
    }
  }

  // retriving the user session
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (req.nextUrl.pathname.startsWith("/api/auth")) {
    return res;
  }

  // redirecting unauthenticated users to login
  if (!session && !req.nextUrl.pathname.startsWith("/")) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  // redirect authenticated users to appropriate dashboard
  if (session && req.nextUrl.pathname === "/") {
    const { data } = await supabase
      .from("users")
      .select("role")
      .eq("email", session.user.email)
      .single();

    const redirectPath =
      data?.role === "Librarian"
        ? "/librarian-dashboard"
        : "/student-dashboard";

    return NextResponse.redirect(new URL(redirectPath, req.url));
  }

  return res;
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
