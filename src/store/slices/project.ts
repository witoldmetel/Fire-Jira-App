import { createSelector, createSlice } from '@reduxjs/toolkit';

import { RootState, ProjectState } from '../types';

const initialState: ProjectState = {
  isAuthenticated: false,
  isInitialized: false,
  isLoading: false,
  isError: false,
  errorMessage: null,
  user: null
};

const slice = createSlice({
  name: 'project',
  initialState,
  reducers: {}
});

// Reducer
export default slice.reducer;
