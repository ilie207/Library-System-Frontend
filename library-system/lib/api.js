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

export async function getUsers() {
  try {
    const response = await fetch("/api/users");
    if (!response.ok) throw new Error("Failed to fetch users");
    return await response.json();
  } catch (error) {
    console.error("Error fetching users:", error);
    return [];
  }
}

export async function updateUser(userData) {
  try {
    const response = await fetch("/api/users", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });
    if (!response.ok) throw new Error("Failed to update user");
    return await response.json();
  } catch (error) {
    console.error("Error updating user:", error);
    throw error;
  }
}
