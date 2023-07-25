"use client";

import { useRouter } from "next/router";
import { Fragment, useEffect } from "react";
import { useAuthContext } from "@/lib/context/AuthContext";

function ProtectedRoute({ children }) {
  const { user } = useAuthContext();
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push("/login");
    }
  }, [router, user]);

  return <Fragment>{user ? children : null}</Fragment>;
}

export default ProtectedRoute;
