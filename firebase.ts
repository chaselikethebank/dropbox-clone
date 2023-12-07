import { getApp, getApps, initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyD5_pGf7Uc_6k7cBsmzc2TBK_utSvYquNA",
  authDomain: "drop-bucket-cf27c.firebaseapp.com",
  projectId: "drop-bucket-cf27c",
  storageBucket: "drop-bucket-cf27c.appspot.com",
  messagingSenderId: "212773469418",
  appId: "1:212773469418:web:7984bf97f05fc679f82b93"
};

//   singleton pattern
  const app = getApps().length ? getApp() : initializeApp(firebaseConfig);

  const db = getFirestore();
  const storage = getStorage();

  export { db, storage }