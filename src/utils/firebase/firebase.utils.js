import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore"; // config firestore

const firebaseConfig = {
  apiKey: "AIzaSyD9hqk-H_pX2FTUffMDYXrNeT4IntIWZrU",
  authDomain: "crwn-clothing-db-71acc.firebaseapp.com",
  projectId: "crwn-clothing-db-71acc",
  storageBucket: "crwn-clothing-db-71acc.appspot.com",
  messagingSenderId: "830825014296",
  appId: "1:830825014296:web:df1924b9f2439edd1d4f6d",
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const provider = new GoogleAuthProvider();

provider.setCustomParameters({
  prompt: "select_account",
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

// config firestore
export const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth) => {
  const userDocRef = doc(db, "users", userAuth.uid);

  console.log(userDocRef);

  const userSnapshot = await getDoc(userDocRef);
  console.log(userSnapshot);
  console.log(userSnapshot.exists());

  if(!userSnapshot.exists()) {
    const {displayName, email} = userAuth;
    const createdAt = new Date();

    try {
      await setDoc(userDocRef, {
        displayName, email, createdAt
      });
    } catch (error) {
        console.log(('error creating the user', error.message))
      }
    }
    return userDocRef;
  };
