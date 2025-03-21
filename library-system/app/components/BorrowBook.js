"use client";
import { useState, useEffect } from "react";

export default function BorrowBook({ user, book, onBorrowSuccess }) {
  const [hasBorrowed, setHasBorrowed] = useState(false);

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
    const response = await fetch(`/api/borrowed-books`, {
      method: "POST",
      body: JSON.stringify({
        user_email: user.email,
        book_id: book.id,
      }),
    });

    const data = await response.json();

    if (response.ok) {
      await checkBorrowStatus();
      onBorrowSuccess();
    } else {
      alert(data.error || "Failed to borrow book");
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
    <button onClick={handleBorrow} className="custom_button">
      Borrow This Book
    </button>
  ) : null;
}
