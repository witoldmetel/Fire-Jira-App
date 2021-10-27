import { FirebaseError } from 'firebase/app';

import { store } from './store';

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

type AuthUser = null | Record<string, any>;

export type AuthState = {
  isAuthenticated: boolean;
  isInitialized: boolean;
  isLoading: boolean;
  isError: boolean;
  errorMessage: FirebaseError | null;
  user: AuthUser;
};

export type ProjectState = {};
