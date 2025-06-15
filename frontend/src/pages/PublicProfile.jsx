import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import EmployeeProfileView from '../Components/EmployeeProfileView';
import EmployerProfileView from '../Components/EmployerProfileView';

const PublicProfile = () => {
  const { role, id } = useParams();
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    const decoded = token ? jwtDecode(token) : null;

    if (decoded && decoded._id === id && decoded.role === role) {
      // This is the logged-in user's own profile
      if (role === 'employee') {
        navigate('/employee/my-profile');
      } else if (role === 'employer') {
        navigate('/employer/profile');
      }
      return;
    }
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await fetch(`https://hiresphere-job-portal.onrender.com/api/${role}/public/${id}`, {
          headers: { Authorization: `Bearer ${token}` }
        });

        const data = await res.json();
        if (res.ok) {
          setProfile(data);
        } else {
          setError(data.error || 'Failed to fetch profile');
        }
      } catch (err) {
        setError('Something went wrong.');
      }
    };

    fetchProfile();
  }, [role, id]);

  if (error) return <div>{error}</div>;
  if (!profile) return <div>Loading...</div>;

  return role === 'employee'
    ? <EmployeeProfileView profile={profile}/>
    : <EmployerProfileView profile={profile}/>;
};

export default PublicProfile;
