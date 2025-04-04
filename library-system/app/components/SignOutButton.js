"use client";
import { useAuth } from "../../lib/AuthContext";
import { supabase } from "../../lib/supabase";

export default function SignOutButton() {
  const { signOut } = useAuth();

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    await signOut();
    window.location.href = "/";
  };

  return (
    <div className="sign-out-wrapper">
      <button onClick={handleSignOut} className="sign-out">
        Sign Out
      </button>
    </div>
  );
}
