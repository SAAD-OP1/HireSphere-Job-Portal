import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../pageStyles/ViewEmployerProfile.css';
import MissingField from '../Components/MissingField';
import { FaEnvelope, FaPhoneAlt, FaMapMarkerAlt, FaGlobe } from 'react-icons/fa';

const ViewEmployerProfile = () => {
  const [profile, setProfile] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      const res = await fetch('https://hiresphere-job-portal.onrender.com/api/employer/me', {
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
          <img src={profile.image} alt="Employer" className="employer-image" />
        </div>

        <div className="employer-info">
          <h2>{profile.companyName}</h2>
          <p>
            <FaEnvelope style={{ marginRight: '8px', color: '#555' }} />
            {profile.email}
          </p>
          <p>
            <FaPhoneAlt style={{ marginRight: '8px', color: '#555' }} />
            {profile.phoneNumber}
          </p>
          <p>
            <FaMapMarkerAlt style={{ marginRight: '8px', color: '#555' }} />
            {profile.location || <MissingField />}
          </p>
          <p>
            <FaGlobe style={{ marginRight: '8px', color: '#555' }} />
            {profile.website ? (
              <a href={profile.website} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none', color: '#1976d2' }}>
                {profile.website}
              </a>
            ) : <MissingField />}
          </p>
          <p>
            <strong>Industry:</strong> {profile.industry || <MissingField />}
          </p>
          <p>
            <strong>Description:</strong> {profile.description || <MissingField />}
          </p>
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
