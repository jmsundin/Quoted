import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { Fragment, useEffect, useState } from "react";
import MyFirebase from "@/lib/firebase/MyFirebase";
import { useAuthContext } from "@/lib/context/AuthContext";
import { useRouter } from "next/navigation";
import Post from "@/components/Post";

function Posts() {
  const router = useRouter();
  const { user } = useAuthContext();
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const unSubsubscribe = onSnapshot(
      query(collection(MyFirebase.db, "posts"), orderBy("createdAt", "desc")),
      (snapshot) => {
        const postList = snapshot.docs.map((doc) => {
          return { ...doc.data(), uid: doc.id };
        });
        setPosts(postList);
      }
    );
    return () => {
      unSubsubscribe();
    };
  }, [user]);

  return (
    <Fragment>
      <div className="flex flex-col">
        <div className="my-2 max-w-[30rem] rm:max-w-[33rem] mx-auto text-base">
          {posts.map((post) => (
            <Post
              onClick={() => router.push(`/post/${post.uid}`)}
              key={post.uid}
              id={post.uid}
              authorId={post.authorId}
              authorName={post.authorName}
              authorPhotoUrl={post.authorPhotoUrl}
              content={post.content}
              createdAt={post.createdAt}
              updatedAt={post.updatedAt}
            />
          ))}
        </div>
      </div>
    </Fragment>
  );
}

export default Posts;
