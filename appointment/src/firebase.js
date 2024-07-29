// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDAtwMnVfNWXIKVseteY436jMtgNL6_buM",
  authDomain: "appointment-booking-syst-1c4da.firebaseapp.com",
  projectId: "appointment-booking-syst-1c4da",
  storageBucket: "appointment-booking-syst-1c4da.appspot.com",
  messagingSenderId: "753201730867",
  appId: "1:753201730867:web:38503a77b089568a3a9a46",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const imgDB = getStorage(app)
export const txtDB = getFirestore(app);
