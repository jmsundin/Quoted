import { Fragment } from "react";

import Head from "next/head";
import MainNavigation from "@/components/layout/main-navigation";
import CreatePostButton from "@/components/ui/CreatePostButton";
import Posts from "@/components/Posts";

function HomePage() {
  return (
    <Fragment>
      <Head>
        <title>Quoted | Home</title>
        <meta name="description" content="Quoted Home Page" />
      </Head>
      <MainNavigation />
      <Posts />
      <CreatePostButton />
    </Fragment>
  );
}

export default HomePage;
