import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import withFirebaseAuth from "react-with-firebase-auth";

// TODO: Replace with your own Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyBrcF_QrpGxeUb9Jlfmrr4lq-MrDZs8oIM",
  authDomain: "trends-a4-d7c22.firebaseapp.com",
  projectId: "trends-a4-d7c22",
  storageBucket: "trends-a4-d7c22.appspot.com",
  messagingSenderId: "264074739528",
  appId: "1:264074739528:web:8673f081c2e6d5a37b7d7d"
};

const app = getApps().length ? getApp() : initializeApp(firebaseConfig)

const db = getFirestore(app)
const auth = getAuth(app);

const providers = {
  googleProvider: new GoogleAuthProvider(),
};

const createComponentWithAuth = withFirebaseAuth({
  providers,
  firebaseAppAuth: auth,
});

const signInWithGoogle = () => {
  signInWithPopup(auth, providers.googleProvider);
};

const signOutFirebase = () => {
  signOut(auth);
};

export {
  db,
  auth,
  createComponentWithAuth,
  signInWithGoogle,
  signOutFirebase as signOut,
};