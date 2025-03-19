"use client";
import { useAuth } from "../../lib/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function ProtectedRoute({ children, allowedRole }) {
  const { user, role } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push("/");
    } else if (role !== allowedRole) {
      router.push("/unauthorised");
    }
  }, [user, role]);

  return user && role === allowedRole ? children : null;
}
