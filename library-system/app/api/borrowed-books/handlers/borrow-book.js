import { NextResponse } from "next/server";
import {
  getSupabaseHeaders,
  fetchWithErrorHandling,
} from "../../utils/supabase-helpers";

export async function borrowBook(request) {
  const body = await request.json();

  // 30 days return date
  const returnDate = new Date();
  returnDate.setDate(returnDate.getDate() + 30);

  const { success, data, status, error } = await fetchWithErrorHandling(
    `${process.env.NEXT_PUBLIC_SUPABASE_URL}/functions/v1/borrowed-books`,
    {
      method: "POST",
      headers: getSupabaseHeaders(),
      body: JSON.stringify({
        ...body,
        return_date: returnDate.toISOString(),
      }),
    }
  );

  if (!success) {
    return NextResponse.json(data || { error }, { status: status || 500 });
  }

  return NextResponse.json(data);
}
