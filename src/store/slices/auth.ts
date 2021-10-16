import { createSelector, createSlice } from '@reduxjs/toolkit';

import { RootState, AuthState } from '../types';

const initialState: AuthState = {
  isAuthenticated: false,
  isInitialized: false,
  isLoading: false,
  isError: false,
  errorMessage: null,
  user: null
};

const slice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setInitState(state) {
      state.isLoading = false;
      state.isError = false;
      state.errorMessage = null;
    },

    startLoading(state) {
      state.isLoading = true;
    },

    hasError(state, action) {
      state.isLoading = false;
      state.isError = true;
      state.errorMessage = action.payload;
    },

    getUserSuccess(state, action) {
      state.isLoading = false;
      state.isError = false;
      state.errorMessage = null;
      state.isInitialized = true;
      state.isAuthenticated = true;
      state.user = action.payload;
    },

    getUserReject(state) {
      state.isLoading = false;
      state.isInitialized = true;
      state.isAuthenticated = false;
      state.user = null;
    }
  }
});

// Reducer
export default slice.reducer;

// Actions
export const { setInitState, startLoading, hasError, getUserSuccess, getUserReject } = slice.actions;

// Selectors
const getState = (state: RootState) => state;

export const getAuthState = createSelector([getState], (state) => state.auth);
