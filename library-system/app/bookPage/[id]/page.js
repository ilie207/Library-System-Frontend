"use client";
import { useEffect, useState, use } from "react";
import { useAuth } from "../../../lib/AuthContext";
import { IKImage } from "imagekitio-next";
import config from "@/lib/config";
import { getBooks } from "../../../lib/api";
import Header from "../../components/Header";
import NavBar from "../../components/NavBar";
import BorrowBook from "../../components/BorrowBook";
import { useRouter } from "next/navigation";
import { handleBookEdit } from "../../../lib/bookOperations/editBook";
import { confirmAndDeleteBook } from "../../../lib/bookOperations/deleteBook";
import BookForm from "@/app/components/BookForm";

export default function BookPage({ params }) {
  const [book, setBook] = useState(null);
  const { user, role } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [editedBook, setEditedBook] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [deleteError, setDeleteError] = useState(null);
  const bookId = use(params).id;
  const router = useRouter();

  useEffect(() => {
    fetchBookDetails(bookId);
  }, [bookId]);

  useEffect(() => {
    if (book) {
      setEditedBook(book);
    }
  }, [book]);

  const fetchBookDetails = async (id) => {
    const allBooks = await getBooks();
    const selectedBook = allBooks.find((book) => book.id === parseInt(id));
    setBook(selectedBook);
  };

  const handleEdit = async (e) => {
    e.preventDefault();
    await handleBookEdit(
      editedBook,
      setIsEditing,
      setBook,
      fetchBookDetails,
      bookId
    );
  };

  const handleDelete = () => {
    confirmAndDeleteBook(bookId, setIsDeleting, setDeleteError, router);
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
          <div className="bookPageInfo">
            {isEditing ? (
              <BookForm
                editedBook={editedBook}
                setEditedBook={setEditedBook}
                handleSubmit={handleEdit}
                onCancel={() => setIsEditing(false)}
              />
            ) : (
              <>
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
                {user && role === "Student" && (
                  <BorrowBook
                    user={user}
                    book={book}
                    onBorrowSuccess={fetchBookDetails.bind(null, bookId)}
                  />
                )}
                {user && role === "Librarian" && (
                  <div className="librarian-actions">
                    <button
                      onClick={() => setIsEditing(true)}
                      className="custom_button"
                    >
                      Edit Book
                    </button>
                    <button
                      onClick={handleDelete}
                      className="custom_button delete-button"
                      disabled={isDeleting}
                    >
                      {isDeleting ? "Deleting..." : "Delete Book"}
                    </button>
                    {deleteError && (
                      <div className="error-message">{deleteError}</div>
                    )}
                  </div>
                )}
                <p className="genre">Genre: {book.genre}</p>
                <h3>Description</h3>
                <p>{book.description}</p>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
