import React from "react";
import { Link } from "react-router-dom";
import "./InitialNav.css";

function InitialNav() {
  return (
    <div className="initial-navbar">
      <div className="initial-navbar-left">
        <Link to="/" className="nav-link">
          Home
        </Link>
      </div>

      <div className="initial-navbar-right">
        <Link to="/regi">
          <button className="nav-button register">Register</button>
        </Link>
        <Link to="/log">
          <button className="nav-button login">Login</button>
        </Link>
      </div>
    </div>
  );
}

export default InitialNav;
