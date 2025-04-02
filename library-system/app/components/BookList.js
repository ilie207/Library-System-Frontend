"use client";

import { useEffect, useState } from "react";
import { getBooks } from "../../lib/api";
import BookCard from "./BookCard";
import SearchBar from "./SearchBar";

export default function BookList() {
  const [books, setBooks] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isSearching, setIsSearching] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getBooks();
        setBooks(data);
        setFilteredBooks(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  const handleSearch = (term) => {
    setSearchTerm(term);

    if (!term.trim()) {
      setFilteredBooks(books);
      setIsSearching(false);
      return;
    }

    setIsSearching(true);
    const lowerCaseTerm = term.toLowerCase();

    const results = books.filter(
      (book) =>
        (book.title && book.title.toLowerCase().includes(lowerCaseTerm)) ||
        (book.author && book.author.toLowerCase().includes(lowerCaseTerm)) ||
        (book.genre && book.genre.toLowerCase().includes(lowerCaseTerm))
    );

    setFilteredBooks(results);
  };

  if (loading) return <p>Loading books...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="specialSection">
      <SearchBar onSearch={handleSearch} />

      {isSearching && filteredBooks.length === 0 ? (
        <div className="no-results">
          No books found based on your search "{searchTerm}"
        </div>
      ) : (
        <>
          {isSearching && (
            <div className="search-results-info">
              Found {filteredBooks.length} book(s) for "{searchTerm}"
            </div>
          )}
          <div className="bookGrid">
            {filteredBooks.map((book) => (
              <BookCard key={book.id} book={book} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
