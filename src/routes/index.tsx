import { lazy, Suspense } from 'react';
import { Navigate, useRoutes } from 'react-router-dom';

import { LoadingPage } from '../core/components';
import { DashboardLayout } from '../core/layouts/dashboard-layout';
import { LogoLayout } from '../core/layouts/logo-layout';
import { MainLayout } from '../core/layouts/main-layout';
import { AuthGuard } from '../guards/AuthGuard';
import { GuestGuard } from '../guards/GuestGuard';

import { PATH_DASHBOARD, PATH_PAGE } from './paths';

const Loadable = (Component: React.LazyExoticComponent<() => JSX.Element>) => (props: JSX.IntrinsicAttributes) => {
  return (
    <Suspense fallback={<LoadingPage />}>
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
const VerifyPage = Loadable(lazy(() => import('../pages/VerifyPage')));

// Main
const UnknownPage = Loadable(lazy(() => import('../pages/UnknownPage')));
const LandingPage = Loadable(lazy(() => import('../pages/LandingPage')));
const AboutMePage = Loadable(lazy(() => import('../pages/AboutMePage')));
const ContactMePage = Loadable(lazy(() => import('../pages/ContactMePage')));

// Dashboard
const DashboardPage = Loadable(lazy(() => import('../pages/DashboardPage')));
const NewProjectPage = Loadable(lazy(() => import('../pages/NewProjectPage')));

export function Router() {
  return useRoutes([
    /**
     * AUTH
     */
    {
      path: 'auth',
      element: <LogoLayout />,
      children: [
        {
          path: 'login',
          element: (
            <GuestGuard>
              <LoginPage />
            </GuestGuard>
          ),
        },
        {
          path: 'register',
          element: (
            <GuestGuard>
              <RegisterPage />
            </GuestGuard>
          ),
        },
        { path: 'reset-password', element: <ResetPasswordPage /> },
        { path: 'verify', element: <VerifyPage /> },
      ],
    },

    /**
     * MAIN
     */
    {
      path: '*',
      element: <LogoLayout />,
      children: [
        { path: '404', element: <UnknownPage /> },
        { path: '*', element: <Navigate to={PATH_PAGE.page404} replace /> },
      ],
    },
    {
      path: '/',
      element: <MainLayout />,
      children: [
        { path: '/', element: <LandingPage /> },
        { path: 'about-me', element: <AboutMePage /> },
        { path: 'contact-me', element: <ContactMePage /> },
      ],
    },
    { path: '*', element: <Navigate to={PATH_PAGE.page404} replace /> },

    /**
     * DASHBOARD
     */
    {
      path: 'dashboard',
      element: (
        <AuthGuard>
          <DashboardLayout />
        </AuthGuard>
      ),
      children: [
        { path: PATH_DASHBOARD.root, element: <DashboardPage /> },
        { path: PATH_DASHBOARD.newProject, element: <NewProjectPage /> },
      ],
    },
  ]);
}
