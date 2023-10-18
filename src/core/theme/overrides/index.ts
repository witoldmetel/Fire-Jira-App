import { Theme } from '@mui/material/styles';
import { merge } from 'lodash';

import { Card } from './Card';

export function ComponentsOverrides(theme: Theme) {
  return merge(Card(theme));
}
