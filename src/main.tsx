import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './index.css';
import MswBoot from './mocks/MswBoot';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <MswBoot />

      <App />
    </BrowserRouter>
  </React.StrictMode>
);
