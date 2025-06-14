import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getUserRole } from '../utils/auth';

const ProfileLink = () => {
  const [role, setRole] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const roleFromToken = getUserRole();
    setRole(roleFromToken);
  }, []);

  const handleClick = () => {
    if (role === 'employee') {
      navigate('/employee/my-profile');
    } else if (role === 'employer') {
      navigate('/employer/profile');
    }
  };

  if (!role) return null;

  return (
    <button onClick={handleClick} className="profile-nav-button">
      My Profile
    </button>
  );
};

export default ProfileLink;
