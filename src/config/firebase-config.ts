// Import the functions you need from the SDKs you need
import { getApp, getApps, initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
export const firebaseConfig = {
  apiKey: "AIzaSyCfw5iIVGyWBukoAEykDL0WiuZWm87CPmE",
  authDomain: "bims-fadb8.firebaseapp.com",
  projectId: "bims-fadb8",
  storageBucket: "bims-fadb8.appspot.com",
  messagingSenderId: "671378068893",
  appId: "1:671378068893:web:8e81c9dd0d964cddb1cb74"
};

// Initialize Firebase
export const app = !getApps().length ? initializeApp(firebaseConfig): getApp();

export const auth = getAuth(app)
export const db = getFirestore(app);
export const storage = getStorage(app);
