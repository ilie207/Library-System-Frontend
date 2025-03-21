import { NextResponse } from "next/server";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const email = searchParams.get("email");
  const bookId = searchParams.get("bookId");

  try {
    // Query Supabase directly instead of using Edge Function
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_SUPABASE_URL}/rest/v1/borrowed_books?user_email=eq.${email}&book_id=eq.${bookId}&status=eq.borrowed`,
      {
        headers: {
          "Content-Type": "application/json",
          apikey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY}`,
        },
      }
    );

    const data = await response.json();
    return NextResponse.json({ hasBorrowed: data.length > 0 });
  } catch (error) {
    return NextResponse.json({ hasBorrowed: false });
  }
}
