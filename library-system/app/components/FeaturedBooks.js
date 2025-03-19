"use client";

import React, { useEffect, useState } from "react";
import { getBooks } from "../../lib/api";
import BookCard from "./BookCard";

const FeaturedBooks = () => {
  const [highlightedBooks, setHighlightedBooks] = useState([]);

  useEffect(() => {
    fetchTopAvailableBooks();
  }, []);

  const fetchTopAvailableBooks = async () => {
    const allBooks = await getBooks();
    // Sort books by availability
    const topBooks = allBooks
      .sort((a, b) => b.available - a.available)
      .slice(0, 3);
    setHighlightedBooks(topBooks);
  };

  return (
    <section className="specialSection">
      <h2>Featured Books</h2>
      <div className="bookGrid">
        {highlightedBooks.map((book) => (
          <BookCard key={book.id} book={book} />
        ))}
      </div>
    </section>
  );
};

export default FeaturedBooks;
