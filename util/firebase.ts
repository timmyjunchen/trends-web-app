import { initializeApp, getApps, getApp } from "firebase/app"
import { getFirestore } from "firebase/firestore"
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

const storage  = getStorage(app) //root reference

const db = getFirestore(app)

export { db, storage }
