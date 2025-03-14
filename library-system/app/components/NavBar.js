import React from "react";
import Link from "next/link";

export default function NavBar() {
  return (
    <nav>
      <ul className="container-style">
        <Link href="/" className="custom_button">
          Home
        </Link>
        <Link href="/allBooks" className="custom_button">
          All Books
        </Link>
      </ul>
    </nav>
  );
}
