import ImageUpload from "./ImageUpload";

export default function BookForm({
  editedBook,
  setEditedBook,
  handleSubmit,
  onCancel,
}) {
  return (
    <form onSubmit={handleSubmit} className="edit-form-tabs">
      <input
        type="text"
        value={editedBook.title}
        onChange={(e) =>
          setEditedBook({ ...editedBook, title: e.target.value })
        }
        placeholder="Book Title"
      />
      <input
        type="text"
        value={editedBook.author}
        onChange={(e) =>
          setEditedBook({ ...editedBook, author: e.target.value })
        }
        placeholder="Author"
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
        placeholder="Total Copies"
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
        placeholder="Genre"
      />
      <textarea
        value={editedBook.description}
        onChange={(e) =>
          setEditedBook({
            ...editedBook,
            description: e.target.value,
          })
        }
        placeholder="Book Description"
      />
      <div className="edit-buttons">
        <button type="submit" className="custom_button">
          Save Changes
        </button>
        <button onClick={onCancel} className="custom_button" type="button">
          Cancel
        </button>
      </div>
    </form>
  );
}
