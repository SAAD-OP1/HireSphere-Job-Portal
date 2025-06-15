import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../pageStyles/CreateJob.css';

const CreateJob = () => {
  const [formData, setFormData] = useState({
    title: '',
    company: '',
    industry: '',
    location: '',
    salary: '',
    skills: ''
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      ...formData,
      salary: parseInt(formData.salary),
      skills: formData.skills.split(',').map(skill => skill.trim())
    };


    try {
      const res = await fetch('http://localhost:3000/api/jobs/postJob', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify(payload)
      });

      if (res.ok) {
        navigate('/employer/dashboard');
      } else {
        console.error('Failed to post job');
      }
    } catch (err) {
      console.error('Error posting job:', err);
    }
  };

  return (
    <div className="create-job-container">
      <h2>Create a Job</h2>
      <form onSubmit={handleSubmit} className="create-job-form">
        <input
          type="text"
          name="title"
          placeholder="Job Title"
          value={formData.title}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="company"
          placeholder="Company"
          value={formData.company}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="industry"
          placeholder="Industry"
          value={formData.industry}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="location"
          placeholder="Location"
          value={formData.location}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="salary"
          placeholder="Salary"
          value={formData.salary}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="skills"
          placeholder="Required Skills (comma separated)"
          value={formData.skills}
          onChange={handleChange}
          required
        />
        <button type="submit" className="submit-btn">Post Job</button>
      </form>
    </div>
  );
};

export default CreateJob;
