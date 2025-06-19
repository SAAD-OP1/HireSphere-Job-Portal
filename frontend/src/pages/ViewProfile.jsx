import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../pageStyles/ViewProfile.css';
import SkillBadge from '../Components/SkillBadge';
import MissingField from '../Components/MissingField';
import { FaEnvelope, FaPhoneAlt, FaMapMarkerAlt } from 'react-icons/fa';
const ViewProfile = () => {
  const [profile, setProfile] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchProfile() {
      const res = await fetch('https://hiresphere-job-portal.onrender.com/api/employee/me', {
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
  const requiredFields = ['email','name','phoneNumber','jobRole','introduction','skills','image','basicInfo','experience'];
  let filled = 0;

  for (let field of requiredFields) {
    const value = profile[field];

    if (field === 'skills' && Array.isArray(value)) {
      // Count only if there's at least one non-empty skill
      if (value.some(skill => skill && skill.trim() !== '')) filled++;
    }

    else if (field === 'basicInfo' && typeof value === 'object' && value !== null) {
      // Require all 3: age, highestQualification, and location to be non-empty
      if (
        value.age !== null && value.age !== '' &&
        value.highestQualification && value.highestQualification.trim() !== '' &&
        value.location && value.location.trim() !== ''
      ) {
        filled++;
      }
    }

    else if (field === 'experience' && Array.isArray(value)) {
      // At least one experience with all fields filled
      if (value.some(exp =>
        exp.role && exp.role.trim() !== '' &&
        exp.company && exp.company.trim() !== '' &&
        exp.duration && exp.duration.trim() !== ''
      )) {
        filled++;
      }
    }

    else if (typeof value === 'string' && value.trim() !== '') {
      filled++;
    }
  }

  return Math.floor((filled / requiredFields.length) * 100);
};



  if (!profile) return <div>Loading...</div>;

  return (
    <div className="profile-container">
  <div className="profile-grid">
    
    {/* Left Sidebar */}
    <div className="left-panel">
      <img
        src={profile.image || ''}
        alt="Profile"
        className="profile-image"
      />
      <p><strong>Name:</strong> {profile.name}</p>
      <h3>Introduction</h3>
      <p>{profile.introduction || <MissingField />}</p>
      <h3>Skills</h3>
      <SkillBadge skills={profile.skills}  readOnly={false} />
    </div>

    {/* Center Content */}
    <div className="center-panel">
      <h2>Profile Information</h2>

      <div className="profile-line">
        <p><strong>Highest Qualification:</strong> {profile.basicInfo?.highestQualification || <MissingField />}</p>
        <p><strong>Job Role:</strong> {profile.jobRole || <MissingField />}</p>
        <p>
          <FaMapMarkerAlt style={{ marginRight: '8px', color: '#555' }} />
          {profile.basicInfo?.location || <MissingField />}
        </p>
      </div>

      <div className="profile-line">
        <p><strong>Age:</strong> {profile.basicInfo?.age || <MissingField />}</p>
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
