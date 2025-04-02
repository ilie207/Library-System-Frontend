import { NextResponse } from "next/server";
import {
  getSupabaseHeaders,
  fetchWithErrorHandling,
} from "../../utils/supabase-helpers";

export async function checkUserBorrowedBook(email, bookId) {
  const { success, data, status, error } = await fetchWithErrorHandling(
    `${process.env.NEXT_PUBLIC_SUPABASE_URL}/rest/v1/borrowed_books?user_email=eq.${email}&book_id=eq.${bookId}&status=eq.borrowed`,
    {
      headers: getSupabaseHeaders(),
    }
  );

  if (!success) {
    return NextResponse.json(
      { error: error || "Failed to check borrowing status" },
      { status: status || 500 }
    );
  }

  return NextResponse.json({ hasBorrowed: data.length > 0 });
}
