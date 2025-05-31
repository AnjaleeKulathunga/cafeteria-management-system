import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import "./UpdateUser.css";

function UpdateUser() {
  const [inputs, setInputs] = useState({});
  const [errors, setErrors] = useState({});
  const history = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const fetchHandler = async () => {
      await axios
        .get(`http://localhost:8070/users/${id}`)
        .then((res) => res.data)
        .then((data) => setInputs(data.user));
    };
    fetchHandler();
  }, [id]);

  const validateInputs = () => {
    let tempErrors = {};
    
  
    if (!inputs.name || inputs.name.trim().length < 3) {
      tempErrors.name = "Name must be at least 3 characters long";
    } else if (!/^[a-zA-Z\s]*$/.test(inputs.name)) {
      tempErrors.name = "Name should only contain letters and spaces";
    }

  
    if (!inputs.gmail) {
      tempErrors.gmail = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(inputs.gmail)) {
      tempErrors.gmail = "Please enter a valid email address";
    }

    

  
    if (!inputs.address || inputs.address.trim().length < 5) {
      tempErrors.address = "Address must be at least 5 characters long";
    }

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const sendRequest = async () => {
    await axios
      .put(`http://localhost:8070/users/${id}`, {
        name: inputs.name,
        gmail: inputs.gmail,
        age: Number(inputs.age),
        address: inputs.address,
      })
      .then((res) => res.data);
  };

  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
   
    if (errors[e.target.name]) {
      setErrors(prev => ({
        ...prev,
        [e.target.name]: ''
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateInputs()) {
      console.log(inputs);
      sendRequest().then(() => history("/userdetails"));
    }
  };

  return (
    <div className="update-container">
      <div className="update-header">
        <h1>Update User</h1>
      </div>
      <div className="update-form-container">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Name</label>
            <input
              type="text"
              name="name"
              onChange={handleChange}
              value={inputs.name || ""}
              placeholder="Enter your name"
              required
            />
            {errors.name && <span className="error-message">{errors.name}</span>}
          </div>

          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              name="gmail"
              onChange={handleChange}
              value={inputs.gmail || ""}
              placeholder="Enter your email"
              required
            />
            {errors.gmail && <span className="error-message">{errors.gmail}</span>}
          </div>

          <div className="form-group">
            <label>Age</label>
            <input
              type="number"
              name="age"
              onChange={handleChange}
              value={inputs.age || ""}
              placeholder="Enter your age"
              required
            />
            {errors.age && <span className="error-message">{errors.age}</span>}
          </div>

          <div className="form-group">
            <label>Address</label>
            <input
              type="text"
              name="address"
              onChange={handleChange}
              value={inputs.address || ""}
              placeholder="Enter your address"
              required
            />
            {errors.address && <span className="error-message">{errors.address}</span>}
          </div>

          <button type="submit">Update User</button>
        </form>
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
            <ul>
              <li><a href="/">Home</a></li>
              <li><a href="/menu">Menu</a></li>
              <li><a href="/about">About Us</a></li>
              <li><a href="/contact">Contact</a></li>
            </ul>
          </div>

          <div className="footer-section">
            <h3>Services</h3>
            <ul>
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

export default UpdateUser;
