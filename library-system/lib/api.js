export async function getBooks() {
  try {
    console.log("Attempting to fetch from:", "/api/books");
    const response = await fetch("/api/books");
    console.log("Response status:", response.status);

    if (!response.ok) throw new Error("Failed to fetch books");
    const data = await response.json();
    console.log("Fetched data:", data);

    return data;
  } catch (error) {
    console.error("Error fetching books:", error);
    return [];
  }
}
