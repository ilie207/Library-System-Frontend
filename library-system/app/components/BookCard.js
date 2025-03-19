import "../../styles/books.css";
import { IKImage } from "imagekitio-next";
import config from "@/lib/config";

export default function BookCard({ book }) {
  const imagePath = `${book.cover_image}.png`;

  return (
    <div className="book3d">
      <IKImage
        lqip={{ active: true, quality: 10 }}
        urlEndpoint={config.env.imagekit.urlEndpoint}
        path={imagePath}
        alt={book.title}
        loading="lazy"
        className="bookCover"
      />
      <div className="bookInfo">
        <h3>{book.title}</h3>
        <p>{book.author}</p>
        <p>{book.description}</p>
      </div>
    </div>
  );
}
