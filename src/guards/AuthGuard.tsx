import { useState, ReactNode } from 'react';
import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';

import { AuthLayout } from 'src/core/layouts/auth-layout';
import { getAuthState } from '../store/slices/auth';
import LoginPage from 'src/pages/LoginPage';
import VerifyPage from 'src/pages/VerifyPage';

type AuthGuardProps = {
  children: ReactNode;
};

export function AuthGuard({ children }: AuthGuardProps) {
  const { isAuthenticated, isVerified } = useSelector(getAuthState);
  const { pathname } = useLocation();
  const [requestedLocation, setRequestedLocation] = useState<string | null>(null);

  if (!isAuthenticated) {
    if (pathname !== requestedLocation) {
      setRequestedLocation(pathname);
    }

    return <LoginPage />;
  }

  if (isAuthenticated && !isVerified) {
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
