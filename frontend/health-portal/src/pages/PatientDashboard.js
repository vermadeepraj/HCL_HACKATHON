import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Footprints, GlassWater, Moon, Calendar, Bell, Target } from 'lucide-react';

export default function PatientDashboard() {
  const navigate = useNavigate();
  const [patientData, setPatientData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [goals, setGoals] = useState({
    sleep_cycle: "",
    steps_per_day: "",
    hydration_litres: ""
  });

  // Load data from backend when page opens
  useEffect(() => {
    const token = localStorage.getItem('token');
    const userName = localStorage.getItem('userName');

    if (!token) {
      alert("Please login first");
      navigate('/login');
      return;
    }

    // Fetch patient dashboard data
    fetch('http://localhost:5000/api/patients/me', {
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
        console.log("Dashboard data:", data);
        setPatientData({
          ...data,
          name: userName || data.profile.name
        });
        
        // Set existing goals if available
        if (data.goals) {
          setGoals({
            sleep_cycle: data.goals.sleep_cycle || "",
            steps_per_day: data.goals.steps_per_day || "",
            hydration_litres: data.goals.hydration_litres || ""
          });
        }
        
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

  // Update goals
  const handleUpdateGoals = async () => {
    const token = localStorage.getItem('token');
    
    try {
      const res = await fetch('http://localhost:5000/api/patients/me/goals', {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          sleep_cycle: goals.sleep_cycle,
          steps_per_day: parseInt(goals.steps_per_day) || 0,
          hydration_litres: parseFloat(goals.hydration_litres) || 0
        })
      });
      
      const data = await res.json();
      
      if (res.ok) {
        alert("Goals updated successfully!");
        setPatientData(prev => ({ ...prev, goals: data }));
      } else {
        alert("Failed to update goals: " + (data.message || "Unknown error"));
      }
    } catch (err) {
      console.error("Error updating goals:", err);
      alert("Error updating goals");
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate('/login');
  };

  if (loading) return <div className="container" style={{marginTop:'50px'}}>Loading Dashboard...</div>;
  if (!patientData) return <div className="container" style={{marginTop:'50px', color: 'red'}}>Error: Could not fetch data.</div>;

  const { profile, goals: currentGoals, reminders } = patientData;

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
        <h1>Hello, {patientData.name} 👋</h1>
        <div style={{ display: 'flex', gap: '10px' }}>
          <Link to="/profile"><button className="btn btn-outline">My Profile</button></Link>
          <button className="btn btn-primary" onClick={handleLogout}>Logout</button>
        </div>
      </div>

      {/* Profile Information */}
      <div className="card" style={{ backgroundColor: '#f0f9ff', borderColor: '#bae6fd' }}>
        <h3 style={{ marginBottom: '15px' }}>Profile Information</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '15px' }}>
          <div><strong>Email:</strong> {profile.email}</div>
          <div><strong>Age:</strong> {profile.age || 'N/A'}</div>
          <div><strong>Phone:</strong> {profile.phone_number || 'N/A'}</div>
          <div><strong>BMI:</strong> {profile.bmi || 'N/A'}</div>
        </div>
      </div>

      {/* Health Goals Section */}
      <h2 style={{ margin: '30px 0 15px', display: 'flex', alignItems: 'center', gap: '10px' }}>
        <Target size={24} /> My Health Goals
      </h2>
      <div className="card">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '15px' }}>
          <div className="input-group">
            <label>Sleep Cycle (e.g., "7-8 hours")</label>
            <input 
              type="text" 
              value={goals.sleep_cycle}
              onChange={(e) => setGoals(prev => ({ ...prev, sleep_cycle: e.target.value }))}
              placeholder="7-8 hours"
            />
          </div>
          <div className="input-group">
            <label>Steps Per Day</label>
            <input 
              type="number" 
              value={goals.steps_per_day}
              onChange={(e) => setGoals(prev => ({ ...prev, steps_per_day: e.target.value }))}
              placeholder="10000"
            />
          </div>
          <div className="input-group">
            <label>Hydration (Litres/Day)</label>
            <input 
              type="number" 
              step="0.1"
              value={goals.hydration_litres}
              onChange={(e) => setGoals(prev => ({ ...prev, hydration_litres: e.target.value }))}
              placeholder="2.5"
            />
          </div>
        </div>
        <button 
          className="btn btn-primary" 
          style={{ marginTop: '15px', width: '100%' }}
          onClick={handleUpdateGoals}
        >
          Update Goals
        </button>

        {currentGoals && (
          <div style={{ marginTop: '20px', padding: '15px', backgroundColor: '#f0fdf4', borderRadius: '8px' }}>
            <strong>Current Goals:</strong>
            <div style={{ marginTop: '10px', display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
              <div><Footprints size={16} style={{ display: 'inline', marginRight: '5px' }} /> 
                {currentGoals.steps_per_day || 0} steps/day
              </div>
              <div><GlassWater size={16} style={{ display: 'inline', marginRight: '5px' }} /> 
                {currentGoals.hydration_litres || 0}L/day
              </div>
              <div><Moon size={16} style={{ display: 'inline', marginRight: '5px' }} /> 
                {currentGoals.sleep_cycle || 'Not set'}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Healthcare Center */}
      {patientData.healthcare_center && (
        <div className="card" style={{ backgroundColor: '#fef3c7', borderColor: '#fde047' }}>
          <h3>Healthcare Provider</h3>
          <p><strong>Name:</strong> {patientData.healthcare_center.name}</p>
          <p><strong>Type:</strong> {patientData.healthcare_center.provider_type}</p>
          <p><strong>Specialization:</strong> {patientData.healthcare_center.specialization || 'General'}</p>
        </div>
      )}

      {/* Reminders Section */}
      <h2 style={{ margin: '30px 0 15px' }}>Health Reminders</h2>
      <div className="card">
        {reminders && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {reminders.annual_blood_test && (
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0', borderBottom: '1px solid #eee' }}>
                <div style={{display:'flex', gap:'10px', alignItems: 'center'}}>
                  <Calendar size={20}/> Annual Blood Test
                </div>
                <span className="badge success">
                  {new Date(reminders.annual_blood_test).toLocaleDateString()}
                </span>
              </div>
            )}
            {reminders.dental_checkup && (
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0', borderBottom: '1px solid #eee' }}>
                <div style={{display:'flex', gap:'10px', alignItems: 'center'}}>
                  <Calendar size={20}/> Dental Checkup
                </div>
                <span className="badge success">
                  {new Date(reminders.dental_checkup).toLocaleDateString()}
                </span>
              </div>
            )}
            {reminders.eye_examination && (
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0', borderBottom: '1px solid #eee' }}>
                <div style={{display:'flex', gap:'10px', alignItems: 'center'}}>
                  <Calendar size={20}/> Eye Examination
                </div>
                <span className="badge success">
                  {new Date(reminders.eye_examination).toLocaleDateString()}
                </span>
              </div>
            )}
            {reminders.upcoming_health_checkup && (
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0' }}>
                <div style={{display:'flex', gap:'10px', alignItems: 'center'}}>
                  <Bell size={20}/> Upcoming Health Checkup
                </div>
                <span className="badge danger">
                  {new Date(reminders.upcoming_health_checkup).toLocaleDateString()}
                </span>
              </div>
            )}
            {(!reminders.annual_blood_test && !reminders.dental_checkup && !reminders.eye_examination && !reminders.upcoming_health_checkup) && (
              <p style={{ textAlign: 'center', color: 'var(--text-muted)' }}>No reminders set yet.</p>
            )}
          </div>
        )}
        {!reminders && (
          <p style={{ textAlign: 'center', color: 'var(--text-muted)' }}>No reminders available.</p>
        )}
      </div>
    </div>
  );
}