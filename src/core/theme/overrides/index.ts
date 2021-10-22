import { merge } from 'lodash';
import { Theme } from '@mui/material/styles';

import { Card } from './Card';

export function ComponentsOverrides(theme: Theme) {
  return merge(Card(theme));
}
