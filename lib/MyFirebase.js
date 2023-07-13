import firebase from "firebase/compat/app";
import { initializeApp } from "firebase/app";
import { getAuth, updateProfile } from "firebase/auth";
import { getFirestore, collection, getDocs } from "firebase/firestore/lite";

class MyFirebase {
  constructor() {
    if (firebase.apps.length === 0) {
      this.app = initializeApp(MyFirebase.firebaseConfig);
      this.auth = getAuth();
    } else {
      this.app = firebase.app();
      this.auth = getAuth();
    }
    console.log("auth: ", this.auth);
   
    // this.currentUser = this.auth.currentUser;
    // this.db = getFirestore(this.app);
  }

  static firebaseConfig = {
    apiKey: process.env.API_KEY,
    authDomain: process.env.AUTH_DOMAIN,
    databaseURL: process.env.DATABASE_URL,
    projectId: process.env.PROJECT_ID,
    storageBucket: process.env.STORAGE_BUCKET,
    messagingSenderId: process.env.MESSAGING_SENDER_ID,
    appId: process.env.APP_ID,
    measurementId: process.env.MEASUREMENT_ID,
  };

  static app = this.app;
  static auth = this.auth;

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
