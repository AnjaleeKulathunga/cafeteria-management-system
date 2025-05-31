import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

import axios from "axios";
import './Register.css'; // Import CSS file
import Nav from "../IntialNav/InitialNav";

function Register() {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    name: "",
    gmail: "",
    password: ""
  });
  
  const [errors, setErrors] = useState({
    name: "",
    gmail: "",
    password: ""
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateName = (name) => {
    const nameRegex = /^[A-Za-z\s]+$/;
    if (!nameRegex.test(name)) {
      return "Name can only contain letters and spaces";
    }
    return "";
  };

  const validateEmail = (email) => {
    if (!email.includes('@')) {
      return "Email must contain @";
    }
    return "";
  };

  const validatePassword = (password) => {
    if (password.length < 6) {
      return "Password must be at least 6 characters long";
    }
    if (!/[A-Z]/.test(password)) {
      return "Password must contain at least one uppercase letter";
    }
    if (!/[a-z]/.test(password)) {
      return "Password must contain at least one lowercase letter";
    }
    if (!/[0-9!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)) {
      return "Password must contain at least one number or special character";
    }
    return "";
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({ ...prevUser, [name]: value }));
    
    // Validate on input change
    if (name === "name") {
      setErrors(prev => ({ ...prev, name: validateName(value) }));
    } else if (name === "gmail") {
      setErrors(prev => ({ ...prev, gmail: validateEmail(value) }));
    } else if (name === "password") {
      setErrors(prev => ({ ...prev, password: validatePassword(value) }));
    }
  };

  const sendRequest = async () => {
    try {
      const response = await axios.post("http://localhost:8070/register", {
        name: String(user.name),
        gmail: String(user.gmail),
        password: String(user.password)
      });
      return response;
    } catch (error) {
      throw error;
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validate all fields before submission
    const nameError = validateName(user.name);
    const emailError = validateEmail(user.gmail);
    const passwordError = validatePassword(user.password);
    
    setErrors({
      name: nameError,
      gmail: emailError,
      password: passwordError
    });
    
    // Only proceed if there are no errors
    if (!nameError && !emailError && !passwordError) {
      setIsSubmitting(true);
      sendRequest()
        .then((response) => {
          alert("Registration Successful!");
          navigate("/log");
        })
        .catch((err) => {
          // Check for duplicate email error
          if (err.response?.status === 409 || 
              err.response?.data?.message?.includes('duplicate') || 
              err.response?.data?.status?.includes('Email already exists')) {
            setErrors(prev => ({ ...prev, gmail: "This email is already registered" }));
          } else {
            alert("Registration failed: " + (err.response?.data?.status || err.message));
          }
        })
        .finally(() => {
          setIsSubmitting(false);
        });
    }
  };

  return (
    <div className="user-register-container">
      <Nav/>
      <div className="user-register-header">
        <h1>User Register</h1>
      </div>
      <div className="user-register-form-container">
        <form onSubmit={handleSubmit} className="user-register-form" autoComplete="off">
          <div className="user-register-form-group">
            <label>Name</label>
            <input
              type="text"
              name="name"
              value={user.name}
              onChange={handleInputChange}
              required
              placeholder="Enter your name (letters only)"
              autoComplete="off"
              className={errors.name ? "input-error" : ""}
            />
            {errors.name && <div className="error-message">{errors.name}</div>}
          </div>
          
          <div className="user-register-form-group">
            <label>Gmail</label>
            <input
              type="email"
              name="gmail"
              value={user.gmail}
              onChange={handleInputChange}
              required
              placeholder="Enter your email (must contain @)"
              autoComplete="off"
              className={errors.gmail ? "input-error" : ""}
            />
            {errors.gmail && <div className="error-message">{errors.gmail}</div>}
          </div>
          
          <div className="user-register-form-group">
            <label>Password</label>
            <input
              type="password"
              name="password"
              value={user.password}
              onChange={handleInputChange}
              required
              placeholder="Min 6 chars, upper & lowercase"
              autoComplete="off"
              className={errors.password ? "input-error" : ""}
            />
            {errors.password && <div className="error-message">{errors.password}</div>}
          </div>
          
          <button 
            type="submit" 
            className="user-register-submit-btn"
            disabled={isSubmitting || errors.name || errors.gmail || errors.password}
          >
            {isSubmitting ? "Registering..." : "Register"}
          </button>
          <div className="user-register-login-link">
            Already registered? <Link to="/log">Login here</Link>
          </div>
        </form>
      </div>

      <footer className="user-register-footer">
        <div className="user-register-footer-content">
          <div className="user-register-footer-section">
            <div className="user-register-footer-logo">
              <span className="logo-icon">MEAL</span>
              <span>mate</span>
            </div>
            <p className="user-register-footer-about">
              Your trusted partner for delicious and convenient hostel dining. We make every meal special with quality ingredients and excellent service.
            </p>
            <div className="social-links">
              <a href="#"><i className="fab fa-facebook-f"></i></a>
              <a href="#"><i className="fab fa-twitter"></i></a>
              <a href="#"><i className="fab fa-instagram"></i></a>
              <a href="#"><i className="fab fa-linkedin-in"></i></a>
            </div>
          </div>

          <div className="user-register-footer-section">
            <h3>Quick Links</h3>
            <ul className="user-register-footer-links">
              <li><a href="/">Home</a></li>
              <li><a href="/menu">Menu</a></li>
              <li><a href="/about">About Us</a></li>
              <li><a href="/contact">Contact</a></li>
            </ul>
          </div>

          <div className="user-register-footer-section">
            <h3>Services</h3>
            <ul className="user-register-footer-links">
              <li><a href="/daily-meals">Daily Meals</a></li>
              <li><a href="/special-diet">Special Diet</a></li>
              <li><a href="/meal-plans">Meal Plans</a></li>
              <li><a href="/quick-snacks">Quick Snacks</a></li>
            </ul>
          </div>

          <div className="user-register-footer-section">
            <h3>Contact Info</h3>
            <div className="user-register-footer-contact">
              <p><i className="fas fa-map-marker-alt"></i> Hostel Campus, University Road</p>
              <p><i className="fas fa-phone"></i> +1 234 567 8900</p>
              <p><i className="fas fa-envelope"></i> info@mealmate.com</p>
              <p><i className="fas fa-clock"></i> Mon - Sun: 7:00 AM - 10:00 PM</p>
            </div>
          </div>
        </div>

        <div className="user-register-footer-bottom">
          <p>&copy; {new Date().getFullYear()} MEALmate. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

export default Register;
