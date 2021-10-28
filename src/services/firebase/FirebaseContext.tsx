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
  sendPasswordResetEmail,
  GoogleAuthProvider,
  signInWithPopup,
  sendEmailVerification
} from 'firebase/auth';

import { FirebaseContextType } from './types';
import { firebaseConfig } from './firebaseConfig';
import { useDispatch } from 'src/store/store';
import { resetState, startLoading, hasError, getUserSuccess, getUserReject } from 'src/store/slices/auth';

// check if firebase app has been initialized previously
// if not, initialize with the config we saved earlier
if (getApps().length === 0) {
  initializeApp(firebaseConfig);
} else {
  getApp();
}

const FirebaseContext = createContext<FirebaseContextType | null>(null);

function FirebaseProvider({ children }: { children: ReactNode }) {
  const dispatch = useDispatch();
  const db = getFirestore();

  useEffect(() => {
    const auth = getAuth();

    onAuthStateChanged(auth, async (user) => {
      if (user) {
        const userRef = doc(db, 'users', user.uid);
        const userSnap = await getDoc(userRef);

        if (userSnap.exists()) {
          // Update verification status
          if (!userSnap.data().isVerified) {
            await setDoc(doc(db, 'users', user.uid), {
              ...userSnap.data(),
              isVerified: user.emailVerified
            });
          }

          dispatch(getUserSuccess(userSnap.data()));
        } else {
          dispatch(hasError('User not found!'));
        }
      } else {
        dispatch(getUserReject());
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  /**
   * AUTH
   */
  const sendConfirmationEmail = async () => {
    dispatch(startLoading());

    const auth = getAuth();

    if (auth?.currentUser) {
      return sendEmailVerification(auth.currentUser, {
        url: process.env.REACT_APP_CONFIRMATION_EMAIL_REDIRECT ?? ''
      });
    } else {
      dispatch(hasError('User not found!'));
      dispatch(resetState());
    }
  };

  const register = (email: string, password: string, callback: () => void) => {
    dispatch(startLoading());

    const auth = getAuth();

    return createUserWithEmailAndPassword(auth, email, password)
      .then(async (userCredential) => {
        try {
          await setDoc(doc(db, 'users', userCredential.user.uid), {
            id: userCredential.user.uid,
            email: userCredential.user.email,
            isVerified: userCredential.user.emailVerified
          }).then(async () => {
            sendEmailVerification(userCredential.user, {
              url: process.env.REACT_APP_CONFIRMATION_EMAIL_REDIRECT ?? ''
            });

            callback();
          });
        } catch (error) {
          dispatch(hasError(error));
        }
      })

      .catch((error) => {
        dispatch(hasError(error));
        dispatch(resetState());
      });
  };

  const login = (email: string, password: string, remember: boolean, callback?: () => void) => {
    dispatch(startLoading());

    const auth = getAuth();

    return setPersistence(auth, remember ? browserLocalPersistence : browserSessionPersistence)
      .then(() => {
        // Existing and future Auth states are now persisted in the current
        // session only. Closing the window would clear any existing state even
        // if a user forgets to sign out.
        // ...
        // New sign-in will be persisted with session persistence.
        return signInWithEmailAndPassword(auth, email, password).then(() => callback && callback());
      })
      .catch((error) => {
        dispatch(hasError(error));
        dispatch(resetState());
      });
  };

  const loginWithGoogle = (callback: () => void) => {
    const provider = new GoogleAuthProvider().setCustomParameters({
      display: 'popup'
    });

    const auth = getAuth();

    return signInWithPopup(auth, provider)
      .then(async (result) => {
        try {
          await setDoc(doc(db, 'users', result.user.uid), {
            id: result.user.uid,
            email: result.user.email
          }).then(() => callback());
        } catch (error) {
          dispatch(hasError(error));
        }
      })
      .catch((error) => {
        dispatch(hasError(error));
        dispatch(resetState());
      });
  };

  const logout = async (callback: () => void) => {
    dispatch(startLoading());

    const auth = getAuth();

    await signOut(auth)
      .then(() => {
        callback();
      })
      .catch((error) => {
        dispatch(hasError(error));
      });

    dispatch(resetState());
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

    dispatch(resetState());
  };

  return (
    <FirebaseContext.Provider
      value={{
        sendConfirmationEmail,
        register,
        login,
        loginWithGoogle,
        logout,
        resetPassword
      }}
    >
      {children}
    </FirebaseContext.Provider>
  );
}

export { FirebaseContext, FirebaseProvider };
