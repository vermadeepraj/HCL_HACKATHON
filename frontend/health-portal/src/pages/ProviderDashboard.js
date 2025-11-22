import React from 'react';
import { MOCK_PROVIDER_DATA } from '../utils/mockData';

export default function ProviderDashboard() {
  return (
    <div>
      <h1>Provider Dashboard</h1>
      <p style={{ color: 'var(--text-muted)', marginBottom: '30px' }}>Monitoring Compliance</p>

      <div className="grid-3" style={{ marginBottom: '30px' }}>
        <div className="card"><h3>Total Patients</h3><h2>24</h2></div>
        <div className="card"><h3>Compliant</h3><h2 style={{color:'var(--secondary)'}}>18</h2></div>
        <div className="card"><h3>Action Needed</h3><h2 style={{color:'var(--danger)'}}>6</h2></div>
      </div>

      <div className="card">
        <h3>Patient List</h3>
        <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '15px' }}>
          <thead>
            <tr style={{ textAlign: 'left', borderBottom: '2px solid #eee' }}>
              <th style={{padding:'10px'}}>Name</th><th style={{padding:'10px'}}>Last Checkup</th><th style={{padding:'10px'}}>Status</th>
            </tr>
          </thead>
          <tbody>
            {MOCK_PROVIDER_DATA.map(p => (
              <tr key={p.id} style={{ borderBottom: '1px solid #eee' }}>
                <td style={{padding:'10px'}}><b>{p.name}</b></td>
                <td style={{padding:'10px'}}>{p.lastCheckup}</td>
                <td style={{padding:'10px'}}>
                  <span className={`badge ${p.compliance ? 'success' : 'danger'}`}>{p.status}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}