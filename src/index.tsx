import { StrictMode } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { Provider as ReduxProvider } from 'react-redux';
import * as Sentry from '@sentry/react';
import { Integrations } from '@sentry/tracing';

import App from './App';
import { store } from './store/store';
import { FirebaseProvider } from './services/firebase/FirebaseContext';

Sentry.init({
  dsn: process.env.SENTRY_DNS_KEY,
  integrations: [
    new Integrations.BrowserTracing({
      tracingOrigins: ['http://localhost:3000/']
    })
  ],

  // Set tracesSampleRate to 1.0 to capture 100%
  // of transactions for performance monitoring.
  // We recommend adjusting this value in production
  tracesSampleRate: 1.0
});

ReactDOM.render(
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
  </StrictMode>,
  document.getElementById('root')
);
