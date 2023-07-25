"use client";

import { createContext, useContext, useEffect, useState } from "react";

import {
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";

import { doc, setDoc, Timestamp, getDoc } from "firebase/firestore";

import MyFirebase from "@/lib/firebase/MyFirebase";

export const AuthContext = createContext(null);

function AuthContextProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(MyFirebase.auth, (user) => {
      if (user) {
        setUser({
          uid: user.uid,
          email: user.email,
          displayName: user.displayName,
          photoUrl: user.photoURL,
          profilePhotoUrl: "",
          profilePhotoPath: "",
          jwt: user.getIdTokenResult(),
        });
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const signup = async (firstName, lastName, email, password) => {
    try {
      const userCredentials = await createUserWithEmailAndPassword(
        MyFirebase.auth,
        email,
        password
      );
      const user = userCredentials.user;
      const userDoc = await uploadUserDocument(
        user,
        firstName,
        lastName,
        email
      );
      setUser((prevState) => ({
        ...prevState,
        ...userDoc.data(),
      }));
      return userDoc;
    } catch (error) {
      console.log(error);
      if (error.code === "auth/email-already-in-use") {
        alert("Email already in use");
      } else if (error.code === "auth/invalid-email") {
        alert("Invalid email");
      } else if (error.code === "auth/weak-password") {
        alert("Weak password");
      }
      console.log(error);
    }
  };

  const login = async (email, password) => {
    try {
      const userCredentials = await signInWithEmailAndPassword(
        MyFirebase.auth,
        email,
        password
      );
      const user = userCredentials.user;
      const userDoc = await getUserDocument(user);
      setUser((prevState) => ({
        ...prevState,
        ...user,
        ...userDoc,
      }));
      return userDoc;
    } catch (error) {
      console.log(error);
    }
  };

  const logout = async () => {
    setUser(null);
    try {
      await signOut(MyFirebase.auth);
    } catch (error) {
      console.log(error);
    }
  };

  async function getUserDocument(user) {
    const userDocRef = doc(MyFirebase.db, "users", user.uid);
    const userDoc = await getDoc(userDocRef);
    return userDoc;
  }

  async function uploadUserDocument(user, firstName, lastName, email) {
    let userDoc = null;
    try {
      const userDocRef = doc(MyFirebase.db, "users", user.uid);
      const userData = {
        firstName: firstName,
        lastName: lastName,
        email: email,
        displayName: `${firstName} ${lastName}`,
        profilePhotoUrl: "",
        profilePhotoPath: "",
        createdAt: Timestamp.fromDate(new Date()),
        updatedAt: Timestamp.fromDate(new Date()),
      };
      await setDoc(userDocRef, userData, { merge: true });
      userDoc = await getDoc(userDocRef);
      setUser((prevState) => ({
        ...prevState,
        ...userDoc,
      }));
    } catch (error) {
      console.log(error);
    }
    return userDoc;
  }

  return (
    <AuthContext.Provider value={{ user, login, signup, logout }}>
      {loading ? null : children}
    </AuthContext.Provider>
  );
}

const useAuthContext = () => useContext(AuthContext);

export { AuthContextProvider, useAuthContext };
