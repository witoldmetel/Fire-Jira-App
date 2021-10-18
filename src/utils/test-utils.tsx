import React from 'react';
import { configureStore } from '@reduxjs/toolkit';
import { render as rtlRender } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';

import { rootReducer as reducer } from '../store/rootReducer';

export const render = (
  ui,
  { preloadedState = {}, store = configureStore({ reducer, preloadedState }), ...renderOptions } = {}
) => {
  console.log('== preloadedState', preloadedState);

  function Wrapper({ children }) {
    return (
      <Provider store={store}>
        <MemoryRouter>{children}</MemoryRouter>
      </Provider>
    );
  }

  return rtlRender(ui, {
    wrapper: Wrapper,
    ...renderOptions
  });
};

export * from '@testing-library/react';
