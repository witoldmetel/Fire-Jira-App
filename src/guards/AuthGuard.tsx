import { useState, ReactNode } from 'react';
import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';

import { CircularProgress } from '@mui/material';

import { getAuthState } from '../store/slices/auth';

type AuthGuardProps = {
  children: ReactNode;
};

export function AuthGuard({ children }: AuthGuardProps) {
  const { isAuthenticated } = useSelector(getAuthState);
  const { pathname } = useLocation();
  const [requestedLocation, setRequestedLocation] = useState<string | null>(null);

  if (!isAuthenticated) {
    if (pathname !== requestedLocation) {
      setRequestedLocation(pathname);
    }

    return <CircularProgress />;
  }

  if (requestedLocation && pathname !== requestedLocation) {
    setRequestedLocation(null);

    return <Navigate to={requestedLocation} />;
  }

  return <>{children}</>;
}
