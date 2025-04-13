import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import '../pageStyles//ViewApplications.css';

const ViewApplications = () => {
  const { jobId } = useParams();
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchApplications = async () => {
    try {
      const res = await fetch(`http://localhost:3000/api/applications/jobApplications/${jobId}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      const data = await res.json();
      setApplications(data.applications);
    } catch (err) {
      console.error('Failed to fetch applications:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (applicationId, newStatus) => {
    try {
      const res = await fetch(`http://localhost:3000/api/applications/${applicationId}/status`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({ status: newStatus })
      });
      if (res.ok) {
        fetchApplications(); // Refresh list after status update
      } else {
        console.error('Failed to update status');
      }
    } catch (err) {
      console.error('Error updating status:', err);
    }
  };

  useEffect(() => {
    fetchApplications();
  }, [jobId]);

  if (loading) return <p>Loading applications...</p>;

  return (
    <div className="applications-container">
      <h2>Applications for this Job</h2>
      {applications.length === 0 ? (
        <p>No applications yet.</p>
      ) : (
        applications.map((app) => (
          <div key={app._id} className="application-card">
            <p><strong>Applicant:</strong> {app.employeeID.name} ({app.employeeID.email})</p>
            <p><strong>Cover Letter:</strong> {app.coverLetter}</p>
            <p><strong>Status:</strong> {app.status}</p>
            <div className="status-controls">
              <label>Change Status:</label>
              <select
                value={app.status}
                onChange={(e) => handleStatusChange(app._id, e.target.value)}
              >
                <option value="Pending">Pending</option>
                <option value="Reviewed">Reviewed</option>
                <option value="Accepted">Accepted</option>
                <option value="Rejected">Rejected</option>
              </select>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default ViewApplications;
