import { Fragment } from "react";

import Head from "next/head";
import MainNavigation from "@/components/layout/main-navigation";
import CreatePost from "@/components/CreatePost";

function CreatePostPage(props) {
  return (
    <Fragment>
      <Head>
        <title>Quoted | Create Post</title>
        <meta name="description" content="Quoted Create Post" />
      </Head>
      <MainNavigation />
      <CreatePost />
    </Fragment>
  );
}

export default CreatePostPage;
