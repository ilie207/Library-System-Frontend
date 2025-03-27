"use client";
import { useState, useEffect } from "react";
import { fetchWithCSRF } from "../../lib/fetchWithCSRF";

export default function BorrowBook({ user, book, onBorrowSuccess }) {
  const [hasBorrowed, setHasBorrowed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const checkBorrowStatus = async () => {
    if (!user?.email) return;

    const response = await fetch(
      `/api/borrowed-books?email=${user.email}&bookId=${book.id}`
    );
    const data = await response.json();
    setHasBorrowed(data.hasBorrowed);
  };

  useEffect(() => {
    checkBorrowStatus();
  }, [user?.email, book.id]);

  const handleBorrow = async () => {
    setIsLoading(true);
    try {
      const response = await fetchWithCSRF("/api/borrowed-books", {
        method: "POST",
        body: JSON.stringify({
          user_email: user.email,
          book_id: book.id,
        }),
      });

      const data = await response.json();
      if (response.ok) {
        setHasBorrowed(true);
        onBorrowSuccess();
      } else {
        setError(data.error || "Failed to borrow book");
      }
    } catch (error) {
      setError("An error occurred while borrowing the book");
    } finally {
      setIsLoading(false);
    }
  };

  if (hasBorrowed) {
    return (
      <button className="custom_button reserved">
        <span>✓</span> Reserved
      </button>
    );
  }

  return book.available > 0 ? (
    <button
      onClick={handleBorrow}
      className="custom_button"
      disabled={isLoading}
    >
      {isLoading ? "Processing..." : "Borrow This Book"}
    </button>
  ) : null;
}
