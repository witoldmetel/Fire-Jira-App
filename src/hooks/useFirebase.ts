import { useContext } from 'react';

import { FirebaseContext } from '../services/firebase/FirebaseContext';

export const useFirebase = () => {
  const context = useContext(FirebaseContext);

  if (!context) throw new Error('Firebase context must be use inside FirebaseProvider');

  return context;
};
