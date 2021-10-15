import { configureStore } from '@reduxjs/toolkit';
import { useDispatch as useReduxDispatch } from 'react-redux';

import { rootReducer } from './rootReducer';
import { AppDispatch } from './types';

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
      immutableCheck: false
    })
});

const { dispatch } = store;

const useDispatch = () => useReduxDispatch<AppDispatch>();

export { store, dispatch, useDispatch };
