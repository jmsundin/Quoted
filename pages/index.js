import { Fragment, useEffect } from "react";

import { useRouter } from "next/navigation";
import { useAuthContext } from "@/lib/context/AuthContext";

function PagesRoot() {
  const { user } = useAuthContext();
  const router = useRouter();

  useEffect(() => {
    if (user) {
      router.push("/home");
    } else {
      router.push("/login");
    }
  }, [user, router]);

  return (
    <Fragment>
        { user ? <div>Redirecting...</div> : null }
    </Fragment>
  );
}

export default PagesRoot;