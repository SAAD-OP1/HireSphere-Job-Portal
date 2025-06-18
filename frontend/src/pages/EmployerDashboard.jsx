import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../pageStyles/EmployerDashboard.css';
import { FaMapMarkerAlt } from 'react-icons/fa';
import { FaRupeeSign } from 'react-icons/fa';
import SkillBadge from '../Components/SkillBadge';

const EmployerDashboard = () => {
  const [jobs, setJobs] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await fetch('https://hiresphere-job-portal.onrender.com/api/jobs/jobsPosted', {
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
            <div className="job-card-header">
              <a href={`/profile/employer/${job.createdBy?._id}`} target="_blank" rel="noopener noreferrer" className="company-name">
                  <img
                    src={job.createdBy.image || 'https://res.cloudinary.com/duomt9kpq/image/upload/v1750155820/Default_pfp_cqmuzx.jpg'}
                    alt="Company Logo"
                    className="job-company-logo"
                  />
                </a>
                <div className="job-header-info">
                  <h3 className="job-title">{job.title}</h3>
                  <a
                    href={`/profile/employer/${job.createdBy?._id}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="company-name"
                  >
                    {job.company}
                  </a>

                  <div className="job-meta-icons">
                    <div className="icon-item">
                      <FaMapMarkerAlt style={{ color: '#555', marginRight: '5px' }} />
                      {job.location}
                    </div>
                    <div className="icon-item">
                      <FaRupeeSign style={{ color: '#555', marginRight: '5px' }} />
                      {job.salary}
                    </div>
                  </div>
                </div>
              </div>

            <p className="industry">{job.industry}</p>
            <p className="posted">Posted on: {new Date(job.postingDate).toLocaleDateString()}</p>

            <div className="job-footer">
              <SkillBadge skills={job.skills} readOnly={true} />
              <button
                className="view-app-btn"
                onClick={() => navigate(`/employer/view-applications/${job._id}`)}
              >
                View Applications
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
