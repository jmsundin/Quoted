import { Fragment, useEffect, useState, useRef } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { MdAccountCircle } from "react-icons/md";
import MyFirebase from "@/lib/firebase/MyFirebase";
import {
  onSnapshot,
  query,
  collection,
  where,
  orderBy,
  doc,
  getDoc,
} from "firebase/firestore";
import { useAuthContext } from "@/lib/context/AuthContext";
import Post from "@/components/Post";

function Profile() {
  const router = useRouter();
  const { user } = useAuthContext();
  const [isLoading, setIsLoading] = useState(true);
  const [posts, setPosts] = useState([]);

  const [userData, setUserData] = useState({});

  useEffect(() => {
    const unSubsubscribe = onSnapshot(
      query(
        collection(MyFirebase.db, "posts"),
        where("authorId", "==", user.uid),
        orderBy("createdAt", "desc")
      ),
      (snapshot) => {
        const postList = snapshot.docs.map((doc) => {
          return {
            ...doc.data(),
            uid: doc.id,
            profilePhotoUrl: user.profilePhotoUrl || "",
          };
        });
        setPosts(postList);
        setIsLoading(false);
      }
    );
    return () => {
      unSubsubscribe();
    };
  }, [user]);

  useEffect(() => {
    const getUserData = async () => {
      const usersCollectionRef = collection(MyFirebase.db, "users");
      const userRef = doc(usersCollectionRef, user.uid);
      let userDoc = null;
      try {
        userDoc = await getDoc(userRef);
      } catch (e) {
        console.error(e);
      }
      try {
        setUserData(userDoc.data());
        user.profilePhotoUrl = userDoc.data().profilePhotoUrl;
        user.profilePhotoPath = userDoc.data().profilePhotoPath;
      } catch (e) {
        console.error(e);
      }
    };
    getUserData();
  }, [user]);

  return (
    <div className="flex flex-col items-center justify-center pt-3 mt-20 mb-4 px-3 w-full mx-auto border-solid border-gray-100 border-2 drop-shadow-sm rounded-lg max-w-[33rem] rm:max-w-[33rem]">
      <div className="flex flex-row justify-between flex-nowrap min-w-full">
        <div className="flex flex-none flex-col -mt-10">
          {!!user.profilePhotoUrl ? (
            <Image
              src={user.profilePhotoUrl}
              width={80}
              height={80}
              className="flex-none w-20 h-20 rounded-full object-cover text-blue-500"
              alt="Profile Photo"
            />
          ) : (
            <MdAccountCircle className="flex basis-auto w-20 h-20 rounded-full object-cover text-blue-500" />
          )}
        </div>
        <div className="flex basis-auto flex-row items-center ml-2">
          <button
            onClick={() => {
              router.push("/editProfile");
            }}
            className="text-base text-black-900 font-bold 
          border border-solid border-gray-500 rounded-full
          px-4 py-1 hover:bg-blue-100 transition duration-300 ease-in-out"
          >
            Edit Profile
          </button>
        </div>
      </div>
      {userData ? (
        <Fragment>
          <div className="flex flex-col items-start w-full text-2xl font-bold">
            <div className="flex flex-row  font-medium">
              {userData.displayName}
            </div>
            <div className="flex flex-row text-sm text-gray-500">
              {userData.email}
            </div>
          </div>
        </Fragment>
      ) : null}

      <section className="flex flex-col justify-between w-full items-center mt-4">
        <div className="flex flex-row w-full">
          <div className="flex mx-auto text-black-500 text-lg font-black">
            My Posts
          </div>
        </div>
        <div className="flex flex-row items-center">
          <div className="flex flex-col gap-4">
            <div className="my-6 max-w-[25rem] rm:max-w-[33rem] mx-auto text-xs sm:text-base">
              {isLoading ? (
                <p>Loading...</p>
              ) : (
                posts.map((post) => (
                  <Post
                    key={post.uid}
                    id={post.uid}
                    authorId={post.authorId}
                    authorName={post.authorName}
                    authorPhotoUrl={post.authorPhotoUrl}
                    content={post.content}
                    createdAt={post.createdAt}
                    updatedAt={post.updatedAt}
                  />
                ))
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Profile;
