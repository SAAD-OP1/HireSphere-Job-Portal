import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../PageStyles/ViewProfile.css';

const ViewProfile = () => {
  const [profile, setProfile] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchProfile() {
      const res = await fetch('http://localhost:3000/api/employee/me', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      const data = await res.json();
      setProfile(data);
    }
    fetchProfile();
  }, []);

  const calculateCompletion = (profile) => {
    let fields = ['email', 'name', 'phoneNumber', 'jobRole', 'introduction', 'skills', 'image', 'resume'];
    let filled = fields.filter(field => profile[field] && profile[field].length > 0).length;
    return Math.floor((filled / fields.length) * 100);
  };

  if (!profile) return <div>Loading...</div>;

  return (
    <div className="profile-container">
      {/* Grid Layout */}
      <div className="profile-grid">
        
        {/* Left Sidebar */}
        <div className="left-panel">
          {profile.image && (
            <img
              src={`http://localhost:3000/${profile.image}`}
              alt="Profile"
              className="profile-image"
            />
          )}
          <h3>Introduction</h3>
          <p>{profile.introduction || "N/A"}</p>
          <h3>Skills</h3>
          <p>{profile.skills?.join(', ') || "N/A"}</p>
        </div>

        {/* Center Content */}
        <div className="center-panel">
          <h2>Profile Information</h2>
          <p><strong>Name:</strong> {profile.name}</p>
          <p><strong>Email:</strong> {profile.email}</p>
          <p><strong>Phone:</strong> {profile.phoneNumber}</p>
          <p><strong>Location:</strong> {profile.basicInfo?.location || "N/A"}</p>
          <p><strong>Age:</strong> {profile.basicInfo?.age || "N/A"}</p>
          <p><strong>Job Role:</strong> {profile.jobRole || "N/A"}</p>

          <h3>Experience</h3>
          {profile.experience?.length > 0 ? (
            profile.experience.map((exp, idx) => (
              <div key={idx} className="experience-block">
                <p><strong>Role:</strong> {exp.role}</p>
                <p><strong>Company:</strong> {exp.company}</p>
                <p><strong>Duration:</strong> {exp.duration}</p>
              </div>
            ))
          ) : (
            <p>No experience added yet.</p>
          )}
        </div>

        {/* Right Sidebar */}
        <div className="right-panel">
          <button onClick={() => navigate('/employee/dashboard')}>View Job Postings</button>
          <button onClick={() => navigate('/employee/my-applications')}>My Applications</button>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="bottom-section">
        <div className="progress-container">
          <p>Profile Completion: {calculateCompletion(profile)}%</p>
          <div className="progress-bar">
            <div className="progress" style={{ width: `${calculateCompletion(profile)}%` }}></div>
          </div>
        </div>
        <button className="edit-button" onClick={() => navigate('/employee/edit-profile')}>
          Edit Profile
        </button>
      </div>
    </div>
  
);

};

export default ViewProfile;
