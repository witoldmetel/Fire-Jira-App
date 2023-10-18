import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { configureStore, DeepPartial, Reducer } from '@reduxjs/toolkit';

import { NotistackProvider } from '../core/components';
import { ThemeConfig } from '../core/theme';
import { FirebaseProvider } from '../services/firebase/FirebaseContext';
import { rootReducer as reducer } from '../store/rootReducer';
import { RootState } from '../store/types';

type TestWrapperProps = {
  preloadedState?: DeepPartial<RootState>;
  children: React.ReactNode;
};

export const TestWrapper = ({ preloadedState = {}, children }: TestWrapperProps) => {
  const store = configureStore({ reducer, preloadedState } as {
    reducer: Reducer;
    preloadedState: DeepPartial<RootState>;
  });

  return (
    <Provider store={store}>
      <FirebaseProvider>
        <ThemeConfig>
          <NotistackProvider>
            <MemoryRouter>{children}</MemoryRouter>
          </NotistackProvider>
        </ThemeConfig>
      </FirebaseProvider>
    </Provider>
  );
};
