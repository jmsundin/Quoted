"use client";

import { useState, useEffect } from "react";

import { usePathname } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import Dropdown from "../Dropdown";

import { useAuthContext } from "@/lib/context/AuthContext";
import MyFirebase from "@/lib/firebase/MyFirebase";
import { collection, doc, getDoc } from "firebase/firestore";

import Logo from "./Logo";
import { MdAccountCircle } from "react-icons/md";

function MainNavigation() {
  const { user } = useAuthContext();
  const pathname = usePathname();

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
    };
    getUserData();
  }, [user.uid]);

  return (
    <header className="bg-gray-100">
      <div className="flex flex-row relative w-full items-center justify-between gap-4 mx-auto max-w-screen-xl px-4 py-4 sm:px-6 lg:px-8">
        <div className="flex-initial place-content-start gap-4">
          <Logo />
        </div>
        {pathname === "/home" ? (
          <Link
            href="/create-post"
            className="flex-auto grid justify-items-end invisible sm:visible"
          >
            <button
              type="button"
              className="inline-block rounded-full bg-green-300 px-5 py-3 
      shadow-[0_4px_9px_-4px_#3b71ca] 
      transition duration-150 ease-in-out hover:bg-green-400 
      hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] "
            >
              Create Post
            </button>
          </Link>
        ) : null}

        <div className="flex place-content-end items-center gap-4">
          <Link href="/profile" className="shrink-0 flex">
            <span className="sr-only">Profile picture</span>
            {user.profilePhotoUrl ? (
              <Image
                src={user.profilePhotoUrl}
                width={40}
                height={40}
                className="flex w-12 h-12 rounded-full object-cover text-blue-500"
                alt="Profile Photo"
              />
            ) : (
              <MdAccountCircle className="h-12 w-12 rounded-full object-cover text-blue-500" />
            )}
          </Link>
          <Dropdown />
        </div>
      </div>
    </header>
  );
}

export default MainNavigation;
