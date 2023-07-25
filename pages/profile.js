"use client";

import { Fragment } from "react";
import Head from "next/head";
import Profile from "@/components/Profile";

import MainNavigation from "@/components/layout/main-navigation";
import CreatePostButton from "@/components/ui/CreatePostButton";

function ProfilePage() {
  return (
    <Fragment>
      <Head>
        <title>Quoted | Profile</title>
        <meta name="description" content="Quoted Profile Page" />
      </Head>
      <MainNavigation />
      <Profile />
      <CreatePostButton />
    </Fragment>
  );
}

export default ProfilePage;
