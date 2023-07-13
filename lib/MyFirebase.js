import firebase from "firebase/compat/app";
import { initializeApp } from "firebase/app";
import { getAuth, updateProfile } from "firebase/auth";

class MyFirebase {
  constructor() {
    if (firebase.apps.length === 0) {
      this.app = initializeApp(MyFirebase.firebaseConfig);
      this.auth = getAuth(this.app);
    } else {
      this.app = firebase.app();
      this.auth = getAuth(this.app);
    }
   
  }

  static firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_AUTH_DOMAIN,
    databaseURL: process.env.NEXT_PUBLIC_DATABASE_URL,
    projectId: process.env.NEXT_PUBLIC_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_APP_ID,
    measurementId: process.env.NEXT_PUBLIC_MEASUREMENT_ID,
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
