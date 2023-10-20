import { UserCredential } from 'firebase/auth';

export type FirebaseContextType = {
  sendConfirmationEmail: () => Promise<void>;
  login: (email: string, password: string, remember: boolean) => Promise<void | UserCredential>;
  loginWithGoogle: () => Promise<void>;
  register: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  resetPassword: (email: string, callback?: VoidFunction) => Promise<void>;
};
