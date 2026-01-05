// src/lib/firebase.ts
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";


// THAY THẾ BẰNG CONFIG CỦA BẠN (Lấy từ Firebase Console)
const firebaseConfig = {
  apiKey: "AIzaSyAwMcKDhqIHtoXwTqhjcU78YpHBM_3M3Kc",
  authDomain: "nuoi-lcf.firebaseapp.com",
  projectId: "nuoi-lcf",
  storageBucket: "nuoi-lcf.firebasestorage.app",
  messagingSenderId: "653827414356",
  appId: "1:653827414356:web:34fe582592a75323eb50c1",
  measurementId: "G-68KGL095JR"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);