import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { registerSW } from 'virtual:pwa-register';
import App from './App';
import { AppProvider } from './context/AppContext';
import { SunnyProvider } from './context/SunnyContext';
import './index.css';

// Register service worker with auto-update
// When a new version is detected, it will activate immediately and reload the page
const updateSW = registerSW({
  onNeedRefresh() {
    // New content available — reload automatically
    updateSW(true);
  },
  onOfflineReady() {
    console.log('App ready to work offline');
  },
})

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <AppProvider>
        <SunnyProvider>
          <App />
        </SunnyProvider>
      </AppProvider>
    </BrowserRouter>
  </React.StrictMode>
);
