"use client";
import { useState, useEffect } from "react";
import { supabase } from "../../lib/supabase";
import { useRouter } from "next/navigation";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [role, setRole] = useState("Student");
  const [librarianCode, setLibrarianCode] = useState("");
  const [showLibrarianCode, setShowLibrarianCode] = useState(false);
  const [csrfToken, setCsrfToken] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();
  const librarianSecret = process.env.NEXT_PUBLIC_LIBRARIAN_SECRET_CODE || null;

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

  const handleRoleChange = (e) => {
    const selectedRole = e.target.value;
    setRole(selectedRole);
    setShowLibrarianCode(selectedRole === "Librarian");
    if (selectedRole !== "Librarian") {
      setLibrarianCode("");
    }
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setError("");

    // librarian code validation
    if (role === "Librarian" && librarianCode !== librarianSecret) {
      setError("Invalid librarian code. Please contact the administrator.");
      return;
    }

    console.log("Starting signup process...");

    const { data: authData, error: authError } = await supabase.auth.signUp({
      email,
      password,
    });

    console.log("Auth response:", authData);

    if (authError) {
      console.error("Error signing up:", authError.message);
      setError(authError.message);
      return;
    }

    if (authData.user) {
      console.log("Creating user profile...");
      const response = await fetch("/api/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-CSRF-Token": csrfToken,
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
      } else {
        setError(data.error || "Failed to create user profile");
      }
    }
  };

  return (
    <form onSubmit={handleSignup} className="signup-form">
      <h2>Sign Up</h2>
      <input type="hidden" name="csrfToken" value={csrfToken} />

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
        <select value={role} onChange={handleRoleChange}>
          <option value="Student">Student</option>
          <option value="Librarian">Librarian</option>
        </select>
      </div>

      {showLibrarianCode && (
        <div>
          <input
            type="password"
            placeholder="Librarian Authorization Code"
            value={librarianCode}
            onChange={(e) => setLibrarianCode(e.target.value)}
            required
          />
          <small className="form-hint">
            A special code is required to register as a librarian. Please
            contact the administrator if you don't have this code.
          </small>
        </div>
      )}

      {error && <div className="error-message">{error}</div>}

      <button type="submit">Sign Up</button>
    </form>
  );
}
