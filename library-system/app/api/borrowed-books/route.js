import { NextResponse } from "next/server";
import { borrowBook } from "./handlers/borrow-book";
import { getStatistics } from "./handlers/get-statistics";
import { getUserBorrowings } from "./handlers/get-user-borrowings";
import { checkUserBorrowedBook } from "./handlers/check-user-borrowed-book";

// POST = borrow a book
export async function POST(request) {
  return borrowBook(request);
}

// GET = checking if a user has borrowed a book OR get statistics OR get all books borrowed by a user
export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const email = searchParams.get("email");
  const bookId = searchParams.get("bookId");
  const stats = searchParams.get("stats");
  const userBorrowings = searchParams.get("userBorrowings");

  try {
    // stats
    if (stats === "true") {
      return getStatistics();
    }

    // all books borrowed by a specific user
    else if (userBorrowings === "true" && email) {
      return getUserBorrowings(email);
    }

    // if a specific user has borrowed a specific book
    else if (email && bookId) {
      return checkUserBorrowedBook(email, bookId);
    } else {
      return NextResponse.json(
        { error: "Missing required parameters" },
        { status: 400 }
      );
    }
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json(
      { error: "Failed to process request" },
      { status: 500 }
    );
  }
}
