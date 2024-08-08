// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore, collection, getDocs } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC_NCS5UgqhvvCCHKnLFtkpZm96UpIzqFA",
  authDomain: "scholar-e0f4d.firebaseapp.com",
  projectId: "scholar-e0f4d",
  storageBucket: "scholar-e0f4d.appspot.com",
  messagingSenderId: "855162252714",
  appId: "1:855162252714:web:7fd00f5244842ecc1ccfd3",
  measurementId: "G-BR0TGZ8EVQ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)
// const analytics = getAnalytics(app);