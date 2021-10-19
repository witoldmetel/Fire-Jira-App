import { configureStore } from '@reduxjs/toolkit';
import { useDispatch as useReduxDispatch, useSelector as useReduxSelector, TypedUseSelectorHook } from 'react-redux';

import { rootReducer } from './rootReducer';
import { RootState, AppDispatch } from './types';

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
const useSelector: TypedUseSelectorHook<RootState> = useReduxSelector;

export { store, dispatch, useDispatch, useSelector };
