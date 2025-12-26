import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Nav2 from '../Nav2/Nav2';
import { FaUser, FaBuilding, FaMoneyBillWave, FaCalendarAlt } from 'react-icons/fa';
import axios from 'axios';
import './AdminDashboard.css';

function AdminDashboard() {
  const navigate = useNavigate();
  

  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <div className="admin-container">
      <Nav2 />
      <div className="admin-main-content">
        <h2>Dashboard Overview</h2>
        
        <div className="dashboard-grid">
          <div className="dashboard-card" onClick={() => handleNavigation('/admin-employee-details')}>
            <FaUser className="dashboard-icon" />
            <div className="card-content">
              <h3>Employee</h3>
              <p>Check Employees </p>
            </div>
          </div>

          <div className="dashboard-card" onClick={() => handleNavigation('/admin-departments')}>
            <FaBuilding className="dashboard-icon" />
            <div className="card-content">
              <h3>Departments</h3>
              <p>Check Departments</p>
            </div>
          </div>

          <div className="dashboard-card" onClick={() => handleNavigation('/admin-salary-details')}>
            <FaMoneyBillWave className="dashboard-icon" />
            <div className="card-content">
              <h3>Salary</h3>
              <p>Monthly: $654</p>
            </div>
          </div>

          <div className="dashboard-card" onClick={() => handleNavigation('/leave-details')}>
            <FaCalendarAlt className="dashboard-icon" />
            <div className="card-content">
              <h3>Leaves</h3>
              <p>Pending, Approved...</p>
            </div>
          </div>
        </div>

        <div className="quick-actions">
          <h3>Quick Actions</h3>
          <div className="action-buttons">
            <button onClick={() => handleNavigation('/admin-employee-details')}>Manage Employees</button>
            <button onClick={() => handleNavigation('/admin-departments')}>View Departments</button>
            <button onClick={() => handleNavigation('/admin-salary-details')}>Salary Details</button>
            <button onClick={() => handleNavigation('/leave-details')}>Leave Management</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;