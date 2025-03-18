import "../../styles/books.css";
import { IKImage } from "imagekitio-next";
import config from "@/lib/config";

export default function BookCard({ book }) {
  const imagePath = `${book.cover_image}.jpg`;

  return (
    <div className="book3d">
      <IKImage
        urlEndpoint={config.env.imagekit.urlEndpoint}
        path={imagePath}
        alt={book.title}
      />
      <div className="bookInfo">
        <h3>{book.title}</h3>
        <p>{book.author}</p>
        <p>{book.description}</p>
      </div>
    </div>
  );
}
