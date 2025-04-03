import { fetchWithCSRF } from "../../lib/fetchWithCSRF";
import { sanitiseObject } from "../../lib/sanitise";

export async function handleBookEdit(
  editedBook,
  setIsEditing,
  setBook,
  fetchBookDetails,
  bookId
) {
  const sanitisedEditedBook = sanitiseObject(editedBook);
  const response = await fetchWithCSRF(`/api/books`, {
    method: "PUT",
    body: JSON.stringify(sanitisedEditedBook),
  });

  if (response.ok) {
    setIsEditing(false);
    setBook(editedBook);
    fetchBookDetails(bookId);
    return true;
  }

  return false;
}
