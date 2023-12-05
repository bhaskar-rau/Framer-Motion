import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyBxFRYR-idQ7nYbuoYW61nHRQcisSOhYVY",
  authDomain: "coursegoalsproject.firebaseapp.com",
  projectId: "coursegoalsproject",
  storageBucket: "coursegoalsproject.appspot.com",
  messagingSenderId: "578129642437",
  appId: "1:578129642437:web:7eed2d87a1b3c7425e01ac",
};
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
