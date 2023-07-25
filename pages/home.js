import { Fragment } from "react";

import Head from "next/head";
import Link from "next/link";
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
      <Link
        href="/create-post"
        className="fixed bottom-0 right-0 m-2 visible sm:invisible"
      >
        <CreatePostButton />
      </Link>
    </Fragment>
  );
}

export default HomePage;
