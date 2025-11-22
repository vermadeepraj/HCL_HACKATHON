import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const navigate = useNavigate();
  
  // UI State
  const [isRegistering, setIsRegistering] = useState(false);
  const [role, setRole] = useState('patient');
  const [consent, setConsent] = useState(false);
  
  // Form Data State for Login
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
  // Form Data State for Registration
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    phone: "",
    address: "",
    blood_group: "",
    habits: "",
    diseases: "",
    symptoms: "",
    weight: "",
    height: "",
    bmi: "",
    // Provider specific
    provider_type: "doctor",
    registration_number: "",
    specialization: "",
    consent_public_profile: false
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validation: Check Consent (Required for Registering)
    if (isRegistering && !consent) {
      alert("You must consent to data usage to register.");
      return;
    }

    try {
      // Determine the correct endpoint
      let endpoint = '';
      let bodyData = {};

      if (isRegistering) {
        // Registration endpoints
        if (role === 'patient') {
          endpoint = 'http://localhost:5000/api/auth/patient/signup';
          bodyData = {
            name: formData.name,
            email: email,
            password: password,
            age: parseInt(formData.age) || undefined,
            phone: formData.phone,
            address: formData.address,
            blood_group: formData.blood_group || undefined,
            habits: formData.habits || undefined,
            diseases: formData.diseases || undefined,
            symptoms: formData.symptoms || undefined,
            weight: parseFloat(formData.weight) || undefined,
            height: parseFloat(formData.height) || undefined,
            bmi: parseFloat(formData.bmi) || undefined
          };
        } else {
          endpoint = 'http://localhost:5000/api/auth/provider/signup';
          bodyData = {
            name: formData.name,
            email: email,
            password: password,
            provider_type: formData.provider_type,
            registration_number: formData.registration_number,
            specialization: formData.specialization,
            phone: formData.phone,
            address: formData.address,
            consent_public_profile: formData.consent_public_profile
          };
        }
      } else {
        // Login endpoints
        if (role === 'patient') {
          endpoint = 'http://localhost:5000/api/auth/patient/login';
        } else {
          endpoint = 'http://localhost:5000/api/auth/provider/login';
        }
        bodyData = {
          email: email,
          password: password
        };
      }

      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(bodyData)
      });

      const data = await response.json();

      if (response.ok && data.token) {
        // Success: Save Token & Navigate
        console.log("Success:", data);
        
        localStorage.setItem('token', data.token);
        localStorage.setItem('userRole', data.user.role);
        localStorage.setItem('userId', data.user.id);
        localStorage.setItem('userName', data.user.name);
        
        // Navigate based on role
        if (data.user.role === 'patient') {
          navigate('/dashboard/patient');
        } else {
          navigate('/dashboard/provider');
        }
      } else {
        // Failed: Show Error Message from Backend
        alert((isRegistering ? "Registration" : "Login") + " Failed: " + (data.message || "Invalid credentials"));
      }
    } catch (err) {
      console.error("Connection Error:", err);
      alert("Could not connect to backend. Is the server running on Port 5000?");
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', marginTop: '50px' }}>
      <div className="card" style={{ width: '500px', maxHeight: '90vh', overflowY: 'auto' }}>
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

          {/* Registration Fields */}
          {isRegistering && (
            <>
              <div className="input-group">
                <label>Full Name *</label>
                <input 
                  type="text" 
                  name="name"
                  required 
                  value={formData.name} 
                  onChange={handleInputChange} 
                  placeholder="Enter your full name"
                />
              </div>

              {role === 'patient' ? (
                <>
                  <div className="input-group">
                    <label>Age</label>
                    <input 
                      type="number" 
                      name="age"
                      value={formData.age} 
                      onChange={handleInputChange}
                      placeholder="Enter age"
                    />
                  </div>

                  <div className="input-group">
                    <label>Blood Group</label>
                    <select 
                      name="blood_group"
                      value={formData.blood_group} 
                      onChange={handleInputChange}
                    >
                      <option value="">Select Blood Group</option>
                      <option value="A+">A+</option>
                      <option value="A-">A-</option>
                      <option value="B+">B+</option>
                      <option value="B-">B-</option>
                      <option value="AB+">AB+</option>
                      <option value="AB-">AB-</option>
                      <option value="O+">O+</option>
                      <option value="O-">O-</option>
                    </select>
                  </div>

                  <div className="input-group">
                    <label>Habits</label>
                    <input 
                      type="text" 
                      name="habits"
                      value={formData.habits} 
                      onChange={handleInputChange}
                      placeholder="e.g., Smoking, Exercise"
                    />
                  </div>

                  <div className="input-group">
                    <label>Existing Diseases</label>
                    <input 
                      type="text" 
                      name="diseases"
                      value={formData.diseases} 
                      onChange={handleInputChange}
                      placeholder="e.g., Diabetes, Hypertension"
                    />
                  </div>

                  <div className="input-group">
                    <label>Current Symptoms</label>
                    <input 
                      type="text" 
                      name="symptoms"
                      value={formData.symptoms} 
                      onChange={handleInputChange}
                      placeholder="Any current symptoms"
                    />
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '10px' }}>
                    <div className="input-group">
                      <label>Weight (kg)</label>
                      <input 
                        type="number" 
                        step="0.1"
                        name="weight"
                        value={formData.weight} 
                        onChange={handleInputChange}
                        placeholder="kg"
                      />
                    </div>

                    <div className="input-group">
                      <label>Height (cm)</label>
                      <input 
                        type="number" 
                        step="0.1"
                        name="height"
                        value={formData.height} 
                        onChange={handleInputChange}
                        placeholder="cm"
                      />
                    </div>

                    <div className="input-group">
                      <label>BMI</label>
                      <input 
                        type="number" 
                        step="0.1"
                        name="bmi"
                        value={formData.bmi} 
                        onChange={handleInputChange}
                        placeholder="BMI"
                      />
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div className="input-group">
                    <label>Provider Type *</label>
                    <select 
                      name="provider_type"
                      required
                      value={formData.provider_type} 
                      onChange={handleInputChange}
                    >
                      <option value="doctor">Doctor</option>
                      <option value="nurse">Nurse</option>
                      <option value="specialist">Specialist</option>
                      <option value="therapist">Therapist</option>
                    </select>
                  </div>

                  <div className="input-group">
                    <label>Registration Number *</label>
                    <input 
                      type="text" 
                      name="registration_number"
                      required 
                      value={formData.registration_number} 
                      onChange={handleInputChange}
                      placeholder="Medical registration number"
                    />
                  </div>

                  <div className="input-group">
                    <label>Specialization</label>
                    <input 
                      type="text" 
                      name="specialization"
                      value={formData.specialization} 
                      onChange={handleInputChange}
                      placeholder="e.g., Cardiology, Pediatrics"
                    />
                  </div>

                  <div style={{ display: 'flex', gap: '10px', margin: '15px 0', fontSize: '0.9rem' }}>
                    <input 
                      type="checkbox" 
                      name="consent_public_profile"
                      checked={formData.consent_public_profile} 
                      onChange={handleInputChange} 
                    />
                    <label style={{ cursor: 'pointer' }} onClick={() => setFormData(prev => ({...prev, consent_public_profile: !prev.consent_public_profile}))}>
                      I consent to having a public profile
                    </label>
                  </div>
                </>
              )}

              <div className="input-group">
                <label>Phone Number *</label>
                <input 
                  type="tel" 
                  name="phone"
                  required 
                  value={formData.phone} 
                  onChange={handleInputChange}
                  placeholder="Enter phone number"
                />
              </div>

              <div className="input-group">
                <label>Address *</label>
                <input 
                  type="text" 
                  name="address"
                  required 
                  value={formData.address} 
                  onChange={handleInputChange}
                  placeholder="Enter full address"
                />
              </div>
            </>
          )}

          {/* Email Input */}
          <div className="input-group">
            <label>Email *</label>
            <input 
              type="email" 
              required 
              value={email} 
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter email address"
            />
          </div>

          {/* Password Input */}
          <div className="input-group">
            <label>Password *</label>
            <input 
              type="password" 
              required 
              value={password} 
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
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