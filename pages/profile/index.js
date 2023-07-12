"use client";

import React, { useState, useEffect } from "react";
import { useAuthContext } from "@/context/AuthContext";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";

function Profile() {
  const router = useRouter();
  const { user, signup } = useAuthContext();
  const [userData, setUserData] = useState({
    firstName: "",
    lastName: "",
    userName: "",
    email: "",
    password: "",
    passwordConfirmation: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <React.Fragment>
      <div className="bg-white">
        <div className="lg:grid lg:min-h-screen lg:grid-cols-12">
          <section className="relative flex h-32 items-end bg-gray-900 lg:col-span-5 lg:h-full xl:col-span-6">
            <div className="hidden lg:relative lg:block lg:p-12">
              <Link className="block text-white" href=""></Link>
            </div>
          </section>
        </div>
      </div>
    </React.Fragment>
  );
}

export default Profile;
