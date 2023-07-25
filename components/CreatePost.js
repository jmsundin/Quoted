import { Fragment, useState, useEffect, useRef } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { v4 } from "uuid";

import {
  collection,
  getDoc,
  doc,
  setDoc,
  Timestamp,
  updateDoc,
} from "firebase/firestore";
import { getDownloadURL, ref } from "firebase/storage";
import MyFirebase from "@/lib/firebase/MyFirebase";
import { useAuthContext } from "@/lib/context/AuthContext";

import { MdAccountCircle } from "react-icons/md";

function CreatePost() {
  const { user } = useAuthContext();
  const router = useRouter();

  const [userData, setUserData] = useState({});
  const [profilePhotoUrl, setProfilePhotoUrl] = useState(user.profilePhotoUrl);
  const [post, setPost] = useState({
    content: "",
    authorId: user.uid || "",
    authorName: user.displayName || "",
    authorPhotoUrl: user.profilePhotoUrl || "",
    createdAt: Timestamp.fromDate(new Date()),
    updatedAt: Timestamp.fromDate(new Date()),
  });

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
        const authorName = userDoc.data().displayName;
        const authorPhotoUrl = userDoc.data().profilePhotoUrl;
        setUserData((prev) => {
          return {
            ...prev,
            ...userDoc.data(),
            authorPhotoUrl: authorPhotoUrl,
          };
        });
        setPost((prev) => {
          return {
            ...prev,
            authorName,
          };
        });
        setProfilePhotoUrl(userDoc.data().profilePhotoUrl);
      } catch (e) {
        console.error(e);
      }
    };
    getUserData();
  }, [user.uid, user.displayName, user.profilePhotoUrl]);

  const handleInputChange = (e) => {
    e.target.style.height = "auto";
    e.target.style.height = e.target.scrollHeight + "px";

    setPost({
      ...post,
      content: e.target.value,
    });
  };

  async function onSubmitHandler(e) {
    e.preventDefault();
    if (post.content.trim() === "") return;
    const postId = v4();
    try {
      const postRef = doc(MyFirebase.db, "posts", postId);
      await setDoc(postRef, post);
      const postDoc = await getDoc(postRef);
      if (postDoc.data()) {
        router.push("/home");
      } else {
        console.log("No such document!");
      }
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <Fragment>
      <div className="flex flex-row pt-3 mt-20 mb-4 px-3 w-full mx-auto">
        {profilePhotoUrl ? (
          <Image
            src={profilePhotoUrl}
            width={40}
            height={40}
            className="flex w-20 h-20 rounded-full object-cover text-blue-500"
            alt="Profile Photo"
          />
        ) : (
          <MdAccountCircle className="flex basis-auto w-20 h-20 rounded-full object-cover text-blue-500" />
        )}
        <div className="flex items-center ml-2">
          <span className="font-black">{userData.displayName}</span>
        </div>
      </div>
      <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
        <form onSubmit={onSubmitHandler}>
          <div className="flex flex-wrap">
            <textarea
              id="content"
              name="content"
              value={post.content}
              placeholder="Quote to post..."
              className="w-full resize-none border border-gray-300 rounded p-2"
              rows={10}
              onChange={handleInputChange}
            />
          </div>
          <div className="flex flex-wrap mt-2 fixed right-3">
            <button
              type="submit"
              className="inline-block rounded-lg bg-blue-300 px-10 py-2 
      shadow-[0_4px_9px_-4px_#3b71ca] 
      transition duration-150 ease-in-out hover:bg-blue-400 
      hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] "
            >
              Post
            </button>
          </div>
        </form>
      </div>
    </Fragment>
  );
}

export default CreatePost;
