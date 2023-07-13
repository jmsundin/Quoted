import React, { useEffect } from "react";
import { useRouter } from "next/navigation";

import { useAuthContext } from "@/context/AuthContext";

function RootPage() {
  const { user } = useAuthContext();
  const router = useRouter();

  useEffect(() => {
    if (user) {
      router.push("/home");
    } else {
      router.push("/auth/login");
    }
  }, [user, router]);

  return (
    <React.Fragment>
        { user ? <div>Redirecting...</div> : null }
    </React.Fragment>
  );
}

export default RootPage;