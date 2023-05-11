import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import withFirebaseAuth from "react-with-firebase-auth";
import { getStorage } from "firebase/storage";

// TODO: Replace with your own Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyAl3-2hmPKQqkl7B64_hwV6uYgszSx_KZo",
  authDomain: "trendsfinal-webapp.firebaseapp.com",
  projectId: "trendsfinal-webapp",
  storageBucket: "trendsfinal-webapp.appspot.com",
  messagingSenderId: "752095364924",
  appId: "1:752095364924:web:c03150567540ce0a99c039"
};

const app = getApps().length ? getApp() : initializeApp(firebaseConfig)

const storage = getStorage(app) //root reference

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