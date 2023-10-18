import { createAsyncThunk } from '@reduxjs/toolkit';
import { collection, getDocs, getFirestore, limit, orderBy, query, startAfter } from 'firebase/firestore';

import { FetchProjectsBuilderState, Project } from '../../../types';

export const fetchProjects = createAsyncThunk<
  { projectCount: number; projects: Project[] },
  number | undefined,
  {
    rejectValue: { errorMessage: string };
  }
>('project/fetchProjects', async (page, { rejectWithValue }) => {
  const db = getFirestore();

  try {
    const projects: Project[] = [];

    // Query for all projects
    const allProjects = await getDocs(query(collection(db, 'projects'), orderBy('updatedAt', 'desc')));

    // Query the first page of projects
    const firstProjects = query(collection(db, 'projects'), orderBy('updatedAt', 'desc'), limit(6));
    const projectSnapshots = await getDocs(firstProjects);

    if (page) {
      // Get the last visible project
      const lastVisibleProject = allProjects.docs[Math.ceil(allProjects.docs.length / 6) * page - 1];

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

    return { projectCount: allProjects.docs.length, projects };
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
    state.projectCount = payload.projectCount;
    state.projects = payload.projects;
  });
  builder.addCase(fetchProjects.rejected, (state, { payload }) => {
    state.isLoading = false;
    state.isError = true;
    state.errorMessage = payload?.errorMessage;
  });
};
