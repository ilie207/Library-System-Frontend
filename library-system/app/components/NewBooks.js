"use client";

import React, { useEffect, useState } from "react";
import { getBooks } from "../../lib/api";
import "../../styles/books.css";

const NewBooks = () => {
  const [newBooks, setNewBooks] = useState([]);

  useEffect(() => {
    fetchLatestBooks();
  }, []);

  const fetchLatestBooks = async () => {
    const allBooks = await getBooks();
    // Sort books by created_at and get the latest one
    const latestBooks = allBooks
      .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
      .slice(0, 1);
    setNewBooks(latestBooks);
  };

  return (
    <section className="newBooks">
      <h2>New Arrivals</h2>
      <div className="newBooksGrid">
        {newBooks.map((book) => (
          <div key={book.id} className="newBook3d">
            <div className="bookWrapper">
              <img
                src={book.coverImageUrl || "/default-cover.jpg"}
                alt={book.title}
              />
              <div className="ribbon">New!</div>
            </div>
            <div className="bookDetails">
              <h3>{book.title}</h3>
              <p>{book.author}</p>
              <span>
                Added: {new Date(book.created_at).toLocaleDateString()}
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default NewBooks;
