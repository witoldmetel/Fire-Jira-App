import { FC, ReactElement } from 'react';
import { configureStore, DeepPartial, Reducer } from '@reduxjs/toolkit';
import { render, RenderOptions } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';

import { rootReducer as reducer } from '../store/rootReducer';
import { RootState } from '../store/types';
import { FirebaseProvider } from '../services/firebase/FirebaseContext';
import { ThemeConfig } from '../core/theme';
import { NotistackProvider } from '../core/components';

type WrapperProps = {
  preloadedState?: DeepPartial<RootState>;
};

const Wrapper: FC<WrapperProps> = ({ preloadedState = {}, children } = {}) => {
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

const customRender = (ui: ReactElement, options?: Omit<RenderOptions, 'wrapper'>) =>
  render(ui, { wrapper: Wrapper, ...options });

export * from '@testing-library/react';
export { customRender as render };
