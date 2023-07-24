"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { MdAccountCircle } from "react-icons/md";
import { useRouter } from "next/navigation";

import { useAuthContext } from "@/lib/context/AuthContext";

function Post(props) {
  const router = useRouter();
  const { user } = useAuthContext();
  const [postData, setPostData] = useState({ ...props });
  const [postCreatedDate, setPostCreatedDate] = useState("");
  const [postCreatedTime, setPostCreatedTime] = useState("");

  useEffect(() => {
    const date = postData.createdAt.toDate();
    const formattedDate = date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
    const formattedTime = date.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "numeric",
    });

    setPostCreatedDate(formattedDate);
    setPostCreatedTime(formattedTime);
  }, [postData.createdAt]);

  return (
    <article className="flex flex-row flex-auto rounded-xl border-2 border-gray-100 bg-white p-2 gap-1 m-2">
      <div className="flex-none flex-col items-center basis-10 shrink-0">
        {postData.authorPhotoUrl ? (
          <Image
            alt="Profile Picture"
            width={40}
            height={40}
            src={postData.authorPhotoUrl}
            className="w-10 h-10 rounded-full object-cover"
          />
        ) : (
          <MdAccountCircle className="h-10 w-10 rounded-full object-cover text-blue-500" />
        )}
      </div>
      <div className="flex flex-col flex-auto flex-wrap">
        <div className="flex flex-row text-left sm:flex sm:items-center sm:gap-2">
          <div className="flex flex-auto text-left ml-2 font-medium hover:text-gray-700">
            <span className="w-full">{postData.authorName}</span>
          </div>
          <div className="flex flex-auto text-right text-gray-500 text-xs ml-2 mr-2 sm:text-sm">
            <span className="w-full">
              {postCreatedDate} at {postCreatedTime}
            </span>
          </div>
        </div>
        <div className="flex flex-auto flex-row text-left mt-2 ml-2 sm:flex sm:items-center sm:gap-2">
          <p className="flex flex-wrap text-sm text-gray-700">
            {postData.content}
          </p>
        </div>
      </div>
    </article>
  );
}

export default Post;
