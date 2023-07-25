"use client";

import { Fragment } from "react";
import Head from "next/head";
import Profile from "@/components/Profile";

import MainNavigation from "@/components/layout/main-navigation";

function ProfilePage() {
  return (
    <Fragment>
      <Head>
        <title>Quoted | Profile</title>
        <meta name="description" content="Quoted Profile Page" />
      </Head>
      <MainNavigation />
      <Profile />
    </Fragment>
  );
}

export default ProfilePage;
