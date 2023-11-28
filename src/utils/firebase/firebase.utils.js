import { initializeApp } from "firebase/app"; // config firebase 
import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword
} from "firebase/auth"; // config firebase 
import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore"; // config firestore

const firebaseConfig = { // config firebase 
  apiKey: "AIzaSyD9hqk-H_pX2FTUffMDYXrNeT4IntIWZrU",
  authDomain: "crwn-clothing-db-71acc.firebaseapp.com",
  projectId: "crwn-clothing-db-71acc",
  storageBucket: "crwn-clothing-db-71acc.appspot.com",
  messagingSenderId: "830825014296",
  appId: "1:830825014296:web:df1924b9f2439edd1d4f6d",
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig); // config firebase 
const googleProvider = new GoogleAuthProvider();

googleProvider.setCustomParameters({
  prompt: "select_account",
});

export const auth = getAuth(); // config firebase 
export const signInWithGooglePopup = () => signInWithPopup(auth, googleProvider);
export const signInWithGoogleRedirect = () => signInWithRedirect(auth, googleProvider)

// config firestore
export const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth, additionalInformation = {}) => {
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
        displayName, email, createdAt, ...additionalInformation
      });
    } catch (error) {
        console.log(('error creating the user', error.message))
      }
    }
    return userDocRef;
  };

  export const createAuthUserWithEmailAndPassword = async (email, password) => {
    if(!email || !password) return;
    return await createUserWithEmailAndPassword(auth, email, password)
  }