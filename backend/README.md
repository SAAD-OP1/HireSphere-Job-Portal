
# 📦 HireSphere Backend

This is the backend for **HireSphere**, a job portal web application built with Node.js, Express, MongoDB, and Mongoose. It supports functionality for both **Job Seekers** and **Employers**, including authentication, job posting, job applications, and more.

---

## 🚀 Features

- 🔐 JWT-based authentication
- 👥 Separate models for Job Seekers and Employers
- 📄 Job Posting and Management
- 📨 Job Application System with status tracking
- 📊 Stats APIs for dashboard displays
- 🖼️ File upload support via Multer

---

## 🛠️ Tech Stack

- **Node.js**
- **Express**
- **MongoDB** with **Mongoose**
- **JWT** for authentication
- **Zod** for validation
- **Multer** for image uploads
- **CORS** for cross-origin support
- **Dotenv** for environment configuration

---

## 📦 Installation

```bash
cd backend
npm install
```

---

## 🔧 Environment Setup

Navigate to db.js and update the following line
```
mongoose.connect('Give DB URL')
```
by pasting your MongoDB Database URL.

---

## ▶️ Running the Server

```bash
npm start
```

The server will start on `http://localhost:3000`.
---

## 📄 Database Schemas

### 🧑‍💼 Employee

```js
{
  email: String,
  password: String,
  name: String,
  phoneNumber: String,
  jobRole: String,
  image: String, // Optional
  introduction: String, //Optional
  skills: [String]  //Optional
}
```

### 🧑‍💻 Employer

```js
{
  email: String,
  password: String,
  name: String,
  companyName: String
}
```

### 💼 Job

```js
{
  title: String,
  company: String,
  industry: String,
  location: String,
  postingDate: Date,
  openingsLeft: Number,
  skills: [String],
  createdBy: ObjectId (Employer)
}
```

### 📬 Application

```js
{
  employeeID: ObjectId (Employee),
  jobID: ObjectId (Jobs),
  coverLetter: String,
  status: "Pending" | "Reviewed" | "Accepted" | "Rejected"
}
```

---

## 📫 API Endpoints Overview

- `/api/employee/signup`, `/signin`
- `/api/employer/signup`, `/signin`
- `/api/jobs/postJob`, `/viewJobs`, `/jobsPosted`, `/stats/jobs-count`
- `/api/applications/apply/:jobID`, `/viewApplications`, `/jobApplications`, `/:applicationId/status`

---

## ✅ Dependencies

```json
"cors": "^2.8.5",
"dotenv": "^16.5.0",
"express": "^5.1.0",
"jsonwebtoken": "^9.0.2",
"mongoose": "^8.13.2",
"multer": "^1.4.5-lts.2",
"zod": "^3.24.2"
```

---

## 🧪 Testing

Use tools like **Postman** to test APIs or connect with the frontend project built using React.

---

