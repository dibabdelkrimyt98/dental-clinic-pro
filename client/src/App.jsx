import React from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Appointment from './pages/Appointment'; // We'll create this page
import Home from './pages/Home'; // We'll create this page

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/rdv" element={<Appointment />} />
      </Routes>
    </Router>
  );
}

export default App;