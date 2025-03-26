"use client";
import { useEffect, useState } from "react";
import { useAuth } from "../../lib/AuthContext";

export default function Welcome() {
  const { user } = useAuth();
  const [firstName, setFirstName] = useState("");

  useEffect(() => {
    async function fetchUserName() {
      if (user?.email) {
        const response = await fetch(`/api/users`);
        const users = await response.json();
        const currentUser = users.find((u) => u.email === user.email);
        if (currentUser) {
          setFirstName(currentUser.f_name);
        }
      }
    }
    fetchUserName();
  }, [user]);

  return (
    <div className="welcome-container">
      <p className="welcome-text">Welcome, {firstName}!</p>
    </div>
  );
}
