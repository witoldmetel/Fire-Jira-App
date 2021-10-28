import { createAsyncThunk } from '@reduxjs/toolkit';
import { getFirestore, collection, getDocs } from 'firebase/firestore';

import { FetchProjectsBuilderState, Project } from '../../../types';

export const fetchProjects = createAsyncThunk<
  Project[],
  undefined,
  {
    rejectValue: { errorMessage: string };
  }
>('project/fetchProjects', async (_, { rejectWithValue }) => {
  const db = getFirestore();

  try {
    const querySnapshot = await getDocs(collection(db, 'projects'));
    const projects: Project[] = [];

    querySnapshot.forEach((snapshot) => {
      projects.push(snapshot.data() as Project);
    });

    return projects;
  } catch (error) {
    return rejectWithValue({ errorMessage: 'Failed to get projects' });
  }
});

export const fetchProjectsBuilder: FetchProjectsBuilderState = (builder) => {
  builder.addCase(fetchProjects.pending, (state) => {
    state.isLoading = true;
  });
  builder.addCase(fetchProjects.fulfilled, (state, { payload }) => {
    state.isLoading = false;
    state.projects = payload;
  });
  builder.addCase(fetchProjects.rejected, (state, { payload }) => {
    state.isLoading = false;
    state.isError = true;
    state.errorMessage = payload?.errorMessage;
  });
};
