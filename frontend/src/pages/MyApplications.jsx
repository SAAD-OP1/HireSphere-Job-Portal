import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../pageStyles/MyApplications.css';

const MyApplications = () => {
  const [applications, setApplications] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchApplications = async () => {
      const token = localStorage.getItem('token');
      if (!token) return;

      try {
        const res = await fetch('https://hiresphere-job-portal.onrender.com/api/applications/viewApplications', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if (res.ok) {
          const data = await res.json();
          setApplications(data.applications || []);
        } else {
          console.error('Failed to fetch applications');
        }
      } catch (err) {
        console.error('Error:', err);
      }
    };

    fetchApplications();
  }, []);

  return (
    <div className="applications-container">
      <h2>My Applications</h2>

      {applications.length === 0 ? (
        <p>You haven't applied to any jobs yet.</p>
      ) : (
        <div className="applications-list">
          {applications.map((app) => {
            const job = app.jobID;
            const employer = job?.createdBy;

            return (
              <div key={app._id} className="application-card">
                <div className="application-header">
                  <div className="employer-logo">
                    <img
                      src={
                        job.createdBy.image || ''
                      }
                      alt="Employer Logo"
                      onClick={() => navigate(`/profile/employer/${employer?._id}`)}
                    />
                  </div>
                  <div className="job-details">
                    <h3>{job?.title}</h3>
                    <p className="company-name">
                      <strong onClick={() => navigate(`/profile/employer/${employer?._id}`)}>{job?.company}</strong>
                    </p>
                    <p><strong>Location:</strong> {job?.location}</p>
                    <p><strong>Posted:</strong> {new Date(job?.postingDate).toLocaleDateString()}</p>
                  </div>
                </div>

                <div className="application-status">
                  <p><strong>Status:</strong> <span className={`status ${app.status.toLowerCase()}`}>{app.status}</span></p>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default MyApplications;
