"use client";

import React, { useState } from "react";
import Link from "next/link";

import { useRouter } from "next/navigation";
import { useAuthContext } from "@/context/AuthContext";

function Dropdown() {
  const router = useRouter();
  const { user, logout } = useAuthContext();

  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => setIsOpen(!isOpen);

  const handleLogout = async (e) => {
    e.preventDefault();
    try {
      await logout();
      router.push("/auth/login");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="relative">
      <div className="inline-flex items-center overflow-hidden rounded-md border bg-white">
        <Link
          href="#"
          onClick={handleOpen}
          className="border-e px-4 py-2 text-sm/none text-gray-600 hover:bg-gray-50 hover:text-gray-700"
        >
          Settings
        </Link>

        <button
          onClick={handleOpen}
          className="h-full p-2 text-gray-600 hover:bg-gray-50 hover:text-gray-700"
        >
          <span className="sr-only">Menu</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>
      {isOpen && (
        <div
          className="absolute end-0 z-10 mt-2 w-56 divide-y divide-gray-100 rounded-md border border-gray-100 bg-white shadow-lg"
          role="menu"
        >
          <div className="p-2">
            <Link
              href="#"
              className="block rounded-lg px-4 py-2 text-sm text-gray-500 hover:bg-gray-50 hover:text-gray-700"
              role="menuitem"
            >
              Profile
            </Link>
          </div>

          <div className="p-2">
            <form onSubmit={handleLogout}>
              <button
                type="submit"
                className="flex w-full items-center gap-2 rounded-lg px-4 py-2 text-sm text-red-700 hover:bg-red-50"
                role="menuitem"
              >
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
                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                  />
                </svg>
                Logout
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Dropdown;
