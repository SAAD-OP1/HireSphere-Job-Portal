import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../pageStyles/SignUp.css';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

const getPasswordStrength = (password) => {
  const strongRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$%^&+=!]).{8,}$/;
  const mediumRegex = /^((?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,})$/;

  if (password.length === 0) return '';
  if (strongRegex.test(password)) return 'Strong';
  if (mediumRegex.test(password)) return 'Medium';
  return 'Weak';
};

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
  const [showPassword, setShowPassword] = useState(false);
  const [strength, setStrength] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    if(e.target.name === 'password') {
      const strength = getPasswordStrength(e.target.value);
      setStrength(strength);
    }
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
    setStrength(''); // reset password strength
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
        navigate(role === 'jobseeker' ? '/employee/dashboard' : '/employer/dashboard');
      } else {
        setError(data.message || 'Signup failed. Please check your inputs.');
      }
    } catch (error) {
      setError('Network error. Please try again.');
      console.error('Error:', error);
    }
  };
  const getStrengthColor = () => {
    switch (strength) {
      case 'Weak':
        return 'red';
      case 'Medium':
        return 'orange';
      case 'Strong':
        return 'green';
      default:
        return '';
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
        <div className="password-field">
  <div style={{ position: 'relative' }}>
    <input
      type={showPassword ? 'text' : 'password'}
      name="password"
      placeholder="Password"
      required
      value={formData.password}
      onChange={handleChange}
      style={{ paddingRight: '265px' }}
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

  {strength && (
    <p style={{ color: getStrengthColor(), marginTop: '4px', fontSize: '14px' }}>
      Password Strength: <strong>{strength}</strong>
    </p>
  )}
  <small className="password-hint">
    <strong>Note:</strong> Password must be greater than 6 characters. To get a strong password, please include a capital letter (A-Z), a special character (!, @, #, etc.), and any digit (0-9).
  </small>
</div>
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
