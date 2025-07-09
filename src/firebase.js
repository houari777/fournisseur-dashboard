// firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// 🔁 Remplace ces valeurs par les tiennes
const firebaseConfig = {
    apiKey: "AIzaSyCNHtSCxDM3y7h6m9Nkj_PUJxk4Bqg8FfU",
    authDomain: "vision-camion.firebaseapp.com",
    projectId: "vision-camion",
    storageBucket: "vision-camion.firebasestorage.app",
    messagingSenderId: "933686008258",
    appId: "1:933686008258:web:bf03d273fdafb9f506de5b",
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);   // ✅ ici
export const auth = getAuth(app);
