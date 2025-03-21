import { NextResponse } from "next/server";

export async function POST(request) {
  const body = await request.json();

  // Calculate return date (30 days from now)
  const returnDate = new Date();
  returnDate.setDate(returnDate.getDate() + 30);

  try {
    // First check if already borrowed
    const checkResponse = await fetch(
      `${process.env.NEXT_PUBLIC_SUPABASE_URL}/rest/v1/borrowed_books?user_email=eq.${body.user_email}&book_id=eq.${body.book_id}&status=eq.borrowed`,
      {
        headers: {
          "Content-Type": "application/json",
          apikey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY}`,
        },
      }
    );

    const existingBorrows = await checkResponse.json();
    if (existingBorrows.length > 0) {
      return NextResponse.json(
        { error: "You have already borrowed this book" },
        { status: 400 }
      );
    }

    // Proceed with borrowing
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_SUPABASE_URL}/functions/v1/borrowed-books`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          apikey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY}`,
        },
        body: JSON.stringify({
          ...body,
          return_date: returnDate.toISOString(),
        }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      return NextResponse.json(data, { status: response.status });
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error("Borrow error:", error);
    return NextResponse.json(
      { error: "Failed to borrow book" },
      { status: 500 }
    );
  }
}
