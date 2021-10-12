import { useContext } from 'react';

import { FirebaseContext } from '../services/firebase/FirebaseContext';

export const useAuth = () => {
  const context = useContext(FirebaseContext);

  if (!context) throw new Error('Auth context must be use inside AuthProvider');

  return context;
};
