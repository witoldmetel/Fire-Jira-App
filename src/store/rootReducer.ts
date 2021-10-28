import { combineReducers } from 'redux';

import authReducer from './slices/auth';
import projectReducer from './slices/project';

export const rootReducer = combineReducers({
  auth: authReducer,
  project: projectReducer
});
