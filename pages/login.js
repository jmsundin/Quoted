"use client";
import { Fragment } from "react";
import Head from "next/head";
import LoginForm from "@/components/auth/LoginForm";

function LoginPage() {
  return (
    <Fragment>
      <Head>
        <title>Quoted | Login</title>
        <meta name="description" content="Quoted Login Page" />
      </Head>
      <LoginForm />
    </Fragment>
  );
}

export default LoginPage;
