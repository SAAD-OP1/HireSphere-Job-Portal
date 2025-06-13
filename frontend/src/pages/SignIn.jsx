import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../pageStyles/SignIn.css';

const SignIn = () => {
  const [role, setRole] = useState('jobseeker');
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
        localStorage.setItem('token', data.token);
        navigate(role === 'jobseeker' ? '/employee/my-profile' : '/employer/profile');
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
        <input
          type="password"
          name="password"
          placeholder="Password"
          required
          value={formData.password}
          onChange={handleChange}
        />
        <button type="submit" className="submit-btn">Sign In</button>
        {warning && <p className="warning-message">{warning}</p>}
      </form>
    </div>
  );
};

export default SignIn;
