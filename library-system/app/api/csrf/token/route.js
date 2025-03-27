import { NextResponse } from "next/server";
import { generateToken } from "../../../../lib/csrf";
import { cookies } from "next/headers";

export async function GET() {
  const { secret, token } = generateToken();

  // storing the secret in an HTTP-only cookie
  cookies().set("csrf_secret", secret, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
  });

  return NextResponse.json({ csrfToken: token });
}
