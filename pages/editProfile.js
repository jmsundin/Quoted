"use client";

import Head from "next/head";

import EditProfile from "@/components/EditProfile";
import { Fragment } from "react";

import MainNavigation from "@/components/layout/main-navigation";
import CreatePostButton from "@/components/ui/CreatePostButton";

function EditProfilePage() {
  return (
    <Fragment>
      <Head>
        <title>Quoted | Profile</title>
        <meta name="description" content="Quoted Profile Page" />
      </Head>
      <MainNavigation />
      <EditProfile />

      <CreatePostButton />
    </Fragment>
  );
}

export default EditProfilePage;
