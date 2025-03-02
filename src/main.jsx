import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App'; // Ensure this path points to your App component
import './index.css'; // Ensure this path points to your global CSS, which might include Tailwind CSS if used

const rootElement = document.getElementById('root');
const root = ReactDOM.createRoot(rootElement);

root.render(
  <React.StrictMode>
    <Router>  
      <App />
    </Router>
  </React.StrictMode>
);
