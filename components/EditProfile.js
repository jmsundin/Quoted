import { useState, useEffect, useRef } from "react";
import Image from "next/image";

import MyFirebase from "../lib/firebase/MyFirebase";
import {
  doc,
  getDoc,
  getDocs,
  collection,
  query,
  where,
  updateDoc,
  Timestamp,
} from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { useAuthContext } from "@/lib/context/AuthContext";
import { useRouter } from "next/navigation";
import { MdAccountCircle } from "react-icons/md";

const EditProfile = () => {
  const router = useRouter();
  const { user } = useAuthContext();
  const [userData, setUserData] = useState({});

  const [imageUpload, setImageUpload] = useState({});
  const [imageUploadName, setImageUploadName] = useState("");
  const [imageUploadPreview, setImageUploadPreview] = useState("");

  const fileInputRef = useRef(null);

  const firstNameDivRef = useRef(null);
  const firstNameInputRef = useRef(null);

  const lastNameDivRef = useRef(null);
  const lastNameInputRef = useRef(null);

  const displayNameDivRef = useRef(null);
  const displayNameInputRef = useRef(null);

  const emailDivRef = useRef(null);
  const emailInputRef = useRef(null);

  const passwordDivRef = useRef(null);
  const passwordInputRef = useRef(null);

  const passwordConfirmationDivRef = useRef(null);
  const passwordConfirmationInputRef = useRef(null);

  useEffect(() => {
    const getUserData = async () => {
      const usersCollectionRef = collection(MyFirebase.db, "users");
      const userRef = doc(usersCollectionRef, user.uid);
      const userDoc = await getDoc(userRef);
      const userData = userDoc.data();
      try {
        firstNameInputRef.current.value = userData.firstName;
        lastNameInputRef.current.value = userData.lastName;
        displayNameInputRef.current.value = userData.displayName;
        emailInputRef.current.value = userData.email;
        setUserData((prev) => {
          return { ...prev, ...userData };
        });
      } catch (e) {
        console.error(e);
      }
      try {
        user.profilePhotoUrl = userData.profilePhotoUrl;
      } catch (e) {
        console.error(e);
      }
    };
    getUserData();
  }, [user]);

  const addRingFocus = (e) => {
    e.target.parentElement.classList.add("ring-2", "ring-blue-500");
  };

  const removeRingFocus = (e) => {
    e.target.parentElement.classList.remove("ring-2", "ring-blue-500");
  };

  const handlePhotoUploadClick = (e) => {
    fileInputRef.current.click();
  };

  const handlePhotoPreview = (e) => {
    e.preventDefault();
    const imageUpload = e.target.files[0];
    if (!imageUpload) return;

    setImageUploadPreview(URL.createObjectURL(imageUpload));
    setImageUpload(imageUpload);
    setImageUploadName(imageUpload.name);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name === "fileInput") {
      handlePhotoPreview(e);
      setUserData((prevState) => ({
        ...prevState,
        profilePhotoUrl: value,
      }));
    } else if (name === "firstName") {
      firstNameInputRef.current.value = value;
      setUserData((prevState) => ({
        ...prevState,
        firstName: value,
      }));
    } else if (name === "lastName") {
      lastNameInputRef.current.value = value;
      setUserData((prevState) => ({
        ...prevState,
        lastName: value,
      }));
    } else if (name === "displayName") {
      displayNameInputRef.current.value = value;
      setUserData((prevState) => ({
        ...prevState,
        displayName: value,
      }));
    } else if (name === "email") {
      emailInputRef.current.value = value;
      setUserData((prevState) => ({
        ...prevState,
        email: value,
      }));
    } else if (name === "password") {
      passwordInputRef.current.value = value;
      setUserData((prevState) => ({
        ...prevState,
        password: value,
      }));
    } else if (name === "passwordConfirmation") {
      passwordConfirmationInputRef.current.value = value;
      setUserData((prevState) => ({
        ...prevState,
        passwordConfirmation: value,
      }));
    }
  };

  const handleSaveProfileChanges = async (e) => {
    e.preventDefault();

    const updateUserProfile = async () => {
      const userDoc = {};
      try {
        const profilePhotoRef = ref(
          MyFirebase.storage,
          `images/${user.uid}/${imageUploadName}`
        );
        var snapshot = await uploadBytes(profilePhotoRef, imageUpload);
        var url = await getDownloadURL(snapshot.ref);
        user.profilePhotoUrl = url;
        user.profilePhotoPath = snapshot.ref.fullPath;
      } catch (e) {
        console.log(e);
      }
      try {
        userDoc.profilePhotoUrl = url;
        userDoc.profilePhotoPath = snapshot.ref.fullPath;
        userDoc.firstName = userData.firstName;
        userDoc.lastName = userData.lastName;
        userDoc.displayName = userData.displayName;
        userDoc.email = userData.email;
        userDoc.updatedAt = Timestamp.now();

        const userRef = doc(MyFirebase.db, "users", user.uid);
        await updateDoc(userRef, userDoc);
        router.push("/profile");
      } catch (e) {
        console.error(e);
      }
    };
    updateUserProfile();

    const updatePostInfo = async () => {
      try {
        const postCollection = collection(MyFirebase.db, "posts");
        const postQuery = query(
          postCollection,
          where("authorId", "==", user.uid)
        );
        const postSnapshot = await getDocs(postQuery);
        postSnapshot.forEach(async (document) => {
          const postRef = doc(MyFirebase.db, "posts", document.id);
          await updateDoc(postRef, {
            authorName: userData.displayName,
            authorPhotoUrl: userData.profilePhotoUrl,
            updateAt: Timestamp.now(),
          });
        });
      } catch (e) {
        console.error(e);
      }
    };
    updatePostInfo();

    if (userData.password !== userData.passwordConfirmation) {
      // alert("Passwords do not match");
      return;
    }
  };

  return (
    <div className="flex flex-col mx-auto pt-3 mt-3 mb-4 px-3 w-full sm:w-4/5 md:w-2/3 lg:w-1/2 xl:1/5">
      <h1 className="font-black text-xl mb-3">Edit Profile</h1>
      <form onSubmit={handleSaveProfileChanges}>
        <div className="flex flex-row justify-between flex-nowrap w-full">
          <div className="relative flex flex-col w-20 h-20 -mt-2">
            { !!user.profilePhotoUrl || !!imageUploadPreview ? (
              <Image
                src={imageUploadPreview || user.profilePhotoUrl}
                width={100}
                height={100}
                alt="Profile Photo"
                className="rounded-full overflow-hidden object-cover"
              />
            ) : (
              <MdAccountCircle className="w-20 h-20 rounded-full object-cover text-blue-500" />
            )}
            <svg
              onClick={handlePhotoUploadClick}
              viewBox="0 0 24 24"
              aria-hidden="true"
              className="absolute top-1/2 left-1/2 w-10 h-10 fill-white bg-gray-700 rounded-full p-2 hover:cursor-pointer hover:bg-gray-400"
            >
              <g>
                <path d="M9.697 3H11v2h-.697l-3 2H5c-.276 0-.5.224-.5.5v11c0 .276.224.5.5.5h14c.276 0 .5-.224.5-.5V10h2v8.5c0 1.381-1.119 2.5-2.5 2.5H5c-1.381 0-2.5-1.119-2.5-2.5v-11C2.5 6.119 3.619 5 5 5h1.697l3-2zM12 10.5c-1.105 0-2 .895-2 2s.895 2 2 2 2-.895 2-2-.895-2-2-2zm-4 2c0-2.209 1.791-4 4-4s4 1.791 4 4-1.791 4-4 4-4-1.791-4-4zM17 2c0 1.657-1.343 3-3 3v1c1.657 0 3 1.343 3 3h1c0-1.657 1.343-3 3-3V5c-1.657 0-3-1.343-3-3h-1z"></path>
              </g>
            </svg>
            <input
              type="file"
              id="fileInput"
              name="fileInput"
              ref={fileInputRef}
              onChange={handleInputChange}
              className="hidden"
            />
          </div>
        </div>
        <div className="flex flex-col my-4 w-full">
          <div
            ref={firstNameDivRef}
            className="cursor-text flex flex-col p-2 bg-gray-50 border border-gray-700 rounded-lg"
          >
            <label
              htmlFor="firstName"
              className="mb-2 text-base font-medium text-gray-900"
            >
              First name
            </label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              ref={firstNameInputRef}
              onFocus={addRingFocus}
              onBlur={removeRingFocus}
              onChange={handleInputChange}
              className="text-gray-900 text-sm w-full p-2.5 outline-none"
              placeholder="John"
            />
          </div>
          <div
            ref={lastNameDivRef}
            className="flex flex-col p-2 my-2 bg-gray-50 border border-gray-700 rounded-lg"
          >
            <label
              htmlFor="lastName"
              className="mb-2 text-sm font-medium text-gray-900"
            >
              Last name
            </label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              ref={lastNameInputRef}
              onFocus={addRingFocus}
              onBlur={removeRingFocus}
              onChange={handleInputChange}
              className="bg-gray-50 text-gray-900 text-sm rounded-lg outline-none p-2"
              placeholder="Doe"
            />
          </div>
          <div
            ref={displayNameDivRef}
            className="flex flex-col p-2 my-2 bg-gray-50 border border-gray-700 rounded-lg"
          >
            <label
              htmlFor="display_name"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Display Name
            </label>
            <input
              type="text"
              id="displayName"
              name="displayName"
              ref={displayNameInputRef}
              onFocus={addRingFocus}
              onBlur={removeRingFocus}
              onChange={handleInputChange}
              className="bg-gray-50 text-gray-900 text-sm rounded-lg p-2 outline-none"
              placeholder="John Doe"
            />
          </div>
          <div
            ref={emailDivRef}
            className="flex flex-col p-2 my-2 bg-gray-50 border border-gray-700 rounded-lg"
          >
            <label
              htmlFor="email"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Email address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              ref={emailInputRef}
              onFocus={addRingFocus}
              onBlur={removeRingFocus}
              onChange={handleInputChange}
              className="p-2 bg-gray-50 text-gray-900 text-sm rounded-lg outine-none"
              placeholder="john.doe@company.com"
            />
          </div>
          <div
            ref={passwordDivRef}
            className="mb-2 flex flex-col p-2 border border-gray-900 rounded-lg"
          >
            <label
              htmlFor="password"
              className="mb-2 text-sm font-medium text-gray-900"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              ref={passwordInputRef}
              onFocus={addRingFocus}
              onBlur={removeRingFocus}
              onChange={handleInputChange}
              className="p-2 bg-gray-50 text-gray-900 text-sm rounded-lg outline-none"
              placeholder="•••••••••"
            />
          </div>
          <div
            ref={passwordConfirmationDivRef}
            className="mb-2 flex flex-col p-2 border border-gray-900 rounded-lg"
          >
            <label
              htmlFor="confirm_password"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Confirm password
            </label>
            <input
              type="password"
              id="passwordConfirmation"
              name="passwordConfirmation"
              ref={passwordConfirmationInputRef}
              onFocus={addRingFocus}
              onBlur={removeRingFocus}
              onChange={handleInputChange}
              className="p-2 bg-gray-50 text-gray-900 text-sm rounded-lg outline-none"
              placeholder="•••••••••"
            />
          </div>
          <button
            type="submit"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditProfile;
