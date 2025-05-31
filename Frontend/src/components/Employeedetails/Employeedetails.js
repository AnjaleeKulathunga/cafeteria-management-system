import React, { useState, useEffect } from 'react';
import axios from "axios";
import Employee from "../Employee/Employee";
import Nav from '../Nav/Nav';
import './Employeedetails.css';
import { Link } from 'react-router-dom';

const URL = "http://localhost:8070/Employee";

const fetchHandler = async () => {
  return await axios.get(URL).then((res) => res.data);
};

function Employeedetails() {
  const [Employees, setEmployees] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [noResults, setNoResults] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchHandler().then((data) => {
      setEmployees(data.Employees);
      setLoading(false);
    });
  }, []);

  const handleSearch = () => {
    fetchHandler().then((data) => {
      const filteredEmployee = data.Employees.filter((employee) =>
        Object.values(employee).some((field) =>
          field.toString().toLowerCase().includes(searchQuery.toLowerCase())
        )
      );
      setEmployees(filteredEmployee);
      setNoResults(filteredEmployee.length === 0);
    });
  };

  const handleSearchInputChange = (e) => {
    setSearchQuery(e.target.value);
    handleSearch();
  };

  return (
    <div className="abc-container">
      <Nav />
      <div className="employee-details-container">
        <h1>Employee Details</h1>

        <div className="search-section">
          <input
            type="text"
            value={searchQuery}
            onChange={handleSearchInputChange}
            placeholder="Search Employee"
          />
          <button onClick={handleSearch}>Search</button>
        </div>

        <div className="add-btn">
          <Link to="/addemployee" className="update-btn">Add Employee</Link>
        </div>

        {loading ? (
          <div><p>Loading...</p></div>
        ) : noResults ? (
          <div><p>No employee found</p></div>
        ) : (
          <Employee employees={Employees} />
        )}
      </div>

      <footer className="footer">
        <div className="footer-content">
          <div className="footer-section">
            <div className="footer-logo">
              <span className="logo-icon">MEAL</span>
              <span>mate</span>
            </div>
            <p className="footer-about">
              Your trusted partner for delicious and convenient hostel dining. We make every meal special with quality ingredients and excellent service.
            </p>
            <div className="social-links">
              <a href="#"><i className="fab fa-facebook-f"></i></a>
              <a href="#"><i className="fab fa-twitter"></i></a>
              <a href="#"><i className="fab fa-instagram"></i></a>
              <a href="#"><i className="fab fa-linkedin-in"></i></a>
            </div>
          </div>

          <div className="footer-section">
            <h3>Quick Links</h3>
            <ul className="footer-links">
              <li><a href="/">Home</a></li>
              <li><a href="/menu">Menu</a></li>
              <li><a href="/about">About Us</a></li>
              <li><a href="/contact">Contact</a></li>
            </ul>
          </div>

          <div className="footer-section">
            <h3>Services</h3>
            <ul className="footer-links">
              <li><a href="/daily-meals">Daily Meals</a></li>
              <li><a href="/special-diet">Special Diet</a></li>
              <li><a href="/meal-plans">Meal Plans</a></li>
              <li><a href="/quick-snacks">Quick Snacks</a></li>
            </ul>
          </div>

          <div className="footer-section">
            <h3>Contact Info</h3>
            <div className="footer-contact">
              <p><i className="fas fa-map-marker-alt"></i> Hostel Campus, University Road</p>
              <p><i className="fas fa-phone"></i> +1 234 567 8900</p>
              <p><i className="fas fa-envelope"></i> info@mealmate.com</p>
              <p><i className="fas fa-clock"></i> Mon - Sun: 7:00 AM - 10:00 PM</p>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} MEALmate. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

export default Employeedetails;
