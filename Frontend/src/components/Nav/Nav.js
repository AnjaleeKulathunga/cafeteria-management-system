import React, { useContext, useState, useEffect } from "react";
import "./Nav.css";
import { Link, useNavigate, Outlet, useLocation } from "react-router-dom";
import { StoreContext } from '../context/StoreContext';

function Nav() {
  const navigate = useNavigate();
  const location = useLocation();
  const { token, setToken } = useContext(StoreContext);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [isSidebarOpen, setSidebarOpen] = useState(true);

  // Close sidebar by default on mobile devices
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setSidebarOpen(false);
      }
    };

    // Initial check
    handleResize();

    // Add event listener
    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Close sidebar on route change in mobile
  useEffect(() => {
    if (window.innerWidth < 768) {
      setSidebarOpen(false);
    }
  }, [location.pathname]);

  // Check authentication
  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (!storedToken) {
      navigate('/log');
    }
  }, [navigate]);

  const handleLogout = () => {
    setIsLoggingOut(true);
    setToken(null);
    localStorage.removeItem('token');
    localStorage.removeItem('userRole');
    localStorage.removeItem('userName');
    localStorage.removeItem('userId');
    localStorage.removeItem('userEmail');
    localStorage.removeItem('user');
    navigate("/log");
  };

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="main-nav-container">
      <div className={`main-nav-sidebar ${isSidebarOpen ? 'open' : 'closed'}`}>
        <div className="main-nav-sidebar-header">
          <h3>Hostel Cafeteria</h3>
          <button 
            className="main-nav-toggle-btn" 
            onClick={toggleSidebar}
            type="button"
            aria-label={isSidebarOpen ? 'Close sidebar' : 'Open sidebar'}
          >
            {isSidebarOpen ? '←' : '→'}
          </button>
        </div>
        <ul className="main-nav-sidebar-menu">
          <li>
            <Link to="/mainhome">
              <i className="fas fa-home"></i>
              <span>Home</span>
            </Link>
          </li>
          <li>
            <Link to="/profile">
              <i className="fas fa-user"></i>
              <span>Profile</span>
            </Link>
          </li>
          <li>
            <Link to="/contactus">
              <i className="fas fa-envelope"></i>
              <span>Contact Us</span>
            </Link>
          </li>
          <li>
            <Link to="/menu">
              <i className="fas fa-utensils"></i>
              <span>Menu</span>
            </Link>
          </li>
          {token && (
            <li className="main-nav-logout-option">
              <span
                onClick={!isLoggingOut ? handleLogout : undefined}
                style={{
                  cursor: isLoggingOut ? "default" : "pointer",
                  opacity: isLoggingOut ? 0.7 : 1,
                }}
              >
                <i className="fas fa-sign-out-alt"></i>
                <span>{isLoggingOut ? "Logging out..." : "Logout"}</span>
              </span>
            </li>
          )}
        </ul>
      </div>
      <div className={`main-nav-main-content ${isSidebarOpen ? 'with-sidebar' : 'full-width'}`}>
        <Outlet />
      </div>
    </div>
  );
}

export default Nav;