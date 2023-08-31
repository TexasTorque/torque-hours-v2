import React from 'react';
import ReactDOM from 'react-dom/client';
import Home from "./pages/Home.jsx"
import { Route, Routes, BrowserRouter as Router } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Router>
      <Routes>
          <Route path="/" element={ <Home /> } />
      </Routes>
  </Router>
);