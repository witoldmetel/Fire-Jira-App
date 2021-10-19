import React, { FC, ReactElement } from 'react';
import { configureStore } from '@reduxjs/toolkit';
import { render, RenderOptions } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';

import { rootReducer as reducer } from '../store/rootReducer';

const Wrapper: FC = ({ preloadedState = {}, store = configureStore({ reducer, preloadedState }), children } = {}) => {
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
