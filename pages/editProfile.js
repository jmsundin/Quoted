"use client";

import Head from "next/head";
import MainNavigation from "@/components/layout/main-navigation";
import EditProfile from "@/components/EditProfile";
import { Fragment } from "react";

function EditProfilePage() {
  return (
    <Fragment>
      <Head>
        <title>Quoted | Profile</title>
        <meta name="description" content="Quoted Profile Page" />
      </Head>
      <MainNavigation />
      <EditProfile />
    </Fragment>
  );
}

export default EditProfilePage;
