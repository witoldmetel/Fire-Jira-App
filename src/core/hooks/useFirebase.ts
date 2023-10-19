import { useContext } from 'react';

import { FirebaseContext } from 'src/services/firebase/FirebaseContext';

export function useFirebase() {
  const context = useContext(FirebaseContext);

  if (!context) throw new Error('Firebase context must be use inside FirebaseProvider');

  return context;
}
