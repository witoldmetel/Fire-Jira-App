import { Suspense, lazy } from 'react';
import { Navigate, useRoutes } from 'react-router-dom';

import { CircularProgress } from '@mui/material';

import { MainLayout } from '../core/layouts/main-layout';
import { PATH_PAGE, PATH_DASHBOARD } from './paths';
import { GuestGuard } from '../guards/GuestGuard';
import { AuthGuard } from '../guards/AuthGuard';

const Loadable = (Component: React.LazyExoticComponent<() => JSX.Element>) => (props: JSX.IntrinsicAttributes) => {
  return (
    <Suspense fallback={<CircularProgress />}>
      <Component {...props} />
    </Suspense>
  );
};

/**
 * PAGES
 */

// Authentication
const LoginPage = Loadable(lazy(() => import('../pages/LoginPage')));
const RegisterPage = Loadable(lazy(() => import('../pages/RegisterPage')));
const ResetPasswordPage = Loadable(lazy(() => import('../pages/ResetPasswordPage')));

// Main
const UnknownPage = Loadable(lazy(() => import('../pages/UnknownPage')));
const LandingPage = Loadable(lazy(() => import('../pages/LandingPage')));

// Dashboard
const DashboardPage = Loadable(lazy(() => import('../pages/DashboardPage')));

export function Router() {
  return useRoutes([
    /**
     * AUTH
     */
    {
      path: 'auth',
      element: <MainLayout />,
      children: [
        {
          path: 'login',
          element: (
            <GuestGuard>
              <LoginPage />
            </GuestGuard>
          )
        },
        {
          path: 'register',
          element: (
            <GuestGuard>
              <RegisterPage />
            </GuestGuard>
          )
        },
        { path: 'reset-password', element: <ResetPasswordPage /> }
      ]
    },

    /**
     * MAIN
     */
    {
      path: '*',
      element: <MainLayout />,
      children: [
        { path: '404', element: <UnknownPage /> },
        { path: '*', element: <Navigate to={PATH_PAGE.page404} replace /> }
      ]
    },
    {
      path: '/',
      element: <MainLayout />,
      children: [{ path: '/', element: <LandingPage /> }]
    },
    { path: '*', element: <Navigate to={PATH_PAGE.page404} replace /> },

    /**
     * DASHBOARD
     */
    {
      path: 'dashboard',
      element: (
        <AuthGuard>
          <MainLayout />
        </AuthGuard>
      ),
      children: [{ path: PATH_DASHBOARD.root, element: <DashboardPage /> }]
    }
  ]);
}
