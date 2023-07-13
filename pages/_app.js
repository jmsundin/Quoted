import "./globals.css";
import { AuthContextProvider } from "@/context/AuthContext";
import { usePathname } from "next/navigation";
import ProtectRoute from "@/components/ProtectedRoute";

const noAuthRoutes = ["/", "/auth/login", "/auth/signup"];

function MyApp({ Component, pageProps }) {
  const pathname = usePathname();

  return (
    <AuthContextProvider>
      {noAuthRoutes.includes(pathname) ? (
        <Component {...pageProps} />
      ) : (
        <ProtectRoute>
          <Component {...pageProps} />
        </ProtectRoute>
      )}
    </AuthContextProvider>
  );
}

export default MyApp;
