import { NextResponse } from "next/server";
import {
  getSupabaseHeaders,
  fetchWithErrorHandling,
} from "../../utils/supabase-helpers";

export async function getStatistics() {
  const { success, data, status, error } = await fetchWithErrorHandling(
    `${process.env.NEXT_PUBLIC_SUPABASE_URL}/functions/v1/borrowed-books?stats=true`,
    {
      method: "GET",
      headers: getSupabaseHeaders(),
    }
  );

  if (!success) {
    return NextResponse.json(
      { error: error || "Failed to fetch statistics" },
      { status: status || 500 }
    );
  }

  return NextResponse.json(data);
}
