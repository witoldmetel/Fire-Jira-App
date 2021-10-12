import { Suspense, lazy } from 'react';
import { Navigate, useRoutes } from 'react-router-dom';

import { CircularProgress } from '@mui/material';

import { MainLayout } from '../core/layouts/main-layout';
import { PATH_PAGE } from './paths';

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
const UnknownPage = Loadable(lazy(() => import('../pages/UnknownPage')));
const LandingPage = Loadable(lazy(() => import('../pages/LandingPage')));

export function Router() {
  return useRoutes([
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
    { path: '*', element: <Navigate to={PATH_PAGE.page404} replace /> }
  ]);
}
