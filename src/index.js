import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { EditProvider } from './context/EditContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <EditProvider>
      <App />
    </EditProvider>
  </React.StrictMode>
)