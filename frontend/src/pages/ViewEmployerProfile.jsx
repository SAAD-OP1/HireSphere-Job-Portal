import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../pageStyles/ViewEmployerProfile.css';
import MissingField from '../Components/MissingField';

const ViewEmployerProfile = () => {
  const [profile, setProfile] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      const res = await fetch('http://localhost:3000/api/employer/me', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      const data = await res.json();
      setProfile(data);
    };
    fetchProfile();
  }, []);

  if (!profile) return <div>Loading...</div>;

  return (
    <div className="employer-profile-container">
      <div className="employer-profile-card">

        {/* Profile Image */}
        <div className="employer-image-wrapper">
          <img src={`http://localhost:3000/${profile.image ? profile.image : 'uploads/default-profile.png'}`} alt="Employer" className="employer-image" />
        </div>

        <div className="employer-info">
          <h2>{profile.name}</h2>
          <p><strong>Email:</strong> {profile.email}</p>
          <p><strong>Company:</strong> {profile.companyName}</p>
          <p><strong>Industry:</strong> {profile.industry || <MissingField />}</p>
          <p><strong>Location:</strong> {profile.location || <MissingField />}</p>
          <p><strong>Website:</strong> {profile.website ? (
            <a href={profile.website} target="_blank" rel="noopener noreferrer">{profile.website}</a>
          ) : <MissingField />}</p>
          <p><strong>Description:</strong> {profile.description || <MissingField />}</p>
        </div>

        <div className="edit-employer-button">
          <button onClick={() => navigate('/employer/dashboard')}>Go to Dashboard</button>
          <br></br>
          <br></br>
          <button onClick={() => navigate('/employer/edit-profile')}>Edit Profile</button>
        </div>

      </div>
    </div>
  );
};

export default ViewEmployerProfile;
