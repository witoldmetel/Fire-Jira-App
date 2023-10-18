import { ReactElement } from 'react';
import { cleanup, render, RenderOptions } from '@testing-library/react';
import { afterEach } from 'vitest';

import { TestWrapper } from './test-wrapper';

afterEach(() => {
  cleanup();
});

function customRender(ui: ReactElement, options?: Omit<RenderOptions, 'wrapper'>) {
  return render(ui, { wrapper: TestWrapper, ...options });
}

// eslint-disable-next-line react-refresh/only-export-components
export * from '@testing-library/react';
export { default as userEvent } from '@testing-library/user-event';
// override render export
export { customRender as render };
