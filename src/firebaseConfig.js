import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: "e-commerce-ce747.firebaseapp.com",
  projectId: "e-commerce-ce747",
  storageBucket: "e-commerce-ce747.appspot.com",
  messagingSenderId: "189224880693",
  appId: "1:189224880693:web:20383e532de6884cc07f7c",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

export { auth, googleProvider };
