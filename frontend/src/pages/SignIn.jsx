import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../pageStyles/SignIn.css';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

import { useAuth } from "../context/AuthContext";

const SignIn = () => {
  const [role, setRole] = useState('jobseeker');
  const [showPassword, setShowPassword] = useState(false);
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [warning, setWarning] = useState(''); // <-- state for warnings

  const navigate = useNavigate();

  const handleChange = (e) => {
    setWarning(''); // clear warning on change
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleRoleSelect = (selectedRole) => {
    setRole(selectedRole);
    setFormData({ email: '', password: '' });
    setWarning('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      setWarning('Please enter both email and password.');
      return;
    }

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
        login(data.token);
        navigate(role === 'jobseeker' ? '/employee/my-profile' : '/employer/dashboard');
      } else {
        setWarning(data.message || 'Invalid email or password.');
      }
    } catch (err) {
      setWarning('Network error. Please try again later.');
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
        <div style={{ position: 'relative' }}>
            <input
              type={showPassword ? 'text' : 'password'}
              name="password"
              placeholder="Password"
              required
              value={formData.password}
              onChange={handleChange}
              style={{ paddingRight: '210px' }}
            />
            <span
              onClick={() => setShowPassword(prev => !prev)}
              style={{
                position: 'absolute',
                top: '50%',
                right: '10px',
                transform: 'translateY(-50%)',
                cursor: 'pointer',
                color: 'silver'
              }}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>
        <button type="submit" className="submit-btn">Sign In</button>
        {warning && <p className="warning-message">{warning}</p>}
      </form>
    </div>
  );
};

export default SignIn;
