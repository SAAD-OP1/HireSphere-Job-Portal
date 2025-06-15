import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import '../pageStyles/ApplyToJob.css';

const ApplyToJob = () => {
  const [coverLetter, setCoverLetter] = useState('');
  const navigate = useNavigate();
  const { id } = useParams(); // jobID from URL

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem('token');
    if (!token) {
      alert("You're not logged in!");
      return;
    }

    try {
      const res = await fetch(`https://hiresphere-job-portal.onrender.com/api/applications/apply/${id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ coverLetter })
      });

      if (res.ok) {
        navigate('/employee/dashboard');
      } else {
        console.error("Failed to apply");
      }
    } catch (err) {
      console.error("Error applying for job:", err);
    }
  };

  return (
    <div className="apply-container">
      <h2>Submit Your Application</h2>
      <form onSubmit={handleSubmit} className="apply-form">
        <textarea
          placeholder="Write your cover letter here..."
          value={coverLetter}
          onChange={(e) => setCoverLetter(e.target.value)}
          required
        ></textarea>
        <button type="submit">Submit Application</button>
      </form>
    </div>
  );
};

export default ApplyToJob;
