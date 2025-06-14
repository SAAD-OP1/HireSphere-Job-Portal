import '../pageStyles/ViewEmployerProfile.css';
const EmployerProfileView = ({ profile }) => {
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
          <p><strong>Industry:</strong> {profile.industry || "N/A"}</p>
          <p><strong>Location:</strong> {profile.location || "N/A"}</p>
          <p><strong>Website:</strong> {profile.website ? (
            <a href={profile.website} target="_blank" rel="noopener noreferrer">{profile.website}</a>
          ) : "N/A"}</p>
          <p><strong>Description:</strong> {profile.description || "N/A"}</p>
        </div>
      </div>
    </div>
  );
};

export default EmployerProfileView;