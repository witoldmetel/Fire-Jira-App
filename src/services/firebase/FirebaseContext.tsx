import { createContext, ReactNode, useEffect, useReducer, useState } from 'react';
import { initializeApp } from 'firebase/app';
import { getFirestore, DocumentData } from 'firebase/firestore';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

import { AuthState, FirebaseContextType, FirebaseActions } from './types';
import { firebaseConfig } from './firebaseConfig';
import { StateTypes } from 'src/constants';

const ADMIN_EMAILS = ['firejira.com'];

//@todo: add conditon for check if init is already done
initializeApp(firebaseConfig);

const db = getFirestore();

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
  const [profile, setProfile] = useState<DocumentData | undefined>();
  const [state, dispatch] = useReducer(reducer, initialState);

  // useEffect(
  //   () =>
  //     firebase.auth().onAuthStateChanged((user) => {
  //       if (user) {
  //         const docRef = firebase.firestore().collection('users').doc(user.uid);
  //         docRef
  //           .get()
  //           .then((doc) => {
  //             if (doc.exists) {
  //               setProfile(doc.data());
  //             }
  //           })
  //           .catch((error) => {
  //             console.error(error);
  //           });

  //         dispatch({
  //           type: StateTypes.INIT,
  //           payload: { isAuthenticated: true, user }
  //         });
  //       } else {
  //         dispatch({
  //           type: StateTypes.INIT,
  //           payload: { isAuthenticated: false, user: null }
  //         });
  //       }
  //     }),
  //   [dispatch]
  // );

  // const login = (email: string, password: string) => firebase.auth().signInWithEmailAndPassword(email, password);

  // const loginWithGoogle = () => {
  //   const provider = new firebase.auth.GoogleAuthProvider();
  //   return firebase.auth().signInWithPopup(provider);
  // };

  // const loginWithFaceBook = () => {
  //   const provider = new firebase.auth.FacebookAuthProvider();
  //   return firebase.auth().signInWithPopup(provider);
  // };

  // const register = (email: string, password: string, firstName: string, lastName: string) =>
  //   firebase
  //     .auth()
  //     .createUserWithEmailAndPassword(email, password)
  //     .then((res) => {
  //       firebase
  //         .firestore()
  //         .collection('users')
  //         .doc(res.user?.uid)
  //         .set({
  //           uid: res.user?.uid,
  //           email,
  //           displayName: `${firstName} ${lastName}`
  //         });
  //     });

  // const logout = async () => {
  //   await firebase.auth().signOut();
  // };

  // const resetPassword = async (email: string) => {
  //   await firebase.auth().sendPasswordResetEmail(email);
  // };

  const auth = { ...state.user };

  return (
    <FirebaseContext.Provider
      value={{
        ...state,
        method: 'firebase',
        user: {
          id: auth.uid,
          email: auth.email,
          photoURL: auth.photoURL || profile?.photoURL,
          displayName: auth.displayName || profile?.displayName,
          role: ADMIN_EMAILS.includes(auth.email) ? 'admin' : 'user',
          phoneNumber: auth.phoneNumber || profile?.phoneNumber || '',
          country: profile?.country || '',
          address: profile?.address || '',
          state: profile?.state || '',
          city: profile?.city || '',
          zipCode: profile?.zipCode || '',
          about: profile?.about || '',
          isPublic: profile?.isPublic || false
        },
        // login,
        // register,
        // loginWithGoogle,
        // loginWithFaceBook,
        // logout,
        // resetPassword,
        updateProfile: () => {}
      }}
    >
      {children}
    </FirebaseContext.Provider>
  );
}

export { FirebaseContext, FirebaseProvider };
