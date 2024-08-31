// Importing necessary libraries and components
import React from 'react'; // Imports the React library
import ReactDOM from 'react-dom/client'; // Imports the ReactDOM library for rendering
import App from './App.jsx'; // Imports the main App component
import { BrowserRouter } from "react-router-dom"; // Imports BrowserRouter for handling routing

// Creating the root element for rendering the React application
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* BrowserRouter component wraps the entire application to enable routing */}
    <BrowserRouter>
      {/* The main App component is rendered inside BrowserRouter */}
      <App />
    </BrowserRouter>
  </React.StrictMode>,
);
