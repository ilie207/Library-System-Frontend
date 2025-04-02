"use client";

import React, { useEffect, useState } from "react";
import { getBooks } from "../../lib/api";
import BookCard from "./BookCard";

const NewBooks = () => {
  const [newBooks, setNewBooks] = useState([]);

  useEffect(() => {
    fetchLatestBooks();
  }, []);

  const fetchLatestBooks = async () => {
    const allBooks = await getBooks();
    // sorted books by created_at to get the latest one
    const latestBooks = allBooks
      .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
      .slice(0, 4);
    setNewBooks(latestBooks);
  };

  return (
    <section className="specialSection">
      <h2>New Arrivals</h2>
      <div className="bookGrid">
        {newBooks.map((book) => (
          <div key={book.id} className="book-wrapper">
            <div className="new-ribbon">New</div>
            <BookCard book={book} />
          </div>
        ))}
      </div>
    </section>
  );
};

export default NewBooks;
