export default function BookCard({ book }) {
  return (
    <div className="border rounded-lg p-4 shadow-md">
      <h2 className="text-lg font-bold">{book.title}</h2>
      <p className="text-gray-600">Author: {book.author}</p>
      <p>
        <strong>Available:</strong> {book.available} / {book.total_copies}
      </p>
    </div>
  );
}
