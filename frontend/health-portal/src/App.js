import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Activity } from 'lucide-react';

// Import Pages (We will create these next)
import Home from './pages/Home';
import Login from './pages/Login';
import PatientDashboard from './pages/PatientDashboard';
import ProviderDashboard from './pages/ProviderDashboard';
import Profile from './pages/Profile';

function App() {
  return (
    <Router>
      <div className="app-container">
        {/* Navbar */}
        <nav className="navbar">
          <div className="container nav-content">
            <div className="logo">
              <Activity size={28} /> MediCare
            </div>
            <div style={{ display: 'flex', gap: '15px' }}>
              <Link to="/" className="btn btn-outline" style={{ border: 'none' }}>Home</Link>
              <Link to="/login" className="btn btn-primary">Login / Register</Link>
            </div>
          </div>
        </nav>

        {/* Page Content */}
        <main className="container">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/dashboard/patient" element={<PatientDashboard />} />
            <Route path="/dashboard/provider" element={<ProviderDashboard />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;