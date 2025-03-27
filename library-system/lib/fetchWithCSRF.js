export async function fetchWithCSRF(url, options = {}) {
  try {
    // getting the CSRF token from the api route
    const tokenResponse = await fetch("/api/csrf/token");
    const { csrfToken } = await tokenResponse.json();

    const headers = {
      ...options.headers,
      "Content-Type": "application/json",
      "X-CSRF-Token": csrfToken,
    };

    // passing the CSRF token in the headers
    return fetch(url, {
      ...options,
      headers,
    });
  } catch (error) {
    console.error("Error in fetchWithCSRF:", error);
    throw error;
  }
}
