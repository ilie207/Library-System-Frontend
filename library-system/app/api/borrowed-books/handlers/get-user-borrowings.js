import { NextResponse } from "next/server";
import {
  getSupabaseHeaders,
  fetchWithErrorHandling,
} from "../../utils/supabase-helpers";

export async function getUserBorrowings(email) {
  // all borrowed books
  const { success, data, status, error } = await fetchWithErrorHandling(
    `${process.env.NEXT_PUBLIC_SUPABASE_URL}/functions/v1/borrowed-books`,
    {
      headers: getSupabaseHeaders(),
    }
  );

  if (!success) {
    return NextResponse.json(
      { error: error || "Failed to fetch borrowed books" },
      { status: status || 500 }
    );
  }

  // current user and "borrowed" status
  const userBorrowedBooks = data.filter(
    (borrowing) =>
      borrowing.user_email === email && borrowing.status === "borrowed"
  );

  if (userBorrowedBooks.length === 0) {
    return NextResponse.json([]);
  }

  // book details
  const bookIds = userBorrowedBooks.map((borrowing) => borrowing.book_id);

  const {
    success: booksSuccess,
    data: books,
    status: booksStatus,
    error: booksError,
  } = await fetchWithErrorHandling(
    `${
      process.env.NEXT_PUBLIC_SUPABASE_URL
    }/rest/v1/books?id=in.(${bookIds.join(",")})`,
    {
      headers: getSupabaseHeaders(),
    }
  );

  if (!booksSuccess) {
    return NextResponse.json(
      { error: booksError || "Failed to fetch book details" },
      { status: booksStatus || 500 }
    );
  }

  const booksMap = {};
  books.forEach((book) => {
    booksMap[book.id] = book;
  });

  // borrowing records with book details
  const borrowedBooksWithDetails = userBorrowedBooks.map((borrowing) => ({
    ...borrowing,
    book: booksMap[borrowing.book_id],
  }));

  return NextResponse.json(borrowedBooksWithDetails);
}
