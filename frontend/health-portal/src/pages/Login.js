import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const navigate = useNavigate();
  const [isRegistering, setIsRegistering] = useState(false);
  const [role, setRole] = useState('patient');
  const [consent, setConsent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isRegistering && !consent) {
      alert("Consent required!");
      return;
    }
    // Simulate Routing
    if (role === 'patient') navigate('/dashboard/patient');
    else navigate('/dashboard/provider');
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', marginTop: '50px' }}>
      <div className="card" style={{ width: '400px' }}>
        <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>{isRegistering ? 'Register' : 'Login'}</h2>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label>Role</label>
            <select value={role} onChange={(e) => setRole(e.target.value)}>
              <option value="patient">Patient</option>
              <option value="provider">Healthcare Provider</option>
            </select>
          </div>
          <div className="input-group"><label>Email</label><input required /></div>
          <div className="input-group"><label>Password</label><input type="password" required /></div>

          {isRegistering && (
            <div style={{ display: 'flex', gap: '10px', margin: '15px 0', fontSize: '0.9rem' }}>
              <input type="checkbox" checked={consent} onChange={(e) => setConsent(e.target.checked)} />
              <label>I consent to data usage for health monitoring.</label>
            </div>
          )}

          <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>
            {isRegistering ? 'Sign Up' : 'Login'}
          </button>
        </form>
        <p style={{ textAlign: 'center', marginTop: '15px', cursor: 'pointer', color: 'var(--primary)' }}
           onClick={() => setIsRegistering(!isRegistering)}>
           {isRegistering ? 'Have an account? Login' : 'No account? Register'}
        </p>
      </div>
    </div>
  );
}