import '../pageStyles/ViewEmployerProfile.css';
import { FaEnvelope, FaPhoneAlt, FaMapMarkerAlt, FaGlobe } from 'react-icons/fa';

const EmployerProfileView = ({ profile }) => {
return (
    <div className="employer-profile-container">
      <div className="employer-profile-card">

        {/* Profile Image */}
        <div className="employer-image-wrapper">
          <img src={profile.image || ''} alt="Employer" className="employer-image" />
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
            {profile.location || "N/A"}
          </p>
          <p>
            <FaGlobe style={{ marginRight: '8px', color: '#555' }} />
            {profile.website ? (
              <a href={profile.website} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none', color: '#1976d2' }}>
                {profile.website}
              </a>
            ) : "N/A"}
          </p>
          <p><strong>Industry:</strong> {profile.industry || "N/A"}</p> 
          <p><strong>Description:</strong> {profile.description || "N/A"}</p>
        </div>
      </div>
    </div>
  );
};

export default EmployerProfileView;