// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC1_hl5vlZwDEE62c4zDz_-Q_7pXR8z4mc",
  authDomain: "basic-firebase-fd4a1.firebaseapp.com",
  projectId: "basic-firebase-fd4a1",
  storageBucket: "basic-firebase-fd4a1.appspot.com",
  messagingSenderId: "45890388850",
  appId: "1:45890388850:web:35ed0a3d73510b2eac53eb",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
