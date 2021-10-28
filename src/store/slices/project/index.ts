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
  reducers: {},
  extraReducers: createProjectBuilder
});

// Reducer
export default slice.reducer;

// Selectors
const getState = (state: RootState) => state;

export const getProjectState = createSelector([getState], (state) => state.project);
