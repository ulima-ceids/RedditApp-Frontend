import React from 'react';
import ReactDOM from 'react-dom/client';
import RouterApp from './RouterApp';
import './index.css';

const rootElement: HTMLElement = document.getElementById('root');

if (rootElement) {
  const root: ReactDOM.Root = ReactDOM.createRoot(rootElement);
  root.render(
    <React.StrictMode>
      <RouterApp />
    </React.StrictMode>
  );
}