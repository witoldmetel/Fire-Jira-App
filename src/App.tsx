import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import { getAuthState } from 'src/store/slices/auth';
import { useSelector } from 'src/store/store';

import { ThemeConfig } from './core/theme';
import { LoadingPage } from './pages/LoadingPage';
import { Router } from './routes';

import 'react-toastify/dist/ReactToastify.css';

function App() {
  const { isInitialized } = useSelector(getAuthState);
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <ThemeConfig>
      {isInitialized ? (
        <>
          <Router />
          <ToastContainer />
        </>
      ) : (
        <LoadingPage />
      )}
    </ThemeConfig>
  );
}

export default App;
