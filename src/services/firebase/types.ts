import { UserCredential } from 'firebase/auth';

export type FirebaseContextType = {
  sendConfirmationEmail: () => Promise<void>;
  login: (email: string, password: string, remember: boolean, callback?: () => void) => Promise<void | UserCredential>;
  loginWithGoogle: (callback: () => void) => Promise<void>;
  register: (email: string, password: string, callback: () => void) => Promise<void>;
  logout: (callback: () => void) => Promise<void>;
  resetPassword: (email: string, callback: () => void) => Promise<void>;
};
