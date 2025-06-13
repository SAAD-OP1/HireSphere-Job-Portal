import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';

import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const { isLoggedIn, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/signin");
  }

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
