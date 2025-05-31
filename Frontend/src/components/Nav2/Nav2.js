// Nav2.js
import React, { useContext, useState, useEffect } from "react"; // Added useEffect
import { Link, useNavigate, Outlet, useLocation } from "react-router-dom"; // Added useLocation
import "./nav.css"; // Import your new Nav2 styles
import { StoreContext } from "../context/StoreContext"; // Assuming this is the correct path

function Nav2() {
  const navigate = useNavigate();
  const location = useLocation();
  const { token, setToken, setUser } = useContext(StoreContext);
  const [isLoggingOut, setIsLoggingOut] = useState(false); // Get token and setToken
  const [isSidebarOpen, setSidebarOpen] = useState(true);

  // Close sidebar by default on mobile devices
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setSidebarOpen(false);
      }
    };

    // Initial check when component mounts
    handleResize();

    // Add event listener for window resize
    window.addEventListener('resize', handleResize);

    // Clean up on component unmount
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Close sidebar when route changes on mobile
  useEffect(() => {
    if (window.innerWidth < 768) {
      setSidebarOpen(false);
    }
  }, [location.pathname]);

  const handleLogout = async () => {
    if (isLoggingOut) return;
    
    setIsLoggingOut(true);
    try {
      localStorage.removeItem("token");
      setToken("");
      setUser(null);
      navigate("/");
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      setIsLoggingOut(false);
    }
  };

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="admin-nav-container">
      <div className={`admin-nav-sidebar ${isSidebarOpen ? 'open' : 'closed'}`}>
        <div className="admin-nav-sidebar-header">
          <h3>Hostel Cafeteria</h3>
          <button className="admin-nav-toggle-btn" onClick={toggleSidebar}>
            {isSidebarOpen ? '←' : '→'}
          </button>
        </div>
        <ul className="admin-nav-sidebar-menu">
          <li>
            <Link to="/home2">Home</Link>
          </li>
          <li>
            <Link to="/menu">Menu</Link>
          </li>
          <li>
            <Link to="/userdetails">User Details</Link>
          </li>
          <li>
            <Link to="/adduser">ADD User</Link>
          </li>
          <li>
            <Link to="/profile">Profile</Link>
          </li>
          <li>
            <Link to="/dashboard">Inventory</Link>
          </li>
          <li>
            <Link to="/adminfeedback">Feedback</Link>
          </li>
          <li>
            <Link to="/admincomplaintTable">Complaint</Link>
          </li>
          <li>
            <Link to="/ContactusDisplay">Contact Us</Link>
          </li>
          <li>
            <Link to="/admin-dashboard">Admin</Link>
          </li>
          {token && (
            <li className="admin-nav-logout-option">
              <span
                onClick={!isLoggingOut ? handleLogout : undefined}
                style={{
                  cursor: isLoggingOut ? "default" : "pointer",
                  opacity: isLoggingOut ? 0.7 : 1,
                }}
              >
                {isLoggingOut ? "Logging out..." : "Logout"}
              </span>
            </li>
          )}
        </ul>
      </div>
      <div className={`admin-nav-main-content ${isSidebarOpen ? 'with-sidebar' : 'full-width'}`}>
        <Outlet />
      </div>
    </div>
  );
}

export default Nav2;
