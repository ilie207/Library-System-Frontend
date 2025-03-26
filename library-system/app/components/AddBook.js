"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import ImageUpload from "./ImageUpload";
import config from "@/lib/config";

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
    const response = await fetch("/api/books", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(bookData),
    });

    if (response.ok) {
      alert("Book added successfully!");
      setBookData({
        title: "",
        author: "",
        total_copies: 0,
        cover_image: "",
        genre: "",
        description: "",
      });
      router.refresh();
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
        <label className="white">Book Cover</label>
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
