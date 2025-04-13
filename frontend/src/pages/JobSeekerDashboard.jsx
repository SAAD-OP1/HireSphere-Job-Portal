import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../pageStyles/JobSeekerDashboard.css';

const JobSeekerDashboard = () => {
  const [jobs, setJobs] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch('http://localhost:3000/api/jobs/viewJobs', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        const data = await response.json();
        setJobs(data);
      } catch (err) {
        console.error('Error fetching jobs:', err);
      }
    };

    fetchJobs();
  }, []);


  const handleApply = (jobId) => {
    navigate(`/employee/apply-job/${jobId}`);
  };

  const handleViewApplications = () => {
    navigate('/employee/my-applications');
  };

  return (
    <div className="jobseeker-dashboard">
      <div className="dashboard-header">
        <h2>Available Jobs</h2>
        <button className="view-applications-btn" onClick={handleViewApplications}>
          View My Applications
        </button>
      </div>

      <div className="jobs-list">
        {jobs.length === 0 ? (
          <p>No jobs found.</p>
        ) : (
          jobs.map((job) => (
            <div className="job-card" key={job._id}>
              <div className="job-details">
                <h3>{job.title}</h3>
                <p><strong>Company:</strong> {job.company}</p>
                <p><strong>Industry:</strong> {job.industry}</p>
                <p><strong>Location:</strong> {job.location}</p>
                <p><strong>Openings Left:</strong> {job.openingsLeft}</p>
                <p><strong>Skills:</strong> {job.skills.join(', ')}</p>
                <p><strong>Posted on:</strong> {new Date(job.postingDate).toLocaleDateString()}</p>
              </div>
              <button className="apply-btn" onClick={() => handleApply(job._id)}>
                Apply
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default JobSeekerDashboard;
