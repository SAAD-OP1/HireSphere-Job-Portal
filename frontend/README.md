# HireSphere Frontend

This is the frontend of the **HireSphere** job portal web application. It is built using **React**, and allows job seekers and recruiters to interact through job postings and applications.

## 🧰 Tech Stack

- **React 19**
- **React Router DOM 7**
- **Axios** for HTTP requests

## 🚀 Features

- 🔐 Sign up & sign in for both job seekers and recruiters
- 👨‍💼 Employer dashboard to post jobs and view applications
- 👋 Job seeker dashboard to browse jobs, apply, and track applications
- 📄 Cover letter support for job applications
- 🔄 Token-based authentication (JWT)
- 🌐 REST API integration with backend server

## 📦 Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/hiresphere/frontend.git
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm start
   ```

Frontend will be available at:  
`http://localhost:5173` (or whichever port your dev server starts on).

> **Make sure your backend server is also running at `http://localhost:3000`.**

## 🔗 Environment Setup

Create a `.env` file if needed to store environment variables like base URLs (optional if hardcoded).

Example:
```env
VITE_BACKEND_URL=http://localhost:3000
```

## 📁 Folder Structure

```
src/
│
├── pages/              # All page components like SignIn, SignUp, Dashboard, etc.
├── components/         # Shared components like Navbar, Footer, etc.
├── pageStyles/         # CSS modules or global styles for pages
├── App.jsx             # App routing
└── main.jsx            # React entry point
```

## 📸 Screenshots

_Add screenshots here if needed._

## ✅ To Do

- [ ] Add profile image upload for job seekers
- [ ] Enhance job filtering and search
- [ ] Add toast notifications
- [ ] Improve responsiveness for mobile

---

## 📜 License

This project is open-source and available under the [MIT License](LICENSE).

