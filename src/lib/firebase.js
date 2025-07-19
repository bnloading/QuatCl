import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {
  getFirestore,
  collection,
  query,
  orderBy,
  onSnapshot,
} from "firebase/firestore";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCJ70kalyLpcLqrUEONR1leIGzMVHmmlfc",
  authDomain: "quatcl-2552a.firebaseapp.com",
  databaseURL: "https://quatcl-2552a-default-rtdb.firebaseio.com",
  projectId: "quatcl-2552a",
  storageBucket: "quatcl-2552a.firebasestorage.app",
  messagingSenderId: "528327145000",
  appId: "1:528327145000:web:041d0bac5245a101e3e71d",
  measurementId: "G-LH7GNE3VLQ",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const db = getFirestore(app);

// Add this function to handle real-time comments subscription
export const subscribeToComments = (callback) => {
  const q = query(
    collection(db, "gallery-comments"),
    orderBy("timestamp", "desc")
  );

  return onSnapshot(q, (snapshot) => {
    const comments = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    callback(comments);
  });
};
