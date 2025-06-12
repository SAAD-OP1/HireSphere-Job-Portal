// MissingField.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './MissingField.css';

const MissingField = () => {
  const navigate = useNavigate();
  return (
    <span
      className="plus-icon"
      title="Complete this field"
      onClick={() => navigate('/employee/edit-profile')}
    >
      +
    </span>
  );
};

export default MissingField;
