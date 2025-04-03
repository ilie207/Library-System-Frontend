import { fetchWithCSRF } from "../../lib/fetchWithCSRF";

export async function handleBookDelete(
  bookId,
  setIsDeleting,
  setDeleteError,
  router
) {
  setIsDeleting(true);
  setDeleteError(null);

  try {
    const response = await fetchWithCSRF(`/api/books?id=${bookId}`, {
      method: "DELETE",
    });

    const data = await response.json();

    if (response.ok) {
      router.push("/allBooks");
      return true;
    } else {
      setDeleteError(data.error || "Failed to delete book");
      setIsDeleting(false);
      return false;
    }
  } catch (error) {
    setDeleteError("An error occurred while deleting the book");
    setIsDeleting(false);
    return false;
  }
}

export function confirmAndDeleteBook(
  bookId,
  setIsDeleting,
  setDeleteError,
  router
) {
  if (
    window.confirm(
      "Are you sure you want to delete this book? This action cannot be undone."
    )
  ) {
    return handleBookDelete(bookId, setIsDeleting, setDeleteError, router);
  }
  return Promise.resolve(false);
}
