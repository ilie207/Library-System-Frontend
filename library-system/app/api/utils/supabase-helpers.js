export const getSupabaseHeaders = () => ({
  "Content-Type": "application/json",
  apikey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  Authorization: `Bearer ${process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY}`,
});

// helper for error fetching
export async function fetchWithErrorHandling(url, options) {
  try {
    const response = await fetch(url, options);
    const data = await response.json();

    if (!response.ok) {
      return {
        success: false,
        data,
        status: response.status,
      };
    }

    return {
      success: true,
      data,
    };
  } catch (error) {
    console.error("Fetch error:", error);
    return {
      success: false,
      error: error.message,
      status: 500,
    };
  }
}
