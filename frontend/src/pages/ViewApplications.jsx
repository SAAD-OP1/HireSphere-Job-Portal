import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import '../pageStyles/ViewApplications.css';

const ViewApplications = () => {
  const { jobId } = useParams();
  const [applications, setApplications] = useState([]);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const res = await fetch(`https://hiresphere-job-portal.onrender.com/api/applications/jobApplications/${jobId}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        });

        const data = await res.json();
        if (res.ok) {
          setApplications(data.applications);
        } else {
          setError(data.error || 'Failed to fetch applications');
        }
      } catch (err) {
        setError('Server error while fetching applications');
      }
    };

    fetchApplications();
  }, [jobId]);

  const handleStatusChange = async (appId, newStatus) => {
    try {
      const res = await fetch(`https://hiresphere-job-portal.onrender.com/api/applications/${appId}/status`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({ status: newStatus })
      });

      const data = await res.json();
      if (res.ok) {
        setApplications(prev =>
          newStatus === 'Accepted' || newStatus === 'Rejected'
            ? prev.filter(app => app._id !== appId) // remove it from the list
            : prev.map(app => app._id === appId ? { ...app, status: newStatus } : app)
        );
      } else {
        alert(data.error || 'Failed to update status');
      }
    } catch (err) {
      alert('Error updating application status');
    }
  };

  if (error) return <div className="error">{error}</div>;

  return (
    <div className="applications-container">
      <h2>Applications Received</h2>

      {applications.length === 0 ? (
        <p>No applications yet.</p>
      ) : (
        applications.map((app) => (
          <div key={app._id} className="application-card">
            <div className="applicant-info">
              <p><strong>Name:</strong> {app.employeeID.name}</p>
              <p><strong>Email:</strong> {app.employeeID.email}</p>
              <p><strong>Cover Letter:</strong> {app.coverLetter || 'Not provided'}</p>

              <p>
                <strong>Status:</strong>{' '}
                <select
                  value={app.status}
                  onChange={(e) => handleStatusChange(app._id, e.target.value)}
                  className={`status-dropdown ${app.status.toLowerCase()}`}
                >
                  <option value="Pending">Pending</option>
                  <option value="Reviewed">Reviewed</option>
                  <option value="Accepted">Accepted</option>
                  <option value="Rejected">Rejected</option>
                </select>
              </p>
            </div>

            <div className="application-actions">
              <button
                className="view-profile-btn"
                onClick={() => navigate(`/profile/employee/${app.employeeID._id}`)}
              >
                View Profile
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default ViewApplications;
