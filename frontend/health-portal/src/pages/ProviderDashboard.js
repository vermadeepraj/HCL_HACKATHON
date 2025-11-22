import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Users, CheckCircle, AlertCircle } from 'lucide-react';

export default function ProviderDashboard() {
  const navigate = useNavigate();
  const [providerData, setProviderData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const userName = localStorage.getItem('userName');

    if (!token) {
      alert("Please login first");
      navigate('/login');
      return;
    }

    // Fetch provider dashboard data
    fetch('http://localhost:5000/api/providers/me/patients', {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    })
      .then(res => {
        if (!res.ok) {
          throw new Error('Failed to fetch dashboard');
        }
        return res.json();
      })
      .then(data => {
        console.log("Provider dashboard data:", data);
        setProviderData({
          ...data,
          providerName: userName || data.provider.name
        });
        setLoading(false);
      })
      .catch(err => {
        console.error("Error connecting to backend:", err);
        alert("Session expired. Please login again.");
        localStorage.clear();
        navigate('/login');
        setLoading(false);
      });
  }, [navigate]);

  const handleLogout = () => {
    localStorage.clear();
    navigate('/login');
  };

  if (loading) {
    return <div className="container" style={{marginTop:'50px'}}>Loading Dashboard...</div>;
  }

  if (!providerData) {
    return <div className="container" style={{marginTop:'50px', color: 'red'}}>Error: Could not fetch data.</div>;
  }

  const { provider, patients } = providerData;
  const totalPatients = patients.length;
  const compliantPatients = patients.filter(p => p.diseases === null || p.diseases === "").length;
  const actionNeeded = totalPatients - compliantPatients;

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
        <div>
          <h1>Provider Dashboard</h1>
          <p style={{ color: 'var(--text-muted)' }}>Dr. {providerData.providerName} - {provider.specialization || 'General Practice'}</p>
        </div>
        <button className="btn btn-primary" onClick={handleLogout}>Logout</button>
      </div>

      <div className="grid-3" style={{ marginBottom: '30px' }}>
        <div className="card" style={{ textAlign: 'center' }}>
          <Users size={40} color="var(--primary)" style={{ marginBottom: '10px' }} />
          <h3>Total Patients</h3>
          <h2>{totalPatients}</h2>
        </div>
        <div className="card" style={{ textAlign: 'center' }}>
          <CheckCircle size={40} color="var(--secondary)" style={{ marginBottom: '10px' }} />
          <h3>Compliant</h3>
          <h2 style={{color:'var(--secondary)'}}>{compliantPatients}</h2>
        </div>
        <div className="card" style={{ textAlign: 'center' }}>
          <AlertCircle size={40} color="var(--danger)" style={{ marginBottom: '10px' }} />
          <h3>Action Needed</h3>
          <h2 style={{color:'var(--danger)'}}>{actionNeeded}</h2>
        </div>
      </div>

      <div className="card">
        <h3 style={{ marginBottom: '20px' }}>Patient List</h3>
        {patients.length === 0 ? (
          <p style={{ textAlign: 'center', color: 'var(--text-muted)', padding: '20px' }}>
            No patients assigned yet.
          </p>
        ) : (
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '15px' }}>
              <thead>
                <tr style={{ textAlign: 'left', borderBottom: '2px solid #eee', backgroundColor: '#f8fafc' }}>
                  <th style={{padding:'12px'}}>Name</th>
                  <th style={{padding:'12px'}}>Email</th>
                  <th style={{padding:'12px'}}>Age</th>
                  <th style={{padding:'12px'}}>Blood Group</th>
                  <th style={{padding:'12px'}}>BMI</th>
                  <th style={{padding:'12px'}}>Conditions</th>
                  <th style={{padding:'12px'}}>Status</th>
                </tr>
              </thead>
              <tbody>
                {patients.map(patient => {
                  const hasConditions = patient.diseases && patient.diseases.trim() !== "";
                  const status = hasConditions ? "Action Needed" : "Active";
                  const statusClass = hasConditions ? "danger" : "success";

                  return (
                    <tr key={patient._id} style={{ borderBottom: '1px solid #eee' }}>
                      <td style={{padding:'12px'}}>
                        <strong>{patient.name}</strong>
                      </td>
                      <td style={{padding:'12px'}}>{patient.email}</td>
                      <td style={{padding:'12px'}}>{patient.age || 'N/A'}</td>
                      <td style={{padding:'12px'}}>{patient.blood_group || 'N/A'}</td>
                      <td style={{padding:'12px'}}>{patient.bmi || 'N/A'}</td>
                      <td style={{padding:'12px'}}>
                        {patient.diseases || 'None'}
                        {patient.symptoms && (
                          <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                            Symptoms: {patient.symptoms}
                          </div>
                        )}
                      </td>
                      <td style={{padding:'12px'}}>
                        <span className={`badge ${statusClass}`}>{status}</span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}