"use client";

import { useEffect, useState } from "react";
import { getBooks } from "../../lib/api";
import BookCard from "./BookCard";

export default function BookList() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getBooks();
        setBooks(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  if (loading) return <p>Loading books...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <section className="specialSection">
      <h2>All Books</h2>
      <div className="bookGrid">
        {books.length > 0 ? (
          books.map((book) => <BookCard key={book.id} book={book} />)
        ) : (
          <p>No books available.</p>
        )}
      </div>
    </section>
  );
}
