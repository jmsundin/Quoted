import { initializeApp } from "firebase/app";
import { getAuth, updateProfile } from "firebase/auth";
import { getFirestore, collection, getDocs } from "firebase/firestore/lite";


class MyFirebase {
  constructor(config) {
    this.app = initializeApp(config);
    this.auth = getAuth(this.app);
    this.currentUser = this.auth.currentUser;
    this.db = getFirestore(this.app);
  }

  static firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
    measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
  };

  static app = new MyFirebase(MyFirebase.firebaseConfig);
  static auth = MyFirebase.app.auth;
  static currentUser = MyFirebase.app.currentUser;
  static db = MyFirebase.app.db;

  async updateProfile(displayName, photoURL) {
    await updateProfile(this.currentUser, {
      displayName: displayName,
      photoURL: photoURL,
    });
  }

  async getQuotes(db) {
    const quotesCol = collection(db, "quotes");
    const quoteSnapshot = await getDocs(quotesCol);
    const quoteList = quoteSnapshot.docs.map((doc) => doc.data());
    return quoteList;
  }
}

export default MyFirebase;