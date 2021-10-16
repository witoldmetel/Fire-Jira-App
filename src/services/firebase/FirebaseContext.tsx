import { createContext, ReactNode, useEffect } from 'react';
import { initializeApp, getApps, getApp } from 'firebase/app';
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore';
import {
  getAuth,
  signOut,
  setPersistence,
  signInWithEmailAndPassword,
  browserLocalPersistence,
  browserSessionPersistence,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail
} from 'firebase/auth';

import { FirebaseContextType } from './types';
import { firebaseConfig } from './firebaseConfig';
import { dispatch } from 'src/store/store';
import { startLoading, hasError, getUserSuccess, getUserReject } from 'src/store/slices/auth';

// check if firebase app has been initialized previously
// if not, initialize with the config we saved earlier
if (getApps().length === 0) {
  initializeApp(firebaseConfig);
} else {
  getApp();
}

const FirebaseContext = createContext<FirebaseContextType | null>(null);

function FirebaseProvider({ children }: { children: ReactNode }) {
  const db = getFirestore();

  useEffect(() => {
    const auth = getAuth();

    onAuthStateChanged(auth, async (user) => {
      if (user) {
        const userRef = doc(db, 'users', user.uid);
        const userSnap = await getDoc(userRef);

        if (userSnap.exists()) {
          dispatch(getUserSuccess(userSnap.data()));
        } else {
          dispatch(hasError('No such document!'));
        }
      } else {
        dispatch(getUserReject());
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  const register = (email: string, password: string) => {
    dispatch(startLoading());

    const auth = getAuth();

    return createUserWithEmailAndPassword(auth, email, password)
      .then(async (userCredential) => {
        try {
          await setDoc(doc(db, 'users', userCredential.user.uid), {
            id: userCredential.user.uid,
            email: userCredential.user.email
          });
        } catch (error) {
          dispatch(hasError(error));
        }
      })
      .catch((error) => {
        dispatch(hasError(error));
      });
  };

  const login = (email: string, password: string, remember: boolean) => {
    dispatch(startLoading());

    const auth = getAuth();

    return setPersistence(auth, remember ? browserLocalPersistence : browserSessionPersistence)
      .then(() => {
        // Existing and future Auth states are now persisted in the current
        // session only. Closing the window would clear any existing state even
        // if a user forgets to sign out.
        // ...
        // New sign-in will be persisted with session persistence.
        return signInWithEmailAndPassword(auth, email, password);
      })
      .catch((error) => {
        dispatch(hasError(error));
      });
  };

  const logout = (callback: () => void) => {
    dispatch(startLoading());

    const auth = getAuth();

    return signOut(auth)
      .then(() => {
        callback();
      })
      .catch((error) => {
        dispatch(hasError(error));
      });
  };

  const resetPassword = async (email: string, callback: () => void) => {
    dispatch(startLoading());

    const auth = getAuth();

    await sendPasswordResetEmail(auth, email)
      .then(() => {
        callback();
      })
      .catch((error) => {
        dispatch(hasError(error));
      });
  };

  return (
    <FirebaseContext.Provider
      value={{
        register,
        login,
        logout,
        resetPassword
      }}
    >
      {children}
    </FirebaseContext.Provider>
  );
}

export { FirebaseContext, FirebaseProvider };
