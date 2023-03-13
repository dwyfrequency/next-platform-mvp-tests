// Import the functions from the Firebase SDK
import { getApp, getApps, initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import {
  collection,
  getDocs,
  getFirestore,
  limit,
  query,
  where,
} from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

// App's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyAMiCFxC_26ex8ZD3q0zaR7KWMN8tYMZC0',
  authDomain: 'next-platform-mvp-tests.firebaseapp.com',
  projectId: 'next-platform-mvp-tests',
  storageBucket: 'next-platform-mvp-tests.appspot.com',
  messagingSenderId: '753273276081',
  appId: '1:753273276081:web:e035a80beaea16c3ef8490',
};

// Initialize Firebase
const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const firestore = getFirestore(app);
export const storage = getStorage(app);

export const googleAuthProvider = new GoogleAuthProvider();

/**`
 * Gets a users/{uid} document with username
 * @param  {string} username
 */
export async function getUserWithUsername(username: string) {
  const usersRef = collection(firestore, 'users');
  const usersFilter = where('username', '==', username);
  const queryUsers = query(usersRef, usersFilter, limit(1));
  const userDocs = await getDocs(queryUsers);
  return userDocs.docs.at(0);
}
