"use client";
import { useEffect, useState, use } from "react";
import { useAuth } from "../../../lib/AuthContext";
import { IKImage } from "imagekitio-next";
import config from "@/lib/config";
import { getBooks } from "../../../lib/api";
import Header from "../../components/Header";
import NavBar from "../../components/NavBar";
import BorrowBook from "../../components/BorrowBook";

export default function BookPage({ params }) {
  const [book, setBook] = useState(null);
  const { user, role } = useAuth();
  const bookId = use(params).id;

  useEffect(() => {
    fetchBookDetails(bookId);
  }, [bookId]);

  const fetchBookDetails = async (id) => {
    const allBooks = await getBooks();
    const selectedBook = allBooks.find((book) => book.id === parseInt(id));
    setBook(selectedBook);
  };

  if (!book) return <div>Loading...</div>;

  return (
    <>
      <Header />
      <NavBar />
      <div className="book-page">
        <div className="book-header">
          <div className="book3d">
            <IKImage
              urlEndpoint={config.env.imagekit.urlEndpoint}
              path={`${book.cover_image}`}
              alt={book.title}
            />
          </div>
          <div className="bookInfo">
            <h1>{book.title}</h1>
            <h2>By {book.author}</h2>
            <div
              className={`availability-badge ${
                book.available > 0 ? "available" : "unavailable"
              }`}
            >
              {book.available > 0
                ? `${book.available} Available`
                : "Out of Stock"}
            </div>
            <div>
              {user && role === "Student" && (
                <BorrowBook
                  user={user}
                  book={book}
                  onBorrowSuccess={fetchBookDetails.bind(null, bookId)}
                />
              )}
            </div>
            <p className="genre">Genre: {book.genre}</p>
            <h3>Description</h3>
            <p>{book.description}</p>
          </div>
        </div>
      </div>
    </>
  );
}
