import { createContext, ReactNode, useEffect } from 'react';
import { toast } from 'react-toastify';
import { getApp, getApps, initializeApp } from 'firebase/app';
import {
  browserLocalPersistence,
  browserSessionPersistence,
  createUserWithEmailAndPassword,
  getAuth,
  GoogleAuthProvider,
  onAuthStateChanged,
  sendEmailVerification,
  sendPasswordResetEmail,
  setPersistence,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from 'firebase/auth';
import { doc, getDoc, getFirestore, setDoc } from 'firebase/firestore';

import {
  getUserReject,
  getUserSuccess,
  hasError,
  initializeFirebase,
  resetState,
  startLoading,
} from 'src/store/slices/auth';
import { useDispatch } from 'src/store/store';

import { firebaseConfig } from './firebaseConfig';
import { FirebaseContextType } from './types';

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
  const auth = getAuth();

  useEffect(() => {
    if (auth.app) {
      dispatch(initializeFirebase());
    }
  }, [auth, dispatch]);

  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        const userRef = doc(db, 'users', user.uid);
        const userSnap = await getDoc(userRef);

        if (userSnap.exists()) {
          // Update verification status
          if (!userSnap.data().isVerified) {
            await setDoc(doc(db, 'users', user.uid), {
              ...userSnap.data(),
              isVerified: user.emailVerified,
            });
          }

          dispatch(getUserSuccess(userSnap.data()));
        } else {
          dispatch(hasError('User not found!'));
          toast.error('User not found!');
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
      const emailVerificationPromise = sendEmailVerification(auth.currentUser, {
        url: process.env.REACT_APP_CONFIRMATION_EMAIL_REDIRECT ?? '',
      });

      toast.promise(emailVerificationPromise, {
        pending: 'Verification email is sending',
        success: 'Email sent successfully 👌',
        error: 'Email sent rejected 🤯',
      });

      return emailVerificationPromise;
    } else {
      dispatch(hasError('User not found!'));
      dispatch(resetState());
      toast.error('User not found!');
    }
  };

  const register = (email: string, password: string) => {
    dispatch(startLoading());

    const auth = getAuth();

    return createUserWithEmailAndPassword(auth, email, password)
      .then(async (userCredential) => {
        try {
          await setDoc(doc(db, 'users', userCredential.user.uid), {
            id: userCredential.user.uid,
            email: userCredential.user.email,
            isVerified: userCredential.user.emailVerified,
          }).then(async () => {
            const emailVerificationPromise = sendEmailVerification(userCredential.user, {
              url: process.env.REACT_APP_CONFIRMATION_EMAIL_REDIRECT ?? '',
            });

            toast.promise(emailVerificationPromise, {
              pending: 'Verification email is sending',
              success: 'Email sent successfully 👌',
              error: 'Email sent rejected 🤯',
            });

            return emailVerificationPromise;
          });
        } catch (error) {
          dispatch(hasError(error));
          toast.error('Registration failed');
        }
      })
      .catch((error) => {
        dispatch(hasError(error));
        dispatch(resetState());
        toast.error('Registration failed');
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
        const signInEmailPromise = signInWithEmailAndPassword(auth, email, password);

        toast.promise(signInEmailPromise, {
          success: 'You are logged in 👌',
          error: 'Login error 🤯',
        });

        return signInEmailPromise;
      })
      .catch((error) => {
        dispatch(hasError(error));
        dispatch(resetState());
        toast.error('Login error');
      });
  };

  const loginWithGoogle = () => {
    const provider = new GoogleAuthProvider().setCustomParameters({
      display: 'popup',
    });

    const auth = getAuth();

    return signInWithPopup(auth, provider)
      .then(async (result) => {
        try {
          await setDoc(doc(db, 'users', result.user.uid), {
            id: result.user.uid,
            email: result.user.email,
          });

          toast.success('You are logged in 👌');
        } catch (error) {
          dispatch(hasError(error));
          toast.error('Login error');
        }
      })
      .catch((error) => {
        dispatch(hasError(error));
        dispatch(resetState());
        toast.error('Login error');
      });
  };

  const logout = async () => {
    dispatch(startLoading());

    const auth = getAuth();

    await signOut(auth)
      .then(() => {
        toast.success('You have logged out ');
      })
      .catch((error) => {
        dispatch(hasError(error));
        toast.error('Logout error');
      });

    dispatch(resetState());
  };

  const resetPassword = async (email: string, callback?: () => void) => {
    dispatch(startLoading());

    const auth = getAuth();

    await sendPasswordResetEmail(auth, email)
      .then(() => {
        callback?.();
        toast.success('Reset password email wast sent');
      })
      .catch((error) => {
        dispatch(hasError(error));
        toast.error('Password reset error');
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
        resetPassword,
      }}
    >
      {children}
    </FirebaseContext.Provider>
  );
}

export { FirebaseContext, FirebaseProvider };
