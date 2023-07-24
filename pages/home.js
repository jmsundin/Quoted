import { Fragment, useEffect, useState } from "react";

import { useAuthContext } from "@/lib/context/AuthContext";
import MyFirebase from "@/lib/firebase/MyFirebase";
import { collection, getDocs } from "firebase/firestore";

import Head from "next/head";
import Link from "next/link";
import MainNavigation from "@/components/layout/main-navigation";
import CreatePostButton from "@/components/ui/CreatePostButton";
import Posts from "@/components/Posts";

function HomePage() {
  const { user } = useAuthContext();
  const [isLoading, setIsLoading] = useState(true);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    setIsLoading(true);
    async function getPosts() {
      const postsCol = collection(MyFirebase.db, "posts");
      const postsSnapshot = await getDocs(postsCol);
      const postsList = postsSnapshot.docs.map((doc) => doc.data());
      setPosts(postsList);
    }
    getPosts();
    setIsLoading(false);
  }, []);

  return (
    <Fragment>
      <Head>
        <title>Quoted | Home</title>
        <meta name="description" content="Quoted Home Page" />
      </Head>
      <MainNavigation />
      {isLoading && <p>Loading...</p>}
      <Posts />
      <Link href="/create-post" className="fixed bottom-0 right-0 m-2 visible sm:invisible">
        <CreatePostButton />
      </Link>
    </Fragment>
  );
}

export default HomePage;
