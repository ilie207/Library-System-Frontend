"use client";

import React, { useEffect, useState } from "react";
import { getBooks } from "../../lib/api";
import BookCard from "./BookCard";
import "../../styles/books.css";

const FeaturedBooks = () => {
  const [highlightedBooks, setHighlightedBooks] = useState([]);

  useEffect(() => {
    fetchRandomBooks();
  }, []);

  const fetchRandomBooks = async () => {
    const allBooks = await getBooks();
    const randomBooks = allBooks.sort(() => Math.random() - 0.5).slice(0, 3);
    setHighlightedBooks(randomBooks);
  };

  return (
    <section className="featured">
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
