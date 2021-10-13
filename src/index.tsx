import { StrictMode } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';

import App from './App';
import { FirebaseProvider } from './services/firebase/FirebaseContext';

ReactDOM.render(
  <StrictMode>
    <HelmetProvider>
      <BrowserRouter>
        <FirebaseProvider>
          <App />
        </FirebaseProvider>
      </BrowserRouter>
    </HelmetProvider>
  </StrictMode>,
  document.getElementById('root')
);
