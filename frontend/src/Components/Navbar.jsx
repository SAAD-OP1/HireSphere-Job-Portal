import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';
import { useEffect, useState } from 'react';

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    setIsLoggedIn(false);
    navigate('/');
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <Link to="/">HIRESPHERE</Link>
      </div>

      <div className="navbar-links">
        {!isLoggedIn ? (
          <>
            <Link to="/signin" className="btn">Sign In</Link>
            <Link to="/signup" className="btn">Sign Up</Link>
          </>
        ) : (
          <button className="btn logout-btn" onClick={handleLogout}>Logout</button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
