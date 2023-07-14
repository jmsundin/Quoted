"use client";

import React, { useState, useEffect } from "react";
import { useAuthContext } from "@/context/AuthContext";

import { useRouter } from "next/navigation";
import Profile from "@/components/Profile";

import MainNavigation from "@/components/layout/main-navigation";

function ProfilePage() {
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
      <MainNavigation />
      <Profile user={user}/>
    </React.Fragment>
  );
}

export default ProfilePage;
