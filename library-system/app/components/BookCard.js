import "../../styles/books.css";

export default function BookCard({ book }) {
  return (
    <div className="book3d">
      <img src={book.coverImageUrl || "/default-cover.jpg"} alt={book.title} />
      <div className="bookInfo">
        <h3>{book.title}</h3>
        <p>{book.author}</p>
        <p>{book.description}</p>
      </div>
    </div>
  );
}
