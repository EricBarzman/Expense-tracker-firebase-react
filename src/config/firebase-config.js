// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAWtTlvSPxcIgkhOUxiuhfuPrB9c3BX7KU",
  authDomain: "expense-tracker-85152.firebaseapp.com",
  projectId: "expense-tracker-85152",
  storageBucket: "expense-tracker-85152.appspot.com",
  messagingSenderId: "549736913175",
  appId: "1:549736913175:web:a2319b5db4eadaf3da7f52"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app);

// firebase login
// firebase init
// firebase deploy