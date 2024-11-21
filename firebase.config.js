 import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
 
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_URL,
  authDomain: "dashboard-finance-8b202.firebaseapp.com",
  projectId: "dashboard-finance-8b202",
  storageBucket: "dashboard-finance-8b202.firebasestorage.app",
  messagingSenderId: "36670240514",
  appId: "1:36670240514:web:be07520cb8fd0caad7341b"
};

 
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app)