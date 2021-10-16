import { UserCredential } from 'firebase/auth';

export type FirebaseContextType = {
  login: (email: string, password: string, remember: boolean, callback: () => void) => Promise<void | UserCredential>;
  register: (email: string, password: string, callback: () => void) => Promise<void>;
  logout: (callback: () => void) => Promise<void>;
  resetPassword: (email: string, callback: () => void) => Promise<void>;
};
