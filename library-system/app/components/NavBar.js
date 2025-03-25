"use client";
import React from "react";
import Link from "next/link";
import { useAuth } from "../../lib/AuthContext";
import SignOutButton from "./SignOutButton";

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
        <Link href="/addBook" className="custom_button">
          Add Book
        </Link>
        <SignOutButton />
      </ul>
    </nav>
  );
}
