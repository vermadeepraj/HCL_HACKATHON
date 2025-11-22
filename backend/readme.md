

# 🏥 Healthcare Preventive Care Platform

A Smart Healthcare System connecting Patients and Healthcare Providers for preventive healthcare, lifestyle monitoring, and reminder-driven care.

---

## 🚀 Tech Stack

| Layer          | Technology                                       |
| -------------- | ------------------------------------------------ |
| Frontend       | React, Tailwind CSS        |
| Backend        | Node.js, Express.js (MVC Architecture)           |
| Database       | MongoDB Atlas, Mongoose ODM                      |
| Authentication | JWT (role-based: patient/provider)               |
| Security       | Bcrypt hashing, Protected routes with middleware |


---

## 🧩 Architecture Overview

The system uses a Client–Server, Layered, and MVC architecture.

### 1️⃣ Presentation Layer – Frontend (React.js)

 Handles UI & routing
 Communicates with backend via REST APIs
 Role-based dashboards:

   Patient Dashboard → Profile + Goals + Reminders + Health Insights
   Provider Dashboard → Assigned Patients List + Patient Detail View

---

### 2️⃣ Application Layer – Backend (Express.js)

Backend follows MVC Pattern:

| Component  | Location       | Responsibility                    |
| ---------- | -------------- | --------------------------------- |
| Model      | `/models`      | Database schema & relations       |
| Controller | `/controllers` | Business logic                    |
| Routes     | `/routes`      | Map HTTP endpoints to controllers |

Other backend components:

 JWT Auth Middleware
 Error Handling Middleware
 CORS + JSON Body Parsing

---

### 3️⃣ Data Layer – MongoDB + Mongoose

| Entity             | Description                   | Relationship          |
| ------------------ | ----------------------------- | --------------------- |
| Patient            | Personal + clinical data      | Belongs to 1 provider |
| HealthcareProvider | Hospital/doctor details       | Has many patients     |
| PatientGoal        | Step count, sleep & hydration | 1-to-1 with patient   |
| PatientReminder    | Checkups + alerts             | 1-to-1 with patient   |

Uses efficient `populate()` to fetch linked data.

---

## 🔄 High-Level User Flow

### 🔹 Patient

1. Signup/Login → JWT issued
2. Fill health details + select provider
3. Dashboard features:

    Profile data
    Preventive health insights
    Water/hydration reminder
    Future health checkups

### 🔹 Provider

1. Secure Registration & Login
2. View only assigned patients (authorization enforced)
3. Update health checkup reminders
4. View patient details (clinical + lifestyle data)

---

## 🔐 Authentication & Authorization

| Feature                                     | Status |
| ------------------------------------------- | ------ |
| JWT signing + decoding                      | ✔      |
| Password hashing with bcrypt                | ✔      |
| Role-based access control                   | ✔      |
| Provider can only access their own patients | ✔      |

Both Patient and Provider use the same auth system, distinguished by role encoded in JWT.

---

## ✨ Key Features (MVP Completed)

| Module               | Capability                               |
| -------------------- | ---------------------------------------- |
| Authentication       | Patient + Provider JWT auth              |
| Patient Self Service | View & update profile, goals             |
| Reminder System      | Scheduled health reminders               |
| Provider Portal      | View + update assigned patient reminders |
| Auto Health Insights | Rule-based prevention tips               |

---

## 🧪 Code Quality (Tools Integrated)

| Tool                       | Purpose                   |
| -------------------------- | ------------------------- |
| ESLint + Prettier          | Code linting & formatting |


---

## 🧬 Design Patterns Used

| Pattern                              | Where Applied         | Benefit                 |
| ------------------------------------ | --------------------- | ----------------------- |
| MVC                                  | Backend structure     | Modularity, scalability |
| Middleware / Chain of Responsibility | Auth, error handling  | Reusable security layer |
| Repository Pattern via Mongoose      | Model DB ops          | DB abstraction          |
| Separation of Concerns               | Routes vs Controllers | Easy collaboration      |

---

## 📌 API Structure Overview

| Area              | Route Prefix                  |
| ----------------- | ----------------------------- |
| Authentication    | `/api/auth/...`               |
| Patient APIs      | `/api/patients/...`           |
| Provider APIs     | `/api/providers/...`          |
| Goals & Reminders | Nested under patient/provider |

---

## 📍 Deployment Strategy

 Deploy on Render
 MongoDB Atlas Cloud DB

---

