import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../pageStyles/EmployerDashboard.css';

const EmployerDashboard = () => {
  const [jobs, setJobs] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await fetch('http://localhost:3000/api/jobs/jobsPosted', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        const data = await res.json();
        setJobs(data || []);
      } catch (err) {
        console.error('Failed to fetch jobs:', err);
      }
    };

    fetchJobs();
  }, []);

  return (
    <div className="employer-dashboard">
      <div className="dashboard-header">
        <h2>Your Posted Jobs</h2>
        <button onClick={() => navigate('/employer/create-job')} className="post-job-btn">
          + Post New Job
        </button>
      </div>

      {jobs.length === 0 ? (
        <p className="no-jobs">You haven't posted any jobs yet.</p>
      ) : (
        <div className="job-list">
          {jobs.map((job, index) => (
            <div key={index} className="job-card">
              <div className="job-info">
                <h3>{job.title}</h3>
                <p><strong>Company:</strong> {job.company}</p>
                <p><strong>Industry:</strong> {job.industry}</p>
                <p><strong>Location:</strong> {job.location}</p>
                <p><strong>Openings Left:</strong> {job.openingsLeft}</p>
                <p><strong>Skills:</strong> {job.skills.join(', ')}</p>
                <p><strong>Posted On:</strong> {new Date(job.postingDate).toLocaleDateString()}</p>
              </div>
              <div className="job-actions">
                <button 
                  onClick={() => navigate(`/employer/view-applications/${job._id}`)} 
                  className="view-app-btn">View Applications
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default EmployerDashboard;
