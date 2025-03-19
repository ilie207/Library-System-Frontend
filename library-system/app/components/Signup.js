"use client";
import { useState } from "react";
import { supabase } from "../../lib/supabase";
import { useRouter } from "next/navigation";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [role, setRole] = useState("Student");
  const router = useRouter();

  const handleSignup = async (e) => {
    e.preventDefault();
    console.log("Starting signup process...");

    const { data: authData, error: authError } = await supabase.auth.signUp({
      email,
      password,
    });

    console.log("Auth response:", authData);

    if (authError) {
      console.error("Error signing up:", authError.message);
      return;
    }

    if (authData.user) {
      console.log("Creating user profile...");
      const response = await fetch("/api/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          f_name: firstName,
          l_name: lastName,
          role: role,
        }),
      });

      const data = await response.json();
      console.log("Profile creation response:", data);

      if (response.ok) {
        router.push("/");
      }
    }
  };

  return (
    <form onSubmit={handleSignup} className="signup-form">
      <h2>Sign Up</h2>
      <div>
        <input
          type="text"
          placeholder="First Name"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          required
        />
      </div>
      <div>
        <input
          type="text"
          placeholder="Last Name"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          required
        />
      </div>
      <div>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div>
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      <div>
        <select value={role} onChange={(e) => setRole(e.target.value)}>
          <option value="Student">Student</option>
          <option value="Librarian">Librarian</option>
        </select>
      </div>
      <button type="submit">Sign Up</button>
    </form>
  );
}
