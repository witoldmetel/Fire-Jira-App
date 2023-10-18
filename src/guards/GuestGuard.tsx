import { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'src/store/store';

import { PATH_DASHBOARD } from '../routes/paths';
import { getAuthState } from '../store/slices/auth';

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
