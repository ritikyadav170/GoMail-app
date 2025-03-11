import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyBDRGd7KgqFpp1jGFRpYg9AJBHIxRUDIDw",
  authDomain: "gomail-e5b76.firebaseapp.com",
  projectId: "gomail-e5b76",
  storageBucket: "gomail-e5b76.firebasestorage.app",
  messagingSenderId: "505328455455",
  appId: "1:505328455455:web:6b08775aee0d0393d0ea2a",
  measurementId: "G-82E7V6S5ZZ"
};



const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const db = getFirestore(app); 
export const provider = new GoogleAuthProvider();