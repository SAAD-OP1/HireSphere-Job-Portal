import './SkillBadge.css';
import { useNavigate } from 'react-router-dom';

const SkillBadge = ({ skills, readOnly = false }) => {
  const navigate = useNavigate();

  return (
    <div className="skill-badge-container">
      {skills && skills.length > 0 && skills.map((skill, idx) => (
        <span key={idx} className="skill-pill">{skill}</span>
      ))}
      {!readOnly && (
        <span className="plus-icon" onClick={() => navigate('/employee/edit-profile')}>+</span>
      )}
    </div>
  );
};

export default SkillBadge;
