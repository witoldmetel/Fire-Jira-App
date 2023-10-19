import { ReactNode, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';

import { PATH_AUTH } from 'src/routes/paths';
import { useSelector } from 'src/store/store';

import { getAuthState } from '../store/slices/auth';

type AuthGuardProps = {
  children: ReactNode;
};

export function AuthGuard({ children }: AuthGuardProps) {
  const { isAuthenticated, user } = useSelector(getAuthState);
  const { pathname } = useLocation();

  const [requestedLocation, setRequestedLocation] = useState<string | null>(null);

  if (!isAuthenticated) {
    if (pathname !== requestedLocation) {
      setRequestedLocation(pathname);
    }

    return <Navigate to={PATH_AUTH.login} />;
  }

  if (isAuthenticated && !user?.isVerified) {
    return <Navigate to={PATH_AUTH.verify} />;
  }

  if (requestedLocation && pathname !== requestedLocation) {
    setRequestedLocation(null);

    return <Navigate to={requestedLocation} />;
  }

  return <>{children}</>;
}
