import { Theme } from '@mui/material/styles';
import { merge } from 'lodash';

import { Card } from './Card';

const rootElement = document.getElementById('root');

export function ComponentsOverrides(theme: Theme) {
  return {
    ...merge(Card(theme)),
    /**
     * target container for Portal-related elements so that they are injected under the main app wrapper
     * that was used in step 3 for setting up the important option in the Tailwind config.
     */
    MuiPopover: {
      defaultProps: {
        container: rootElement,
      },
    },
    MuiPopper: {
      defaultProps: {
        container: rootElement,
      },
    },
    MuiDialog: {
      defaultProps: {
        container: rootElement,
      },
    },
    MuiModal: {
      defaultProps: {
        container: rootElement,
      },
    },
  };
}
