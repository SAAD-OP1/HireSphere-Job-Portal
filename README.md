# 💼 HireSphere - Job Portal

[![GitHub Repo](https://img.shields.io/badge/HireSphere-Job_Portal-blue?style=flat-square&logo=github)](https://github.com/SAAD-OP1/HireSphere-Job-Portal)

**HireSphere** is a full-stack job portal built with **MERN (MongoDB, Express, React, Node.js)** that bridges the gap between job seekers and recruiters. It provides an intuitive interface for recruiters to post jobs and review applications, and for job seekers to find relevant job opportunities and apply with personalized cover letters.

---

## ✨ Features

### 👨‍💼 For Employers
- Sign up and login securely.
- Post new job listings with custom requirements.
- View all jobs posted by them.
- View applications for a specific job.
- Update the status of applications (Pending, Reviewed, Accepted, Rejected).

### 👨‍🔧 For Job Seekers
- Sign up and login securely.
- View all available job listings.
- Apply to a job with a personalized cover letter.
- View all submitted applications and their statuses.

### 🔒 Authentication
- JWT-based secure login.
- Role-based route protection for both employers and job seekers.

---

## 📁 Folder Structure

```plaintext
HireSphere-Job-Portal/
├── backend/        # Express API + MongoDB models
├── frontend/       # React app
└── README.md       # You're here!
```

---

## 🚀 Installation

> 💡 Make sure you have **Node.js**, **npm**, and **MongoDB** installed locally.

### Clone the repo

```bash
git clone https://github.com/SAAD-OP1/HireSphere-Job-Portal.git
cd HireSphere
```

---

### 💻 Backend Setup

```bash
cd backend
npm install
```

Create a .env file and fill the below details 
```
MONGO_URL=<YOUR MONGODB CONNECTION STRING/URL>
JWT_SECRET=<YOUR_PASSWORD>
```

Note: Make sure to use no spaces or single or double quotes in the above given two lines.

- Start the backend server:

```bash
npm start
```

---

### 🌐 Frontend Setup

```bash
cd ../frontend
npm install
```

- Start the React app:

```bash
npm start
```

---

## 📄 License

This project is licensed under the **MIT License** – feel free to use and contribute.

---

## 🙌 Contributing

Pull requests are welcome! For major changes, please open an issue first to discuss what you would like to change.

---

## 🧑‍💻 Author

Made with ❤️ by [@SAAD-OP1](https://github.com/SAAD-OP1)

