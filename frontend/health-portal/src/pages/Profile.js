import React, { useState } from 'react';

export default function Profile() {
  const [data, setData] = useState({ name: "Alex Johnson", allergies: "Peanuts", meds: "Vitamin D" });

  return (
    <div className="container" style={{ maxWidth: '600px', marginTop:'30px' }}>
      <h1>My Profile</h1>
      <div className="card">
        <div className="input-group"><label>Name</label><input value={data.name} onChange={e=>setData({...data, name:e.target.value})}/></div>
        <div className="input-group"><label>Allergies</label><input value={data.allergies} onChange={e=>setData({...data, allergies:e.target.value})}/></div>
        <div className="input-group"><label>Current Medications</label><input value={data.meds} onChange={e=>setData({...data, meds:e.target.value})}/></div>
        <button className="btn btn-primary" style={{width:'100%'}}>Save Changes</button>
      </div>
    </div>
  );
}
