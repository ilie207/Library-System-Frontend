"use client";
import { useAuth } from "../../lib/AuthContext";
import { supabase } from "../../lib/supabase";
import { useRouter } from "next/navigation";

export default function SignOutButton() {
  const { signOut } = useAuth();

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    await signOut();
    window.location.href = "/";
  };

  return (
    <button onClick={handleSignOut} className="signout-button">
      Sign Out
    </button>
  );
}
