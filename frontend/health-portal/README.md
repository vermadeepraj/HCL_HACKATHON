🏥 MediCare: Frontend Portal

HCLTech Hackathon Submission > A responsive, role-based wellness portal built with React.js.

🚀 Live Demo

View the App: (https://hcl-hackathon-pi.vercel.app/)

(Note: This deployment uses mock data/API integration for demonstration purposes)

📌 Project Overview

MediCare is a healthcare wellness portal designed to bridge the gap between patient daily habits and clinical compliance. The frontend focuses on usability, accessibility, and secure data handling through a clean, medical-grade user interface.

Key Objectives:

Provide a Patient Dashboard for tracking daily health metrics (steps, water, sleep).

Provide a Provider Dashboard for monitoring patient compliance.

Enforce Privacy First design with mandatory consent flows.

🛠️ Tech Stack

Category

Technology

Framework

React.js (Create React App)

Routing

React Router DOM v6

Styling

Plain CSS Variables (Medical Blue/Green Theme)

Icons

Lucide React

State Mgmt

React Hooks (useState, useEffect, Context)

Deployment

Vercel

✨ UI Features

1. 🔐 Role-Based Authentication

Dynamic Login Screen: Switches context between Patient and Provider.

Consent Checkbox: A mandatory UI element that blocks registration until the user consents to data processing (HIPAA compliance feature).

2. 👤 Patient View

Wellness Cards: Visual trackers for Steps, Hydration, and Sleep.

Dynamic Inputs: Users can log data directly from the dashboard cards.

Notification Center: Visual alerts for "Urgent" vs "Standard" preventive reminders.

3. 👨‍⚕️ Provider View

Compliance Table: A clean data grid showing assigned patients.

Status Badges: "Traffic Light" system (Green/Red) allows doctors to spot non-compliant patients instantly.

⚙️ Installation & Run Guide

Follow these steps to run the frontend locally.

Prerequisites

Node.js (v14 or higher)

npm (v6 or higher)

Step 1: Clone & Install

git clone [https://github.com/YOUR_USERNAME/health-portal.git](https://github.com/YOUR_USERNAME/health-portal.git)
cd health-portal
npm install


Step 2: Start the Development Server

npm start


The app will open automatically at http://localhost:3000.

If the backend is not running, the app will gracefully degrade to show UI states or handle errors.

📂 Project Structure

src/
├── app/
│   └── globals.css       # Global variables & reset
├── pages/
│   ├── Login.js          # Auth handling & Consent logic
│   ├── PatientDashboard.js # Metric tracking UI
│   ├── ProviderDashboard.js # Compliance monitoring UI
│   └── Profile.js        # User settings
├── utils/
│   └── mockData.js       # Fallback data for UI testing
└── App.js                # Main Router configuration


🔮 Future Improvements

Dark Mode: implementing a high-contrast theme for accessibility.

Chart.js Integration: Replacing simple metric cards with historical trend graphs.

PWA Support: Making the portal installable on mobile devices.

Made with ❤️ for the HCLTech Hackathon