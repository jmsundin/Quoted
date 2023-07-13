'use client';

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";

import { useAuthContext } from "@/context/AuthContext";

function QuoteCard() {
  const router = useRouter();
  const { user, logout } = useAuthContext();

  return (
    <article className="rounded-xl border-2 border-gray-100 bg-white">
      <div className="flex items-start gap-4 p-4 sm:p-6 lg:p-8">
        <Link href="#" className="block shrink-0">
          <Image
            alt="Profile picture"
            width="56"
            height="56"
            src="/default-profile-icon.png"
            className="h-14 w-14 rounded-lg object-cover"
          />
        </Link>

        <div>
          <h3 className="font-medium sm:text-lg">
            <Link href="#" className="hover:underline">
              Some amazing title!
            </Link>
          </h3>

          <p className="line-clamp-2 text-sm text-gray-700">
            Some amazing quote!
          </p>

          <div className="mt-2 sm:flex sm:items-center sm:gap-2">
            <div className="flex items-center gap-1 text-gray-500">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z"
                />
              </svg>

              <p className="text-xs">14 comments</p>
            </div>

            <span className="hidden sm:block" aria-hidden="true">
              &middot;
            </span>

            <p className="hidden sm:block sm:text-xs sm:text-gray-500">
              Posted by
              <Link
                href="#"
                className="font-medium underline hover:text-gray-700"
              >
                John
              </Link>
            </p>
          </div>
        </div>
      </div>
    </article>
  );
}

export default QuoteCard;
