import { createAsyncThunk, nanoid } from '@reduxjs/toolkit';
import { getAuth } from 'firebase/auth';
import { doc, getFirestore, setDoc, Timestamp } from 'firebase/firestore';

import { CreateProjectBuilderState, ProjectPayload } from '../../../types';

export const createProject = createAsyncThunk<
  unknown,
  ProjectPayload,
  {
    rejectValue: { errorMessage: string };
  }
>('project/createProject', async (project, { rejectWithValue }) => {
  const db = getFirestore();
  const auth = getAuth();

  const projectId = nanoid();
  const date: Timestamp = Timestamp.now();

  try {
    await setDoc(doc(db, 'projects', projectId), {
      ...project,
      id: projectId,
      key: project.key.toUpperCase(),
      leaderId: auth.currentUser?.uid,
      members: [],
      createdAt: date,
      updatedAt: date,
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
