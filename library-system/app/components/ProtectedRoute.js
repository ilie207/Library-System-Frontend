"use client";
import { useAuth } from "../../lib/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function ProtectedRoute({ children, allowedRole }) {
  const { user, role, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading) {
      if (!user) {
        router.push("/login");
      } else if (role !== allowedRole) {
        router.push("/unauthorized");
      }
    }
  }, [user, role, loading]);

  if (loading) return null;
  return user && role === allowedRole ? children : null;
}
