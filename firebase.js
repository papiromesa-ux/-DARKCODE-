import { initializeApp } from "https://www.gstatic.com/firebasejs/13.0.0/firebase-app.js";
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/13.0.0/firebase-auth.js";
import { getFirestore, doc, getDoc, setDoc, deleteDoc } from "https://www.gstatic.com/firebasejs/13.0.0/firebase-firestore.js";
const firebaseConfig = {
  apiKey: "AIzaSyCJLUtvrmiCuGqFu4_gj5P9vH4kUhDa2yA",
  authDomain: "darkcode-3691d.firebaseapp.com",
  projectId: "darkcode-3691d",
  storageBucket: "darkcode-3691d.firebasestorage.app",
  messagingSenderId: "968623196225",
  appId: "1:968623196225:web:e1d97a0d1bef93c34d9ec0",
  measurementId: "G-Y0L9D69KJ7"
};
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const provider = new GoogleAuthProvider();
export { auth, db, provider, signInWithPopup, signOut, onAuthStateChanged, doc, getDoc, setDoc, deleteDoc };
import { initializeApp } from "https://www.gstatic.com/firebasejs/13.0.0/firebase-app.js";
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/13.0.0/firebase-auth.js";
import { getFirestore, doc, getDoc, setDoc, deleteDoc } from "https://www.gstatic.com/firebasejs/13.0.0/firebase-firestore.js";
const firebaseConfig = {
  apiKey: "AIzaSyCJLUtvrmiCuGqFu4_gj5P9vH4kUhDa2yA",
  authDomain: "darkcode-3691d.firebaseapp.com",
  projectId: "darkcode-3691d",
  storageBucket: "darkcode-3691d.firebasestorage.app",
  messagingSenderId: "968623196225",
  appId: "1:968623196225:web:e1d97a0d1bef93c34d9ec0",
  measurementId: "G-Y0L9D69KJ7"
};
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const provider = new GoogleAuthProvider();
