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
    apiKey: process.env.apiKey,
    authDomain: process.env.authDomain,
    databaseURL: process.env.databaseURL,
    projectId: process.env.projectId,
    storageBucket: process.env.storageBucket,
    messagingSenderId: process.env.messagingSenderId,
    appId: process.env.appId,
    measurementId: process.env.messagingSenderId,
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