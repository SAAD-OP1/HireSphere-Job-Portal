import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './Components/Navbar';
import Landing from './pages/Landing';
import SignUp from './pages/SignUp';
import SignIn from './pages/SignIn';
import EmployerDashboard from './pages/EmployerDashboard';
import CreateJob from './pages/CreateJob';
import ViewApplications from './pages/ViewApplications';
import JobSeekerDashboard from './pages/JobSeekerDashboard';
import MyApplications from './pages/MyApplications';
import EditApplication from './pages/EditApplication';
import Profile from './pages/Profile';
import ApplyToJob from './pages/ApplyToJob';

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />

        {/* Employer Routes */}
        <Route path="/employer/dashboard" element={<EmployerDashboard />} />
        <Route path="/employer/create-job" element={<CreateJob />} />
        <Route path="/employer/view-applications/:jobId" element={<ViewApplications />} />


        {/* Employee Routes */}
        <Route path="/employee/dashboard" element={<JobSeekerDashboard />} />
        <Route path="/employee/apply-job/:id" element={<ApplyToJob />} />
        <Route path="/employee/my-applications" element={<MyApplications />} />
        <Route path="/employee/edit-application/:id" element={<EditApplication />} />
        <Route path="/employee/profile" element={<Profile />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
