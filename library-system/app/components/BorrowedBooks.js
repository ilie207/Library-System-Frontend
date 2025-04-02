"use client";

import React, { useEffect, useState } from "react";
import { useAuth } from "../../lib/AuthContext";
import Link from "next/link";
import { calculateDueStatus, formatDate } from "../../lib/dateUtils";

const BorrowedBooks = () => {
  const { user } = useAuth();
  const [borrowedBooks, setBorrowedBooks] = useState([]);
  const [bookDetails, setBookDetails] = useState({});
  const [error, setError] = useState(null);

  useEffect(() => {
    if (user && user.email) {
      fetchBorrowedBooks();
    }
  }, [user]);

  const fetchBorrowedBooks = async () => {
    try {
      const response = await fetch(
        `/api/borrowed-books?userBorrowings=true&email=${encodeURIComponent(
          user.email
        )}`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch borrowed books");
      }

      const data = await response.json();
      const borrowings = Array.isArray(data) ? data : [];
      setBorrowedBooks(borrowings);

      if (borrowings.length > 0) {
        const bookIds = borrowings.map((borrowing) => borrowing.book_id);
        await fetchBookDetails(bookIds);
      }
    } catch (error) {
      console.error("Error fetching borrowed books:", error);
      setError(error.message);
    }
  };

  const fetchBookDetails = async (bookIds) => {
    try {
      const response = await fetch(`/api/books?ids=${bookIds.join(",")}`);

      if (!response.ok) {
        throw new Error("Failed to fetch book details");
      }

      const books = await response.json();

      // mapping book details using book_id
      const booksMap = {};
      books.forEach((book) => {
        booksMap[book.id] = book;
      });

      setBookDetails(booksMap);
    } catch (error) {
      console.error("Error fetching book details:", error);
      setError(error.message);
    }
  };

  return (
    <section className="specialSection">
      <h2>Your Borrowed Books</h2>
      <div className="borrowed-books-grid">
        {borrowedBooks.map((borrowing, index) => {
          const book = bookDetails[borrowing.book_id];
          const borrowDate =
            borrowing.borrow_date ||
            borrowing.borrowed_date ||
            borrowing.created_at;
          const dueDate = borrowing.return_date || borrowing.due_date;
          const { statusClass, statusText } = calculateDueStatus(dueDate);

          return (
            <div
              key={borrowing.id || `borrowed-book-${index}`}
              className={`borrowed-book-card ${statusClass}`}
            >
              <Link href={`/bookPage/${borrowing.book_id}`}>
                {book ? (
                  <>
                    <h3 className="book-title">{book.title}</h3>
                    <p className="book-author">by {book.author}</p>
                  </>
                ) : (
                  <h3 className="book-title">Book ID: {borrowing.book_id}</h3>
                )}
                <div className="borrow-details">
                  <p>Borrowed: {formatDate(borrowDate)}</p>
                  <p>Due: {formatDate(dueDate)}</p>
                  <p className="status-text">{statusText}</p>
                </div>
              </Link>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default BorrowedBooks;
