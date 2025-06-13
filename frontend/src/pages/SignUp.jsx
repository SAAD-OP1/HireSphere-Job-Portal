import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../pageStyles/SignUp.css';

const SignUp = () => {
  const [role, setRole] = useState('jobseeker');
  const [error, setError] = useState(''); // <- ADD THIS
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    phoneNumber: '',
    jobRole: '',
    companyName: ''
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleRoleSelect = (selectedRole) => {
    setRole(selectedRole);
    setError(''); // clear error on role switch
    setFormData({
      email: '',
      password: '',
      name: '',
      phoneNumber: '',
      jobRole: '',
      companyName: ''
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); // clear old error before new request

    const endpoint = role === 'jobseeker'
      ? 'http://localhost:3000/api/employee/signup'
      : 'http://localhost:3000/api/employer/signup';

    const payload =
      role === 'jobseeker'
        ? {
            email: formData.email,
            password: formData.password,
            name: formData.name,
            phoneNumber: formData.phoneNumber,
            jobRole: formData.jobRole
          }
        : {
            email: formData.email,
            password: formData.password,
            name: formData.name,
            companyName: formData.companyName
          };

    try {
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      const data = await res.json();

      if (res.ok && data.token) {
        localStorage.setItem('token', data.token);
        navigate(role === 'jobseeker' ? '/employee/my-profile' : '/employer/profile');
      } else {
        setError(data.message || 'Signup failed. Please check your inputs.');
      }
    } catch (error) {
      setError('Network error. Please try again.');
      console.error('Error:', error);
    }
  };

  return (
    <div className="signup-container">
      <h2>Join as</h2>
      <div className="role-select">
        <button
          className={role === 'jobseeker' ? 'active' : ''}
          onClick={() => handleRoleSelect('jobseeker')}
        >
          Job Seeker
        </button>
        <button
          className={role === 'recruiter' ? 'active' : ''}
          onClick={() => handleRoleSelect('recruiter')}
        >
          Recruiter
        </button>
      </div>

      {/* DISPLAY ERROR MESSAGE HERE */}
      {error && <div className="error-message">{error}</div>}

      <form onSubmit={handleSubmit} className="signup-form">
        <input
          type="email"
          name="email"
          placeholder="Email"
          required
          value={formData.email}
          onChange={handleChange}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          required
          value={formData.password}
          onChange={handleChange}
        />
        <input
          type="text"
          name="name"
          placeholder="Full Name"
          required
          value={formData.name}
          onChange={handleChange}
        />

        {role === 'jobseeker' && (
          <>
            <input
              type="text"
              name="phoneNumber"
              placeholder="Phone Number"
              required
              value={formData.phoneNumber}
              onChange={handleChange}
            />
            <input
              type="text"
              name="jobRole"
              placeholder="Job Role"
              required
              value={formData.jobRole}
              onChange={handleChange}
            />
          </>
        )}

        {role === 'recruiter' && (
          <input
            type="text"
            name="companyName"
            placeholder="Company Name"
            required
            value={formData.companyName}
            onChange={handleChange}
          />
        )}

        <button type="submit" className="submit-btn">Sign Up</button>
      </form>
    </div>
  );
};

export default SignUp;
