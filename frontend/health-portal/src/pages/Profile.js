import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Profile() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [profileData, setProfileData] = useState({
    name: "",
    email: "",
    age: "",
    phone: "",
    address: "",
    weight: "",
    height: "",
    bmi: "",
    blood_group: "",
    habits: "",
    diseases: "",
    symptoms: ""
  });

  useEffect(() => {
    const token = localStorage.getItem('token');
    const userRole = localStorage.getItem('userRole');

    if (!token) {
      alert("Please login first");
      navigate('/login');
      return;
    }

    if (userRole !== 'patient') {
      alert("Profile page is only for patients");
      navigate('/dashboard/provider');
      return;
    }

    // Fetch patient data
    fetch('http://localhost:5000/api/patients/me', {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    })
      .then(res => {
        if (!res.ok) {
          throw new Error('Failed to fetch profile');
        }
        return res.json();
      })
      .then(data => {
        console.log("Profile data:", data);
        setProfileData({
          name: data.profile.name || "",
          email: data.profile.email || "",
          age: data.profile.age || "",
          phone: data.profile.phone_number || "",
          address: data.profile.address || "",
          weight: data.profile.weight || "",
          height: data.profile.height || "",
          bmi: data.profile.bmi || "",
          blood_group: data.profile.blood_group || "",
          habits: data.profile.habits || "",
          diseases: data.profile.diseases || "",
          symptoms: data.profile.symptoms || ""
        });
        setLoading(false);
      })
      .catch(err => {
        console.error("Error fetching profile:", err);
        alert("Session expired. Please login again.");
        localStorage.clear();
        navigate('/login');
        setLoading(false);
      });
  }, [navigate]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfileData(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    alert("Profile update feature will be implemented soon!");
    // TODO: Add API call to update profile
  };

  if (loading) {
    return <div className="container" style={{ maxWidth: '800px', marginTop:'30px' }}>Loading profile...</div>;
  }

  return (
    <div className="container" style={{ maxWidth: '800px', marginTop:'30px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h1>My Profile</h1>
        <button className="btn btn-outline" onClick={() => navigate('/dashboard/patient')}>
          Back to Dashboard
        </button>
      </div>

      <div className="card">
        <h3 style={{ marginBottom: '20px' }}>Personal Information</h3>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '15px' }}>
          <div className="input-group">
            <label>Name</label>
            <input 
              name="name"
              value={profileData.name} 
              onChange={handleInputChange}
              disabled
            />
          </div>

          <div className="input-group">
            <label>Email</label>
            <input 
              name="email"
              type="email"
              value={profileData.email} 
              onChange={handleInputChange}
              disabled
            />
          </div>

          <div className="input-group">
            <label>Age</label>
            <input 
              name="age"
              type="number"
              value={profileData.age} 
              onChange={handleInputChange}
            />
          </div>

          <div className="input-group">
            <label>Phone</label>
            <input 
              name="phone"
              type="tel"
              value={profileData.phone} 
              onChange={handleInputChange}
            />
          </div>

          <div className="input-group" style={{ gridColumn: 'span 2' }}>
            <label>Address</label>
            <input 
              name="address"
              value={profileData.address} 
              onChange={handleInputChange}
            />
          </div>
        </div>

        <h3 style={{ margin: '30px 0 20px' }}>Health Information</h3>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '15px' }}>
          <div className="input-group">
            <label>Blood Group</label>
            <input 
              name="blood_group"
              value={profileData.blood_group} 
              onChange={handleInputChange}
              placeholder="e.g., A+, O-, B+"
            />
          </div>

          <div className="input-group">
            <label>Weight (kg)</label>
            <input 
              name="weight"
              type="number"
              step="0.1"
              value={profileData.weight} 
              onChange={handleInputChange}
            />
          </div>

          <div className="input-group">
            <label>Height (cm)</label>
            <input 
              name="height"
              type="number"
              step="0.1"
              value={profileData.height} 
              onChange={handleInputChange}
            />
          </div>

          <div className="input-group">
            <label>BMI</label>
            <input 
              name="bmi"
              type="number"
              step="0.1"
              value={profileData.bmi} 
              onChange={handleInputChange}
              placeholder="Calculated BMI"
            />
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '15px', marginTop: '15px' }}>
          <div className="input-group">
            <label>Habits</label>
            <input 
              name="habits"
              value={profileData.habits} 
              onChange={handleInputChange}
              placeholder="e.g., Smoking, Exercise routine"
            />
          </div>

          <div className="input-group">
            <label>Chronic Diseases</label>
            <input 
              name="diseases"
              value={profileData.diseases} 
              onChange={handleInputChange}
              placeholder="e.g., Diabetes, Hypertension"
            />
          </div>

          <div className="input-group">
            <label>Current Symptoms</label>
            <input 
              name="symptoms"
              value={profileData.symptoms} 
              onChange={handleInputChange}
              placeholder="e.g., Headache, Fatigue"
            />
          </div>
        </div>

        <button 
          className="btn btn-primary" 
          style={{width:'100%', marginTop: '20px'}}
          onClick={handleSave}
        >
          Save Changes
        </button>
      </div>
    </div>
  );
}