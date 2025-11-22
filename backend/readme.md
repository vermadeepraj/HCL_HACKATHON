 Architecture Overview

 Tech Stack

- Frontend: Next.js (App Router), React, Tailwind CSS  
- Backend: Node.js, Express.js (MVC architecture)  
- Database: MongoDB Atlas with Mongoose ODM  
- Auth: JWT (JSON Web Tokens) with HTTP-only cookies / Authorization header  
- CI/CD: GitHub Actions (lint, test, build, deploy)  

 Architectural Pattern

The system follows a client–server, layered architecture with a clear separation of concerns:

1. Presentation Layer (Frontend – Next.js)  
   - Handles routing, UI, and user interactions.  
   - Communicates with backend via REST APIs (`/api/...`).  
   - Provides:
     - Landing page
     - Patient signup/login flow
     - Healthcare provider signup/login flow
     - Patient dashboard (profile + goals + reminders)
     - Provider dashboard (patient list + patient detail view)

2. Application Layer (Backend – Express MVC)  
   - Implements REST APIs consumed by the frontend.  
   - Organized using MVC:
     - Models – Mongoose schemas for `Patient`, `HealthcareProvider`, `PatientGoal`, `PatientReminder`.
     - Controllers – Business logic (authentication, dashboard data, CRUD).
     - Routes – Map HTTP endpoints to controllers.
   - Cross-cutting concerns are handled by middleware:
     - Authentication (JWT verification)
     - Error handling
     - CORS and JSON parsing

3. Data Layer (MongoDB + Mongoose)  
   - Stores persistent data:
     - Patients and their clinical + lifestyle information.
     - Healthcare providers and their assigned patients.
     - Patient goals and preventive care reminders.
   - Relationships:
     - A HealthcareProvider has many Patients.
     - A Patient has exactly one PatientGoal document and one PatientReminder document.

 High-Level User Flow

1. Landing Page
   - User chooses whether they are a Patient or Healthcare Provider.

2. Authentication
   - Signup/Login endpoints:
     - `POST /api/auth/patient/signup`, `POST /api/auth/patient/login`
     - `POST /api/auth/provider/signup`, `POST /api/auth/provider/login`
   - Passwords are hashed with bcrypt.
   - Successful login returns a JWT that encodes the user id and role (`patient` or `provider`).

3. Patient Flow
   - After signup/login, patient fills detailed data:
     - Name, address, age, blood group, weight, height, BMI
     - Habits, diseases, symptoms, sleep cycle, goals
   - Backend stores core data in Patient model and related goal/reminder documents in PatientGoal and PatientReminder.
   - Patient dashboard (Next.js page) calls:
     - `GET /api/patients/me`  
       Response includes:
       - Profile data
       - Goals (sleep cycle, steps, hydration)
       - Preventive care reminders
       - Water reminder
       - Upcoming health checkups
       - Health tip (can be static or rule-based to start)

4. Healthcare Provider Flow
   - Provider signs up with registration data (name, type, registration number, specialization, contact, address, consent).
   - Once patients are linked to a provider, dashboard calls:
     - `GET /api/providers/me/patients` – list of assigned patients.
     - `GET /api/providers/patients/:patientId` – detail view of a single patient (including goals + reminders).

 Design Patterns

- Model–View–Controller (MVC)  
  - Models: Mongoose schemas and their relations.  
  - Controllers: Request handling and orchestration of business rules.  
  - Views: Not on the backend; the "view" responsibility is Next.js (frontend). Backend returns JSON.

- Middleware / Chain of Responsibility (Express)  
  - Authentication (`authMiddleware`) and error handling are implemented as Express middleware, forming a pipeline that processes requests before controller logic runs.

- Repository-like Pattern via Mongoose Models  
  - Each Mongoose model (`Patient`, `HealthcareProvider`, etc.) encapsulates data access logic (find, update, populate).  
  - Controllers depend on these models (repositories) instead of raw database operations.

- Separation of Concerns & Single Responsibility  
  - Routes only define URL structure.  
  - Controllers focus on business logic.  
  - Models define data shape.  
  - Middleware handles cross-cutting concerns (auth, errors, CORS).  

This structure keeps the project modular, testable, and easy for multiple team members to work on simultaneously (frontend + backend + DevOps).
