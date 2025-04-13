import { useEffect, useState } from 'react';
import '../pageStyles/MyApplications.css';

const MyApplications = () => {
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    const fetchApplications = async () => {
      const token = localStorage.getItem('token');
      if (!token) return;

      try {
        const res = await fetch('http://localhost:3000/api/applications/viewApplications', {
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
        <p>You haven’t applied to any jobs yet.</p>
      ) : (
        <div className="applications-list">
          {applications.map((app) => (
            <div key={app._id} className="application-card">
              <h3>{app.title}</h3>
              <p><strong>Title:</strong> {app.jobID?.title}</p>
              <p><strong>Company:</strong> {app.jobID?.company}</p>
              <p><strong>Location:</strong> {app.jobID?.location}</p>
              <p><strong>Posted on:</strong> {app.jobID?.postingDate ? new Date(app.jobID.postingDate).toLocaleDateString() : 'N/A'}</p>
              <p><strong>Status:</strong> {app.status}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyApplications;
