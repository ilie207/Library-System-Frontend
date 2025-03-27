import { NextResponse } from "next/server";

// POST = borrow a book
export async function POST(request) {
  const body = await request.json();

  // 30 days return date
  const returnDate = new Date();
  returnDate.setDate(returnDate.getDate() + 30);

  try {
    // calling the edge-function
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

// GET = checking if a user has borrowed a book OR get statistics
export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const email = searchParams.get("email");
  const bookId = searchParams.get("bookId");
  const stats = searchParams.get("stats");

  try {
    // (if) stats parameter is present then get statistics
    if (stats === "true") {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_SUPABASE_URL}/functions/v1/borrowed-books`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            apikey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY}`,
          },
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to fetch statistics");
      }

      const data = await response.json();
      return NextResponse.json(data);
    }

    // (else) check if a specific user has borrowed a specific book
    else if (email && bookId) {
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
    }

    // (if) neither then it's an error
    else {
      return NextResponse.json(
        { error: "Missing required parameters" },
        { status: 400 }
      );
    }
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json(
      { error: "Failed to process request" },
      { status: 500 }
    );
  }
}
