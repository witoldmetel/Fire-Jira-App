import { Outlet } from 'react-router-dom';

import { MainNavbar } from './MainNavbar';
import { MainFooter } from './MainFooter';

export function MainLayout() {
  return (
    <>
      <MainNavbar />

      <div>
        <Outlet />
      </div>

      <MainFooter />
    </>
  );
}
