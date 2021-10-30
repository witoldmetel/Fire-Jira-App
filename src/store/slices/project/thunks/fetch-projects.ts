import { createAsyncThunk } from '@reduxjs/toolkit';
import { getFirestore, getDocs, collection, query, orderBy, startAfter, limit } from 'firebase/firestore';

import { FetchProjectsBuilderState, Project } from '../../../types';

export const fetchProjects = createAsyncThunk<
  Project[],
  boolean | undefined,
  {
    rejectValue: { errorMessage: string };
  }
>('project/fetchProjects', async (isNext = false, { rejectWithValue }) => {
  const db = getFirestore();

  try {
    // const querySnapshot = await getDocs(collection(db, 'projects'));
    const projects: Project[] = [];

    // Query the first page of projects
    const firstProjects = query(collection(db, 'projects'), orderBy('updatedAt', 'desc'), limit(6));
    const projectSnapshots = await getDocs(firstProjects);

    if (isNext) {
      // Get the last visible project
      const lastVisibleProject = projectSnapshots.docs[projectSnapshots.docs.length - 1];

      // Construct a new query starting at this project,
      // get the next 6 projects
      const nextProjects = query(
        collection(db, 'projects'),
        orderBy('updatedAt', 'desc'),
        startAfter(lastVisibleProject),
        limit(6)
      );
      const nextProjectSnapshots = await getDocs(nextProjects);

      nextProjectSnapshots.forEach((snapshot) => {
        projects.push(snapshot.data() as Project);
      });
    } else {
      projectSnapshots.forEach((snapshot) => {
        projects.push(snapshot.data() as Project);
      });
    }

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
