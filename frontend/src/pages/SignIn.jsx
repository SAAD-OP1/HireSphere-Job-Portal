import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../pageStyles/SignIn.css';

const SignIn = () => {
  const [role, setRole] = useState('jobseeker');
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleRoleSelect = (selectedRole) => {
    setRole(selectedRole);
    setFormData({
      email: '',
      password: ''
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const endpoint = role === 'jobseeker'
      ? 'http://localhost:3000/api/employee/signin'
      : 'http://localhost:3000/api/employer/signin';

    try {
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const data = await res.json();

      if (res.ok && data.token) {
        localStorage.setItem('token', data.token);
        navigate(role === 'jobseeker' ? '/employee/dashboard' : '/employer/dashboard');
      } else {
        console.error(data.message || 'Login failed');
      }
    } catch (err) {
      console.error('Error:', err);
    }
  };

  return (
    <div className="signin-container">
      <h2>Sign In as</h2>
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

      <form onSubmit={handleSubmit} className="signin-form">
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

        <button type="submit" className="submit-btn">Sign In</button>
      </form>
    </div>
  );
};

export default SignIn;
