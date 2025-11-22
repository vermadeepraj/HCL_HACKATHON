# 🏥 Healthcare Preventive Care Platform

A Smart Healthcare System connecting Patients and Healthcare Providers for preventive healthcare, lifestyle monitoring, and reminder-driven care.

---

## 🌐 Live Demo

> **Note:** Frontend and backend are hosted separately and are **not currently connected** in production.

- **Frontend (UI Only):**  https://hcl-hackathon-pi.vercel.app/
- **Backend API:** [https://hcl-hackathon-2.onrender.com](https://hcl-hackathon-2.onrender.com)

For a **fully functional experience**, please run the project locally following the setup instructions below.

---

## 🚀 Tech Stack

| Layer          | Technology                                       |
| -------------- | ------------------------------------------------ |
| Frontend       | React, Tailwind CSS                              |
| Backend        | Node.js, Express.js (MVC Architecture)           |
| Database       | MongoDB Atlas, Mongoose ODM                      |
| Authentication | JWT (role-based: patient/provider)               |
| Security       | Bcrypt hashing, Protected routes with middleware |

---

## 💻 Local Setup Instructions

### Prerequisites
- Node.js (v14 or higher)
- MongoDB Atlas account or local MongoDB instance
- Git

### 1️⃣ Clone the Repository

```bash
git clone <repository-url>
cd healthcare-platform
```

### 2️⃣ Backend Setup

```bash
# Navigate to backend folder
cd backend

# Install dependencies
npm install

# Create .env file in backend root
touch .env
```

Add the following to your `.env` file:

```properties
MONGO_URI=mongodb+srv://<username>:<password>@cluster0.lgtwlnt.mongodb.net/<dbname>?retryWrites=true&w=majority
PORT=5000
JWT_SECRET=your-super-secret-key-here
NODE_ENV=development
```

> ⚠️ **Important:** Replace `<username>`, `<password>`, and `<dbname>` with your own MongoDB credentials. Never commit `.env` files to version control.

```bash
# Seed health tips (optional but recommended)
node scripts/seedHealthTips.js

# Start backend server
npm start
# Server will run on http://localhost:5000
```

### 3️⃣ Frontend Setup

Open a **new terminal window**:

```bash
# Navigate to frontend folder
cd frontend

# Install dependencies
npm install

# Create .env file (optional)
touch .env
```

Add to frontend `.env` (if needed):

```properties
REACT_APP_API_URL=http://localhost:5000
```

Update `package.json` to add proxy:

```json
{
  "name": "frontend",
  "version": "0.1.0",
  "proxy": "http://localhost:5000",
  // ... rest of config
}
```

```bash
# Start frontend development server
npm start
# Frontend will run on http://localhost:3000
```

### 4️⃣ Verify Setup

1. Backend running: Visit `http://localhost:5000` - should see "API is running"
2. Frontend running: Visit `http://localhost:3000` - should see login page
3. Test login/signup functionality

---

## 🧩 Architecture Overview

The system uses a Client–Server, Layered, and MVC architecture.

### 1️⃣ Presentation Layer – Frontend (React.js)

- Handles UI & routing
- Communicates with backend via REST APIs
- Role-based dashboards:
  - **Patient Dashboard** → Profile + Goals + Reminders + Health Insights
  - **Provider Dashboard** → Assigned Patients List + Patient Detail View

---

### 2️⃣ Application Layer – Backend (Express.js)

Backend follows MVC Pattern:

| Component  | Location       | Responsibility                    |
| ---------- | -------------- | --------------------------------- |
| Model      | `/models`      | Database schema & relations       |
| Controller | `/controllers` | Business logic                    |
| Routes     | `/routes`      | Map HTTP endpoints to controllers |

Other backend components:

- JWT Auth Middleware
- Error Handling Middleware
- CORS + JSON Body Parsing

---

### 3️⃣ Data Layer – MongoDB + Mongoose

| Entity             | Description                   | Relationship          |
| ------------------ | ----------------------------- | --------------------- |
| Patient            | Personal + clinical data      | Belongs to 1 provider |
| HealthcareProvider | Hospital/doctor details       | Has many patients     |
| PatientGoal        | Step count, sleep & hydration | 1-to-1 with patient   |
| PatientReminder    | Checkups + alerts             | 1-to-1 with patient   |
| Reminder           | Medication/appointment alerts | Many per patient      |
| HealthTip          | Daily health tips             | System-wide           |

Uses efficient `populate()` to fetch linked data.

---

## 🔄 High-Level User Flow

### 🔹 Patient

1. Signup/Login → JWT issued
2. Fill health details + join provider using provider code
3. Dashboard features:
   - Profile data
   - Preventive health insights
   - Daily health tips
   - Medication/appointment reminders
   - Future health checkups

### 🔹 Provider

1. Secure Registration & Login → Receive unique provider code (e.g., `DR-ABC123`)
2. Share provider code with patients
3. View assigned patients (only those who joined using your code)
4. Create and manage reminders for patients
5. View patient details (clinical + lifestyle data)

---

## 🔐 Authentication & Authorization

| Feature                                     | Status |
| ------------------------------------------- | ------ |
| JWT signing + decoding                      | ✔      |
| Password hashing with bcrypt                | ✔      |
| Role-based access control                   | ✔      |
| Provider can only access their own patients | ✔      |
| Unique provider codes for patient linking   | ✔      |

Both Patient and Provider use the same auth system, distinguished by role encoded in JWT.

---

## ✨ Key Features (MVP Completed)

| Module                       | Capability                               |
| ---------------------------- | ---------------------------------------- |
| Authentication               | Patient + Provider JWT auth              |
| Patient Self Service         | View & update profile, goals             |
| Provider Code System         | Unique codes for patient-provider linking|
| Reminder System              | Scheduled health reminders (CRUD)        |
| Provider Portal              | View + update assigned patient reminders |
| Health Tips                  | Daily rotating preventive health tips    |
| Auto Health Insights         | Rule-based prevention tips               |

---

## 📌 API Endpoints

### Authentication
```
POST /api/auth/patient/signup
POST /api/auth/patient/login
POST /api/auth/provider/signup  → Returns unique provider code
POST /api/auth/provider/login
```

### Patient
```
GET  /api/patients/me                    - Get dashboard with reminders & tips
PUT  /api/patients/me/goals              - Update health goals
POST /api/patients/me/assign-provider    - Join provider using code
```

### Provider
```
GET  /api/providers/me/patients          - Get all assigned patients
GET  /api/providers/patients/:patientId  - Get patient details
```

### Reminders
```
GET    /api/reminders                    - Get all reminders
POST   /api/reminders                    - Create reminder
PUT    /api/reminders/:id                - Update reminder
DELETE /api/reminders/:id                - Delete reminder
PATCH  /api/reminders/:id/complete       - Mark as completed
```

### Health Tips
```
GET    /api/health-tips                  - Get health tips
GET    /api/health-tips/random           - Get random tip
POST   /api/health-tips                  - Create tip (provider only)
PUT    /api/health-tips/:id              - Update tip
DELETE /api/health-tips/:id              - Delete tip
```

---

## 🧪 Code Quality (Tools Integrated)

| Tool              | Purpose                   |
| ----------------- | ------------------------- |
| ESLint + Prettier | Code linting & formatting |

---

## 🧬 Design Patterns Used

| Pattern                              | Where Applied         | Benefit                 |
| ------------------------------------ | --------------------- | ----------------------- |
| MVC                                  | Backend structure     | Modularity, scalability |
| Middleware / Chain of Responsibility | Auth, error handling  | Reusable security layer |
| Repository Pattern via Mongoose      | Model DB ops          | DB abstraction          |
| Separation of Concerns               | Routes vs Controllers | Easy collaboration      |

---

## 📍 Deployment Strategy

### Current Setup (Separate Hosting)
- **Frontend:** Deployed on Vercel
- **Backend:** Deployed on Render
- **Database:** MongoDB Atlas Cloud

### For Local Development
- Backend runs on `http://localhost:5000`
- Frontend runs on `http://localhost:3000`
- Frontend uses proxy to connect to backend API

---

## 🐛 Troubleshooting

### Backend not connecting to MongoDB
- Verify MongoDB URI in `.env`
- Check MongoDB Atlas network access (whitelist your IP)
- Ensure database user has read/write permissions

### Frontend can't reach backend
- Verify backend is running on port 5000
- Check proxy configuration in frontend `package.json`
- Ensure CORS is enabled in backend

### Provider code not generating
- Run the updated `authController.js`
- Verify `providerCode` field exists in HealthcareProvider model

---

## 📧 Support

For issues or questions, please create an issue in the repository.

---

## 📄 License

This project is licensed under the MIT License.
