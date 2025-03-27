import { NextResponse } from "next/server";
import { generateToken } from "../../../../lib/csrf";
import { cookies } from "next/headers";

export async function GET() {
  const { secret, token } = generateToken();

  const response = NextResponse.json({ csrfToken: token });
  // storing the secret in an HTTP-only cookie
  response.cookies.set({
    name: "csrf_secret",
    value: secret,
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
  });

  return response;
}
