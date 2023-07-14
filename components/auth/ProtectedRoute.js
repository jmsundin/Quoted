'use client';

import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useAuthContext } from "@/context/AuthContext";

function ProtectedRoute({ children }) {
  const { user } = useAuthContext();
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push("/login");
    }
  }, [router, user]);

  return <React.Fragment>{user ? children : null}</React.Fragment>;
}

export default ProtectedRoute;