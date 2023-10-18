import { TypedUseSelectorHook, useDispatch as useReduxDispatch, useSelector as useReduxSelector } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';

import { rootReducer } from './rootReducer';
import { AppDispatch, RootState } from './types';

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
      immutableCheck: false,
    }),
});

const { dispatch } = store;

const useDispatch = () => useReduxDispatch<AppDispatch>();
const useSelector: TypedUseSelectorHook<RootState> = useReduxSelector;

export { dispatch, store, useDispatch, useSelector };
