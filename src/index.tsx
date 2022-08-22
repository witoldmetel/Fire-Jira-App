import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { Provider as ReduxProvider } from 'react-redux';

import App from './App';
import { store } from './store/store';
import { FirebaseProvider } from './services/firebase/FirebaseContext';

const container = document.getElementById('root');
const root = createRoot(container!);

root.render(
  <StrictMode>
    <HelmetProvider>
      <ReduxProvider store={store}>
        <BrowserRouter>
          <FirebaseProvider>
            <App />
          </FirebaseProvider>
        </BrowserRouter>
      </ReduxProvider>
    </HelmetProvider>
  </StrictMode>
);
