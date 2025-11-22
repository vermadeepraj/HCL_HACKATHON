import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const navigate = useNavigate();
  
  // UI State
  const [isRegistering, setIsRegistering] = useState(false);
  const [role, setRole] = useState('patient');
  const [consent, setConsent] = useState(false);
  
  // Form Data State
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // 1. Validation: Check Consent (Required for Registering)
    if (isRegistering && !consent) {
      alert("You must consent to data usage to register.");
      return;
    }

    try {
      // 2. Send Data to Backend
      // We assume your backend is running on port 5000
      const response = await fetch('http://localhost:5000/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          email: email, 
          password: password, 
          role: role 
        })
      });

      const data = await response.json();

      if (data.success) {
        // 3. Success: Save Token & Navigate
        console.log("Login Successful:", data);
        
        // Save the fake token and role to localStorage so dashboards can use them
        localStorage.setItem('token', data.token);
        localStorage.setItem('userRole', role);
        
        // Navigate based on role
        if (role === 'patient') {
          navigate('/dashboard/patient');
        } else {
          navigate('/dashboard/provider');
        }
      } else {
        // 4. Failed: Show Error Message from Backend
        alert("Login Failed: " + (data.message || "Invalid credentials"));
      }
    } catch (err) {
      console.error("Connection Error:", err);
      alert("Could not connect to backend. Is the server running on Port 5000?");
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', marginTop: '50px' }}>
      <div className="card" style={{ width: '400px' }}>
        <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>
          {isRegistering ? 'Register' : 'Login'}
        </h2>

        <form onSubmit={handleSubmit}>
          {/* Role Selection */}
          <div className="input-group">
            <label>Role</label>
            <select value={role} onChange={(e) => setRole(e.target.value)}>
              <option value="patient">Patient</option>
              <option value="provider">Healthcare Provider</option>
            </select>
          </div>

          {/* Email Input */}
          <div className="input-group">
            <label>Email</label>
            <input 
              type="email" 
              required 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
            />
          </div>

          {/* Password Input */}
          <div className="input-group">
            <label>Password</label>
            <input 
              type="password" 
              required 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
            />
          </div>

          {/* Consent Checkbox (Only shows when Registering) */}
          {isRegistering && (
            <div style={{ display: 'flex', gap: '10px', margin: '15px 0', fontSize: '0.9rem' }}>
              <input 
                type="checkbox" 
                checked={consent} 
                onChange={(e) => setConsent(e.target.checked)} 
              />
              <label style={{ cursor: 'pointer' }} onClick={() => setConsent(!consent)}>
                I consent to data usage for health monitoring.
              </label>
            </div>
          )}

          {/* Submit Button */}
          <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>
            {isRegistering ? 'Sign Up' : 'Login'}
          </button>
        </form>

        {/* Toggle Login/Register Mode */}
        <p style={{ textAlign: 'center', marginTop: '15px', cursor: 'pointer', color: 'var(--primary)' }}
           onClick={() => setIsRegistering(!isRegistering)}>
           {isRegistering ? 'Have an account? Login' : 'No account? Register'}
        </p>
      </div>
    </div>
  );
}