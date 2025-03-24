"use client";
import { useState } from "react";
import { supabase } from "../../lib/supabase";
import { useRouter } from "next/navigation";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("Student");
  const router = useRouter();

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
