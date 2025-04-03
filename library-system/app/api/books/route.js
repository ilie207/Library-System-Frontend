import { NextResponse } from "next/server";
import { sanitiseObject } from "../../../lib/sanitise";

const headers = {
  "Content-Type": "application/json",
  apikey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  Authorization: `Bearer ${process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY}`,
};

export async function GET() {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_SUPABASE_URL}/functions/v1/get-books`,
      { headers }
    );

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch books" },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  const bookData = await request.json();

  const sanitisedBookData = sanitiseObject(bookData);
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_SUPABASE_URL}/functions/v1/get-books`,
    {
      method: "POST",
      headers,
      body: JSON.stringify(sanitisedBookData),
    }
  );

  const data = await response.json();
  return NextResponse.json(data);
}

export async function PUT(request) {
  const bookData = await request.json();

  const sanitisedBookData = sanitiseObject(bookData);
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_SUPABASE_URL}/functions/v1/get-books`,
    {
      method: "PUT",
      headers,
      body: JSON.stringify(sanitisedBookData),
    }
  );

  const data = await response.json();
  return NextResponse.json(data);
}

export async function DELETE(request) {
  const url = new URL(request.url);
  const bookId = url.searchParams.get("id");

  if (!bookId) {
    return NextResponse.json({ error: "Book ID is required" }, { status: 400 });
  }

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_SUPABASE_URL}/functions/v1/get-books/${bookId}`,
      {
        method: "DELETE",
        headers,
      }
    );

    const data = await response.json();

    if (data.error) {
      return NextResponse.json(
        { error: data.error },
        { status: response.status }
      );
    }

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to delete book" },
      { status: 500 }
    );
  }
}
