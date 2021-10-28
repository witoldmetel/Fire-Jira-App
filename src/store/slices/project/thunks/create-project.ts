import { createAsyncThunk } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';
import { getFirestore, doc, setDoc } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

import { CreateProjectBuilderState, Project } from '../../../types';

export const createProject = createAsyncThunk<
  unknown,
  Project,
  {
    rejectValue: { errorMessage: string };
  }
>('project/createProject', async (project, { rejectWithValue }) => {
  const db = getFirestore();
  const auth = getAuth();

  try {
    await setDoc(doc(db, 'projects', uuidv4()), {
      ...project,
      key: project.key.toUpperCase(),
      leaderId: auth.currentUser?.uid,
      members: []
    });
  } catch (error) {
    return rejectWithValue({ errorMessage: 'Failed to create project' });
  }
});

export const createProjectBuilder: CreateProjectBuilderState = (builder) => {
  builder.addCase(createProject.pending, (state) => {
    state.isLoading = true;
  });
  builder.addCase(createProject.fulfilled, (state) => {
    state.isLoading = false;
    state.isSuccess = true;
  });
  builder.addCase(createProject.rejected, (state, { payload }) => {
    state.isLoading = false;
    state.isError = true;
    state.errorMessage = payload?.errorMessage;
  });
};
