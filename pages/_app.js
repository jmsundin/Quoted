import Head from "next/head";

import { AuthContextProvider } from "@/context/AuthContext";
import { usePathname } from "next/navigation";
import ProtectRoute from "@/components/auth/ProtectedRoute";

import Layout from "@/components/layout/Layout";
import "../styles/globals.css";

const noAuthRoutes = ["/", "/login", "/signup"];

function MyApp({ Component, pageProps }) {
  const pathname = usePathname();

  return (
    <AuthContextProvider>
      {noAuthRoutes.includes(pathname) ? (
        <Layout>
          <Component {...pageProps} />
        </Layout>
      ) : (
        <ProtectRoute>
          <Component {...pageProps} />
        </ProtectRoute>
      )}
    </AuthContextProvider>
  );
}

export default MyApp;
