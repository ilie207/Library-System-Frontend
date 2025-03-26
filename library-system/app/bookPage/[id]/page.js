"use client";
import { useEffect, useState, use } from "react";
import { useAuth } from "../../../lib/AuthContext";
import { IKImage } from "imagekitio-next";
import config from "@/lib/config";
import { getBooks } from "../../../lib/api";
import Header from "../../components/Header";
import NavBar from "../../components/NavBar";
import BorrowBook from "../../components/BorrowBook";
import ImageUpload from "../../components/ImageUpload";

export default function BookPage({ params }) {
  const [book, setBook] = useState(null);
  const { user, role } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [editedBook, setEditedBook] = useState(null);
  const bookId = use(params).id;

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
    const response = await fetch(`/api/books`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(editedBook),
    });

    if (response.ok) {
      setIsEditing(false);
      setBook(editedBook);
      fetchBookDetails(bookId);
    }
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
            {isEditing ? (
              <form onSubmit={handleEdit} className="edit-form-tabs">
                <input
                  type="text"
                  value={editedBook.title}
                  onChange={(e) =>
                    setEditedBook({ ...editedBook, title: e.target.value })
                  }
                />
                <input
                  type="text"
                  value={editedBook.author}
                  onChange={(e) =>
                    setEditedBook({ ...editedBook, author: e.target.value })
                  }
                />
                <input
                  type="number"
                  value={editedBook.total_copies}
                  onChange={(e) =>
                    setEditedBook({
                      ...editedBook,
                      total_copies: parseInt(e.target.value),
                    })
                  }
                />
                <ImageUpload
                  onUploadSuccess={(url) =>
                    setEditedBook({ ...editedBook, cover_image: url })
                  }
                />
                <input
                  type="text"
                  value={editedBook.genre}
                  onChange={(e) =>
                    setEditedBook({ ...editedBook, genre: e.target.value })
                  }
                />
                <textarea
                  value={editedBook.description}
                  onChange={(e) =>
                    setEditedBook({
                      ...editedBook,
                      description: e.target.value,
                    })
                  }
                />
                <div className="edit-buttons">
                  <button type="submit" className="custom_button">
                    Save Changes
                  </button>
                  <button
                    onClick={() => setIsEditing(false)}
                    className="custom_button"
                  >
                    Cancel
                  </button>
                </div>
              </form>
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
                  <button
                    onClick={() => setIsEditing(true)}
                    className="custom_button"
                  >
                    Edit Book
                  </button>
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
