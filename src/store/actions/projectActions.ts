import {
  GET_PROJECTS,
  GET_PROJECT,
  CREATE_PROJECT,
  PROJECT_ERROR,
  ASSIGN_MEMBERS,
  REMOVE_MEMBER
} from '../../fixtures/constants';
import { Project, User } from '../../fixtures/types';

export const getProjects = (latestProjects?: Project[]) => {
  const latestData = latestProjects ? latestProjects[latestProjects.length - 1].projectName : 0;

  return (dispatch, getState, { getFirestore }) => {
    const firestore = getFirestore();

    firestore
      .collection('projects')
      .orderBy('projectName')
      .startAfter(latestData)
      .limit(16)
      .get()
      .then((snapshot) => {
        const projects: Project[] = latestProjects ?? [];

        snapshot.docs.forEach((doc) => projects.push({ ...doc.data(), id: doc.id } as Project));

        dispatch({ type: GET_PROJECTS, payload: projects });
      })
      .catch((error) => dispatch({ type: PROJECT_ERROR, payload: error }));
  };
};

export const getProject = (projectId: string) => {
  return (dispatch, getState, { getFirestore }) => {
    const firestore = getFirestore();

    firestore
      .collection('projects')
      .doc(projectId)
      .get()
      .then((snapshot) => {
        const project = snapshot.doc.data();

        dispatch({ type: GET_PROJECT, payload: { ...project, id: snapshot.doc.data().id } });
      })
      .catch((error) => dispatch({ type: PROJECT_ERROR, payload: error }));
  };
};

export const createProject = (project: Project, callback: () => void) => {
  return (dispatch, getState, { getFirestore }) => {
    const firestore = getFirestore();

    const profile = getState().firebase.profile;
    const authorId = getState().firebase.auth.uid;

    firestore
      .collection('projects')
      .add({
        ...project,
        author: profile.username,
        authorId,
        members: [{ id: authorId, username: profile.username }]
      })
      .then(() => {
        dispatch({ type: CREATE_PROJECT });
        callback();
      })
      .catch((error) => dispatch({ type: PROJECT_ERROR, payload: error }));
  };
};

export const assignMembers = (project: Project, projectId: string, members: User[]) => {
  return (dispatch, getState, { getFirestore }) => {
    const firestore = getFirestore();

    firestore
      .collection('projects')
      .doc(projectId)
      .update({ ...project, members: project.members?.concat(...members) })
      .then(() => {
        dispatch({ type: ASSIGN_MEMBERS });
      });
  };
};

export const removeMember = (project: Project, projectId: string, memberId: string) => {
  return (dispatch, getState, { getFirestore }) => {
    const firestore = getFirestore();

    firestore
      .collection('projects')
      .doc(projectId)
      .update({ ...project, members: project.members?.filter((member) => member.id !== memberId) })
      .then(() => {
        dispatch({ type: REMOVE_MEMBER, memberId });
      });
  };
};
