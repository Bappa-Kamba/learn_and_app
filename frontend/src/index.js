import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/App';
import reportWebVitals from './reportWebVitals';
import './styles/index.css';
import ErrorBoundary from './components/Errors';

// Create a root element
const root = ReactDOM.createRoot(document.getElementById('root'));

// Render the App component
root.render(
  <React.StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </React.StrictMode>
);

// Report web vitals
reportWebVitals(console.log);
