import { Suspense, lazy } from 'react';
import { Navigate, useRoutes } from 'react-router-dom';

import CircularProgress from '@mui/material/CircularProgress';

import { MainLayout } from '../core/layouts/main-layout';

const Loadable = (Component: React.LazyExoticComponent<() => JSX.Element>) => (props: JSX.IntrinsicAttributes) => {
  return (
    <Suspense fallback={<CircularProgress />}>
      <Component {...props} />
    </Suspense>
  );
};

// Pages
const UnknownPage = Loadable(lazy(() => import('../pages/UnknownPage')));
const LandingPage = Loadable(lazy(() => import('../pages/LandingPage')));

export function Router() {
  return useRoutes([
    {
      path: '*',
      element: <MainLayout />,
      children: [
        { path: '404', element: <UnknownPage /> },
        { path: '*', element: <Navigate to="/404" replace /> }
      ]
    },
    {
      path: '/',
      element: <MainLayout />,
      children: [{ path: '/', element: <LandingPage /> }]
    },
    { path: '*', element: <Navigate to="/404" replace /> }
  ]);
}
