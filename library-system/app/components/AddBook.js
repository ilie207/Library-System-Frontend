"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import ImageUpload from "./ImageUpload";
import config from "@/lib/config";
import { fetchWithCSRF } from "../../lib/fetchWithCSRF";
import { sanitiseObject } from "../../lib/sanitise";

export default function AddBook() {
  const [bookData, setBookData] = useState({
    title: "",
    author: "",
    total_copies: 0,
    cover_image: "",
    genre: "",
    description: "",
  });
  const router = useRouter();

  const urlEndpoint = config.env.imagekit.urlEndpoint;

  const handleImageUpload = (imageUrl) => {
    setBookData({ ...bookData, cover_image: imageUrl });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const sanitisedBookData = sanitiseObject(bookData);
      const response = await fetchWithCSRF("/api/books", {
        method: "POST",
        body: JSON.stringify(sanitisedBookData),
      });

      if (response.ok) {
        setBookData(initialBookData);
        setSuccessMessage("Book added successfully!");
        setError("");
      } else {
        const data = await response.json();
        setError(data.error || "Failed to add book");
        setSuccessMessage("");
      }
    } catch (error) {
      setError("An error occurred while adding the book");
      setSuccessMessage("");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Title"
        value={bookData.title}
        onChange={(e) => setBookData({ ...bookData, title: e.target.value })}
        required
      />
      <input
        type="text"
        placeholder="Author"
        value={bookData.author}
        onChange={(e) => setBookData({ ...bookData, author: e.target.value })}
        required
      />
      <input
        type="number"
        placeholder="Total Copies"
        value={bookData.total_copies}
        onChange={(e) =>
          setBookData({ ...bookData, total_copies: parseInt(e.target.value) })
        }
        required
      />
      <input
        type="text"
        placeholder="Cover Image Filename (Auto-completeted)"
        value={bookData.cover_image}
        onChange={(e) =>
          setBookData({ ...bookData, cover_image: e.target.value })
        }
        required
      />
      <div className="image-upload-section">
        <label>Book Cover</label>
        <ImageUpload
          onUploadSuccess={handleImageUpload}
          fileName={bookData.cover_image}
          key={bookData.cover_image}
        />
        {bookData.cover_image && (
          <img
            src={urlEndpoint + bookData.cover_image}
            alt="Book cover preview"
            className="cover-preview"
          />
        )}
      </div>
      <input
        type="text"
        placeholder="Genre"
        value={bookData.genre}
        onChange={(e) => setBookData({ ...bookData, genre: e.target.value })}
        required
      />
      <textarea
        placeholder="Description"
        value={bookData.description}
        onChange={(e) =>
          setBookData({ ...bookData, description: e.target.value })
        }
        required
      />
      <button type="submit">Add Book</button>
    </form>
  );
}
