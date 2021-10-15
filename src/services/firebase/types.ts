import { UserCredential } from 'firebase/auth';

export type FirebaseContextType = {
  login: (email: string, password: string, remember: boolean) => Promise<void | UserCredential>;
  register: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
};
