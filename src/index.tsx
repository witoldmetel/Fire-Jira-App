import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { HelmetProvider } from 'react-helmet-async';
import { Provider as ReduxProvider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import { FirebaseProvider } from './services/firebase/FirebaseContext';
import { store } from './store/store';
import App from './App';

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
