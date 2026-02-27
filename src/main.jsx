import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { AppProvider } from './context/AppContext';
import { SunnyProvider } from './context/SunnyContext';
import './index.css';

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
