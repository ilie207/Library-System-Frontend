"use client";
import React from "react";
import Link from "next/link";
import { useAuth } from "../../lib/AuthContext";

export default function NavBar() {
  const { user, role } = useAuth();

  return (
    <nav>
      <ul className="container-style">
        {user && (
          <Link
            href={
              role === "Librarian"
                ? "/librarian-dashboard"
                : "/student-dashboard"
            }
            className="custom_button"
          >
            Dashboard
          </Link>
        )}
        <Link href="/allBooks" className="custom_button">
          All Books
        </Link>
        {role === "Librarian" && (
          <Link href="/addBook" className="custom_button">
            Add Book
          </Link>
        )}
      </ul>
    </nav>
  );
}
