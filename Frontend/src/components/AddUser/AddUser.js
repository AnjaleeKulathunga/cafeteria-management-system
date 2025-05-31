import React, { useState } from 'react';
import Nav from '../Nav2/Nav2';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import './AddUser.css';

function AddUser() {
    const navigate = useNavigate();
    const [inputs, setInputs] = useState({
        name: "",
        gmail: "",
        age: "",
        address: "",
        password: "",
        role: "staff", // Default role
        department: "", // New department field
        employeeId: "" // New employeeId field
    });
    const [errors, setErrors] = useState({
        name: "",
        gmail: "",
        age: "",
        address: "",
        password: "",
        role: "",
        department: "", // New department error
        employeeId: "" // New employeeId error
    });

    const [isSubmitting, setIsSubmitting] = useState(false);

    // Validate name (letters only)
    const validateName = (name) => {
        const nameRegex = /^[A-Za-z\s]+$/;
        if (!name || name.trim().length < 3) {
            return "Name must be at least 3 characters long";
        }
        if (!nameRegex.test(name)) {
            return "Name can only contain letters and spaces";
        }
        return "";
    };

    // Validate email (must contain @)
    const validateEmail = (email) => {
        if (!email) {
            return "Email is required";
        }
        if (!email.includes('@')) {
            return "Email must contain @";
        }
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            return "Please enter a valid email address";
        }
        return "";
    };

    // Validate password (uppercase, lowercase, min 6 chars, special chars)
    const validatePassword = (password) => {
        if (!password) {
            return "Password is required";
        }
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

    const validateInputs = () => {
        const nameError = validateName(inputs.name);
        const emailError = validateEmail(inputs.gmail);
        const passwordError = validatePassword(inputs.password);
        
        let tempErrors = {
            name: nameError,
            gmail: emailError,
            password: passwordError
        };

        // Age validation
        if (!inputs.age) {
            tempErrors.age = "Age is required";
        } else if (inputs.age < 16 || inputs.age > 100) {
            tempErrors.age = "Age must be between 16 and 100";
        }

        // Address validation
        if (!inputs.address || inputs.address.trim().length < 5) {
            tempErrors.address = "Address must be at least 5 characters long";
        }

        // Role validation
        if (!inputs.role) {
            tempErrors.role = "Role is required";
        }

        // Department validation
        if (!inputs.department || inputs.department.trim().length === 0) {
            tempErrors.department = "Department is required";
        }

        // Employee ID validation
        if (!inputs.employeeId || inputs.employeeId.trim().length === 0) {
            tempErrors.employeeId = "Employee ID is required";
        }

        setErrors(tempErrors);
        
        // Check if there are any errors
        return !Object.values(tempErrors).some(error => error !== "");
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setInputs((prevState) => ({
            ...prevState,
            [name]: value,
        }));

        // Validate on change
        if (name === 'name') {
            setErrors(prev => ({ ...prev, name: validateName(value) }));
        } else if (name === 'gmail') {
            setErrors(prev => ({ ...prev, gmail: validateEmail(value) }));
        } else if (name === 'password') {
            setErrors(prev => ({ ...prev, password: validatePassword(value) }));
        } else if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: '' }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateInputs()) {
            return;
        }
        
        setIsSubmitting(true);
        try {
            await sendRequest();

            setInputs({
                name: "",
                gmail: "",
                age: "",
                address: "",
                password: "",
                role: "staff",
                department: "",
                employeeId: ""
            });

            setErrors({
                name: "",
                gmail: "",
                age: "",
                address: "",
                password: "",
                role: "",
                department: "",
                employeeId: ""
            });
            alert("User added successfully!");
            navigate('/userdetails');
        } catch (error) {
            console.error("Error adding user:", error);
            // Check for duplicate email error
            if (error.response?.status === 409 || 
                error.response?.data?.message?.includes('duplicate') || 
                error.response?.data?.message?.includes('already exists')) {
                setErrors(prev => ({
                    ...prev,
                    gmail: "This email is already registered"
                }));
            } else {
            setErrors(prev => ({
                ...prev,
                gmail: "Failed to add user. Please try again."
            }));
            }
        } finally {
            setIsSubmitting(false);
        }
    };

    const sendRequest = () => {
        return axios.post("http://localhost:8070/users", {
            name: inputs.name,
            gmail: inputs.gmail,
            age: Number(inputs.age),
            address: inputs.address,
            password: inputs.password,
            role: inputs.role,
            department: inputs.department,
            employeeId: inputs.employeeId
        });
    };

    return (
        <div className="add-container">
            <Nav />
            <div className="add-header">
                <h1>Add New User</h1>
            </div>

            <div className="add-user-container">
                <form onSubmit={handleSubmit} autoComplete="off" id="add-user-form">
                    <div className="form-group">
                        <label>Name</label>
                        <input
                            type="text" 
                            name="name" 
                            onChange={handleChange} 
                            value={inputs.name} 
                            placeholder="Enter name (letters only)"
                            required 
                            autoComplete="off"
                            data-form-type="other"
                            className={errors.name ? "input-error" : ""}
                        />
                        {errors.name && <span className="error-message">{errors.name}</span>}
                    </div>

                    <div className="form-group">
                        <label>Email</label>
                        <input
                            type="email" 
                            name="gmail" 
                            onChange={handleChange} 
                            value={inputs.gmail} 
                            placeholder="Enter email (must contain @)"
                            required 
                            autoComplete="off"
                            data-form-type="other"
                            className={errors.gmail ? "input-error" : ""}
                        />
                        {errors.gmail && <span className="error-message">{errors.gmail}</span>}
                    </div>

                    <div className="form-group">
                        <label>Age</label>
                        <input
                            type="number" 
                            name="age" 
                            onChange={handleChange} 
                            value={inputs.age} 
                            placeholder="Enter age (16-100)"
                            required 
                            autoComplete="off"
                            data-form-type="other"
                            className={errors.age ? "input-error" : ""}
                        />
                        {errors.age && <span className="error-message">{errors.age}</span>}
                    </div>

                    <div className="form-group">
                        <label>Address</label>
                        <input
                            type="text" 
                            name="address" 
                            onChange={handleChange} 
                            value={inputs.address} 
                            placeholder="Enter address (min 5 characters)"
                            required 
                            autoComplete="off"
                            data-form-type="other"
                            className={errors.address ? "input-error" : ""}
                        />
                        {errors.address && <span className="error-message">{errors.address}</span>}
                    </div>

                    <div className="form-group">
                        <label>Password</label>
                        <input
                            type="password" 
                            name="password" 
                            onChange={handleChange} 
                            value={inputs.password} 
                            placeholder="Min 6 chars, upper & lowercase, number/symbol"
                            required 
                            autoComplete="new-password"
                            data-form-type="other"
                            className={errors.password ? "input-error" : ""}
                        />
                        {errors.password && <span className="error-message">{errors.password}</span>}
                    </div>

                    <div className="form-group">
                        <label>Role</label>
                        <select
                            name="role"
                            value={inputs.role}
                            onChange={handleChange}
                            required
                            className={`role-select ${errors.role ? "input-error" : ""}`}
                        >
                            <option value="staff">Staff</option>
                            <option value="admin">Admin</option>
                            <option value="user">User</option>
                        </select>
                        {errors.role && <span className="error-message">{errors.role}</span>}
                    </div>

                    <div className="form-group">
                        <label>Department</label>
                        <input
                            type="text"
                            name="department"
                            onChange={handleChange}
                            value={inputs.department}
                            placeholder="Enter department"
                            required
                            autoComplete="off"
                            data-form-type="other"
                            className={errors.department ? "input-error" : ""}
                        />
                        {errors.department && <span className="error-message">{errors.department}</span>}
                    </div>

                    <div className="form-group">
                        <label>Employee ID</label>
                        <input
                            type="text"
                            name="employeeId"
                            onChange={handleChange}
                            value={inputs.employeeId}
                            placeholder="Enter employee ID"
                            required
                            autoComplete="off"
                            data-form-type="other"
                            className={errors.employeeId ? "input-error" : ""}
                        />
                        {errors.employeeId && <span className="error-message">{errors.employeeId}</span>}
                    </div>

                    <button 
                        type="submit" 
                        disabled={isSubmitting || Object.values(errors).some(error => error !== "")}
                    >
                        {isSubmitting ? "Adding User..." : "Add User"}
                    </button>
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

export default AddUser;