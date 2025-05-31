import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { assets } from '../../assets/assets';
import "./Hnav.css";
import { StoreContext } from '../context/StoreContext';

function Hnav({ setShowLogin }) {
  const [menu, setMenu] = useState("menu");
  const { getTotalCartAmount, token, setToken } = useContext(StoreContext);
  const navigate = useNavigate();
  const {user} = useContext(StoreContext);  

  const logout = () => {
    localStorage.removeItem("token");
    setToken("");
    navigate("/");
  };
  
  // Define home path based on user role
  const homePath = (user?.role === "admin" || user?.role === "staff") ? "/home2" : "/mainhome";
  
  // Check if user is admin or staff
  const isAdminOrStaff = user?.role === "admin" || user?.role === "staff";

  return (
    <div className="custom-navbar">
      <div className="custom-navbar-left">
        <Link to="/" className="nav-logo">
          <span className="logo-icon">MEAL</span>
          <span>mate</span>
        </Link>

        <ul className="custom-nav-links">
          <li onClick={() => setMenu("home")}>
            <Link to={homePath} className={`custom-nav-link ${menu === "home" ? "active" : ""}`}>
              Home
            </Link>
          </li>
          <li onClick={() => setMenu("menu")}>
            <Link to="/menu" className={`custom-nav-link ${menu === "menu" ? "active" : ""}`}>
              Menu
            </Link>
          </li>
        </ul>
      </div>

      {/* Only show the right part for customers, not for admin/staff */}
      {!isAdminOrStaff && (
        <div className="custom-navbar-right">
          <img src={assets.search_icon} alt=""/>
          <div className="navbar-search-icon">
            <Link to='/cart'><img src={assets.basket_icon} alt=""/></Link>
            <div className={getTotalCartAmount()===0?"":"dot"}></div>
          </div>

          {!token ? 
            <button onClick={()=>setShowLogin(true)}>Sign in</button>
            :
            <div className='navbar-profile'>
              <img src={assets.profile_icon} alt=""/>
              <ul className="nav-profile-dropdown">
                <li onClick={()=>navigate('/myorders')}><img src={assets.bag_icon} alt=""/><p>Orders</p></li>
                <hr/>
                <li onClick={logout}><img src={assets.logout_icon} alt=""/><p>Logout</p></li>
              </ul>
            </div>
          }
        </div>
      )}
    </div>
  );
}

export default Hnav;
