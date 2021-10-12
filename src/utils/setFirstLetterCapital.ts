import { startCase, camelCase } from 'lodash';

export const setFirstLetterCapital = (string: string) => startCase(camelCase(string));
