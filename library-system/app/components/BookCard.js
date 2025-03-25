import "../../styles/books.css";
import { IKImage } from "imagekitio-next";
import config from "@/lib/config";
import Link from "next/link";

export default function BookCard({ book }) {
  const imagePath = `${book.cover_image}`;

  return (
    <Link href={`/bookPage/${book.id}`} className="book-link">
      <div className="book3d">
        <IKImage
          urlEndpoint={config.env.imagekit.urlEndpoint}
          path={imagePath}
          alt={book.title}
        />
        <div className="bookInfo">
          <h3>{book.title}</h3>
          <p>{book.author}</p>
        </div>
      </div>
    </Link>
  );
}
