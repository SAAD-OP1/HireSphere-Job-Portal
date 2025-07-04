import { useState, useEffect } from 'react';
import '../pageStyles/EditProfile.css';

const EditProfile = () => {
  const [introduction, setIntroduction] = useState('');
  const [skills, setSkills] = useState('');
  const [image, setImage] = useState(null);
  const [basicInfo, setBasicInfo] = useState({ age: '', highestQualification: '', location: ''});
  const [experience, setExperience] = useState([{ role: '', company: '', duration: '' }]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem('token');
      const res = await fetch('https://hiresphere-job-portal.onrender.com/api/employee/me', {
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await res.json();

      if (data.introduction) setIntroduction(data.introduction);
      if (data.skills) setSkills(data.skills.join(', '));
      if (data.basicInfo) setBasicInfo(data.basicInfo);
      if (data.experience) setExperience(data.experience);
    };
    fetchProfile();
  }, []);

  const handleBasicInfoChange = (e) => {
    setBasicInfo({ ...basicInfo, [e.target.name]: e.target.value });
  };

  const handleExperienceChange = (index, field, value) => {
    const updated = [...experience];
    updated[index][field] = value;
    setExperience(updated);
  };

  const addExperience = () => {
    setExperience([...experience, { role: '', company: '', duration: '' }]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');

    // Validate experience fields
    for (const exp of experience) {
      if (!exp.role || !exp.company || !exp.duration) {
        setMessage('Please fill all fields in each experience entry.');
        return;
      }
    }

    const parsedBasicInfo = {
      ...basicInfo,
      age: basicInfo.age ? parseInt(basicInfo.age) : undefined
    };

    const form = new FormData();
    form.append('introduction', introduction);
    form.append('skills', JSON.stringify(skills.split(',').map(s => s.trim())));
    form.append('basicInfo', JSON.stringify(parsedBasicInfo));
    form.append('experience', JSON.stringify(experience));
    if (image) form.append('image', image);

    try {
      const res = await fetch('https://hiresphere-job-portal.onrender.com/api/employee/update-profile', {
        method: 'PATCH',
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        body: form
      });

      const data = await res.json();
      if (res.ok) {
        setMessage('Profile updated successfully!');
      } else {
        setMessage(data.error || 'Update failed.');
      }
    } catch (err) {
      setMessage('An error occurred. Try again.');
    }
  };



  return (
    <div className="profile-container">
      <h2>Update Your Profile</h2>
      {message && <p className="message">{message}</p>}
      <form onSubmit={handleSubmit} className="profile-form" encType="multipart/form-data">
        <label>Introduction</label>
        <textarea
          value={introduction}
          onChange={(e) => setIntroduction(e.target.value)}
          placeholder="Tell us about yourself"
        />

        <label>Skills (comma-separated)</label>
        <input
          type="text"
          value={skills}
          onChange={(e) => setSkills(e.target.value)}
          placeholder="e.g. JavaScript, React, Node.js"
        />

        <h3>Basic Information</h3>
        <input
          type="text"
          name="highestQualification"
          value={basicInfo.highestQualification}
          placeholder="Highest Qualification"
          onChange={handleBasicInfoChange}
        />
        <input
          type="number"
          name="age"
          value={basicInfo.age}
          placeholder="Age"
          onChange={handleBasicInfoChange}
        />
        <input
          type="text"
          name="location"
          value={basicInfo.location}
          placeholder="Location"
          onChange={handleBasicInfoChange}
        />        
        <h3>Experience</h3>
        {experience.map((exp, index) => (
          <div key={index} className="experience-entry">
            <input
              type="text"
              value={exp.role}
              placeholder="Job Title"
              onChange={(e) => handleExperienceChange(index, 'role', e.target.value)}
            />
            <input
              type="text"
              value={exp.company}
              placeholder="Company Name"
              onChange={(e) => handleExperienceChange(index, 'company', e.target.value)}
            />
            <input
              type="text"
              value={exp.duration}
              placeholder="Years (e.g. 2020-2023)"
              onChange={(e) => handleExperienceChange(index, 'duration', e.target.value)}
            />
            <button
              type="button"
              className="delete-btn"
              onClick={() => {
                const updated = [...experience];
                updated.splice(index, 1); // remove entry
                setExperience(updated);
              }}
            >
              Delete
            </button>
          </div>
        ))}

        <button type="button" onClick={addExperience}>+ Add Experience</button>

        <label>Profile Image</label>
        <input type="file" accept="image/*" onChange={(e) => setImage(e.target.files[0])} />

        <button type="submit">Update Profile</button>
      </form>
    </div>
  );
};

export default EditProfile;
