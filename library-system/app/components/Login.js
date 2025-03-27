"use client";
import { useState, useEffect } from "react";
import { supabase } from "../../lib/supabase";
import { useRouter } from "next/navigation";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("Student");
  const [csrfToken, setCsrfToken] = useState("");
  const router = useRouter();

  useEffect(() => {
    const fetchCsrfToken = async () => {
      try {
        const response = await fetch("/api/csrf/token");
        const data = await response.json();
        setCsrfToken(data.csrfToken);
      } catch (error) {
        console.error("Error fetching CSRF token:", error);
      }
    };
    fetchCsrfToken();
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      console.error("Error logging in:", error.message);
      alert(error.message);
    } else {
      const redirectPath =
        role === "Librarian" ? "/librarian-dashboard" : "/student-dashboard";
      router.push(redirectPath);
      router.refresh();
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <input type="hidden" name="csrfToken" value={csrfToken} />

      <select value={role} onChange={(e) => setRole(e.target.value)}>
        <option value="Student">Student</option>
        <option value="Librarian">Librarian</option>
      </select>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <button type="submit">Login</button>
    </form>
  );
}
