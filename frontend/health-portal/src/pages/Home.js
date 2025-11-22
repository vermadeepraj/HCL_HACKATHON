import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, Heart, Clock } from 'lucide-react';

export default function Home() {
  return (
    <div>
      <section style={{ textAlign: 'center', padding: '60px 0' }}>
        <h1 style={{ fontSize: '3rem', marginBottom: '20px', color: 'var(--primary)' }}>
          Your Health, Proactively Managed.
        </h1>
        <p style={{ fontSize: '1.2rem', color: 'var(--text-muted)', marginBottom: '30px' }}>
          Bridging the gap between daily habits and clinical compliance.
        </p>
        <Link to="/login"><button className="btn btn-primary">Get Started</button></Link>
      </section>

      <div className="grid-3">
        <div className="card" style={{ textAlign: 'center' }}>
          <ShieldCheck size={40} color="var(--secondary)" style={{ marginBottom: '15px' }} />
          <h3>Preventive Care</h3>
          <p>Regular screenings can detect issues early. We track your compliance automatically.</p>
        </div>
        <div className="card" style={{ textAlign: 'center' }}>
          <Heart size={40} color="var(--danger)" style={{ marginBottom: '15px' }} />
          <h3>Wellness Tracking</h3>
          <p>Log daily vitals like steps and water. Small habits lead to big changes.</p>
        </div>
        <div className="card" style={{ textAlign: 'center' }}>
          <Clock size={40} color="var(--primary)" style={{ marginBottom: '15px' }} />
          <h3>Provider Sync</h3>
          <p>Your data is securely shared with your doctor for real-time monitoring.</p>
        </div>
      </div>
    </div>
  );
}