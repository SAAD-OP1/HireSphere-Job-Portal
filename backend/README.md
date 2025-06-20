
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

Create a .env file and fill the below details 
```
MONGO_URL=<YOUR MONGODB CONNECTION STRING/URL>
JWT_SECRET=<YOUR_PASSWORD>
CLOUDINARY_CLOUD_NAME=<YOUR_CLOUDINARY_CLOUD_NAME>
CLOUDINARY_API_KEY=<YOUR_CLOUDINARY_API_KEY>
CLOUDINARY_API_SECRET=<YOUR_CLOUDINARY_API_SECRET>
```
Note: Make sure to use no spaces or single or double quotes in the above given two lines.


---

## ▶️ Running the Server

```bash
npm start
```

The server will start on `https://hiresphere-job-portal.onrender.com`.
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
  image: String
  experience: [{role: String, company: String, duration: String}], //Optional
  basicInfo: {age: Number,highestQualification: String,location: String}, //Optional
  introduction: String, //Optional
  skills: [String], //Optional
}
```

### 🧑‍💻 Employer

```js
{
  email: String,
  password: String,
  companyName: String,
  phoneNumber: String,
  image: String,
  description: String, //Optional
  website: String, //Optional
  location: String, //Optional
  industry: String, //Optional
}
```

### 💼 Job

```js
{
  title: String,
  company: String,
  industry: String,
  location: String,
  salary: Number,
  postingDate: Date,
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

- `/api/employee/signup`, `/signin`, `/stats/employees-count`, `/me`, `/public/:id`, `/update-profile`
- `/api/employer/signup`, `/signin`, `/me`, `/public/:id`, `/update-profile`
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
"multer-storage-cloudinary": "^4.0.0",
"zod": "^3.24.2"
```

---

## 🧪 Testing

Use tools like **Postman** to test APIs or connect with the frontend project built using React.

---

