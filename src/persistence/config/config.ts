// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
export const firebaseConfig = {
  apiKey: "AIzaSyAKUCgutzWYK6IUftgMKLZFGh_Md8eaLIs",
  authDomain: "dashboard-f88c2.firebaseapp.com",
  projectId: "dashboard-f88c2",
  storageBucket: "dashboard-f88c2.firebasestorage.app",
  messagingSenderId: "120274213172",
  appId: "1:120274213172:web:d5950754b6b6d29edd2d61",
  measurementId: "G-Z28MMJCHN8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
