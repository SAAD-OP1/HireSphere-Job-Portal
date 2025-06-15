import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../pageStyles/JobSeekerDashboard.css';
import { FaMapMarkerAlt } from 'react-icons/fa';
import { FaRupeeSign } from 'react-icons/fa';
import SkillBadge from '../Components/SkillBadge';

const JobSeekerDashboard = () => {
  const [jobs, setJobs] = useState([]);
  const navigate = useNavigate();
  const [filter, setFilter] = useState({ salary: '', location: '' });

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilter(prev => ({ ...prev, [name]: value }));
  };

  const fetchJobs = async () => {
    try {
      const token = localStorage.getItem('token');
      const params = new URLSearchParams();
      if (filter.salary) params.append('salary', filter.salary);
      if (filter.location) params.append('location', filter.location);

      const response = await fetch(`https://hiresphere-job-portal.onrender.com/api/jobs/viewJobs?${params.toString()}`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });

      const data = await response.json();
      setJobs(data);
    } catch (err) {
      console.error('Error fetching jobs:', err);
    }
  };


  useEffect(() => {
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

      <div className="filters">
        <input
          type="number"
          name="salary"
          placeholder="Minimum Salary"
          value={filter.salary}
          onChange={handleFilterChange}
        />
        <input
          type="text"
          name="location"
          placeholder="Location"
          value={filter.location}
          onChange={handleFilterChange}
        />
        <button onClick={fetchJobs}>Filter</button>
      </div>

      <div className="jobs-list">
        {jobs.length === 0 ? (
          <p>No jobs found.</p>
        ) : (
          jobs.map((job) => (
            <div className="job-card" key={job._id}>
              <div className="job-card-header">
                <a
                    href={`/profile/employer/${job.createdBy?._id}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <img
                      src={
                        job.createdBy?.image
                          ? `https://hiresphere-job-portal.onrender.com/${job.createdBy.image}`
                          : 'https://hiresphere-job-portal.onrender.com/uploads/default-profile.png'
                      }
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

              <div className="job-card-body">
                <p><strong>Industry:</strong> {job.industry}</p>
                <p><strong>Posted on:</strong> {new Date(job.postingDate).toLocaleDateString()}</p>
                <div className="job-footer">
                  <SkillBadge skills={job.skills} readOnly={true} />
                  <button className="apply-btn" onClick={() => handleApply(job._id)}>
                    Apply
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default JobSeekerDashboard;
