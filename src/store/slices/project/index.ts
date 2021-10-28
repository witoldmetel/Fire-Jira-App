import { createSlice, createSelector } from '@reduxjs/toolkit';

import { RootState, ProjectState } from '../../types';
import { createProjectBuilder } from '../project/thunks/create-project';

const initialState: ProjectState = {
  isLoading: false,
  isSuccess: false,
  isError: false,
  errorMessage: null
};

const slice = createSlice({
  name: 'project',
  initialState,
  reducers: {
    resetState(state) {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.errorMessage = null;
    }
  },
  extraReducers: createProjectBuilder
});

// Reducer
export default slice.reducer;

// Actions
export const { resetState } = slice.actions;

// Selectors
const getState = (state: RootState) => state;

export const getProjectState = createSelector([getState], (state) => state.project);
