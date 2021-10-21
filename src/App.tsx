import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import { ThemeConfig } from './core/theme';
import { NotistackProvider, LoadingPage } from './core/components';
import { Router } from './routes';
import { getAuthState } from 'src/store/slices/auth';
import { useSelector } from 'src/store/store';

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
