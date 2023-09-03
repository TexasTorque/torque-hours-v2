import React from 'react';
import ReactDOM from 'react-dom/client';
import Home from "./pages/Home.jsx"
import { Route, Routes, BrowserRouter as Router } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.css';
import Attendance from './pages/Attendance.jsx';
import Leaderboard from './pages/Leaderboard.jsx';
import Admin from './pages/Admin.jsx';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Router>
      <Routes>
          <Route path="/" element={ <Home /> } />
          <Route path="/attendance" element={ <Attendance /> } />
          <Route path="/leaderboard" element={ <Leaderboard /> } />
          <Route path="/admin" element={ <Admin /> } />
      </Routes>
  </Router>
);