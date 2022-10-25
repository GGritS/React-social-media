import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { initializeApp } from "firebase/app";
// Import the functions you need from the SDKs you need

const firebaseConfig = {
  apiKey: "AIzaSyCGWHWpfwda6w1bWiJweK5zD6blCy2NgDY",
  authDomain: "react-social-media-86c4c.firebaseapp.com",
  projectId: "react-social-media-86c4c",
  storageBucket: "react-social-media-86c4c.appspot.com",
  messagingSenderId: "973631763329",
  appId: "1:973631763329:web:3a07ad39c1b02387ee6e80",
  measurementId: "G-C4QQ5PSGFP",
};

export const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore();
