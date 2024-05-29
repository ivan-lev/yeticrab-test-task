import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/App/App.tsx';
import './index.scss';

import { Provider } from 'react-redux';
import store from './slices/index.ts';

// Gravity UI styles and themes
import { ThemeProvider } from '@gravity-ui/uikit';
import '@gravity-ui/uikit/styles/fonts.css';
import '@gravity-ui/uikit/styles/styles.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <ThemeProvider theme="dark">
        <App />
      </ThemeProvider>
    </Provider>
  </React.StrictMode>
);
