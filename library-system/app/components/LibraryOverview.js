"use client";
import { useState, useEffect } from "react";
import { fetchWithCSRF } from "../../lib/fetchWithCSRF";

export default function LibraryOverview() {
  const [stats, setStats] = useState({
    totalBooks: 0,
    availableBooks: 0,
    borrowedBooks: 0,
    pendingReturns: 0,
    loading: true,
    error: null,
  });

  useEffect(() => {
    const fetchLibraryStats = async () => {
      try {
        let books = [];
        try {
          const booksResponse = await fetchWithCSRF("/api/books");
          if (!booksResponse.ok) {
            throw new Error(`Books API returned ${booksResponse.status}`);
          }
          books = await booksResponse.json();
        } catch (error) {
          console.error("Error fetching books:", error);
          books = [];
        }

        let borrowedData = { totalBorrowed: 0, pendingReturns: 0 };
        try {
          const borrowedResponse = await fetchWithCSRF(
            "/api/borrowed-books/stats"
          );
          if (!borrowedResponse.ok) {
            throw new Error(
              `Borrowed books API returned ${borrowedResponse.status}`
            );
          }
          borrowedData = await borrowedResponse.json();
          console.log("Borrowed data:", borrowedData);
        } catch (error) {
          console.error("Error fetching borrowed books:", error);
        }

        // books statistics
        const totalBooks = Array.isArray(books) ? books.length : 0;
        const availableBooks = Array.isArray(books)
          ? books.reduce((sum, book) => sum + (book.available || 0), 0)
          : 0;
        const borrowedBooks = borrowedData?.totalBorrowed || 0;
        const pendingReturns = borrowedData?.pendingReturns || 0;

        setStats({
          totalBooks,
          availableBooks,
          borrowedBooks,
          pendingReturns,
          loading: false,
          error: null,
        });
      } catch (error) {
        console.error("Error in fetchLibraryStats:", error);
        setStats((prev) => ({
          ...prev,
          loading: false,
          error: "Failed to load library statistics",
        }));
      }
    };

    fetchLibraryStats();
  }, []);
  if (stats.loading) {
    return (
      <div className="library-overview loading">Loading statistics...</div>
    );
  }

  if (stats.error) {
    return <div className="library-overview error">{stats.error}</div>;
  }

  return (
    <div className="library-overview">
      <h2>Library Overview</h2>
      <div className="stats-container">
        <div className="stat-card">
          <div className="stat-icon">📚</div>
          <div className="stat-content">
            <h3>Total Books</h3>
            <p>{stats.totalBooks}</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">✅</div>
          <div className="stat-content">
            <h3>Available</h3>
            <p>{stats.availableBooks}</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">🔄</div>
          <div className="stat-content">
            <h3>Borrowed</h3>
            <p>{stats.borrowedBooks}</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">⏳</div>
          <div className="stat-content">
            <h3>Pending Returns</h3>
            <p>{stats.pendingReturns}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
