import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router';
import { useNavigate } from 'react-router-dom';
import Nav from '../Nav/Nav';
import './UpdateEmployee.css';

function UpdateEmployee() {
    const [inputs, setInputs] = useState({});
    const history = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        const fetchHandler = async () => {
            try {
                const response = await axios.get(`http://localhost:8070/Employee/${id}`);
                setInputs(response.data.employee);
            } catch (error) {
                console.error("Error fetching employee data", error);
            }
        };
        fetchHandler();
    }, [id]);

    const sendRequest = async () => {
        try {
            await axios.put(`http://localhost:8070/Employee/${id}`, {
                empId: String(inputs.empId),
                name: String(inputs.name),
                email: String(inputs.email),
                age: Number(inputs.age),
                address: String(inputs.address),
                empType: String(inputs.empType),
                phoneNumber: String(inputs.phoneNumber),
            });
        } catch (error) {
            console.error("Error updating employee data", error);
        }
    };

    const handleChange = (e) => {
        setInputs((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(inputs);
        await sendRequest();
        history('/employeedetails');
    };

    return (
        <div className="update-container">
            <Nav />
            <div className="update-header">
                <h1>Update Employee Details</h1>
            </div>

            <div className="update-form-container">
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Employee ID:</label>
                        <br />
                        <input type="text" name="empId" onChange={handleChange} value={inputs.empId} required />
                        <br /><br />
                    </div>
                    <div className="form-group">
                        <label>Name:</label>
                        <br />
                        <input type="text" name="name" onChange={handleChange} value={inputs.name} required />
                        <br /><br />
                    </div>
                    <div className="form-group">
                        <label>Email:</label>
                        <br />
                        <input type="email" name="email" onChange={handleChange} value={inputs.email} required />
                        <br /><br />
                    </div>
                    <div className="form-group">
                        <label>Age:</label>
                        <br />
                        <input type="text" name="age" onChange={handleChange} value={inputs.age} required />
                        <br /><br />
                    </div>
                    <div className="form-group">
                        <label>Address:</label>
                        <br />
                        <input type="text" name="address" onChange={handleChange} value={inputs.address} required />
                        <br /><br />
                    </div>
                    <div className="form-group">
                        <label>Employee Type:</label>
                        <br />
                        <input type="text" name="empType" onChange={handleChange} value={inputs.empType} required />
                        <br /><br />
                    </div>
                    <div className="form-group">
                        <label>Phone Number:</label>
                        <br />
                        <input type="text" name="phoneNumber" onChange={handleChange} value={inputs.phoneNumber} required />
                        <br /><br />
                    </div>
                    <button type="submit">SUBMIT</button>
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

export default UpdateEmployee;
