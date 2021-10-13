import { UserCredential } from 'firebase/auth';

import { StateTypes } from 'src/constants';

type ActionMap<M extends { [index: string]: any }> = {
  [Key in keyof M]: M[Key] extends undefined
    ? {
        type: Key;
      }
    : {
        type: Key;
        payload: M[Key];
      };
};

type AuthUser = null | Record<string, any>;

export type AuthState = {
  isAuthenticated: boolean;
  isInitialized: boolean;
  user: AuthUser;
};

export type FirebaseContextType = {
  isAuthenticated: boolean;
  isInitialized: boolean;
  user: AuthUser;

  login: (email: string, password: string) => Promise<void | UserCredential>;
  register: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
};

type FirebaseAuthPayload = {
  [StateTypes.INIT]: {
    isAuthenticated: boolean;
    user: AuthUser;
  };
};

export type FirebaseActions = ActionMap<FirebaseAuthPayload>[keyof ActionMap<FirebaseAuthPayload>];
