import { useEffect, useState } from 'react';
import '../pageStyles/EditEmployerProfile.css';

const EditEmployerProfile = () => {
  const [formData, setFormData] = useState({
    companyName: '',
    email: '',
    description: '',
    website: '',
    location: '',
    industry: ''
  });
  const [image, setImage] = useState(null);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchProfile = async () => {
      const res = await fetch('http://localhost:3000/api/employer/me', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      const data = await res.json();
      setFormData({
        companyName: data.companyName || '',
        email: data.email || '',
        phoneNumber: data.phoneNumber || '',
        description: data.description || '',
        website: data.website || '',
        location: data.location || '',
        industry: data.industry || ''
      });
    };
    fetchProfile();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      form.append(key, value);
    });
    if (image) {
      form.append('image', image);
    }

    const res = await fetch('http://localhost:3000/api/employer/update-profile', {
      method: 'PATCH',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      },
      body: form
    });

    const data = await res.json();
    if (res.ok) {
      setMessage('Profile updated successfully!');
    } else {
      setMessage('Update failed.');
    }
  };

  return (
    <div className="edit-employer-profile-container">
      <h2>Edit Employer Profile</h2>
      {message && <p className="success-message">{message}</p>}
      <form className="edit-employer-profile-form" onSubmit={handleSubmit} encType="multipart/form-data">
        <input
          type="text"
          name="companyName"
          placeholder="Company Name"
          value={formData.companyName}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email Address"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="phone"
          placeholder="Phone Number"
          value={formData.phoneNumber}
          onChange={handleChange}
        />
        <input
          type="text"
          name="location"
          placeholder="Company Location"
          value={formData.location}
          onChange={handleChange}
        />
        <input
          type="text"
          name="website"
          placeholder="Company Website"
          value={formData.website}
          onChange={handleChange}
        />
        <input
          type="text"
          name="industry"
          placeholder="Industry"
          value={formData.industry}
          onChange={handleChange}
        />
        <textarea
          name="description"
          placeholder="Company Description"
          value={formData.description}
          onChange={handleChange}
          rows={4}
        />
        <label>Upload Logo / Image</label>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImage(e.target.files[0])}
        />
        <button type="submit">Update Profile</button>
      </form>
    </div>
  );
};

export default EditEmployerProfile;
