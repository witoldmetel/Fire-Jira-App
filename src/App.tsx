import { ThemeConfig } from './core/theme';
import { NotistackProvider } from './core/components';
import { Router } from './routes';

function App() {
  return (
    <ThemeConfig>
      <NotistackProvider>
        <Router />
      </NotistackProvider>
    </ThemeConfig>
  );
}

export default App;
