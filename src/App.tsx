import { ThemeConfig } from './core/theme';
import { NotistackProvider } from './core/components';
import { useAuth } from './hooks/useAuth';
import { Router } from './routes';

function App() {
  const { isInitialized } = useAuth();

  return (
    <ThemeConfig>
      <NotistackProvider>{isInitialized ? <Router /> : <div>Loading screen</div>}</NotistackProvider>
    </ThemeConfig>
  );
}

export default App;
