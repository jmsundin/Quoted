import { Fragment } from "react";
import Head from "next/head";

// import UserPosts from "@/components/posts/user-posts";
// import { getUserPosts } from "@/lib/db";

import MainNavigation from "@/components/layout/main-navigation";

function HomePage() {
  return (
    <Fragment>
      <Head>
        <title>Quoted | Home</title>
        <meta name="description" content="Quoted Home Page" />
      </Head>
      <MainNavigation />
    </Fragment>
  );
}

// export function getStaticProps() {
//   // const posts = await getUserPosts();
//   // console.log(posts);
//   return {
//     props: {
//       // posts: posts,
//     },
//     revalidate: 60,
//   };
// }

export default HomePage;
