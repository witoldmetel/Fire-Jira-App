import { useState, ReactNode } from 'react';
import { Navigate, useLocation } from 'react-router-dom';

import { AuthLayout } from 'src/core/layouts/auth-layout';
import { getAuthState } from '../store/slices/auth';
import LoginPage from 'src/pages/LoginPage';
import VerifyPage from 'src/pages/VerifyPage';
import { useSelector } from 'src/store/store';

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

    return (
      <AuthLayout>
        <LoginPage />
      </AuthLayout>
    );
  }

  if (isAuthenticated && !user?.isVerified) {
    return (
      <AuthLayout>
        <VerifyPage />
      </AuthLayout>
    );
  }

  if (requestedLocation && pathname !== requestedLocation) {
    setRequestedLocation(null);

    return <Navigate to={requestedLocation} />;
  }

  return <>{children}</>;
}
