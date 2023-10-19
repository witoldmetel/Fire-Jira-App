import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import { getAuthState } from 'src/store/slices/auth';
import { useSelector } from 'src/store/store';

import { NotistackProvider } from './core/components';
import { ThemeConfig } from './core/theme';
import { LoadingPage } from './pages/LoadingPage';
import { Router } from './routes';

function App() {
  const { isInitialized } = useSelector(getAuthState);
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <ThemeConfig>
      <NotistackProvider>{isInitialized ? <Router /> : <LoadingPage />}</NotistackProvider>
    </ThemeConfig>
  );
}

export default App;
