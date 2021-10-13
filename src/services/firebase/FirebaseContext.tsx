import { createContext, ReactNode, useEffect, useReducer, useState } from 'react';
import { initializeApp, getApps, getApp } from 'firebase/app';
import { getFirestore, DocumentData, doc, getDoc, setDoc, collection } from 'firebase/firestore';
import {
  getAuth,
  signOut,
  setPersistence,
  signInWithEmailAndPassword,
  browserSessionPersistence,
  onAuthStateChanged,
  createUserWithEmailAndPassword
} from 'firebase/auth';

import { AuthState, FirebaseContextType, FirebaseActions } from './types';
import { firebaseConfig } from './firebaseConfig';
import { StateTypes } from 'src/constants';

const ADMIN_EMAILS = ['firejira.com'];

if (getApps().length === 0) {
  initializeApp(firebaseConfig);
} else {
  getApp();
}

const initialState: AuthState = {
  isAuthenticated: false,
  isInitialized: false,
  user: null
};

const reducer = (state: AuthState, action: FirebaseActions) => {
  if (action.type === StateTypes.INIT) {
    const { isAuthenticated, user } = action.payload;

    return {
      ...state,
      isAuthenticated,
      isInitialized: true,
      user
    };
  }

  return state;
};

const FirebaseContext = createContext<FirebaseContextType | null>(null);

function FirebaseProvider({ children }: { children: ReactNode }) {
  const db = getFirestore();

  const [profile, setProfile] = useState<DocumentData | undefined>();
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const auth = getAuth();

    onAuthStateChanged(auth, async (user) => {
      if (user) {
        const userRef = doc(db, 'users', user.uid);
        const userSnap = await getDoc(userRef);

        if (userSnap.exists()) {
          setProfile(userSnap.data());
        } else {
          console.error('No such document!');
        }

        dispatch({
          type: StateTypes.INIT,
          payload: { isAuthenticated: true, user }
        });
      } else {
        dispatch({
          type: StateTypes.INIT,
          payload: { isAuthenticated: false, user: null }
        });
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  const register = (email: string, password: string) => {
    const auth = getAuth();

    return createUserWithEmailAndPassword(auth, email, password)
      .then(async (userCredential) => {
        try {
          await setDoc(doc(db, 'users', userCredential.user.uid), {
            id: userCredential.user.uid,
            email: userCredential.user.email
          });
        } catch (error) {
          console.error('Error adding user: ', error);
        }
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        console.error(errorCode);
        const errorMessage = error.message;
        console.error(errorMessage);
      });
  };

  const login = (email: string, password: string) => {
    const auth = getAuth();

    return setPersistence(auth, browserSessionPersistence)
      .then(() => {
        // Existing and future Auth states are now persisted in the current
        // session only. Closing the window would clear any existing state even
        // if a user forgets to sign out.
        // ...
        // New sign-in will be persisted with session persistence.
        return signInWithEmailAndPassword(auth, email, password);
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        console.error(errorCode);
        const errorMessage = error.message;
        console.error(errorMessage);
      });
  };

  const logout = () => {
    const auth = getAuth();

    return signOut(auth);
  };

  const auth = { ...state.user };

  return (
    <FirebaseContext.Provider
      value={{
        ...state,
        user: {
          id: auth.uid,
          email: auth.email,
          photoURL: auth.photoURL || profile?.photoURL,
          displayName: auth.displayName || profile?.displayName,
          role: ADMIN_EMAILS.includes(auth.email) ? 'admin' : 'user'
        },
        register,
        login,
        logout
      }}
    >
      {children}
    </FirebaseContext.Provider>
  );
}

export { FirebaseContext, FirebaseProvider };
