"use client";

import { Fragment } from "react";
import Head from "next/head";

import SignupForm from "@/components/auth/SignupForm";

function SignupPage() {
  return (
    <Fragment>
      <Head>
        <title>Quoted | Signup</title>
        <meta name="description" content="Quoted Signup Page" />
      </Head>
      <SignupForm />;
    </Fragment>
  );
}
export default SignupPage;
