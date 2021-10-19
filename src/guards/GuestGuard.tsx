import { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';

import { getAuthState } from '../store/slices/auth';
import { PATH_DASHBOARD } from '../routes/paths';
import { useSelector } from 'src/store/store';

type GuestGuardProps = {
  children: ReactNode;
};

export function GuestGuard({ children }: GuestGuardProps) {
  const { isAuthenticated } = useSelector(getAuthState);

  if (isAuthenticated) {
    return <Navigate to={PATH_DASHBOARD.root} />;
  }

  return <>{children}</>;
}
