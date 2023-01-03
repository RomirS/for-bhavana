import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBjqzqJJ-iSEr_0GgLJEddCebkeAx4ocKo",
  authDomain: "forbhavana-1f918.firebaseapp.com",
  projectId: "forbhavana-1f918",
  storageBucket: "forbhavana-1f918.appspot.com",
  messagingSenderId: "306001369260",
  appId: "1:306001369260:web:a15a5b1b3aaa9c9d12e709",
};

export const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
