import { ActionReducerMapBuilder } from '@reduxjs/toolkit';
import { FirebaseError } from 'firebase/app';

import { store } from './store';

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

/**
 * AUTH
 */
type AuthUser = null | Record<string, any>;

export type AuthState = {
  isAuthenticated: boolean;
  isInitialized: boolean;
  isLoading: boolean;
  isError: boolean;
  errorMessage: FirebaseError | null;
  user: AuthUser;
};

/**
 * PROJECT
 */
export type ProjectState = {
  isLoading: boolean;
  isSuccess: boolean;
  isError: boolean;

  errorMessage?: string | null;
  projects?: Project[];
};

export type Project = { id: string; name: string; key: string; description?: string };

export type CreateProjectBuilderState = (builder: ActionReducerMapBuilder<ProjectState>) => void;
export type FetchProjectsBuilderState = (builder: ActionReducerMapBuilder<ProjectState>) => void;
