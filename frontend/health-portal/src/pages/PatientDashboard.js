import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { MOCK_PATIENT_DATA } from '../utils/mockData';
import { Footprints, GlassWater, Moon, Calendar, Bell } from 'lucide-react';

export default function PatientDashboard() {
  const [metrics, setMetrics] = useState(MOCK_PATIENT_DATA.metrics);

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
        <h1>Hello, {MOCK_PATIENT_DATA.name} 👋</h1>
        <Link to="/profile"><button className="btn btn-outline">My Profile</button></Link>
      </div>

      <div className="card" style={{ backgroundColor: '#f0f9ff', borderColor: '#bae6fd', display:'flex', gap:'10px' }}>
        <Bell size={20} color="#0284c7" /> 
        <div><b>Health Tip:</b> {MOCK_PATIENT_DATA.healthTip}</div>
      </div>

      <div className="grid-3">
        <div className="card">
          <div style={{ display: 'flex', justifyContent: 'space-between' }}><h3>Steps</h3><Footprints color="var(--primary)"/></div>
          <h2>{metrics.steps}</h2>
          <button className="btn btn-primary" style={{marginTop:'10px', width:'100%'}} onClick={()=>setMetrics({...metrics, steps: metrics.steps+500})}>+ Log 500 Steps</button>
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
        {MOCK_PATIENT_DATA.reminders.map(r => (
          <div key={r.id} style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0', borderBottom: '1px solid #eee' }}>
            <div style={{display:'flex', gap:'10px'}}><Calendar size={20}/> {r.title}</div>
            <span className={r.urgent ? "badge danger" : "badge success"}>{r.date}</span>
          </div>
        ))}
      </div>
    </div>
  );
}