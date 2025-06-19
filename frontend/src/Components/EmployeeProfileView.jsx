import SkillBadge from '../Components/SkillBadge';
import '../pageStyles/ViewProfile.css';
import { FaEnvelope, FaPhoneAlt, FaMapMarkerAlt } from 'react-icons/fa';
const EmployeeProfileView = ({ profile }) => {

  return (
    <div className="profile-container">
      <div className="profile-grid">
        {/* Left Sidebar */}
        <div className="left-panel">
          <img src={profile.image || 'https://res.cloudinary.com/duomt9kpq/image/upload/v1750155820/Default_pfp_cqmuzx.jpg'} alt="Profile" className="profile-image" />
          <p><strong>Name:</strong> {profile.name}</p>
          <h3>Introduction</h3>
          <p>{profile.introduction || "N/A"}</p>
          <h3>Skills</h3>
          <SkillBadge skills={profile.skills}  readOnly={true} />
        </div>

        {/* Center Panel */}
        <div className="center-panel">
          <h2>Profile Information</h2>

          <div className="profile-line">
            <p><strong>Highest Qualification:</strong> {profile.basicInfo?.highestQualification || "N/A"}</p>
            <p><strong>Job Role:</strong> {profile.jobRole || "N/A"}</p>
            <p>
              <FaMapMarkerAlt style={{ marginRight: '8px', color: '#555' }} />
              {profile.basicInfo?.location || "N/A"}
            </p>
          </div>

          <div className="profile-line">
            <p><strong>Age:</strong> {profile.basicInfo?.age || "N/A"}</p>
            <p>
              <FaEnvelope style={{ marginRight: '8px', color: '#555' }} />
              {profile.email}
            </p>
            <p>
              <FaPhoneAlt style={{ marginRight: '8px', color: '#555' }} />
              {profile.phoneNumber}
            </p>
          </div>

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
      </div>
    </div>
  );
};

export default EmployeeProfileView;
