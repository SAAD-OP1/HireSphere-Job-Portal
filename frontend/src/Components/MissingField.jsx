// MissingField.jsx
import { useNavigate } from 'react-router-dom';
import "../Components/MissingField.css";
export const MissingField = () => {

  const navigate = useNavigate();
  const handleNavigate = () => {
    const token = localStorage.getItem('token');
    if (!token) return;

    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      const role = payload.role;

      if (role === 'employer') {
        navigate('/employer/edit-profile');
      } else {
        navigate('/employee/edit-profile');
      }
    } catch (err) {
      console.error('Invalid token:', err);
    }
  };

  return (
    <span
      className="plus-icon"
      title="Complete this field"
      onClick={handleNavigate}
    >
      +
    </span>
  );
};

export default MissingField;
