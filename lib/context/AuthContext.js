"use client";

import { createContext, useContext, useEffect, useState } from "react";

import {
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";

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
        });
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const signup = async (email, password) => {
    try {
      const userCredentials = await createUserWithEmailAndPassword(
        MyFirebase.auth,
        email,
        password
      );
      const user = userCredentials.user;
      setUser(user);
      return user;
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
      console.log(userCredentials);
      const user = userCredentials.user;
      console.log(user);
      setUser(user);
      return user;
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

  return (
    <AuthContext.Provider value={{ user, login, signup, logout }}>
      {loading ? null : children}
    </AuthContext.Provider>
  );
}

const useAuthContext = () => useContext(AuthContext);

export { AuthContextProvider, useAuthContext };
