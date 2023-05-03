import { initializeApp, getApps, getApp } from "firebase/app"
import { getFirestore } from "firebase/firestore"

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

export { db }
