import { Outlet } from 'react-router-dom';

import { MainFooter } from './MainFooter';
import { MainNavbar } from './MainNavbar';

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
