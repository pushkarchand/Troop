import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { MainContextProvider } from '@context/maincontext';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  // <React.StrictMode>
    <BrowserRouter>
      <MainContextProvider>
        <Routes>
          <Route path="/*" element={<App />} />
        </Routes>
      </MainContextProvider>
    </BrowserRouter>
  // </React.StrictMode>
);
