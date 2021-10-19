import { FC, ReactElement } from 'react';
import { configureStore, DeepPartial, Reducer } from '@reduxjs/toolkit';
import { render, RenderOptions } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';

import { rootReducer as reducer } from '../store/rootReducer';
import { RootState } from '../store/types';

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
      <MemoryRouter>{children}</MemoryRouter>
    </Provider>
  );
};

const customRender = (ui: ReactElement, options?: Omit<RenderOptions, 'wrapper'>) =>
  render(ui, { wrapper: Wrapper, ...options });

export * from '@testing-library/react';
export { customRender as render };
