import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Footprints, GlassWater, Moon, Calendar, Bell } from 'lucide-react';

export default function PatientDashboard() {
  const [patientData, setPatientData] = useState(null);
  const [loading, setLoading] = useState(true);

  // --- THE CONNECTION PART ---
  // 1. Load data from backend when page opens
  useEffect(() => {
    fetch('http://localhost:5000/api/patient/dashboard')
      .then(res => res.json())
      .then(data => {
        setPatientData(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Error connecting to backend:", err);
        setLoading(false);
      });
  }, []);

  // 2. Function to send new steps to backend
  const addSteps = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/patient/metrics', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ steps: 500 })
      });
      const data = await res.json();
      
      if(data.success) {
        // Update UI with new data from backend
        setPatientData(prev => ({ ...prev, metrics: data.currentMetrics }));
      }
    } catch (err) {
      console.error("Error sending steps:", err);
    }
  };

  if (loading) return <div className="container" style={{marginTop:'50px'}}>Loading Dashboard...</div>;
  if (!patientData) return <div className="container" style={{marginTop:'50px', color: 'red'}}>Error: Could not fetch data. Is Backend running on Port 5000?</div>;

  const { metrics, reminders, healthTip, name } = patientData;

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
        <h1>Hello, {name} 👋</h1>
        <Link to="/profile"><button className="btn btn-outline">My Profile</button></Link>
      </div>

      <div className="card" style={{ backgroundColor: '#f0f9ff', borderColor: '#bae6fd', display:'flex', gap:'10px' }}>
        <Bell size={20} color="#0284c7" /> 
        <div><b>Health Tip:</b> {healthTip}</div>
      </div>

      <div className="grid-3">
        <div className="card">
          <div style={{ display: 'flex', justifyContent: 'space-between' }}><h3>Steps</h3><Footprints color="var(--primary)"/></div>
          <h2>{metrics.steps}</h2>
          <button className="btn btn-primary" style={{marginTop:'10px', width:'100%'}} onClick={addSteps}>+ Log 500 Steps</button>
        </div>
        <div className="card">
          <div style={{ display: 'flex', justifyContent: 'space-between' }}><h3>Water</h3><GlassWater color="var(--primary)"/></div>
          <h2>{metrics.water} <span style={{fontSize:'1rem'}}>cups</span></h2>
        </div>
        <div className="card">
          <div style={{ display: 'flex', justifyContent: 'space-between' }}><h3>Sleep</h3><Moon color="var(--primary)"/></div>
          <h2>{metrics.sleep} <span style={{fontSize:'1rem'}}>hrs</span></h2>
        </div>
      </div>

      <h2 style={{ margin: '30px 0 15px' }}>Upcoming Reminders</h2>
      <div className="card">
        {reminders.map(r => (
          <div key={r.id} style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0', borderBottom: '1px solid #eee' }}>
            <div style={{display:'flex', gap:'10px'}}><Calendar size={20}/> {r.title}</div>
            <span className={r.urgent ? "badge danger" : "badge success"}>{r.date}</span>
          </div>
        ))}
      </div>
    </div>
  );
}