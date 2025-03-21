import { NextResponse } from "next/server";
import { createServerClient } from "@supabase/ssr";

export async function middleware(req) {
  console.log("Middleware executed for path:", req.nextUrl.pathname);

  const res = NextResponse.next();

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

  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (req.nextUrl.pathname.startsWith("/api/auth")) {
    return res;
  }

  if (!session && !req.nextUrl.pathname.startsWith("/")) {
    return NextResponse.redirect(new URL("/", req.url));
  }

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
