import { Suspense, lazy } from 'react';
import { Navigate, useRoutes, useLocation } from 'react-router-dom';

import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

import { MainLayout } from '../layouts/main-layout';

const Loadable = (Component: any) => (props: any) => {
	const { pathname } = useLocation();
	const isDashboard = pathname.includes('/dashboard');

	return (
		<Suspense
			fallback={
				<Box
					sx={{
						...(!isDashboard && {
							top: 0,
							left: 0,
							width: 1,
							zIndex: 9999,
							position: 'fixed',
						}),
					}}
				>
					<CircularProgress />
				</Box>
			}
		>
			<Component {...props} />
		</Suspense>
	);
};

export function Router() {
	return useRoutes([
		// Main Routes
		{
			path: '/',
			element: <MainLayout />,
			children: [{ element: <LandingPage /> }],
		},
		{ path: '*', element: <Navigate to="/404" replace /> },
	]);
}

// Main
const LandingPage = Loadable(lazy(() => import('../pages/LandingPage')));
